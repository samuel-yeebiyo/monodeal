
const PayPopUp = (props)=> {
    return (
        <div className="center">
            <p>This is where you pay</p>
            <p>You will pay ${props.amount}</p>
            <br></br>
            {props.money &&
                props.money.map((item)=>{
                    <p>{item.value}</p>
                })
            }
        </div>
    )
}

export default PayPopUp
