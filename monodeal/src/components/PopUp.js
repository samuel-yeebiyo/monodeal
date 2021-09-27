

const PopUp = (props)=> {

    return (
        <div className="center">
            <p>This is the pop up component, list</p>
            <br/>
            {props.action.action.category === 'wildcard' && !props.action.placed &&
                props.action.action.choice.map((item)=>{
                    console.log("Props: " ,props)
                   return <p onClick={()=>{props.place(props.action.index, item)}}>{item}</p>
                })
            }
            {props.action.action.category === 'wildcard' && props.action.placed &&
                props.action.action.choice.map((item)=>{
                    console.log("Props: " ,props)
                   return <p onClick={()=>{props.change(props.action.index, item)}}>{item} **</p>
                })
            }
        </div>
    )
}

export default PopUp;