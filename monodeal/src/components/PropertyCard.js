import './css/property.css'
import { useState } from 'react';

const PropertyCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <div className="card" onClick={()=>{toggleOptions()}}>
        {show && !props.placed &&
          <div className="property-options" onClick={()=> toggleOptions()}>
            <div onClick={()=>{props.place(props.index)}}>P</div>
            <div>A</div>
          </div>
        }
        
        <p>Price = {props.property.value}</p>
        <p>Color = {props.property.color}</p>
        <p>Num to complete = {props.property.nComplete}</p>
        {
          props.property.each.map((item) =>(
            <p>{item.num} ---- {item.price}</p>
          ))
        }
      </div>
    );
  }
  
  export default PropertyCard;
  
