"use client"

import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

export default function AuthTest() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0()

  // DEBUG EVERYTHING
  useEffect(() => {
    console.log("isLoading:", isLoading)
    console.log("isAuthenticated:", isAuthenticated)
    console.log("user:", user)

    if (user) {
      console.log("AUTH0 USER:", user)
    }
  }, [user, isAuthenticated, isLoading])

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {!isAuthenticated ? (
        <button
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                connection: "spotify",
              },
            })
          }
        >
          Login with Spotify
        </button>
      ) : (
        <div>
          <h2>Welcome {user?.name}</h2>
        </div>
      )}
    </div>
  )
}