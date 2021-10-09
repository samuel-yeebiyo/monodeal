import { useState } from "react";
import '../components/css/actionCard.css'

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
              props.update(props.index)
            }else if(props.action.name == "It's My Birthday"){
              props.get(2)
              props.update(props.index)
            }else if(props.action.name == "Sly Deal"){
              props.popSly()
            }else if(props.action.name == "Deal Breaker"){
              props.popBreak()
            }else if(props.action.name == "Forced Deal"){
              props.popForced()
            }else if(props.action.name == "House"){
              props.popHouse()
            }else if(props.action.name == "Hotel"){
              props.popHotel()
            }
          }}>Play</div>
          <div onClick={()=>{
            props.bank(props.index)
          }}>Bank</div>
        </div>
      }


        <div className="action-card">

          <div className="side-banner">
            <div className="actionCard-value">${props.action.value}</div>
            <div className="under-action">
              <div>Action Card</div>
            </div>
          </div>
          <div className="action-top"></div>
          <div className="action-bottom">
            <p>{props.action.name}</p>
          </div>  
        </div>
      </div>


    );
}
  
  export default ActionCard;