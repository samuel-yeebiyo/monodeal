import {useState, useEffect} from 'react' 


import './App.css';
import PropertyCard from'./components/PropertyCard'
import WildCard from './components/WildCard';
import MoneyCard from './components/MoneyCard';
import RentCard from './components/Rent';
import ActionCard from './components/ActionCard';
import PropertyContainer from './components/PropertyContainer'

//popups
import WildCardPopUp from './components/WildCardPopUp';
import RentPopUp from './components/RentPopUp';



const property = {
  black:{
    category:"property",
    value:2,
    color:"Black",
    nComplete:4,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}]
  },
  lightBlue:{
    category:"property",
    value:3,
    color:"Light Blue",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}]
  },
  green:{
    category:"property",
    value:2,
    color:"Green",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}]
  },
  yellow:{
    category:"property",
    value:3,
    color:"Yellow",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}]
  },
  red:{
    category:"property",
    value:2,
    color:"Red",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}]
  },
  purple:{
    category:"property",
    value:3,
    color:"Purple",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:5}]
  },
  orange:{
    category:"property",
    value:3,
    color:"Orange",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}]
  },
  lightGreen:{
    category:"property",
    value:2,
    color:"Light Green",
    nComplete:2,
    each:[{num:1, price:2}, {num:2, price:3}]
  },
  blue:{
    category:"property",
    value:3,
    color:"Blue",
    nComplete:2,
    each:[{num:1, price:2}, {num:2, price:3}]
  },
  brown:{
    category:"property",
    value:3,
    color:"Brown",
    nComplete:2,
    each:[{num:1, price:2}, {num:2, price:3}]
  }
}

const wild = {
  'purple and orange':{
    num:2,
    color1:'Purple',
    color2:'Orange',
    category:'wildcard',
    value:2,
    selected:'None',
    stacked:false
  },
  'red and yellow':{
    num:2,
    color1:'Red',
    color2:'Yellow',
    category:'wildcard',
    value:1,
    selected:'None',
    stacked:false
  },
  'light blue and brown':{
    num:1,
    color1:'Light Blue',
    color2:'Brown',
    category:'wildcard',
    value:2,
    selected:'None',
    stacked:false
  },
  'light blue and black':{
    num:1,
    color1:'Light Blue',
    color2:'Black',
    category:'wildcard',
    value:2,
    selected:'None',
    stacked:false
  },
  'blue and green':{
    num:1,
    color1:'Blue',
    color2:'Green',
    category:'wildcard',
    value:1,
    selected:'None',
    stacked:false
  },
  'black and green':{
    num:1,
    color1:'Black',
    color2:'Green',
    category:'wildcard',
    value:2,
    selected:'None',
    stacked:false
  },
  'ligh green and black':{
    num:1,
    color1:'Light Green',
    color2:'Black',
    category:'wildcard',
    value:1,
    selected:'None',
    stacked:false
  },
  'wild property':{
    num:2,
    color1:'all',
    color2:'all',
    category:'wildcard',
    value:1,
    selected:'None',
    stacked:false,
    wild:true,
    message:"Choose color for wildcard",
    choice:["Black","Light Blue","Green","Yellow","Red","Purple","Orange","Light Green","Blue","Brown" ],
    color:'all'
  },

}

const rent = {

}

const action = {
  passGo:{
    name:"Pass and Go",
    num:10,
    attribute:"Draw two more cards"
  },
  dealBreaker:{
    name:"Deal Breaker",
    num:2,
    attribute:"Mainly for stealing a complete set lol"
  }
}

const money = {
  $10:{
    value:10,
    num:1
  },
  $5:{
    value:5,
    num:2
  },
  $4:{
    value:4,
    num:3
  },
  $3:{
    value:3,
    num:3
  },$2:{
    value:2,
    num:5
  },$1:{
    value:1,
    num:6
  },
}


function App(props) {

  //initialization
  const [deck, setDeck] = useState([])
  const [opProp, setOpProp] = useState([])
  const [opMoney, setMoney] = useState([])
  const [update, setUpdate] = useState(0)

  const [drawn, setDrawn] = useState([])
  
  const [propTable, setPropTable] = useState([])
  const [moneyTable, setMoneyTable] = useState([])
  
  const [joined, setJoined] = useState([])
  const [start, setStart] = useState(false)

  const [wildpopUp, showWildPopup] = useState(1);
  const [action, setAction] = useState()
  


  useEffect(()=>{
    console.log("This is called everytime I place a property")
    
  }, [propTable])


  useEffect(()=>{
    if(props.resp == 'creator'){
      console.log("Creator joined")
    }else{
      console.log("Joiner joined")
    }
  }, [])


  useEffect(()=>{
    props.socket.emit("updateDeck", deck, props.room)
    
    props.socket.emit("updateProperty", propTable, props.room)

    props.socket.emit("updateMoney", moneyTable, props.room)

  }, [update])


  //socket entries
  props.socket.on("get-users", (users)=>{
    console.log("got users")
    console.log(users)
    setJoined(users)
  })

  props.socket.on("when", fact =>{
    setStart(fact)
  })

  props.socket.on("get-deck", roomDeck =>{
    setDeck(roomDeck)
  })

  props.socket.on("getOpProp", table =>{
    setOpProp(table)
  })

  props.socket.on("getMoney", money =>{
    setMoney(money)
  })

/**************INITIALIZATION PROCESS*****************/
const initGame = ()=>{
  initDeck();
 
  toggleUpdate()
  setStart(true)

  props.socket.emit("start", props.room, true)
}

const initDeck = ()=>{
  let batch = deck;
  Object.values(property).forEach(val => {
    for(let i=0; i<val.nComplete; i++){
      batch = [...batch, val]
    }
  })

  Object.values(money).forEach(val => {
    for(let i=0; i<val.num; i++){
      batch = [...batch, val]
    }
  })

  Object.values(wild).forEach(val => {
    for(let i=0; i<val.num; i++){
      batch = [...batch, val]
    }
  })

  setDeck(batch);
}

const draw = () =>{
  let n = Math.floor(Math.random() * deck.length);
  let newA = [...drawn, deck[n]];
  setDrawn(newA)

  //update deck
  let temp = deck;
  temp.splice(n,1);
  setDeck(temp);

  toggleUpdate()
}

const checkTally = (table)=>{
  console.log(table[0].stacked)
}


  //toggles

  const toggleUpdate = ()=>{
    if(update==1) setUpdate(0)
    else setUpdate(1)

    console.log("PropTable = ", propTable)
  }

  const toggleWildPopup = ()=>{
    if(wildpopUp==1) showWildPopup(0)
    else showWildPopup(1)
  }

  const actionSet = (act, index, placed)=>{
    console.log("Action set called")
    let temp = {
      action:act,
      index:index,
      placed:placed
    }
    setAction(temp)
    console.log(temp)
  }

  const changeWildcard = (index, selected) =>{
    let tempPropTable = propTable;
    let color = tempPropTable[index].selected
    tempPropTable[index].stacked = false;
    tempPropTable[index].selected = selected;

    tempPropTable.forEach((item, indexNow)=>{
      item.stacked = false
    })

    setPropertyTable(tempPropTable);
    toggleUpdate();
  }

  

  
  //handle properties
  const flip = (index, selected)=>{
    let tempPropTable = propTable;
    tempPropTable[index].selected = selected;

    let color = "";
    if(tempPropTable[index].card.color1 == selected){
      color = tempPropTable[index].card.color2;
    }
    else color = tempPropTable[index].card.color1;

    tempPropTable.forEach((item, indexNow)=>{
     item.stacked = false;
    })

    setPropertyTable(tempPropTable);
    toggleUpdate();
  }

  const placeProperty = (index, selected)=>{
    let tempPropTable = propTable;
    if(tempPropTable.length !=0){

      let placedProp;
      if(selected == "none"){
        placedProp = {
          card:drawn[index],
          stacked:false
        }
      }else{
        placedProp = {
          card:drawn[index],
          stacked:false,
          selected:selected
        }
      }
      tempPropTable.push(placedProp);

      setPropertyTable(tempPropTable)
      
      let hand = drawn;
      hand.splice(index, 1)
      
      setDrawn(hand)
      toggleUpdate()
      
    }else{

      let placedProp;
      if(selected == "none"){
        placedProp = {
          card:drawn[index],
          stacked:false
        }
      }else{
        placedProp = {
          card:drawn[index],
          stacked:false,
          selected:selected
        }
      }

      tempPropTable.push(placedProp);

      console.log("Placed ", drawn[index].color)

      setPropertyTable(tempPropTable)

      let hand = drawn;
      hand.splice(index, 1)

      setDrawn(hand)
      toggleUpdate()
    }
  }

  const setPropertyTable = (newTable) =>{
    checkTally(newTable);
    setPropTable(newTable);
  }

  //handle bank  
  const placeBank = (index)=>{
    let tempMoneyTable = moneyTable;

    tempMoneyTable.push(drawn[index]);

    console.log("Placed ", drawn[index])

    let hand = drawn;
    hand.splice(index, 1)
    console.log("setting drawn")

    setDrawn(hand)
    console.log("setting proptable")

    setMoneyTable(tempMoneyTable)

    toggleUpdate()
  }

  return (
    <div className="App">

      {!start &&
        <div className="modal">
        <div className="center">
          <p>Joined room {props.room}</p>

          {joined.length<2 &&
            <p>Waiting for other play to join</p>
          }
          
          <p>Joined players: </p>
          {joined.length>0 &&
              <div>
                {joined.map((user)=>(
                  <p>{user.name}</p>
                ))
                }
              </div>
          }

          {joined.length==2 && props.resp=="creator" &&
            <div>
              <p>Start game?</p>
              <button onClick={()=>{initGame()}}>Start</button>
            </div>
          }
         
        </div>
      </div>
      }

      {!wildpopUp &&
        <div className="modal" onClick={()=>{toggleWildPopup()}}>
          <WildCardPopUp action={action} change={changeWildcard} place={placeProperty}/>
        </div>
      }

      {/* oppponent property section */}
      <div className="opponent">

        <div className="opMoney">
        {opMoney.length > 0 ? (

          opMoney.map((card, index)=>{
            return <MoneyCard money={card} index={index} placed={true}/>    
          }) ):( 
          <p>No Money</p>  )
        }
        </div>
        <div className="opProperty">
        {opProp.length > 0 ? ( 
          opProp.map((card, index1)=>{
            if(card.stacked == false){
              let feed =[
                {card:card, index:index1}
              ]
              opProp.map((item, index2)=>{
                if(((card.card.color == item.card.color && item.card.color != undefined) || (card.selected == item.card.color && item.card.color != undefined) || (card.selected == item.selected && card.selected != undefined)|| (card.card.color == item.selected && item.card.selected != undefined)) && index1!=index2){
                  console.log(card.card.color, " & ", card.selected, " & ", item.card.color, " & ", item.selected)
                  
                  opProp[index2].stacked = true;
                  let sample = {
                    card:item, index:index2
                  }
                  
                  feed.push(sample)
                }
              })
              {
                return <PropertyContainer property={property} allCards={feed} flip={flip}/>
              }
            }
          }) ):(
            <p>Opponent has not placed any property yet</p>
          )
          }
        </div>
        
      </div>

      {/* personal property section */}
      <div className="personal">
        <div className="personalProperty">
          {propTable.length > 0 ? ( 
            propTable.map((card, index1)=>{
              if(card.stacked == false){
                let feed =[
                  {card:card, index:index1}
                ]
                propTable.map((item, index2)=>{
                  console.log(card.card.color, " & ", card.selected, " & ", item.card.color, " & ", item.selected)
                  if(((card.card.color == item.card.color && item.card.color != undefined) || (card.selected == item.card.color && item.card.color != undefined) || (card.selected == item.selected && card.selected != undefined)|| (card.card.color == item.selected && item.card.selected != undefined)) && index1 !=index2){
                   console.log("Matched")
                    
                    propTable[index2].stacked = true;
                    let sample = {
                      card:item, index:index2
                    }
                    
                    feed.push(sample)
                  }
                })
                {
                  return <PropertyContainer property={property} action={actionSet} pop={toggleWildPopup} allCards={feed} flip={flip}/>
                }
              }
            }) ):( 
            <p>No property</p>  )
          }
        </div>
        <div className="personalMoney">
        {moneyTable.length > 0 ? (

          moneyTable.map((card, index)=>{
            return <MoneyCard money={card} index={index} placed={true}/>    
          }) ):( 
          <p>No Money</p>  )
        }
        </div>
      
      </div>

      {/* drawn cards section */}
      <div className="draw">
        <div className="drawn-cards">
          {drawn.length > 0  ? (
            
            drawn.map((card, index)=>{
              if(card.category ==="property"){
                return <PropertyCard place={placeProperty} property={card} index={index} placed={false}/>
              }else if(card.category === "action"){
                return <ActionCard action={card}/>
              }else if(card.category === "wildcard"){
                return <WildCard index={index} wild={card} place={placeProperty} placed={false} pop={toggleWildPopup} action={actionSet}/>
              }else if(card.category === "rent"){
                return <RentCard rent={card}/>
              }else {
                return <MoneyCard index={index} place={placeBank} money={card} placed={false}/>
              }        
            }) ):( 
            
            <p>No cards drawn</p>  )
          }
        </div>

        <div className="draw-from">
          <div className="deck" onClick={()=>{draw()}}></div>
          <div className="skip">
            <p>Skip Turn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
