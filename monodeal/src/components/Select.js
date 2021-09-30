import './css/select.css'

const Select = (props)=> {
    return (
        <div className={`select ${props.class ? props.class : ""}`}>
            <div className="select-info">
                <p>Color: {props.container.color}</p>
                <p>Rent: {props.container.rent}</p>
            </div>
            <div className="pick" onClick={()=>{
                props.choose(props.index)
                console.log("Clicked")
            }}></div>
        </div>
    )
}

export default Select
