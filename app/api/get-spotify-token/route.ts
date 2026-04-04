import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json()
    console.log("USER ID:", userId)

    // Step 1: Get Management API token
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

    const tokenData = await tokenRes.json()
    console.log("MGMT TOKEN:", tokenData)

    const mgmtToken = tokenData.access_token

    // Step 2: Fetch user
    const userRes = await fetch(
      `https://dev-ep8r40shb6pgjqcd.us.auth0.com/api/v2/users/${encodeURIComponent(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${mgmtToken}`,
        },
      }
    )

    const userData = await userRes.json()
    console.log("USER DATA:", userData)

    const spotifyIdentity = userData.identities?.find(
      (id: any) => id.connection === "spotify"
    )

    return NextResponse.json({
      spotifyToken: spotifyIdentity?.access_token || null,
    })
  } catch (err) {
    console.error("ERROR:", err)

    return NextResponse.json(
      { error: "Internal error", details: String(err) },
      { status: 500 }
    )
  }
}