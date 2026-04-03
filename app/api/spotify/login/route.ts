import { NextResponse } from "next/server"

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

  const scope = [
    "user-read-playback-state",
    "user-modify-playback-state",
  ].join(" ")

  const url =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: client_id!,
      scope,
      redirect_uri: redirect_uri!,
    }).toString()

  return NextResponse.redirect(url)
}