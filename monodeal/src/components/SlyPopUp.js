import { useState } from "react"

import'../components/css/slypop.css'
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
        <div className="pop-center">
            <div className="actions-top">
                <div className="actions-desc">
                    <p className="actions-title">SLY DEAL</p>
                    <p>Pick a card to steal from your opponent!</p>
                </div>
            </div>
            <div className="action-div">
                <div>
                    {props.opTable.length > 0 ?
                        props.opTable.map((cont, contIndex)=>(
                            <div className="pop-container">{
                                cont.cards.map((card,index)=>(
                                    <div className="pop-cards">
                                        <PaymentPick class={
                                            (propChoice && propChoice.index == index && propChoice.container == contIndex) ? "selected" : ""
                                        } select={selectingProperty} card={card} index={index} containerIndex={contIndex}/> 
                                    </div>
                                ))
                            }
                            </div>
                        ))
                        :
                        <div>No property</div>
                    }
                </div>
                <div className="action-buttons">
                    {propChoice &&
                        <div className="pop-submit" onClick={()=>{
                            console.log("Selected")
                            props.pop()
                            props.steal(propChoice)
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

export default SlyPopUp
