// const express = require('express')
// const app = express();
const port = 5555;

const io = require('socket.io')(port, {
    cors:{
        origin:["http://localhost:3000"],
    },
});

let roomDeck = []
let rooms = []

io.on("connection", socket =>{

    console.log( "Socket: ", socket.id)

    socket.on("create", (room, username)=>{
        socket.join(room)
        let currentRoom = {
            name:room,
            users:[]
        }
        
        let user = {
            id: socket.id,
            name:username
        }

        currentRoom.users.push(user);
        rooms.push(currentRoom)

        socket.emit("get-users", currentRoom.users)
    })

    socket.on("join", (room, username)=>{
        let exist = rooms.find(element => element.name==room )
        if(exist){
            socket.join(room)
            console.log(socket.id, " joined room: ", room, " with username ", username)
            let user = {
                id: socket.id,
                name:username
            }
            rooms.forEach((item)=>{
                if(item.name == room){
                    item.users.push(user);
                    socket.emit("get-users", item.users)
                    socket.to(room).emit("get-users", item.users) 
                }
            })
        }else{
            console.log("Room not found")
        }
    })

    socket.on("updateDeck", (deck, room) =>{
        roomDeck = deck;
        console.log("Deck saved in server ", roomDeck.length)
        socket.to(room).emit("get-deck", roomDeck)
    })

    socket.on("updateProperty", (table, room) =>{
        console.log("Deck saved in server ", table.length)
        socket.to(room).emit("getOpProp", table)
    })

    socket.on("updateMoney", (table, room) =>{
        console.log("Deck saved in server ", table.length)
        socket.to(room).emit("getMoney", table)
    })

    socket.on("start", (room, fact)=>{
        socket.to(room).emit("when", fact)
    })

    socket.on("reqrent", (amount, room)=>{
        socket.to(room).emit("pay", amount)
    })

    socket.on("send-loot", (prop, mon, room)=>{
        socket.to(room).emit("get-loot", prop, mon)
        console.log("Calld to send rent")
    })

    socket.on("steal", (card, room)=>{
        socket.to(room).emit("give", card)
        console.log("called to steal ", card)
    })

    socket.on("transfer", (card, room)=>{
        socket.to(room).emit("receive", card)
        console.log("Transferring ", card)
    })

    socket.on("break", (container, room)=>{
        socket.to(room).emit("giveUp", container)
        console.log(container)
    })

    socket.on("transfer-container", (container, room)=>{
        socket.to(room).emit("receive-container", container)
    })

    socket.on("deal", (card, del, req, room)=>{
        socket.to(room).emit("forced-card", card, del, req)
        console.log("deal")
    })

    socket.on("switch", (del, card, room)=>{
        socket.to(room).emit("receive-forced", del, card)
        console.log("Switching")
    })
})
