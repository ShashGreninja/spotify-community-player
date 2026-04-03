const client_id = process.env.SPOTIFY_CLIENT_ID
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI

export const getSpotifyAuthURL = () => {
  const scope = [
    "user-read-playback-state",
    "user-modify-playback-state",
  ].join(" ")

  return `https://accounts.spotify.com/authorize?` +
    `client_id=${client_id}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(redirect_uri!)}&` +
    `scope=${encodeURIComponent(scope)}`
}