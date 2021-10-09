import { useState, useEffect } from "react"

import PaymentPick from "./PaymentPick"

const PayPopUp = (props)=> {

    const [propChoice, setPropChoice] = useState([])
    const [moneyChoice, setMoneyChoice] = useState([])
    const [update, setUpdate] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        console.log("Total Selected: ", total)
    },[total])

    const toggleUpdate = ()=>{
        if(update==1) setUpdate(0)
        else setUpdate(1)

       calcRent();
    }

    const calcRent = ()=>{
        let rent = 0;
        if(moneyChoice.length > 0){
            moneyChoice.map(item => rent+=item.value)
        } 
        if(propChoice.length > 0){
            propChoice.map(item => rent+=item.value)
        }
        setTotal(rent);
    }

    const selectingProperty = (item)=>{
        let temp = propChoice;
        let exists = false;
        let index = 0
        temp.map((choi, inde)=>{
            if(choi.index == item.index && choi.container == item.container){
                exists = true;
                index = inde;
            }
        })

        if(exists == true){
            temp.splice(index, 1);
        }else{
            temp.push(item)
        }

        setPropChoice(temp)
        toggleUpdate()
    }
    const selectingBank = (item)=>{
        let temp = moneyChoice;
        let exists = false;
        let index = 0
        temp.map((choi, inde)=>{
            if(choi.index == item.index){
                exists = true;
                index = inde;
            }
        })

        if(exists == true){
            temp.splice(index, 1);
        }else{
            temp.push(item)
        }

        setMoneyChoice(temp)
        toggleUpdate()
    }

    return (
        <div className="center">
            <p>This is where you pay</p>
            <p>You will pay ${props.amount}</p>
            <br></br>
            {props.property.length > 0 ?
                props.property.map((cont, contIndex)=>(
                    cont.cards.map((card,index)=>(
                        <PaymentPick class={
                            propChoice.some(
                                (item)=>(item.index == index && item.container == contIndex))? "selected" : ""
                        } select={selectingProperty} card={card} index={index} containerIndex={contIndex}/> 
                    ))
                ))
                :
                <div>No property</div>

            }
            {props.money.length > 0 ?
                props.money.map((money, index)=>(
                    <PaymentPick class={
                        moneyChoice.some(
                            (item)=>(item.index == index))? "selected" : ""
                    } select={selectingBank} index={index} card={money}/>
                ))
                :
                <p>No monney</p>
            }
            {(moneyChoice.length > 0 || propChoice.length > 0) && (total >= props.amount) &&
                <div onClick={()=>{
                    props.pop()
                    props.send(propChoice, moneyChoice)
                }}>Selected</div>
            }

            <div onClick={()=>{
                props.pop()
                props.deny()
            }} >Say N!</div>

        </div>
    )
}

export default PayPopUp
