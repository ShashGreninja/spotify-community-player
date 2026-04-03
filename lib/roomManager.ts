type Room = {
    id : string,
    hostId : string,
    users : string[],
    votes : number,
    currentSong : any
}

//In-memory storage (temporary db for storing all rooms in one place, will be replaced by a real db in future)

const rooms : Record<string, Room> = {}

export const createRoom = (hostId:string) : Room => {
    const id = Math.random().toString(36).substring(2, 8)

    //to initialise a room
    const room: Room = {
        id : id, 
        hostId, 
        users: [hostId],
        votes : 0,
        currentSong : null,
    }
    
    //populate the in-memory storage with the new room (key = id)

    rooms[id] = room
    return room
}

export const joinRoom = (roomId : string, userId : string): Room => {
    const room = rooms[roomId]

    if(!room){
        throw new Error("Room not found")
    }

    room.users.push(userId)

    return room
}

export const voteSkip = (roomId:string) => {
    const room = rooms[roomId]

    if(!room){
        throw new Error("Room not found")
    }

    room.votes++;

    const threshold = Math.ceil(room.users.length / 2);

    const shouldSkip = room.votes >= threshold;

    //reset votes variable to 0 if the song should be skipped
    if(shouldSkip){
        room.votes = 0;
    }

    return {
        votes : room.votes,
        shouldSkip,
        threshold,
    }
}

export const updateSong = (roomId : string, song: any) => {
    const room = rooms[roomId]
    if(!room) throw new Error("Room not found")

    room.currentSong = song
}

