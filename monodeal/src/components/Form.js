import { useState } from 'react'
import './css/form.css'

const Form = (props) => {

    const [roomJ, setRoomJ] = useState('')
    const [roomC, setRoomC] = useState('')
    const [username, setUsername] = useState('')
    const [joined, setJoined] = useState('')

    const handleJoin = (e)=>{
        e.preventDefault()
        props.join(roomJ, username)
        setJoined(roomJ)
    }

    const handleCreate = (e)=>{
        e.preventDefault()
        props.create(roomC, username)
        setJoined(roomC)
    }

    <button onClick={()=>{props.create("monopoly")}}> Create Room</button>


    return (
        <div className="form-background">
            <div className="form-tint"></div>
            <div className="form">
                <div className="form-field">
                    <p className="form-title">Username </p>
                    <form onSubmit={handleCreate}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                        />
                    </form>
                </div>
               
                <br/>

                <div className="form-field">
                    <p className="form-title">Create Room</p>
                    <form onSubmit={handleCreate}>
                        <input
                            type="text"
                            value={roomC}
                            onChange={(e)=>{setRoomC(e.target.value)}}
                        />
                        <button type="submit">Create</button>
                    </form>    
                
                </div>
                

                <br></br>

                <div className="form-field">
                    <p className="form-title">Join a room</p>
                    <form onSubmit={handleJoin}>
                        <input
                            type="text"
                            value={roomJ}
                            onChange={(e)=>{setRoomJ(e.target.value)}}
                        />
                        <button type="submit">Join</button>
                    </form>     
                
                </div>
                
            </div>
        </div>
    )
}

export default Form;