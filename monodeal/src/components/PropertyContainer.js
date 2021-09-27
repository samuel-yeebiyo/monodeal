import { useState } from 'react';
import WildCard from './WildCard';
import PropertyCard from './PropertyCard'

const PropertyContainer = (props) =>  {

    //count how many compared with nComplete
    //calculate the rent
        //add the cards
        //house
        //hotel

    console.log("feeed", props.allCards)

    return (
      <div>
        {props.allCards.map((card)=>{
            if(card.card.card.category ==="property"){
                return <div>
                    <PropertyCard property={card.card.card} placed={true}/>
                </div>
            }else if(card.card.card.category === "wildcard"){
                return <WildCard wild={card.card.card} index={card.index} selected={card.card.selected} placed={true} flip={props.flip}/>
            }
        })}

      </div>
    );
  }
  
  export default PropertyContainer;
  
