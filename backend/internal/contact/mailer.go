package contact

import (
	"fmt"
	"log"
	"net/smtp"
	"os"
	"strings"
)

// Config holds SMTP settings read from the environment. Zero value means
// "not configured" and Send will fall back to logging instead of erroring,
// so local development works without setting up an email account.
type Config struct {
	Host     string
	Port     string
	User     string
	Pass     string
	From     string
	To       string
}

// LoadConfig reads SMTP_* env vars into a Config.
func LoadConfig() Config {
	return Config{
		Host: os.Getenv("SMTP_HOST"),
		Port: os.Getenv("SMTP_PORT"),
		User: os.Getenv("SMTP_USER"),
		// Gmail displays app passwords with spaces for readability only;
		// the actual credential has none, so strip any pasted in by mistake.
		Pass: strings.ReplaceAll(strings.TrimSpace(os.Getenv("SMTP_PASS")), " ", ""),
		From: os.Getenv("CONTACT_FROM_EMAIL"),
		To:   os.Getenv("CONTACT_TO_EMAIL"),
	}
}

// Missing lists the variables needed to send mail that have no value. It names
// the variables only — never their contents — so a startup failure can say
// exactly what to fix without printing a credential to the log.
func (c Config) Missing() []string {
	required := []struct{ name, value string }{
		{"SMTP_HOST", c.Host},
		{"SMTP_PORT", c.Port},
		{"SMTP_USER", c.User},
		{"SMTP_PASS", c.Pass},
		{"CONTACT_TO_EMAIL", c.To},
	}

	var missing []string
	for _, v := range required {
		if v.value == "" {
			missing = append(missing, v.name)
		}
	}
	return missing
}

// Configured reports whether enough settings are present to actually send mail.
func (c Config) Configured() bool {
	return len(c.Missing()) == 0
}

// Send delivers the contact message. When SMTP is not configured it logs the
// message to stdout instead of failing the request, so the form still works
// end-to-end during local development.
func (c Config) Send(msg Message) error {
	if !c.Configured() {
		log.Printf("[contact] SMTP not configured, logging message instead:\n  name=%q email=%q\n  message=%q",
			msg.Name, msg.Email, msg.Message)
		return nil
	}

	from := c.From
	if from == "" {
		from = c.User
	}

	body := fmt.Sprintf(
		"From: %s <%s>\r\nTo: %s\r\nSubject: Novo contato pelo portfólio - %s\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\nNome: %s\r\nEmail: %s\r\n\r\nMensagem:\r\n%s\r\n",
		msg.Name, from, c.To, msg.Name, msg.Name, msg.Email, msg.Message,
	)

	auth := smtp.PlainAuth("", c.User, c.Pass, c.Host)
	addr := fmt.Sprintf("%s:%s", c.Host, c.Port)

	return smtp.SendMail(addr, auth, from, []string{c.To}, []byte(body))
}
