import { useState } from "react"

import PaymentPick from "./PaymentPick"


const ForcedPopUp = (props)=> {

    const [myChoice, setMyChoice] = useState()
    const [opChoice, setOpChoice] = useState()

    const [update, setUpdate] = useState(1)

    const selectingMine = (item)=>{
        setMyChoice(item)
        toggleUpdate()
    }
    const selectingOp = (item)=>{
        setOpChoice(item)
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
            <div style={{display:"flex"}}>
                <div>
                    {props.opTable.length > 0 ?
                        props.opTable.map((cont, contIndex)=>(
                            cont.cards.map((card,index)=>(
                                <PaymentPick class={
                                    (opChoice && opChoice.index == index && opChoice.container == contIndex) ? "selected" : ""
                                } select={selectingOp} card={card} index={index} containerIndex={contIndex}/> 
                            ))
                        ))
                        :
                        <div>No property</div>
                    }
                </div>
                <div>
                {props.container.length > 0 ?
                    props.container.map((cont, contIndex)=>(
                        cont.cards.map((card,index)=>(
                            <PaymentPick class={
                                (myChoice && myChoice.index == index && myChoice.container == contIndex) ? "selected" : ""
                            } select={selectingMine} card={card} index={index} containerIndex={contIndex}/> 
                        ))
                    ))
                    :
                    <div>No property</div>
                }
                </div>
            </div>
            

            {myChoice && opChoice &&
                <div onClick={()=>{
                    console.log("Selected")
                    props.pop()
                    props.deal(myChoice, opChoice)
                }}>Selected</div>
            }
        </div>
    )
}

export default ForcedPopUp
