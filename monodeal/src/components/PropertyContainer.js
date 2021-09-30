import { useState, useEffect } from 'react';
import WildCard from './WildCard';
import PropertyCard from './PropertyCard'
import WildCardPopUp from './WildCardPopUp';

const PropertyContainer = (props) =>  {

    //count how many compared with nComplete
    //calculate the rent
        //add the cards
        //house
        //hotel
    const [rent, setRent] = useState()
    const [complete, setComplete] = useState(false)

    useEffect(()=>{
        let rentChart = [] ;
        Object.values(props.property).map((item)=>{
            if(item.color == props.contains.color){
                rentChart = item.each
            }
        })

        let number = rentChart[props.contains.cards.length-1].price
        setRent(number);
        if(props.contains.cards.length == props.contains.nComplete){
            setComplete(true)
        }
        
        console.log("Called")
        console.log("Passed", props.contains)
    })

    useEffect(()=>{
        if(!props.opponent){
            props.completion(props.index, complete)
        }
    }, [complete])

    useEffect(()=>{
        if(!props.opponent){
            props.renting(props.index, rent)
        }
    }, [rent])

    return (
      <div>
        {
            props.contains.cards.map((card, index)=>{
                if(card.category == "property"){
                    return <PropertyCard property={card} placed={true}/>
                }else{
                    return <WildCard action={props.action} pop={props.pop} index={index} containerIndex={props.index} flip={props.flip} wild={card} placed={true}/>
                }
            })
        }
        <p>{rent}</p>

      </div>
    );
  }
  
  export default PropertyContainer;
  
