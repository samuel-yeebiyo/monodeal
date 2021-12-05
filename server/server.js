const cors = require('cors')
const express = require('express')
const app = express();
const server = require('http').createServer(app)

const port = process.env.PORT || 5000

app.use(cors())

app.get('/', (req,res)=>{
    res.send("Server running")
})

const io = require('socket.io')(server, {
    cors:{
        origin:'*',
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

    socket.on("start-game", (room, fact)=>{
        socket.to(room).emit("starting-game", fact)
    })

    socket.on("deal-cards", (room)=>{
        socket.to(room).emit("get-cards")
    })

    socket.on("pass", room =>{
        socket.to(room).emit("get-turn")
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

    socket.on("deny", room =>{
        socket.to(room).emit("denial")
        console.log("Denying")
    })
})




server.listen(port, ()=>{
    console.log("Listening to port: ", port)
})