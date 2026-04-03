"use client"

import { useAuth0 } from "@auth0/auth0-react"

export default function AuthTest() {
    const {
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        isLoading,
    } = useAuth0()

    if (isLoading) return <div>Loading...</div>

    return (
        <div style={{ padding: 20 }}>
            {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect({
                    authorizationParams: {
                        connection: "spotify"
                    }
                })}>
                    Login
                </button>
            ) : (
                <div>
                    <h2>Welcome {user?.name}</h2>

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

                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}