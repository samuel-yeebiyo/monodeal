import { useState } from "react";

import Select from "./Select";

const RentPopUp = (props)=> {

    const [choice, setChoice] = useState()


    const choose = (index)=>{
        console.log("Chosen: ", props.cont[index])
        setChoice(props.cont[index])
    }

    return (
        <div className="center">
            <p>This is the rent pop up component, list</p>
            <br/>
            <p>{props.colors.color1}</p>
            <p>{props.colors.color2}</p>

            {props.cont.length > 0 ? (
                props.cont.map((cont, index)=>{
                    if(props.colors.color1 == "all"){
                        return <Select class={choice ? (cont.color==choice.color && cont.set == choice.set && "selected"):("")} choose={choose} index={index} container={cont}/>
                    }else if(cont.color == props.colors.color1 || cont.color == props.colors.color2){
                        return <Select class={choice ? (cont.color==choice.color && cont.set == choice.set && "selected"):("")}  choose={choose} index={index} container={cont}/>
                        
                    }
                })
              ):(
                <p>No property placed</p>
            )}

            {choice &&
                <div onClick={()=>{
                    props.get(choice.rent)
                    props.pop()
                }}> Request </div>
            }

        </div>
    )
}

export default RentPopUp;