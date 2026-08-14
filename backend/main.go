package main

import (
	"log"
	"net/http"
	"os"
	"strings"
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

	mailCfg := contact.LoadConfig()
	checkMailConfig(mailCfg, staticDir)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/content", content.HandleAll)
	mux.HandleFunc("GET /api/profile", content.HandleProfile)
	mux.HandleFunc("GET /api/experience", content.HandleExperience)
	mux.HandleFunc("GET /api/education", content.HandleEducation)
	mux.HandleFunc("GET /api/skills", content.HandleSkills)
	mux.HandleFunc("GET /api/projects", content.HandleProjects)
	mux.HandleFunc("POST /api/contact", contact.Handler(mailCfg))
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

// checkMailConfig refuses to start a deployment whose SMTP settings are
// incomplete. Without this the contact form is silently broken in the worst
// way: Send falls back to logging and still reports success, so visitors get a
// "message sent" confirmation while the message only ever reaches the log.
//
// A deployment is anything serving the built frontend (STATIC_DIR) or marked
// APP_ENV=production — inferring it from STATIC_DIR means a real deploy is
// covered even if nobody remembers to set APP_ENV. Local runs keep the
// log-only fallback so `go run .` works with no email account, and
// ALLOW_UNCONFIGURED_SMTP=true opts a deployment out on purpose.
func checkMailConfig(cfg contact.Config, staticDir string) {
	missing := cfg.Missing()
	if len(missing) == 0 {
		return
	}

	deployment := staticDir != "" || os.Getenv("APP_ENV") == "production"
	if deployment && os.Getenv("ALLOW_UNCONFIGURED_SMTP") != "true" {
		log.Fatalf("refusing to start: %s not set, so the contact form would confirm messages it never sends. "+
			"Set them, or start with ALLOW_UNCONFIGURED_SMTP=true to accept log-only mode.",
			strings.Join(missing, ", "))
	}

	log.Printf("warning: %s not set - contact messages will be logged, not emailed", strings.Join(missing, ", "))
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
