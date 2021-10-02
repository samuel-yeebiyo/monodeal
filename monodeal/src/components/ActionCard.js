import { useState } from "react";

const ActionCard = (props) =>  {

  const [show,setShow] = useState(false);

  const toggleOptions = () =>{
    if(show == false) setShow(true)
    else setShow(false)
  }

    return (
      <div className="card" onClick={()=>{toggleOptions()}}>


      {show && !props.placed &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{
            if(props.action.name == "Pass and Go"){
              props.pass(props.index)
            }else if(props.action.name == "Debt Collector"){
              props.get(5)
            }else if(props.action.name == "It's My Birthday"){
              props.get(2)
            }
          }}>Play</div>
          <div>Bank</div>
        </div>
      }


      <br></br>
        <p>Name = {props.action.name}</p>
        <p>{props.action.message}</p>
      </div>
    );
}
  
  export default ActionCard;