import { useState } from 'react'
import { io } from 'socket.io-client'

import Form from './components/Form'
import App from './App'

const socket = io('https://monopoly-deal-server.herokuapp.com/')
socket.on("connect", ()=>{
    console.log("Connected with id: ", socket.id)
})



const Main = () =>{

    const [resp, setResp] = useState('')
    const [table, setTable] = useState('')

    const create = (room, user) =>{
        console.log("Creating room, ", room);
        socket.emit("create", room, user);
        setResp('creator')
        setTable(room)
    }
    
    const join = (room, user) =>{
        console.log("Joining room, ", room);
        socket.emit("join", room, user)
        setResp('joiner')
        setTable(room)
    }

    return(
        <div>
            {!resp ?
                <Form create={create} join={join}/> :
                <App resp={resp} socket={socket} room={table}/>
            }
        </div>
    )
}

export default Main;
