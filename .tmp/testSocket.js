"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:3000", {
    path: "/api/socket",
});
socket.on("connect", () => {
    console.log("Connected:", socket.id);
    // Create room
    socket.emit("create-room");
});
socket.on("room-created", (room) => {
    console.log("Room created:", room);
    const roomId = room.id;
    // Simulate another user joining
    const socket2 = (0, socket_io_client_1.io)("http://localhost:3000");
    socket2.on("connect", () => {
        console.log("User2 connected:", socket2.id);
        socket2.emit("join-room", { roomId });
        // vote from user2
        setTimeout(() => {
            socket2.emit("vote-skip", { roomId });
        }, 1000);
    });
    // vote from user1
    setTimeout(() => {
        socket.emit("vote-skip", { roomId });
    }, 2000);
});
socket.on("vote-update", (data) => {
    console.log("Vote update:", data);
});
socket.on("skip-song", () => {
    console.log("SONG SHOULD SKIP");
});
