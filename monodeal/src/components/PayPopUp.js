import PaymentPick from "./PaymentPick"

const PayPopUp = (props)=> {
    return (
        <div className="center">
            <p>This is where you pay</p>
            <p>You will pay ${props.amount}</p>
            <br></br>
            {props.property.length > 0 ?
                props.property.map((cont, contIndex)=>(
                    cont.cards.map((card,index)=>(
                        <PaymentPick card={card} index={index} containerIndex={contIndex}/>
                    ))
                ))
                :
                <div>No property</div>

            }
            {props.money.length > 0 ?
                props.money.map((money, index)=>(
                    <PaymentPick card={money}/>
                ))
                :
                <p>No money</p>
            }
            
        </div>
    )
}

export default PayPopUp
