const ActionCard = (props) =>  {


    return (
      <div className="card">
      <br></br>
        <p>Price = {props.action.value}</p>
        <p>Name = {props.action.name}</p>
        <p>Description = {props.action.attribute}</p>

      </div>
    );
  }
  
  export default ActionCard;