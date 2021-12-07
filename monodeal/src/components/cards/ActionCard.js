import { useState } from "react";
import '../css/actionCard.css'

import { Draggable } from "react-beautiful-dnd";

const ActionCard = (props) =>  {

  const [show,setShow] = useState(false);

  const toggleOptions = () =>{
    if(show == false) setShow(true)
    else setShow(false)
  }

    return (
      <Draggable draggableId={props.action.id} index={props.index}>
      {
        (provided)=>(
          <div className="card" onClick={()=>{toggleOptions()}} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          {show && !props.placed && props.moves >0 &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={()=>{
                if(props.action.name == "Pass and Go"){
                  props.pass(props.index)
                  props.move()
                }else if(props.action.name == "Debt Collector"){
                  props.get(5)
                  props.update(props.index)
                  props.move()
                }else if(props.action.name == "It's My Birthday"){
                  props.get(2)
                  props.update(props.index)
                  props.move()
                }else if(props.action.name == "Sly Deal"){
                  props.popSly()
                  props.current(props.index)
                }else if(props.action.name == "Deal Breaker"){
                  props.popBreak()
                  props.current(props.index)
                }else if(props.action.name == "Forced Deal"){
                  props.popForced()
                  props.current(props.index)
                }else if(props.action.name == "House"){
                  props.popHouse()
                  props.current(props.index)
                }else if(props.action.name == "Hotel"){
                  props.popHotel()
                  props.current(props.index)
                }
              }}>Play</div>
              <div onClick={()=>{
                props.bank(props.index)
                props.move()
              }}>Bank</div>
            </div>
          }

          {show && props.moves == 0 && props.excess &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div  onClick={()=>{props.update(props.index)}}>X</div>
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
      )
    }
    </Draggable>

    );
}
  
  export default ActionCard;