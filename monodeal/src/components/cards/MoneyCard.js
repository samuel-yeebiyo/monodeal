import { useState } from "react";
import '../css/moneyCard.css'
import { Draggable } from 'react-beautiful-dnd';



const MoneyCard = (props) =>  {

  const [show,setShow] = useState(false);

  const toggleOptions = () =>{
    if(show == false) setShow(true)
    else setShow(false)
  }


    return (
      <Draggable draggableId={`${props.money.id}${props.index}`} index={props.index} key={`${props.money.id}${props.index}`} isDragDisabled={props.isMoney ? true : false}>
      {
        (provided)=>(
          <div className="card" onClick={()=> toggleOptions()} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          {show && !props.placed && props.moves > 0 &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={()=>{props.place(props.index)}}>A</div>
            </div>
          }

          {show && props.moves == 0 && props.excess &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={()=>{props.update(props.index)}}>X</div>
            </div>
          }
            <p className="card-value">${props.money.value}</p>
            <div style={{background: `${props.money.hex}`}} className="card-main">
              <div className="card-money">
                <p className="card-money-value">${props.money.value}</p>
              </div>
            </div>
          </div>
        )
      }
        
      </Draggable>
    );
  }
  
  export default MoneyCard;