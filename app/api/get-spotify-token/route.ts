import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  //Get Auth0 Management API token
  const tokenRes = await fetch(`https://dev-ep8r40shb6pgjqcd.us.auth0.com/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://dev-ep8r40shb6pgjqcd.us.auth0.com/api/v2/`,
      grant_type: "client_credentials",
    }),
  })

  const { access_token } = await tokenRes.json()

  //Get user profile from Auth0
  const userRes = await fetch(
    `https://dev-ep8r40shb6pgjqcd.us.auth0.com/api/v2/users/${encodeURIComponent(userId)}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  )

  const userData = await userRes.json()

  //Extract Spotify identity
  const spotifyIdentity = userData.identities.find(
    (id: any) => id.provider === "spotify"
  )

  return NextResponse.json({
    spotifyToken: spotifyIdentity?.access_token,
  })
}