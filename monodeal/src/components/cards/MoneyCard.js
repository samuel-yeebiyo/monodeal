import { useState } from "react";
import '../css/moneyCard.css'

const MoneyCard = (props) =>  {

  const [show,setShow] = useState(false);

  const toggleOptions = () =>{
    if(show == false) setShow(true)
    else setShow(false)
  }


    return (
      <div className="card" onClick={()=> toggleOptions()}>
      {show && !props.placed && props.moves > 0 &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{props.place(props.index); props.move()}}>A</div>
        </div>
      }

      {show && props.moves == 0 && props.excess &&
        <div className="property-options" onClick={()=> toggleOptions()}>
          <div onClick={()=>{props.update(props.index)}}>X</div>
        </div>
      }
        <p className="card-value">${props.money.value}</p>
        <div style={{background: `${props.money.hex}`}} className="card-main">
          <div className="card-money">
            <p className="card-money-value">${props.money.value}</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default MoneyCard;