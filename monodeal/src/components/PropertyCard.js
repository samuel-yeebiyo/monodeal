import './css/propertyCard.css'
import { useState } from 'react';

const PropertyCard = (props) =>  {

    const [show,setShow] = useState(false);

    const toggleOptions = () =>{
      if(show == false) setShow(true)
      else setShow(false)
    }

    return (
      <div className="card" onClick={()=>{toggleOptions()}}>
        {show && !props.placed && props.moves >0 &&
          <div className="property-options" onClick={()=> toggleOptions()}>
            <div onClick={()=>{props.place(props.index, "none"); props.move()}}>P</div>
          </div>
        }
        {show && props.moves == 0 && props.excess &&
          <div className="property-options" onClick={()=> toggleOptions()}>
            <div  onClick={()=>{props.update(props.index)}}>X</div>
          </div>
        }
        
        <div className="card-value">${props.property.value}</div>
        <div className="card-color" style={{background: props.property.hex}}></div>
        <div className="card-renting">
          {
            props.property.each.map((item) =>(
              <div>{item.num} ---- ${item.price}</div>
            ))
          }
        </div>
      </div>
    );
  }
  
  export default PropertyCard;
  
