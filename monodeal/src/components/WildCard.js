import { useState } from "react";

import '../components/css/wildCard.css'

const WildCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <div className="card" onClick={()=>{toggleOptions()}}>
      {show && !props.placed && !props.wild.wild &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{props.place(props.index, props.wild.color1)}}>{props.wild.color1.charAt(0)}</div>
          <div onClick={()=>{props.place(props.index, props.wild.color2)}}>{props.wild.color2.charAt(0)}</div>
        </div>
      }
      {show && props.placed && !props.wild.wild &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{props.flip(props.containerIndex, props.index)}}>Flip</div>
        </div>
      }

      {show && props.wild.wild && !props.placed &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={() =>{
            props.pop()
            props.action(props.wild, props.index, props.placed)
          }}>Play</div>
        </div>
      }

      {show && props.wild.wild && props.placed &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={() =>{
            props.pop()
            props.action(props.wild, props.index, props.placed, props.containerIndex)
          }}>Play</div>
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
            <div style={{background: `${props.wild.hex1}`}} className="wild1"></div>
            <div style={{background: `${props.wild.hex2}`}} className="wild2"></div>
          </div>

          <div className="wild-selected">
            {props.wild.selected &&
              <p style={{background: '#FFFF'}}>{props.wild.selected}</p>
            } 
          </div>
        </div> 
      </div>
    );
  }
  
  export default WildCard;
  
