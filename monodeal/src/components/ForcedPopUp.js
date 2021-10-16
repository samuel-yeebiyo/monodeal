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
        <div className="pop-center">
            <div className="actions-top">
                <div className="actions-desc">
                    <p className="actions-title">FORCED DEAL</p>
                    <p>Pick a card to swap from your opponent!</p>
                </div>
            </div>
            <div className="action-div">
                <div style={{display:"flex"}}>
                    <div>
                        {props.opTable.length > 0 ?
                            props.opTable.map((cont, contIndex)=>(
                                cont.complete &&
                                <div className="pop-container">{
                                    cont.cards.map((card,index)=>(
                                        <div className="pop-cards">
                                        <PaymentPick class={
                                            (opChoice && opChoice.index == index && opChoice.container == contIndex) ? "selected" : ""
                                        } select={selectingOp} card={card} index={index} containerIndex={contIndex}/> </div>
                                    ))
                                }
                                </div>
                            ))
                            :
                            <div>No property</div>
                        }
                    </div>
                    <div>
                    {props.container.length > 0 ?
                        props.container.map((cont, contIndex)=>(
                            <div className="pop-container">{
                                cont.cards.map((card,index)=>(
                                    <div className="pop-cards">
                                    <PaymentPick class={
                                        (myChoice && myChoice.index == index && myChoice.container == contIndex) ? "selected" : ""
                                    } select={selectingMine} card={card} index={index} containerIndex={contIndex}/> </div>
                                ))
                            }
                            </div>
                        ))
                        :
                        <div>No property</div>
                    }
                    </div>
                </div>
            
                <div className="action-buttons">
                    {myChoice && opChoice &&
                        <div className="pop-submit" onClick={()=>{
                            console.log("Selected")
                            props.pop()
                            props.deal(myChoice, opChoice)
                            props.move()
                            props.update(props.curr)
                        }}>Selected</div>
                    }
                    <div className="pop-cancel">
                        <p onClick={()=>props.pop()}>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForcedPopUp
