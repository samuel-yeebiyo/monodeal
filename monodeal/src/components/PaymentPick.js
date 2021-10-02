
const PaymentPick = (props) => {
    return (
        <div>
        {(props.card.category == "property" || props.card.category == "wildcard") &&
            <div className={`select ${props.class ?  props.class: null}`}>
                <div>
                    <p>Container Index: {props.containerIndex}</p>            
                    <p>Index: {props.index}</p>
                    <p>{props.card.value}</p>
                </div>
                <div className="pick" onClick={()=>{
                    let temp={index: props.index, container:props.containerIndex, value:props.card.value}
                    props.select(temp)
                }}></div>
            </div>
        }
        {props.card.category == "money" &&
            <div className={`select ${props.class ?  props.class: null}`}>
                <span>Money {props.card.value}</span>
                <div className="pick" onClick={()=>{
                    let temp={index: props.index, value:props.card.value}
                    props.select(temp)
                }}></div>
            </div>
        }
        {props.card.category == "rent" &&
            <div className={`select ${props.class ?  props.class: null}`}>
                <div> Rent</div>
                <span>Value {props.card.value}</span>
                <div className="pick" onClick={()=>{
                    let temp={index: props.index, value:props.card.value}
                    props.select(temp)
                }}></div>
            </div>
        }
        </div>
    )
}

export default PaymentPick
