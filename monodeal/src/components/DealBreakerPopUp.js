import { useState } from "react"

import ContainerPick from "./ContainerPick"

const DealBreakerPopUp = (props)=> {
    
    const [propChoice, setChoice] = useState()
    const [update, setUpdate] = useState(1)

    const selectingContainer = (item)=>{
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
                    <p className="actions-title">DEAL BREAKER</p>
                    <p>Pick a complete set to steal from your opponent!</p>
                </div>
            </div>

            <div className="action-div">
                <div>
                    {props.opTable.length > 0 ?
                        props.opTable.map((cont, contIndex)=>(
                        cont.complete &&
                            <ContainerPick class={
                                ( propChoice && propChoice.container == contIndex) ? "selected" : ""
                            } select={selectingContainer} containerIndex={contIndex}/> 
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

export default DealBreakerPopUp
