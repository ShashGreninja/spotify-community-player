import { io } from "socket.io-client"

const socket = io("http://localhost:4000")

socket.on("connect", () => {
    console.log("Connected:", socket.id)
    socket.emit("create-room")
})

socket.on("room-created", (room) => {
    console.log("Room created:", room)

    const roomId = room.id

    const socket2 = io("http://localhost:4000")

    socket2.on("connect", () => {
        console.log("User2 connected:", socket2.id)

        socket2.emit("join-room", { roomId })
    })

    // wait for confirmation before voting
    socket2.on("joined-room", () => {
        console.log("User2 joined room")

        // Now both vote together
        setTimeout(() => {
            console.log("Both users voting...")


            socket2.emit("vote-skip", {
                roomId,
                userId: "oauth2|spotify|spotify:user:31ho4io6kiqrpeeuj2ajz365ne6i",
            })
        }, 1000)
    })
})

socket.on("vote-update", (data) => {
    console.log("Vote update:", data)
})

socket.on("skip-song", () => {
    console.log("SONG SHOULD SKIP")
})