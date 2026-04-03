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

    const fetchSpotifyToken = async () => {
        if (!user) return

        const res = await fetch("/api/get-spotify-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: user.sub,
            }),
        })

        const data = await res.json()

        console.log("SPOTIFY TOKEN:", data)
    }

    if (isLoading) return <div>Loading...</div>

    return (
  <div style={{ padding: 20 }}>
    {isAuthenticated ? (
      <div>
        <h2>Welcome {user?.name}</h2>

        <button onClick={fetchSpotifyToken}>
          Get Spotify Token
        </button>

        <button
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: window.location.origin,
              },
            })
          }
        >
          Logout
        </button>
      </div>
    ) : (
      <button
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              connection: "spotify",
              prompt: "login",
              redirect_uri: "http://localhost:3000/auth-test",
            },
          })
        }
      >
        Login with Spotify
      </button>
    )}
  </div>
)
}