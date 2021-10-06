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
        <div className="center">
            <p>This is where you pay</p>
            <p>You will pay ${props.amount}</p>
            <br></br>
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

            {propChoice &&
                <div onClick={()=>{
                    console.log("Selected")
                    props.pop()
                    props.steal(propChoice)
                }}>Selected</div>
            }

            <p onClick={()=>props.pop()}>Cancel</p>
        </div>
    )
}

export default DealBreakerPopUp
