package contact

import (
	"net"
	"net/http"
	"sync"
	"time"
)

// limiter is a minimal per-IP cooldown to deter contact-form spam without
// pulling in an external dependency. It is intentionally simple: one
// submission allowed per ipCooldown per client IP.
type limiter struct {
	mu       sync.Mutex
	lastSeen map[string]time.Time
	cooldown time.Duration
}

func newLimiter(cooldown time.Duration) *limiter {
	return &limiter{
		lastSeen: make(map[string]time.Time),
		cooldown: cooldown,
	}
}

func (l *limiter) allow(ip string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	now := time.Now()
	if last, ok := l.lastSeen[ip]; ok && now.Sub(last) < l.cooldown {
		return false
	}
	l.lastSeen[ip] = now
	return true
}

func clientIP(r *http.Request) string {
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		return fwd
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
