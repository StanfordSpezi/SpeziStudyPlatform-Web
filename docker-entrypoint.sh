#!/bin/sh
set -e

# Escape backslashes and double quotes to produce valid JS string literals.
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }

cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  VITE_API_BASE_PATH: "$(esc "$VITE_API_BASE_PATH")",
  VITE_KEYCLOAK_URL: "$(esc "$VITE_KEYCLOAK_URL")",
  VITE_KEYCLOAK_REALM: "$(esc "$VITE_KEYCLOAK_REALM")",
  VITE_KEYCLOAK_CLIENT_ID: "$(esc "$VITE_KEYCLOAK_CLIENT_ID")"
};
EOF
