import { useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import '../css/wildCard.css'

const WildCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <Draggable draggableId={`${props.wild.id}${props.index}`} index={props.index} key={`${props.wild.id}${props.index}`}>
      {
        (provided)=>(
          <div className="card" onClick={()=>{toggleOptions()}} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          {show && !props.placed && !props.wild.wild && props.moves > 0 &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={()=>{props.place(props.index, props.wild.color1); props.move()}}>{props.wild.color1.charAt(0)}</div>
              <div onClick={()=>{props.place(props.index, props.wild.color2); props.move()}}>{props.wild.color2.charAt(0)}</div>
            </div>
          }
          {show && props.placed && !props.wild.wild && props.turn &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={()=>{props.flip(props.containerIndex, props.index)}}>Flip</div>
            </div>
          }

          {show && props.wild.wild && !props.placed && props.moves > 0 &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={() =>{
                props.pop()
                props.action(props.wild, props.index, props.placed)
              }}>Play</div>
            </div>
          }

          {show && props.wild.wild && props.placed && props.turn &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div onClick={() =>{
                props.pop()
                props.action(props.wild, props.index, props.placed, props.containerIndex)
              }}>Play</div>
            </div>
          }

          {show && props.moves == 0 && props.excess &&
            <div className="property-options" onClick={()=> toggleOptions()}>
              <div  onClick={()=>{props.update(props.index)}}>X</div>
            </div>
          }

            <div className="wild-card">

              <div className="side-banner">
                <div className="wildCard-value">${props.wild.value}</div>
                <div className="under">
                  <div>Wild Card</div>
                </div>
              </div>

              <div className="wild-main">
                {!props.wild.wild &&
                  <div style={{height:'100%', width:'100%', display: 'flex'}}>
                    <div className="wild-colors" style={{background: `${!props.wild.wild && props.wild.hex1}`, width:'50%', position:"relative"}}>
                      <div className="tooltip">
                      { !props.wild.wild &&
                        Object.values(props.property).map(val => {
                          if(val.color == props.wild.color1){
                            return val.each.map((item)=>{
                              return <div>{item.num}--- ${item.price}</div>
                            })
                          }
                        })
                      }
                      </div>
                    </div>
                    <div className="wild-colors" style={{background: `${!props.wild.wild && props.wild.hex2}`, width:'50%', position:"relative"}}>
                    <div className="tooltip">
                      { !props.wild.wild &&
                        Object.values(props.property).map(val => {
                          if(val.color == props.wild.color2){
                            return val.each.map((item)=>{
                              return <div>{item.num}--- ${item.price}</div>
                            })
                          }
                        })
                      }
                    </div>
                    </div>
                  </div>
                }
                {props.wild.wild && props.placed &&
                  <div className="wild-colors" style={{width:'100%', height:'100%', position:"relative"}}>
                    <div className="tooltip">
                        {
                          Object.values(props.property).map(val => {
                            if(val.color == props.wild.selected){
                              return val.each.map((item)=>{
                                return <div>{item.num}--- ${item.price}</div>
                              })
                            }
                          })
                        }
                    </div>
                  </div>
                }
              </div>

              <div className="wild-selected">
                {props.wild.selected &&
                  <p style={{background: '#FFFF'}}>{props.wild.selected}</p>
                } 
              </div>
            </div> 
          </div>
      )
    }
    </Draggable>

    );
  }
  
  export default WildCard;
  
