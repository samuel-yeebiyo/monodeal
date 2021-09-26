import { useState } from "react";

const MoneyCard = (props) =>  {

  const [show,setShow] = useState(false);

  const toggleOptions = () =>{
    if(show == false) setShow(true)
    else setShow(false)
  }


    return (
      <div className="card" onClick={()=> toggleOptions()}>
      {show && !props.placed &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{props.place(props.index)}}>A</div>
        </div>
      }
        <p>Money</p>
        <p>Price = {props.money.value}</p>
      </div>
    );
  }
  
  export default MoneyCard;