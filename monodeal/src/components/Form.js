import { useState } from 'react'


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
        <div>
            <p>Provide username: </p>
            <form onSubmit={handleCreate}>
                <label>Username : </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
            </form>
            <br/>

            <p>Create Room using this form below: </p>
            <form onSubmit={handleCreate}>
                <label>Room iD : </label>
                <input
                    type="text"
                    value={roomC}
                    onChange={(e)=>{setRoomC(e.target.value)}}
                 />
                <button type="submit">Join</button>
            </form>    

            <br></br>
            <p>Join a room using the form below</p>
            <form onSubmit={handleJoin}>
                <label>Room iD : </label>
                <input
                    type="text"
                    value={roomJ}
                    onChange={(e)=>{setRoomJ(e.target.value)}}
                 />
                <button type="submit">Join</button>
            </form>     
            
            <br></br> 
            <p>{joined}</p>
        </div>
    )
}

export default Form;