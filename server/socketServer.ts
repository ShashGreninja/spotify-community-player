import { createServer } from "http"
import { Server } from "socket.io"
import {
  createRoom,
  joinRoom,
  voteSkip,
  updateSong,
} from "../lib/roomManager"
import { skipSong } from "../lib/spotify"
import { SPOTIFY_TOKEN } from "../lib/spotifyToken"

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("create-room", () => {
    const room = createRoom(socket.id)
    socket.join(room.id)
    socket.emit("room-created", room)
  })

  socket.on("join-room", ({ roomId }) => {
    try {
      const room = joinRoom(roomId, socket.id)
      socket.join(roomId)
      socket.emit("joined-room", room) 
      io.to(roomId).emit("room-update", room)
    } 
    
    catch {
      socket.emit("error", "Room not found")
    }
  })

  socket.on("vote-skip", async ({ roomId }) => {
    const result = voteSkip(roomId)

    io.to(roomId).emit("vote-update", result)

    if (result.shouldSkip) {
      await skipSong(SPOTIFY_TOKEN)
      io.to(roomId).emit("skip-song")
    }
  })

  socket.on("song-update", ({ roomId, song }) => {
    updateSong(roomId, song)
    io.to(roomId).emit("song-update", song)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)
  })
})

httpServer.listen(4000, () => {
  console.log("Socket server running on http://localhost:4000")
})