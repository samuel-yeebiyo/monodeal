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
          <div onClick={()=>{
            if(props.selected == props.wild.color1){
              props.flip(props.index, props.wild.color2)
            }else props.flip(props.index, props.wild.color1)
          }}>Flip</div>
        </div>
      }

      {show && props.wild.wild &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={() =>{
            console.log("played")
            props.pop()
            props.action(props.wild, props.index, props.placed)
          }}>Play</div>
        </div>
      }

        <div>
          <p>Price = {props.wild.value}</p>
          <p>Property 1 = {props.wild.color1}</p>
          <p>Property 2 = {props.wild.color2}</p>
          {props.selected &&
            <p>Selected: {props.selected}</p>
          }
        </div> 
      </div>
    );
  }
  
  export default WildCard;
  
