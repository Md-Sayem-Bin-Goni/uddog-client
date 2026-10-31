import { createAuthClient } from "better-auth/react"

// baseURL defaults to BETTER_AUTH_URL (server) / window.location.origin (client),
// so no hardcoded host is needed for same-domain usage.
export const authClient = createAuthClient()
