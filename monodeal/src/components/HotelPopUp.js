import { useState } from "react"

import ContainerPick from "./ContainerPick"

const HotelPopUp = (props)=> {
    
    const [propChoice, setChoice] = useState()
    const [update, setUpdate] = useState(false)

    const selectingContainer = (item)=>{
        setChoice(item)
        toggleUpdate()
    }

    const toggleUpdate = ()=>{
        setUpdate(!update)
    }


    return (
        <div className="center">
            <p>This is where you pay</p>
            <p>You will pay ${props.amount}</p>
            <br></br>
            {props.container.length > 0 ?
                props.container.map((cont, contIndex)=>(
                    // cont.complete &&
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
                    props.place(propChoice)
                }}>Selected</div>
            }
        </div>
    )
}

export default HotelPopUp
