import { useState, useEffect } from 'react';
import WildCard from './WildCard';
import PropertyCard from './PropertyCard'
import WildCardPopUp from './WildCardPopUp';
import '../components/css/propertyContainer.css'

const PropertyContainer = (props) =>  {

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
      <div className="prop-container">
          <div className="props-rent">houses and hotel</div>
        {
            props.contains.cards.map((card, index)=>{
                if(card.category == "property"){
                    return <div className="props" style={{top: `${index == 0 ? 20 :index * 50+20}px`, left:`${index*5}px`}}><PropertyCard property={card} placed={true}/></div>
                }else{
                    return <div className="props" style={{top: `${index == 0 ? 20 :index * 50+20}px`, left:`${index*5}px`}}><WildCard action={props.action} pop={props.pop} index={index} containerIndex={props.index} flip={props.flip} wild={card} placed={true}/></div>
                }
            })
        }

      </div>
    );
  }
  
  export default PropertyContainer;
  
