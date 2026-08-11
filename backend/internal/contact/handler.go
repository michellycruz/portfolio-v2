package contact

import (
	"encoding/json"
	"net/http"
	"regexp"
	"strings"
	"time"
)

// Message is the payload submitted by the contact form.
type Message struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

var emailRe = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

func (m Message) validate() map[string]string {
	errs := map[string]string{}

	name := strings.TrimSpace(m.Name)
	if len(name) < 2 {
		errs["name"] = "Informe seu nome completo."
	} else if len(name) > 120 {
		errs["name"] = "Nome muito longo."
	}

	email := strings.TrimSpace(m.Email)
	if !emailRe.MatchString(email) {
		errs["email"] = "Informe um e-mail válido."
	}

	msg := strings.TrimSpace(m.Message)
	if len(msg) < 10 {
		errs["message"] = "Escreva uma mensagem com pelo menos 10 caracteres."
	} else if len(msg) > 4000 {
		errs["message"] = "Mensagem muito longa (máx. 4000 caracteres)."
	}

	return errs
}

// Handler returns the POST /api/contact HTTP handler, wired to the given
// mail configuration with a basic per-IP rate limit.
func Handler(cfg Config) http.HandlerFunc {
	rl := newLimiter(30 * time.Second)

	return func(w http.ResponseWriter, r *http.Request) {
		if !rl.allow(clientIP(r)) {
			writeJSON(w, http.StatusTooManyRequests, map[string]string{
				"error": "Aguarde um momento antes de enviar outra mensagem.",
			})
			return
		}

		var msg Message
		dec := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<20))
		if err := dec.Decode(&msg); err != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Corpo da requisição inválido."})
			return
		}

		if errs := msg.validate(); len(errs) > 0 {
			writeJSON(w, http.StatusUnprocessableEntity, map[string]any{"errors": errs})
			return
		}

		msg.Name = strings.TrimSpace(msg.Name)
		msg.Email = strings.TrimSpace(msg.Email)
		msg.Message = strings.TrimSpace(msg.Message)

		if err := cfg.Send(msg); err != nil {
			writeJSON(w, http.StatusBadGateway, map[string]string{
				"error": "Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.",
			})
			return
		}

		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	}
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
