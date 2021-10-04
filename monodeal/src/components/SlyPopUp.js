import { useState } from "react"

import PaymentPick from "./PaymentPick"


const SlyPopUp = (props)=> {

    const [propChoice, setChoice] = useState()
    const [update, setUpdate] = useState(1)

    const selectingProperty = (item)=>{
        setChoice(item)
        toggleUpdate()
    }

    const toggleUpdate = ()=>{
        if(update==1) setUpdate(0)
        else setUpdate(1)
    }


    return (
        <div className="center">
            <p>This is where you pay</p>
            <p>You will pay ${props.amount}</p>
            <br></br>
            {props.opTable.length > 0 ?
                props.opTable.map((cont, contIndex)=>(
                    cont.cards.map((card,index)=>(
                        <PaymentPick class={
                            (propChoice && propChoice.index == index && propChoice.container == contIndex) ? "selected" : ""
                        } select={selectingProperty} card={card} index={index} containerIndex={contIndex}/> 
                    ))
                ))
                :
                <div>No property</div>
            }

            {propChoice &&
                <div onClick={()=>{
                    console.log("Selected")
                    props.pop()
                    props.steal(propChoice)
                }}>Selected</div>
            }
        </div>
    )
}

export default SlyPopUp
