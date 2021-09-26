import { useState } from "react";

const WildCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <div className="card" onClick={()=>{toggleOptions()}}>
      {show && !props.placed &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{props.place(props.index)}}>{props.wild.color1.charAt(0)}</div>
          <div>{props.wild.color2.charAt(0)}</div>
        </div>
      }
        <div>
          <p>Price = {props.wild.value}</p>
          <p>Property 1 = {props.wild.color1}</p>
          <p>Property 2 = {props.wild.color2}</p>
        </div> 
      </div>
    );
  }
  
  export default WildCard;
  
