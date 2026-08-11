// Package envfile provides a minimal .env loader so local development
// doesn't require exporting variables by hand. No external dependency;
// real deployments should set env vars through the platform instead.
package envfile

import (
	"bufio"
	"os"
	"strings"
)

// Load reads KEY=VALUE pairs from path and applies them via os.Setenv,
// skipping blank lines, comments, and keys already set in the environment
// (so real env vars always win over the file). Missing file is not an error.
func Load(path string) error {
	f, err := os.Open(path)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		key, value, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		key = strings.TrimSpace(key)
		value = strings.TrimSpace(value)
		value = strings.Trim(value, `"'`)

		if _, exists := os.LookupEnv(key); !exists {
			_ = os.Setenv(key, value)
		}
	}
	return scanner.Err()
}
