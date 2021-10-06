
const SayNo = (props) => {
    return (
        <div className="center">
            <p>Do you wanna say NO?</p>
            <button onClick={()=>{props.answer("No")}}> Just say no</button>
        </div>
    )
}

export default SayNo
