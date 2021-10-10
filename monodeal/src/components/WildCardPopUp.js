const WildCardPopUp = (props)=> {

    return (
        <div className="center">
            <p>This is the pop up component, list</p>
            <br/>
            {!props.action.placed &&
                props.action.action.choice.map((item)=>{
                    console.log("Props: " ,props)
                   return <p onClick={()=>{props.place(props.action.index, item); props.move()}}>{item}</p>
                })
            }
            {props.action.placed &&
                props.action.action.choice.map((item)=>{
                    console.log("Props: " ,props)
                   return <p onClick={()=>{props.change(props.action.cont, props.action.index, item)}}>{item} **</p>
                })
            }
        </div>
    )
}

export default WildCardPopUp;