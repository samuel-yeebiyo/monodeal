import { useState, useEffect } from 'react';
import WildCard from './WildCard';
import PropertyCard from './PropertyCard'

const PropertyContainer = (props) =>  {

    //count how many compared with nComplete
    //calculate the rent
        //add the cards
        //house
        //hotel
    const [rent, setRent] = useState()
    const [complete, setComplete] = useState(false)

    console.log("feeed", props.allCards)

    useEffect(()=>{
        let numberSolid = 0;
        let color;
        let card = props.allCards[0];
        if(card.card.card.category ==="property"){
            color = card.card.card.color;
            numberSolid += props.allCards.filter( item =>item.card.card.color == color).length
            numberSolid += props.allCards.filter( item => item.card.selected == color).length
        }else if (card.card.card.category === "wildcard"){
            color = card.card.selected
            numberSolid += props.allCards.filter( item =>item.card.card.color == color).length
            numberSolid += props.allCards.filter( item => item.card.selected == color).length
        } 
            

        Object.values(props.property).map((item)=>{
            if(item.color == color){
                numberSolid -= 1
                setRent(item.each[numberSolid].price)
                numberSolid += 1
                if(numberSolid == item.nComplete){
                    console.log("completed a set")
                    setComplete(true)
                }
            }
        })
    })

    return (
      <div>
        {props.allCards.map((card)=>{
            if(card.card.card.category ==="property"){
                return <div>
                    <PropertyCard property={card.card.card} placed={true}/>
                </div>
            }else if(card.card.card.category === "wildcard"){
                return <WildCard action={props.action} pop={props.pop} wild={card.card.card} index={card.index} selected={card.card.selected} placed={true} flip={props.flip}/>
            }
        })}
        <p>{rent}</p>

      </div>
    );
  }
  
  export default PropertyContainer;
  
