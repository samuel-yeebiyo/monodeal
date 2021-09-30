import { useState } from "react";

const RentCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <div className="card" onClick={()=>{toggleOptions()}}>

      {show &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{console.log("HHH")}}>Play</div>
        </div>
      }

      <br></br>
        <p>Rent card</p>
        <p>Price = {props.rent.value}</p>
        <p>Color 1 = {props.rent.color1}</p>
        <p>Color 2 = {props.rent.color2}</p>
      </div>
    );
}
  
  export default RentCard;
  
