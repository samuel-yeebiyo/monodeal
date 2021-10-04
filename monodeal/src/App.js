import {useState, useEffect} from 'react' 


import './App.css';
import PropertyCard from'./components/PropertyCard'
import WildCard from './components/WildCard';
import MoneyCard from './components/MoneyCard';
import RentCard from './components/Rent';
import ActionCard from './components/ActionCard';
import PropertyContainer from './components/PropertyContainer'
import PayPopUp from './components/PayPopUp';
import SlyPopUp from './components/SlyPopUp';
import DealBreakerPopUp from './components/DealBreakerPopUp';
import ForcedPopUp from './components/ForcedPopUp'

//popups
import WildCardPopUp from './components/WildCardPopUp';
import RentPopUp from './components/RentPopUp';
import { setUncaughtExceptionCaptureCallback } from 'process';



const property = {
  black:{
    category:"property",
    value:2,
    color:"Black",
    nComplete:4,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}, {num:3, price:4}]
  },
  lightBlue:{
    category:"property",
    value:3,
    color:"Light Blue",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:2, price:3}]
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
    each:[{num:1, price:2}, {num:2, price:3}, {num:2, price:3}]
  },
  // red:{
  //   category:"property",
  //   value:2,
  //   color:"Red",
  //   nComplete:3,
  //   each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}]
  // },
  // purple:{
  //   category:"property",
  //   value:3,
  //   color:"Purple",
  //   nComplete:3,
  //   each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:5}]
  // },
  // orange:{
  //   category:"property",
  //   value:3,
  //   color:"Orange",
  //   nComplete:3,
  //   each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}]
  // },
  // lightGreen:{
  //   category:"property",
  //   value:2,
  //   color:"Light Green",
  //   nComplete:2,
  //   each:[{num:1, price:2}, {num:2, price:3}]
  // },
  // blue:{
  //   category:"property",
  //   value:3,
  //   color:"Blue",
  //   nComplete:2,
  //   each:[{num:1, price:2}, {num:2, price:3}]
  // },
  // brown:{
  //   category:"property",
  //   value:3,
  //   color:"Brown",
  //   nComplete:2,
  //   each:[{num:1, price:2}, {num:2, price:3}]
  // }
}

const wild = {
  'purple and orange':{
    num:2,
    color1:'Purple',
    color2:'Orange',
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'red and yellow':{
    num:2,
    color1:'Red',
    color2:'Yellow',
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'light blue and brown':{
    num:1,
    color1:'Light Blue',
    color2:'Brown',
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'light blue and black':{
    num:1,
    color1:'Light Blue',
    color2:'Black',
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'blue and green':{
    num:1,
    color1:'Blue',
    color2:'Green',
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'black and green':{
    num:1,
    color1:'Black',
    color2:'Green',
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'ligh green and black':{
    num:1,
    color1:'Light Green',
    color2:'Black',
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'wild property':{
    num:2,
    color1:'all',
    color2:'all',
    category:'wildcard',
    value:1,
    selected:'None',
    wild:true,
    message:"Choose color for wildcard",
    choice:["Black","Light Blue","Green","Yellow","Red","Purple","Orange","Light Green","Blue","Brown" ],
    color:'all'
  },

}

const rent = {
  "purple and orange":{
    color1: "Purple",
    color2: "Orange",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "black and light green":{
    color1: "Black",
    color2: "Light Green",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "green and blue":{
    color1: "Green",
    color2: "Blue",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "brown and light blue":{
    color1: "Brown",
    color2: "Light Blue",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "red and yellow":{
    color1: "Red",
    color2: "Yellow",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "wild rent":{
    color1: "all",
    color2: "all",
    message: "Pick a property to apply rent",
    category:"rent",
    num:3,
    value:2
  }
}

const action = {
  // passGo:{
  //   name:"Pass and Go",
  //   num:10,
  //   message:"Draw 2 cards",
  //   category:"action"
  // },
  forceDeal:{
    name:"Forced Deal",
    num:4,
    message:"Choose cards to exchange",
    category:"action"
  },
  // sayNo:{
  //   name:"Just Say No",
  //   num:3,
  //   message:"Denied!!",
  //   category:"action"
  // },
  // slyDeal:{
  //   name:"Sly Deal",
  //   num:3,
  //   message:"Pick a card to steal",
  //   category:"action"
  // },
  // debtCollector:{
  //   name:"Debt Collector",
  //   num:3,
  //   message:"Collect $5",
  //   category:"action"
  // },
  // birthday:{
  //   name:"It's My Birthday",
  //   num:3,
  //   message:"Collect $2",
  //   category:"action"
  // },
  // house:{
  //   name:"House",
  //   num:3,
  //   message:"Choose a complete set to put down",
  //   category:"action"
  // },
  // hotel:{
  //   name:"Hotel",
  //   num:3,
  //   message:"Choose a complete set with a house to put down",
  //   category:"action"
  // },
  // dealBreaker:{
  //   name:"Deal Breaker",
  //   num:2,
  //   message:"Choose a complete set to steal",
  //   category:"action"
  // },
  // doubleRent:{
  //   name:"Double The Rent",
  //   num:2,
  //   message:"Double the rent",
  //   category:"action"
  // }
}

const money = {
  $10:{
    value:10,
    num:1,
    category:"money"
  },
  $5:{
    value:5,
    num:2,
    category:"money"
  },
  $4:{
    value:4,
    num:3,
    category:"money"
  },
  $3:{
    value:3,
    num:3,
    category:"money"
  },$2:{
    value:2,
    num:5,
    category:"money"
  },$1:{
    value:1,
    num:6,
    category:"money"
  },
}


function App(props) {

  //initialization
  const [joined, setJoined] = useState([])
  const [start, setStart] = useState(false)


  //common
  const [deck, setDeck] = useState([])
  const [drawn, setDrawn] = useState([])


  //Current player
  const [moneyTable, setMoneyTable] = useState([])
  const [container, setContainer] = useState([])


  //opponent
  const [opCont, setOpCont] = useState([])
  const [opMoney, setMoney] = useState([])

  const [update, setUpdate] = useState(0)

  const [wildpopUp, showWildPopup] = useState(1);
  const [rentpopUp, showRentPopup] = useState(1);
  const [payPopup, showPayPopup] = useState(1);
  const [slyPopup, setSlyPopup] = useState(1);
  const [breakerPopup, setBreakerPopup] = useState(1);
  const [forcedPopup, showForcedPopup] = useState(1);

  const [colorRent, setRentColor] = useState([])
  const [wildAction, setWildAction] = useState()
  const [payAmount, setAmount] = useState()
  
    useEffect(()=>{
    if(props.resp == 'creator'){
      console.log("Creator joined")
    }else{
      console.log("Joiner joined")
    }
  }, [])


  useEffect(()=>{
    props.socket.emit("updateDeck", deck, props.room)
    
    props.socket.emit("updateProperty", container, props.room)

    props.socket.emit("updateMoney", moneyTable, props.room)

    console.log(container)

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
    setOpCont(table)
  })

  props.socket.on("getMoney", money =>{
    setMoney(money)
  })

  props.socket.on("pay", (amount)=>{
    setAmount(amount)
    togglePayPopup()
  })

  props.socket.off("get-loot").on("get-loot", (prop, mon)=>{

    console.log("Got Rent: ", prop, " and ", mon)


    if(prop.length >0){
      prop.map((item)=>{
        if(item.category == "property"){
          propertyLoot(item, "none")
        }else if(item.category == "wildcard"){
          propertyLoot(item, "Choose")
        }
      })
    }

    if(mon.length >0){
      mon.map((item)=>{
        moneyLoot(item)
      })
    }

    console.log("CALLED TO RECEIVE RENT ONCE")
  })

  props.socket.off("give").on("give", (card)=>{
    console.log("Called")

    console.log(card)

    let tempContainer = container;
    let tempCard = tempContainer[card.container].cards[card.index];
    tempContainer[card.container].cards.splice(card.index, 1);
    if(tempContainer[card.container].cards.length == 0){
      tempContainer.splice(card.container, 1);
    }

    console.log("Transferring card")
    console.log(tempContainer)
    setContainer(tempContainer);

    toggleUpdate()

    props.socket.emit("transfer", tempCard, props.room)


  })

  props.socket.off("giveUp").on("giveUp", index =>{
    let temp = container
    let stolen = temp[index.container];

    temp.splice(index.container, 1);
    setContainer(temp);

    console.log("Stolen ", stolen)

    props.socket.emit("transfer-container", stolen, props.room)

  })

  props.socket.off("receive").on("receive", (item)=>{
    if(item.category == "property"){
      propertyLoot(item, "none")
    }else if(item.category == "wildcard"){
      propertyLoot(item, "Choose")
    }
  })

  props.socket.off("receive-container").on("receive-container", (item)=>{
    item.set=1;
    if(container.length>0){
      container.map((cont)=>{
        if(cont.color == item.color){
          if(cont.set==1){
            item.set=2;
          }else if(cont.set ==2){
            item.set=3;
          }
        }
      })
    }  

    console.log(item);
    let temp = container || [];
    temp.push(item);
    setContainer(temp)
    toggleUpdate()
  })

  props.socket.off("forced-card").on("forced-card", (card, req)=>{

    let myCard = container[req.container].cards[req.index];

    let temp = container; 
    temp[req.container].cards.splice(req.index, 1);
    if(temp[req.container].cards.length == 0){
      temp.splice(req.container, 1);
    }
    
    setContainer(temp)

    if(card.category == "property"){
      propertyLoot(card, "none")
    }else if(card.category == "wildcard"){
      propertyLoot(card, "Choose")
    }
    

    props.socket.emit("switch", myCard, props.room) 
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

  // Object.values(money).forEach(val => {
  //   for(let i=0; i<val.num; i++){
  //     batch = [...batch, val]
  //   }
  // })

  // Object.values(wild).forEach(val => {
  //   for(let i=0; i<val.num; i++){
  //     batch = [...batch, val]
  //   }
  // })

  // Object.values(rent).forEach(val => {
  //   for(let i=0; i<val.num; i++){
  //     batch = [...batch, val]
  //   }
  // })

  Object.values(action).forEach(val => {
    for(let i=0; i<val.num; i++){
      batch = [...batch, val]
    }
  })

  setDeck(batch);
}

const draw = (num) =>{
  let newA = drawn;
  let temp = deck;
  for(let i=0; i<num;i++){
    let n = Math.floor(Math.random() * deck.length);
    newA.push(deck[n])

    //update deck
    temp.splice(n,1);

    console.log("Drawn: ", deck[n])

  }
  
  setDrawn(newA)
  setDeck(temp);
  toggleUpdate()

}


  

//toggles
  const toggleUpdate = ()=>{
    if(update==1) setUpdate(0)
    else setUpdate(1)

    console.log(container)
  }

  const toggleWildPopup = ()=>{
    if(wildpopUp==1) showWildPopup(0)
    else showWildPopup(1)
  }

  const toggleRentPopup = ()=>{
    if(rentpopUp==1) showRentPopup(0)
    else showRentPopup(1)
  }

  const togglePayPopup = ()=>{
    if(payPopup==1) showPayPopup(0)
    else showPayPopup(1)
  }

  const toggleSlyPopup = ()=>{
    if(slyPopup==1) setSlyPopup(0)
    else setSlyPopup(1)
  }

  const toggleBreakerPopup = ()=>{
    if(breakerPopup==1) setBreakerPopup(0)
    else setBreakerPopup(1)
  }
  
  const toggleForcedPopup = ()=>{
    if(forcedPopup==1) showForcedPopup(0)
    else showForcedPopup(1)
  }

  
  //handle properties
  const flip = (containerIndex, index, selected)=>{
    let tempContainer = container;
    let card = tempContainer[containerIndex].cards[index]

    tempContainer[containerIndex].cards.splice(index, 1);
    if(tempContainer[containerIndex].cards == 0){
      tempContainer.splice(containerIndex, 1)
    }

    if(!selected){
      if(card.selected == card.color1){
        card.selected = card.color2
      }else{
        card.selected = card.color1
      }
    }else{
      card.selected = selected
    }
    

    setContainer(tempContainer)

    placeFlip(card)
    
    toggleUpdate();
  }

  const placeFlip = (card)=>{
    let tempContainer = container;
    if(tempContainer.length !=0){

      let placedProp;
      let exists = false;
      tempContainer.map((cont)=>{
        if(cont.color == card.selected && cont.set == 1){
          exists = true
          if(cont.complete == true){
            let found = false;
            tempContainer.map((cont)=>{
              if(cont.color == card.selected && cont.set == 2){
                cont.cards.push(card)
                found=true;
              }
            })
            if(found == false){
              let n;
              Object.values(property).forEach(val => {
                if(val.color == card.selected){
                  n = val.nComplete
                }
              })

              placedProp = {
                color:card.selected,
                cards:[card],
                complete:false,
                set:2,
                nComplete:n,
                rent:0,
                house:0,
                hotel:0
              }

              tempContainer.push(placedProp);
            }
          }else{
            cont.cards.push(card)
          }
        }
      })
      if(exists == false){
        let n;
        Object.values(property).forEach(val => {
          if(val.color == card.selected){
            n = val.nComplete
          }
        })

        placedProp = {
          color:card.selected,
          cards:[card],
          complete:false,
          set:1,
          nComplete:n,
          rent:0,
          house:0,
          hotel:0
        }

        tempContainer.push(placedProp);

      }

      setContainer(tempContainer)
      toggleUpdate()
      
    }else{

      let placedProp;
      let n;
      Object.values(property).forEach(val => {
        if(val.color == card.selected){
          n = val.nComplete
        }
      })

      placedProp = {
        color:card.selected,
        cards:[card],
        complete:false,
        set:1,
        nComplete:n,
        rent:0,
        house:0,
        hotel:0
      }
      
      tempContainer.push(placedProp);

      setContainer(tempContainer)

      toggleUpdate()
    }
  }

  const placeProperty = (index, selected)=>{
    let tempContainer = container;
    if(tempContainer.length !=0){

      let placedProp;
      if(selected == "none"){
        let exists = false;
        tempContainer.map((cont)=>{
          if(cont.color == drawn[index].color && cont.set == 1){
            exists = true
            if(cont.complete == true){
              let found = false;
              tempContainer.map((cont)=>{
                if(cont.color == drawn[index].color && cont.set == 2){
                  cont.cards.push(drawn[index])
                  found=true;
                }
              })
              if(found == false){
                placedProp = {
                  color:drawn[index].color,
                  cards:[drawn[index]],
                  complete:false,
                  set:2,
                  nComplete:drawn[index].nComplete,
                  rent:0,
                  house:0,
                  hotel:0
                }

                tempContainer.push(placedProp);
              }
            }else{
              cont.cards.push(drawn[index])
            }
          }
        })
        if(exists == false){
          placedProp = {
            color:drawn[index].color,
            cards:[drawn[index]],
            complete:false,
            set:1,
            nComplete:drawn[index].nComplete,
            rent:0,
            house:0,
            hotel:0
          }

          tempContainer.push(placedProp);
        }
      }else{
        drawn[index].selected = selected;
        let exists = false;
        tempContainer.map((cont)=>{
          if(cont.color == drawn[index].selected && cont.set == 1){
            exists = true
            if(cont.complete == true){
              let found = false;
              tempContainer.map((cont)=>{
                if(cont.color == drawn[index].selected && cont.set == 2){
                  cont.cards.push(drawn[index])
                  found=true;
                }
              })
              if(found == false){
                let n;
                Object.values(property).forEach(val => {
                  if(val.color == drawn[index].selected){
                    n = val.nComplete
                  }
                })
                placedProp = {
                  color:drawn[index].selected,
                  cards:[drawn[index]],
                  complete:false,
                  set:2,
                  nComplete:n,
                  rent:0,
                  house:0,
                  hotel:0
                }

                tempContainer.push(placedProp);
              }
            }else{
              cont.cards.push(drawn[index])
            }
          }
        })
        if(exists == false){
          let n;
          Object.values(property).forEach(val => {
            if(val.color == drawn[index].selected){
              n = val.nComplete
            }
          })

          placedProp = {
            color:drawn[index].selected,
            cards:[drawn[index]],
            complete:false,
            set:1,
            nComplete:n,
            rent:0,
            house:0,
            hotel:0
          }

          tempContainer.push(placedProp);

        }
      }

      setContainer(tempContainer)
      
      let hand = drawn;
      hand.splice(index, 1)
      
      setDrawn(hand)
      toggleUpdate()
      
    }else{

      let placedProp;
      if(selected == "none"){
        placedProp = {
          color:drawn[index].color,
          cards:[drawn[index]],
          complete:false,
          set:1,
          nComplete:drawn[index].nComplete,
          rent:0,
          house:0,
          hotel:0
        }
      }else{
        let n;
        Object.values(property).forEach(val => {
          if(val.color == drawn[index].selected){
            n = val.nComplete
          }
        })

        drawn[index].selected = selected;

        placedProp = {
          color:selected,
          cards:[drawn[index]],
          complete:false,
          set:1,
          nComplete:n,
          rent:0,
          house:0,
          hotel:0
        }
      }

      tempContainer.push(placedProp);

      setContainer(tempContainer)

      let hand = drawn;
      hand.splice(index, 1)

      setDrawn(hand)
      toggleUpdate()
    }
    console.log("Temp: ", tempContainer)
  }

  const wildActionSet = (act, index, placed, cont)=>{
    console.log("Action set called")
    let temp;
    if(!placed){
      temp = {
        placed: placed,
        action:act,
        index:index
      }
    }else{
      temp = {
        placed: placed,
        action:act,
        index:index,
        cont: cont
      }
    }
    

    setWildAction(temp)
    console.log(temp)
  }
  
  const complete = (containerIndex, bool) => {
    let tempContainer = container;

    tempContainer[containerIndex].complete = bool;

    setContainer(tempContainer);
    toggleUpdate()

  }

  const renting = (containerIndex, num)=>{
    let tempContainer = container;

    tempContainer[containerIndex].rent = num;

    setContainer(tempContainer);
    toggleUpdate()
  }
  
  //handle rent
  const rentColors = (card) =>{
    let temp
    temp = {
      color1:card.color1,
      color2:card.color2,
    }
    setRentColor(temp)
  }
  
  const requestRent = (amount)=>{
    props.socket.emit("reqrent", amount, props.room)
  }

  const sendPayment = (property, money)=>{
    let prop = []
    let mon = []
    if(property.length >0){
      let temp = container;
      property.map((item)=>{
        prop.push(temp[item.container].cards[item.index])
        temp[item.container].cards.splice(item.index,1);
        if(temp[item.container].cards == 0){
          temp.splice(item.container, 1)
        }
      })
      setContainer(temp)
    }
    if(money.length >0){
      let temp = moneyTable;
      money.map((item)=>{
        mon.push(temp[item.index])
        temp.splice(item.index, 1)
      })
      setMoneyTable(temp)
    }

    props.socket.emit("send-loot", prop, mon, props.room)

    toggleUpdate();
  }

  const propertyLoot = (card, selected) =>{
    let tempContainer = container;
    
    let placedProp;
    if(selected == "none"){
      let exists = false;
      tempContainer.map((cont)=>{
        if(cont.color == card.color && cont.set == 1){
          exists = true
          if(cont.complete == true){
            let found = false;
            tempContainer.map((cont)=>{
              if(cont.color == card.color && cont.set == 2){
                cont.cards.push(card)
                found=true;
              }
            })
            if(found == false){
              placedProp = {
                color:card.color,
                cards:[card],
                complete:false,
                set:2,
                nComplete:card.nComplete,
                rent:0,
                house:0,
                hotel:0
              }

              tempContainer.push(placedProp);
            }
          }else{
            cont.cards.push(card)
          }
        }
      })
      if(exists == false){
        placedProp = {
          color:card.color,
          cards:[card],
          complete:false,
          set:1,
          nComplete:card.nComplete,
          rent:0,
          house:0,
          hotel:0
        }

        tempContainer.push(placedProp);
      }
    }else{
      card.selected = selected;
      let exists = false;
      tempContainer.map((cont)=>{
        if(cont.color == card.selected && cont.set == 1){
          exists = true
          if(cont.complete == true){
            let found = false;
            tempContainer.map((cont)=>{
              if(cont.color == card.selected && cont.set == 2){
                cont.cards.push(card)
                found=true;
              }
            })
            if(found == false){
              let n;
              Object.values(property).forEach(val => {
                if(val.color == card.selected){
                  n = val.nComplete
                }
              })
              placedProp = {
                color:card.selected,
                cards:[card],
                complete:false,
                set:2,
                nComplete:n,
                rent:0,
                house:0,
                hotel:0
              }

              tempContainer.push(placedProp);
            }
          }else{
            cont.cards.push(card)
          }
        }
      })
      if(exists == false){
        let n;
        Object.values(property).forEach(val => {
          if(val.color == card.selected){
            n = val.nComplete
          }
        })

        placedProp = {
          color:card.selected,
          cards:[card],
          complete:false,
          set:1,
          nComplete:n,
          rent:0,
          house:0,
          hotel:0
        }

        tempContainer.push(placedProp);

      }
    }

    setContainer(tempContainer)
    toggleUpdate()
      
    
  }

  const moneyLoot = (card) =>{
    console.log("CALLED TO PLACE MONEY LOOT")
    let tempMoneyTable = moneyTable;

    tempMoneyTable.push(card);

    console.log("Placed ", card)

    setMoneyTable(tempMoneyTable)

    toggleUpdate()
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

    setMoneyTable(tempMoneyTable)

    toggleUpdate()
  }



  //handle actions
  const passGo = (index)=>{

    draw(2);

    let hand = drawn;
    hand.splice(index, 1)
    console.log("setting drawn")

    setDrawn(hand)
    toggleUpdate()
  }

  const slySteal = (card)=>{
    props.socket.emit("steal", card, props.room)
  }

  const breakSteal = (container)=>{
    props.socket.emit("break", container, props.room)
  }

  const forcedDeal= (mine, op)=>{
    let myCard = container[mine.container].cards[mine.index];

    let temp = container; 
    temp[mine.container].cards.splice(mine.index, 1);
    if(temp[mine.container].cards.length == 0){
      temp.splice(mine.container, 1);
    }

    setContainer(temp)

    props.socket.emit("deal", myCard, op, props.room)
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
          <WildCardPopUp action={wildAction} change={flip} place={placeProperty}/>
        </div>
      }

      {!rentpopUp &&
        <div className="modal">
          <RentPopUp pop={toggleRentPopup} get={requestRent} colors={colorRent} cont={container}/>
        </div>
      }

      {!payPopup &&
        <div className="modal">
          <PayPopUp pop={togglePayPopup} send={sendPayment} money={moneyTable} property={container} amount={payAmount}/>
        </div>
      }

      {!slyPopup &&
        <div className="modal">
          <SlyPopUp opTable={opCont} steal={slySteal} pop={toggleSlyPopup}/>
        </div>
      }

      {!breakerPopup &&
        <div className="modal">
          <DealBreakerPopUp opTable={opCont} steal={breakSteal} pop={toggleBreakerPopup}/>
        </div>
      }

      {!forcedPopup &&
        <div className="modal">
          <ForcedPopUp opTable={opCont} container={container} deal={forcedDeal} pop={toggleForcedPopup}/>
        </div>
      }
      {/*Create separate popups for deal breaker, sly deal, and forced deal*/}
      {/*Create separate popups for the house and hotel*/}


      {/* oppponent property section */}
      <div className="opponent">

        <div className="opMoney">
        {opMoney.length > 0 ? (

          opMoney.map((card, index)=>{
            if(card.category == "rent"){
              return <RentCard placed={true} rent={card} pop={toggleRentPopup} colors={rentColors}/>
            }else if(card.category == "money"){
              return <MoneyCard money={card} index={index} placed={true}/>    
            }
          }) ):( 
          <p>No Money</p>  )
        }
        </div>
        <div className="opProperty">
        {opCont.length > 0 ? (
          opCont.map((cont, index)=>{
            return <PropertyContainer opponent={true} completion={complete} pop={toggleWildPopup} property={property} index={index} flip={flip} contains={cont} action={wildActionSet}/>
          })
        ):(
          <p>No property placed</p>
        )}
        </div>
        
      </div>

      {/* personal property section */}
      <div className="personal">
        <div className="personalProperty">
          {container.length > 0 ? (
            container.map((cont, index)=>{
              return <PropertyContainer oppponent={false} renting={renting} completion={complete} pop={toggleWildPopup} property={property} index={index} flip={flip} contains={cont} action={wildActionSet}/>
            })
          ):(
            <p>No property placed</p>
          )}
        </div>
        <div className="personalMoney">
        {moneyTable.length > 0 ? (

          moneyTable.map((card, index)=>{
            if(card.category == "rent"){
              return <RentCard placed={true} index={index} rent={card} colors={rentColors}/>
            }else if(card.category == "money"){
              return <MoneyCard money={card} index={index} placed={true}/>    
            }    
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
                return <ActionCard index={index} popForced={toggleForcedPopup} placed={false} popSly={toggleSlyPopup} popBreak={toggleBreakerPopup} action={card} pass={passGo} get={requestRent}/>
              }else if(card.category === "wildcard"){
                return <WildCard index={index} wild={card} place={placeProperty} placed={false} pop={toggleWildPopup} action={wildActionSet}/>
              }else if(card.category === "rent"){
                return <RentCard bank={placeBank} index={index} rent={card} pop={toggleRentPopup} placed={false} colors={rentColors}/>
              }else {
                return <MoneyCard index={index} place={placeBank} money={card} placed={false}/>
              }        
            }) ):( 
            
            <p>No cards drawn</p>  )
          }
        </div>

        <div className="draw-from">
          <div className="deck" onClick={()=>{draw(1)}}></div>
          <div className="skip">
            <p>Skip Turn</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
