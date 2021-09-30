import { useState } from "react";

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

        <div>
          <p>Price of = {props.wild.value}</p>
          <p>Property 1 = {props.wild.color1}</p>
          <p>Property 2 = {props.wild.color2}</p>
          {props.wild.selected &&
            <p>Selected: {props.wild.selected}</p>
          }
        </div> 
      </div>
    );
  }
  
  export default WildCard;
  
