import { useState } from 'react';
import WildCard from './WildCard';
import PropertyCard from './PropertyCard'

const PropertyContainer = (props) =>  {

    //count how many compared with nComplete
    //calculate the rent
        //add the cards
        //house
        //hotel

    return (
      <div>
        {props.allCards.map((card)=>{
            if(card.card.category ==="property"){
                return <div>
                    <PropertyCard property={card.card} placed={true}/>
                </div>
            }else if(card.card.category === "wildcard"){
                return <WildCard wild={card} placed={true}/>
            }
        })}

      </div>
    );
  }
  
  export default PropertyContainer;
  
