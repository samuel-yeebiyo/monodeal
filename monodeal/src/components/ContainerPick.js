
const ContainerPick = (props) => {
    return (
        <div>
        <div className={`select ${props.class ?  props.class: null}`}>
            <div>
                <p>Container Index: {props.containerIndex}</p>            
            </div>
            <div className="pick" onClick={()=>{
                let temp={container:props.containerIndex}
                props.select(temp)
            }}></div>
        </div>
        </div>
    )
}

export default ContainerPick
