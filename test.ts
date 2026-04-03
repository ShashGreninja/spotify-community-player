import { createRoom, joinRoom, voteSkip } from "./lib/roomManager";

const room = createRoom("host1")

console.log("Room created: ", room)

joinRoom(room.id, "user2")
joinRoom(room.id, "user3")

console.log("Users joined: ", room.users)

console.log(voteSkip(room.id)) //vote1
console.log(voteSkip(room.id)) //vote2 : should skip now