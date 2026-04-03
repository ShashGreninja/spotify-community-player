"use client"

import { Auth0Provider } from "@auth0/auth0-react"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Auth0Provider
      domain= "dev-ep8r40shb6pgjqcd.us.auth0.com"
      clientId="JsdHVvywTjhUGctkQ7FmXVGfkOLLnrzl"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/auth-test",
      }}
    >
      {children}
    </Auth0Provider>
  )
}