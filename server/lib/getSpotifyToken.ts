export const getSpotifyToken = async (userId: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/get-spotify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })

    const data = await res.json()

    return data.spotifyToken
  } catch (err) {
    console.error("Error fetching Spotify token:", err)
    return null
  }
}