//utility functions for spotify

// Get current song
export const getCurrentSong = async (token: string) => {
  const res = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.json()
}

//Skip song

export const skipSong = async (token: string) => {
  await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}