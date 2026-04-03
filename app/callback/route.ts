import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code")

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code!,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    }),
  })

  const data = await res.json()

  console.log("ACCESS TOKEN:", data.access_token)

  return NextResponse.json(data)
}