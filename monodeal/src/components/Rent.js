const RentCard = (props) =>  {

    return (
      <div className="card">
      <br></br>
        <p>Price = {props.rent.value}</p>
        <p>Color 1 = {props.rent.olor1}</p>
        <p>Color 2 = {props.rent.color2}</p>
      </div>
    );
  }
  
  export default RentCard;
  
