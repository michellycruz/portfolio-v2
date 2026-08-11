package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"portfolio/backend/internal/contact"
	"portfolio/backend/internal/content"
	"portfolio/backend/internal/envfile"
	"portfolio/backend/internal/middleware"
)

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func main() {
	if err := envfile.Load(".env"); err != nil {
		log.Printf("warning: could not read .env: %v", err)
	}

	port := getenv("PORT", "8080")
	origin := getenv("FRONTEND_ORIGIN", "http://localhost:5173")
	staticDir := os.Getenv("STATIC_DIR") // set to the built frontend/dist for single-binary deploys

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/content", content.HandleAll)
	mux.HandleFunc("GET /api/profile", content.HandleProfile)
	mux.HandleFunc("GET /api/experience", content.HandleExperience)
	mux.HandleFunc("GET /api/education", content.HandleEducation)
	mux.HandleFunc("GET /api/skills", content.HandleSkills)
	mux.HandleFunc("GET /api/projects", content.HandleProjects)
	mux.HandleFunc("POST /api/contact", contact.Handler(contact.LoadConfig()))
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	})

	if staticDir != "" {
		fs := http.FileServer(http.Dir(staticDir))
		mux.Handle("/", spaFallback(staticDir, fs))
		log.Printf("serving static frontend from %s", staticDir)
	}

	handler := middleware.CORS(origin)(mux)

	srv := &http.Server{
		Addr:              ":" + port,
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("portfolio backend listening on :%s (allowed origin: %s)", port, origin)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

// spaFallback serves static files when they exist and falls back to
// index.html otherwise, so client-side routing works on refresh/deep links.
func spaFallback(dir string, fs http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := dir + r.URL.Path
		if info, err := os.Stat(path); err == nil && !info.IsDir() {
			fs.ServeHTTP(w, r)
			return
		}
		http.ServeFile(w, r, dir+"/index.html")
	})
}
