import { useState } from "react";
import '../css/rentCard.css'
import { Draggable } from "react-beautiful-dnd";

const RentCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <Draggable draggableId={`${props.rent.id}${props.index}`} index={props.index} key={`${props.rent.id}${props.index}`} isDragDisabled={props.isMoney ? true : false}>
      {
        (provided)=>(
          <div className="card" onClick={()=>{toggleOptions()}} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>

            {show && !props.placed && props.moves > 0 &&
              <div className="property-options" onClick={()=> toggleOptions()}>
                <div onClick={()=>{
                  props.pop()
                  props.colors(props.rent, props.index)
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

            <div className="rent-card">


              <div className="side-banner">
                <div className="rentCard-value">${props.rent.value}</div>
                <div className="under">
                  <div>Rent Card</div>
                </div>
              </div>

              <div className="rent-main">
                <div className="rent-colors">
                  <div style={{background: `${props.rent.hex1}`}} className="rent1"></div>
                  <div style={{background: `${props.rent.hex2}`}} className="rent2"></div>
                </div>
              </div>
            
            </div>
          </div>
        )
      }
        
      </Draggable>
    );
}
  
  export default RentCard;
  
