
const PaymentPick = (props) => {
    return (
        <div>
        {props.card.category == "property" || props.card.category == "wildcard" &&
            <div className="select">
                <div>
                    <p>Container Index: {props.containerIndex}</p>            
                    <p>Index: {props.index}</p>
                    <p>{props.card.value}</p>
                </div>
                <div className="pick"></div>
            </div>
        }
        {props.card.category == "money" &&
            <div className="select">
                <span>Money {props.card.value}</span>
                <div className="pick"></div>
            </div>
        }
        </div>
    )
}

export default PaymentPick
