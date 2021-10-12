import { useState, useEffect } from "react";

import Select from "./Select";

const RentPopUp = (props)=> {

    const [choice, setChoice] = useState()
    const [double, setDouble] = useState(false)
    const [bool, setBool] = useState(false)
    const [doubleIndex, setIndex] = useState()
    const [total, setTotal] = useState(0)


    const choose = (index)=>{
        console.log("Chosen: ", props.cont[index])
        setChoice(props.cont[index])
        setTotal(props.cont[index].rent)
    }

    const toggleDouble = () =>{
        setDouble(!double)
    }

    useEffect(()=>{
        props.drawn.some((val, index) => {
            if(val.name == "Double The Rent"){
                setBool(true)
                setIndex(index)
            }
        })
    },[])

    useEffect(()=>{
        if(double == true){
            if(choice){
                let temp = total;
                temp *= 2
                setTotal(temp)
            }
        }else{
            if(choice){
                let temp = total;
                temp /= 2
                setTotal(temp)
            }
        }

    }, [double])

    return (
        <div className="pop-center">
            <div className="actions-top">
                <div className="actions-desc">
                    <p className="actions-title">RENT</p>
                    <p>Pick set to request rent on!</p>
                    <p>{props.colors.color1}</p>
                    <p>{props.colors.color2}</p>
                </div>
            </div>

            <div className="action-div">
                <div>
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

                    <p>Total: {total}</p>

                    <br/>
                    {bool &&
                        <p style={{border: double ? '1px solid red': ''}} onClick={()=> {toggleDouble()}} >Double The Rent</p>
                    }
                </div>
                <div className="action-buttons">
                    {choice &&
                        <div className="pop-submit" onClick={()=>{
                            props.get(total)
                            props.pop()
                            props.update(props.colors.index)
                            if(double){
                                if(props.colors.index < doubleIndex){
                                    props.update(doubleIndex-1) && props.move(2)
                                }else props.update(doubleIndex) && props.move(2)
                            }else  props.move()
                        }}> Request </div>
                    }
                    <div className="pop-cancel">
                        <p onClick={()=>props.pop()}>Cancel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentPopUp;