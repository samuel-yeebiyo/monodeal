import {useState, useRef, useEffect} from 'react' 
import {Droppable, DragDropContext} from 'react-beautiful-dnd'
import {v4} from 'uuid'

import './App.css';

import './components/css/start.css'


import PropertyCard from'./components/cards/PropertyCard'
import WildCard from './components/cards/WildCard';
import MoneyCard from './components/cards/MoneyCard';
import RentCard from './components/cards/Rent';
import ActionCard from './components/cards/ActionCard';


import PayPopUp from './components/popups/PayPopUp';
import SlyPopUp from './components/popups/SlyPopUp';
import DealBreakerPopUp from './components/popups/DealBreakerPopUp';
import ForcedPopUp from './components/popups/ForcedPopUp'
import HousePopUp from './components/popups/HousePopUp';
import HotelPopUp from './components/popups/HotelPopUp';
import WildCardPopUp from './components/popups/WildCardPopUp';
import RentPopUp from './components/popups/RentPopUp';


import SayNo from './components/SayNo';
import PropertyContainer from './components/PropertyContainer'
//popups


import {property, wild, rent, action, money} from './cardObjects'


function App(props) {

  //Drag type states
  const dragType = useRef("one")
  dragType.current="one"

  //initialization
  const [joined, setJoined] = useState([])
  const [start, setStart] = useState(false)
  const [dist, setDist] = useState(false)


  //common
  const [deck, setDeck] = useState([])
  const [drawn, setDrawn] = useState([])
  const [turn, setTurn] = useState(false)
  const [moves, setMoves] = useState(0)
  const [excess, setExcess] = useState(false)

  //Current player
  const [moneyTable, setMoneyTable] = useState([])
  const [container, setContainer] = useState([])


  //opponent
  const [opCont, setOpCont] = useState([])
  const [opMoney, setMoney] = useState([])

  const [update, setUpdate] = useState(0)
  const [no, setNo] = useState(true)
  const [answer, setAnswer] = useState("Yes")
  const countRef = useRef(answer)
  countRef.current = answer


  const [wildpopUp, showWildPopup] = useState(false);
  const [rentpopUp, showRentPopup] = useState(false);
  const [payPopup, showPayPopup] = useState(false);
  const [slyPopup, setSlyPopup] = useState(false);
  const [breakerPopup, setBreakerPopup] = useState(false);
  const [forcedPopup, showForcedPopup] = useState(false);
  const [housePop, showHouse] = useState(false)
  const [hotelPop, showHotel] = useState(false)
  const [sayNo, showSayNo] = useState(false)  //should be true
  const [deny, showDenial] = useState(false)
  const denRef = useRef(deny)
  denRef.current = deny
  const [Epop, showEpop] = useState(false)
  const popRef = useRef(Epop);
  popRef.current = Epop


  const [colorRent, setRentColor] = useState([])
  const [wildAction, setWildAction] = useState()
  const [curAction, setAction] = useState()
  const [payAmount, setAmount] = useState()

  useEffect(()=>{
    if(drawn.length > 7){
      setExcess(true)
    }
    else setExcess(false)
  })
  
  useEffect(()=>{
    if(props.resp == 'creator'){
      console.log("Creator joined")
      setMoves(3)
      setTurn(true)
    }else{
      console.log("Joiner joined")
    }
  }, [])


  useEffect(()=>{    
    props.socket.emit("updateProperty", container, props.room)

    props.socket.emit("updateMoney", moneyTable, props.room)

    console.log(container)

  }, [update])



  // useEffect(()=>{
  //   toggleSayNo()
  // }, [no])

  //socket entries

  //Get players in the game
  props.socket.off("get-users").on("get-users", (users)=>{
    console.log("got users")
    console.log(users)
    setJoined(users)
  })

  //start the game for opponent
  props.socket.off("starting-game").on("starting-game", (generatedDeck, fact) =>{
    console.log("Getting Deck")
    setStart(true)
  })

  props.socket.off("drawing").on("drawing", (drawn)=>{
    setDrawn(prev=>{
      return [...prev, ...drawn]
    })
  })

  //get main deck from room creator
  props.socket.off("get-deck").on("get-deck", roomDeck =>{
    setDeck(roomDeck)
  })

  //get first set of cards
  props.socket.off("get-cards").on("get-cards", ()=>{
    draw(5)
  })

  //get turn to play cards
  props.socket.off("get-turn").on("get-turn", ()=>{
    setTurn(true)
    setMoves(3)
    draw(2)
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

    toggleSayNo()

    setTimeout(()=>{

      toggleNO()

      if(countRef.current === "Yes"){
        
        let tempContainer = container;
        let tempCard = tempContainer[card.container].cards[card.index];
        if(tempContainer[card.container].cards.length == 1){
          tempContainer.splice(card.container, 1);
        }else{
          tempContainer[card.container].cards.splice(card.index, 1);
        }
        console.log("Transferring card")
        console.log(tempContainer)
        setContainer(tempContainer);

        toggleUpdate()

        props.socket.emit("transfer", tempCard, props.room)
      }else{
        denial()
        setAnswer("Yes")
      }
      
    }, 5000)

  })

  props.socket.off("giveUp").on("giveUp", index =>{

    toggleSayNo()

    setTimeout(()=>{

      toggleNO()

      if(countRef.current === "Yes"){

        let temp = container
        let stolen = temp[index.container];
    
        temp.splice(index.container, 1);
        setContainer(temp);
    
        console.log("Stolen ", stolen)
    
        props.socket.emit("transfer-container", stolen, props.room)

      }else{
        denial()
        setAnswer("Yes")
      }

    }, 5000)
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

  props.socket.off("forced-card").on("forced-card", (card, mine, req)=>{

    let myCard = container[req.container].cards[req.index];

    toggleSayNo()

    setTimeout(()=>{

      toggleNO()

      if(countRef.current === "Yes"){

        let temp = container; 
        if(temp[req.container].cards.length == 1){
          temp.splice(req.container, 1);
        }else{
          temp[req.container].cards.splice(req.index, 1);
        }
        
        setContainer(temp)
        console.log("set container")

        if(card.category == "property"){
          propertyLoot(card, "none")
        }else if(card.category == "wildcard"){
          propertyLoot(card, "Choose")
        }
    

        props.socket.emit("switch", mine, myCard, props.room) 

      }else{
        denial()
        setAnswer("Yes")
      }

    }, 5000)
    
  })

  props.socket.off("receive-forced").on("receive-forced", (mine, card)=>{
    
    let temp = container; 
    temp[mine.container].cards.splice(mine.index, 1);
    if(temp[mine.container].cards.length == 0){
      temp.splice(mine.container, 1);
    }

    setContainer(temp)

    if(card.category == "property"){
      propertyLoot(card, "none")
    }else if(card.category == "wildcard"){
      propertyLoot(card, "Choose")
    }
  })

  props.socket.off("denial").on("denial", ()=>{
    showDenial(!deny)

    setTimeout(()=>{

      showDenial(!denRef.current)
      
    }, 2000)
  })


  /**************INITIALIZATION PROCESS*****************/
const initGame = ()=>{
  
  setStart(true)

  props.socket.emit("start-game", props.room, true)
}

const generateNewID = () =>{
  return v4();
}


const draw = (num) =>{
  let newA = drawn;
  props.socket.emit("draw", num, props.room, props.socket.id)
}

const deal = () =>{
  draw(7)
  props.socket.emit("deal-cards", props.room)
}

const move = (index)=>{
  let temp = moves
  if(index == undefined){
    temp -= 1;
  }else temp -= index
  
  setMoves(temp)
}
  

const pass = ()=>{
  setMoves(0);
  setTurn(false)

  props.socket.emit("pass", props.room)
}

//toggles
  const toggleUpdate = ()=>{
    setUpdate(!update)
  }

  const toggleWildPopup = ()=>{
    showWildPopup(!wildpopUp)
  }

  const toggleRentPopup = ()=>{
    showRentPopup(!rentpopUp)
  }

  const togglePayPopup = ()=>{
    showPayPopup(!payPopup)
  }

  const toggleSlyPopup = ()=>{
    setSlyPopup(!slyPopup)
  }

  const toggleBreakerPopup = ()=>{
    setBreakerPopup(!breakerPopup)
  }
  
  const toggleForcedPopup = ()=>{
    showForcedPopup(!forcedPopup)
  }

  const toggleHouse=()=>{
    showHouse(!housePop)
  }
  
  const toggleHotel=()=>{
    showHotel(!hotelPop)
  }

  const toggleSayNo=()=>{
    showSayNo(!sayNo)
  }

  const toggleNO = ()=>{
    setNo(!no)
  }

  const toggleEpop = ()=>{
    showEpop(!Epop)

    setTimeout(()=>{

      showEpop(!popRef.current)
      
    }, 2000)
  }

  
  //handle properties
  const flip = (containerIndex, index, selected)=>{
    
    let tempContainer = container;
    //which container the card to flip exists
    let card = tempContainer[containerIndex].cards[index]

    if(tempContainer[containerIndex].cards.length == 1){
      tempContainer.splice(containerIndex, 1)
    }else{
      tempContainer[containerIndex].cards.splice(index, 1);
      if(tempContainer[containerIndex].complete == true){
        tempContainer[containerIndex].complete = false 
      }
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
            cont.complete = true;
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

  const newPropContainer = (index) => {
    let tempContainer = container
    let hand = drawn;

    if(tempContainer.length !=0){
      let exists = false;
      tempContainer.map((cont, idx)=>{
        if(cont.color == drawn[index].color){
          exists = true
          if(cont.complete){
            let found = false;
            tempContainer.map((cont)=>{
              if(cont.color == drawn[index].color && cont.set == 2){
                found=true;
              }
            })
            if(found == false){
              let placedProp = {
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
              hand.splice(index, 1)
            }
          }
        }
      })
      if(!exists){
        let placedProp = {
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
        hand.splice(index, 1)
      }
    }else{
      let placedProp = {
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
      hand.splice(index, 1)
    }

    setContainer(tempContainer)
    
    setDrawn(hand)
    toggleUpdate()
  }

  const placeProperty = (index, selected)=>{
    let tempContainer = container;
    let hand = drawn;

    if(tempContainer.length !=0){

      let placedProp;
      drawn[index].selected = selected;
      let exists = false;
      tempContainer.map((cont)=>{
        if(cont.color == drawn[index].selected && cont.set == 1){
          exists = true
          if(cont.complete == true){
            let found = false;
            tempContainer.map((cont)=>{
              if(cont.color == drawn[index].selected && cont.set == 2){
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
              hand.splice(index, 1)

            }
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
        hand.splice(index, 1)
        

      }
    

      setContainer(tempContainer)

      
      setDrawn(hand)
      toggleUpdate()
      
    }else{

      let placedProp;
    
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
    

      tempContainer.push(placedProp);

      setContainer(tempContainer)

      hand.splice(index, 1)

      setDrawn(hand)
      toggleUpdate()
    }
    console.log("Temp: ", tempContainer)
  }


  const appendProperty = (dest, drawnIdx) =>{
    let tempContainer = container;
    let tempDrawn = drawn;

    let containerIdx =0 ;
    for (let i=0; i<tempContainer.length;i++){
      if(tempContainer[i].color == dest.destColor && tempContainer[i].set == dest.destSet){
        console.log("Found")
        containerIdx = i;
        break;
      }
    }

    if(tempContainer[containerIdx].complete != true){
      tempContainer[containerIdx].cards.push(tempDrawn[drawnIdx]);
      if(tempContainer[containerIdx].cards.length == tempContainer[containerIdx].nComplete){
        tempContainer[containerIdx].complete = true;
      }
    }

    tempDrawn.splice(drawnIdx,1);
    setContainer(tempContainer)
    setDrawn(tempDrawn);
    toggleUpdate()
  }


  const switchProperty = (source, dest, cardIdx)=>{

    let tempContainer = container;

    let srcIdx = 0;
    let destIdx = 0;
    
    for (let i=0; i<tempContainer.length;i++){
      if(tempContainer[i].color == source.srcColor && tempContainer[i].set == source.srcSet){
        srcIdx = i
      }
      else if(tempContainer[i].color == dest.destColor && tempContainer[i].set == dest.destSet){
        destIdx = i
      }
    }


    let destinationColor = tempContainer[destIdx].color;
    let sourceColor = tempContainer[srcIdx].cards[cardIdx].color

    if(sourceColor == destinationColor){
      tempContainer[destIdx].cards.push(tempContainer[srcIdx].cards[cardIdx]);
      tempContainer[srcIdx].cards.splice(cardIdx, 1)
      if(tempContainer[destIdx].cards.length == tempContainer[destIdx].nComplete){
        tempContainer[destIdx].complete = true;
      }
      if(tempContainer[srcIdx].cards.length == 0){
        tempContainer.splice(srcIdx, 1)
      }

      setContainer(tempContainer)
      toggleUpdate()
    }

  }

  const placeWildCard = (drawnIdx, color, set)=>{
    let tempContainer = container;
    let tempDrawn = drawn;

    let containerIdx =0 ;
    for (let i=0; i<tempContainer.length;i++){
      console.log({container: tempContainer[i]})
      if(tempContainer[i].color == color && tempContainer[i].set == set){
        console.log("Found")
        tempDrawn[drawnIdx].selected = color
        containerIdx = i;
        break;
      }
    }

    tempContainer[containerIdx].cards.push(tempDrawn[drawnIdx]);
    if(tempContainer[containerIdx].cards.length == tempContainer[containerIdx].nComplete){
      tempContainer[containerIdx].complete = true;
    }

    tempDrawn.splice(drawnIdx,1);
    setContainer(tempContainer)
    setDrawn(tempDrawn);
    toggleUpdate()


  }

  const switchWildCard = (source, dest, cardIdx) =>{
    let tempContainer = container;

    let srcIdx = 0;
    let destIdx = 0;
    
    for (let i=0; i<tempContainer.length;i++){
      if(tempContainer[i].color == source.srcColor && tempContainer[i].set == source.srcSet){
        srcIdx = i
      }
      else if(tempContainer[i].color == dest.destColor && tempContainer[i].set == dest.destSet){
        destIdx = i
      }
    }


    let destinationColor = tempContainer[destIdx].color;
    let sourceColor = [tempContainer[srcIdx].cards[cardIdx].color1, tempContainer[srcIdx].cards[cardIdx].color2]

    if(sourceColor.includes(destinationColor) || sourceColor.includes("all")){
      tempContainer[srcIdx].cards[cardIdx].selected = destinationColor
      tempContainer[destIdx].cards.push(tempContainer[srcIdx].cards[cardIdx]);
      tempContainer[srcIdx].cards.splice(cardIdx, 1)
      if(tempContainer[destIdx].cards.length == tempContainer[destIdx].nComplete){
        tempContainer[destIdx].complete = true;
      }
      if(tempContainer[srcIdx].cards.length == 0){
        tempContainer.splice(srcIdx, 1)
      }
      setContainer(tempContainer)
      toggleUpdate()
    }
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
  const rentColors = (card, index) =>{
    let temp
    temp = {
      color1:card.color1,
      color2:card.color2,
      index: index,
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
      let removable = []

      money.map((item)=>{
        removable.push(item.index);
      })

      removable.sort((a,b)=>{return a-b;})

      for(let i=(removable.length)-1;i>=0;i--){

        mon.push(temp[removable[i]]);
        temp.splice(removable[i], 1);

      }

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

  const denial = () =>{
    props.socket.emit("deny", props.room)
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
 const updateDrawn = (index)=>{

    let hand = drawn;
    hand.splice(index, 1)
    console.log("setting drawn")

    setDrawn(hand)

    toggleUpdate()
 }

 const currentAction = (index) =>{
    setAction(index)
 }

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
    props.socket.emit("deal", myCard, mine, op, props.room)
  }

  const placeHouse = (index) =>{
    let temp = container;

    temp[index.container].house+=1;

    setContainer(temp)
    toggleUpdate()
  }

  const placeHotel = (index) =>{
    let temp = container;

    temp[index.container].hotel+=1;

    setContainer(temp)
    toggleUpdate()
  }

  const answering = (bool) =>{
    setAnswer(bool)
    toggleUpdate()
  }

/*
  draggableId,
  type,
  reason,
  source -> droppableId, index
  destination -> droppableId index
*/


  const dragEndFunction = (result) =>{
    const{destination, source, draggableId} = result;

    //if dropped outside of droppable
    if(!destination){return;}

    //if dropped in the same place
    if(destination.droppableId == source.droppableId){
      return
    }

    //if money (convertable) cards are dropped in money section
    if(source.droppableId == "drawn-cards" && destination.droppableId == "money"){
      if(drawn[source.index].category !== "property" && drawn[source.index].category !== "wildcard"){
        placeBank(source.index)
      }
    } //if property card dropped on personal property box (should also create a new property container)
    else if(source.droppableId == "drawn-cards" && destination.droppableId == "personal-property" && draggableId.includes("property")){
      if(draggableId.includes("property")){
        newPropContainer(source.index)
      }      
    } //if wild card containing the same color dropped on property container
    else if(draggableId.includes("wildcard") && source.droppableId == "drawn-cards"){

      let idLength = destination.droppableId.length
      let color = destination.droppableId.substring(0,idLength-1)
      let set = Number(destination.droppableId.substring(idLength-1,idLength))
      
      if(color == drawn[source.index].color1 || color == drawn[source.index].color2 || drawn[source.index].color == 'all'){
        console.log({color, set})
        placeWildCard(source.index, color, set)
      }
    } //if wild card is trasnferred to anothe property container
    else if(draggableId.includes("wildcard")){
      
      let destIdLength = destination.droppableId.length
      let destColor = destination.droppableId.substring(0,destIdLength-1)
      let destSet = Number(destination.droppableId.substring(destIdLength-1,destIdLength))

      let srcIdLength = source.droppableId.length
      let srcColor = source.droppableId.substring(0,srcIdLength-1)
      let srcSet = Number(source.droppableId.substring(srcIdLength-1,srcIdLength))


      switchWildCard({srcColor, srcSet}, {destColor, destSet}, source.index)
    } //if property card is placed on a property container of the same color
    else if(draggableId.includes("property") && source.droppableId == "drawn-cards"){

      let destIdLength = destination.droppableId.length
      let destColor = destination.droppableId.substring(0,destIdLength-1)
      let destSet = Number(destination.droppableId.substring(destIdLength-1,destIdLength))

      if(drawn[source.index].color == destColor){
        appendProperty({destColor, destSet}, source.index)
      }
    }
    else if(draggableId.includes("property")){
      
      let destIdLength = destination.droppableId.length
      let destColor = destination.droppableId.substring(0,destIdLength-1)
      let destSet = Number(destination.droppableId.substring(destIdLength-1,destIdLength))

      let srcIdLength = source.droppableId.length
      let srcColor = source.droppableId.substring(0,srcIdLength-1)
      let srcSet = Number(source.droppableId.substring(srcIdLength-1,srcIdLength))

      switchProperty({srcColor, srcSet}, {destColor, destSet}, source.index)
    }

  }

  const dragStartFunction = (result)=>{
    const {source, type} = result

  }






  return (
    <div className="App">

    {/*Waiting Area Modal*/}
      {!start &&
        <div className="modal">
          <div className="center">
            <div className="starting">
              <div className="waiting">
                <p className="start-text">Joined room: <span className="room-name">{props.room}</span></p>                
                <p className="start-text">Players Joined:</p>
                {joined.length>0 &&
                    <div className="joined-players">
                      {joined.map((user)=>(
                        <p className="joined">{user.name}</p>
                      ))
                      }
                    </div>
                }

                {joined.length==2 && props.resp=="creator" &&
                  <div>
                    <button className="start-button" onClick={()=>{initGame(); setDist(true)}}>Start</button>
                  </div>
                }
              </div>
            </div>          
          </div>
        </div>
      }

    {/*Distributing cards*/}
      {dist &&
        <div className="modal">
          <div className="distribute">
            <p>Distribute cards</p>
            <button onClick={()=>{deal(); setDist(false) }}>Distribute</button>
          </div>
        </div>
      }

      {/*Modal to discard extra cards*/}
      {Epop &&
        <div className="modal">
          <div className="center">
            <h4>DISCARD EXTRA CARDS!</h4>
          </div>
        </div>
      }

      {/*Modal to flip and place wildcard*/}
      {wildpopUp &&
        <div className="modal" onClick={()=>{toggleWildPopup()}}>
          <WildCardPopUp move={move} action={wildAction} change={flip} place={placeProperty}/>
        </div>
      }

      {/*Modal to use rent cards*/}
      {rentpopUp &&
        <div className="modal">
          <RentPopUp move={move} update={updateDrawn} drawn={drawn} pop={toggleRentPopup} get={requestRent} colors={colorRent} cont={container}/>
        </div>
      }

      {/*Modal to pay money*/}
      {payPopup &&
        <div className="modal">
          <PayPopUp deny={denial} drawn={drawn} pop={togglePayPopup}  update={updateDrawn} send={sendPayment} money={moneyTable} property={container}  amount={payAmount}/>
        </div>
      }


      {/*Action cards*/}
      {slyPopup &&
        <div className="modal">
          <SlyPopUp move={move} curr={curAction} update={updateDrawn} opTable={opCont} steal={slySteal} pop={toggleSlyPopup}/>
        </div>
      }

      {breakerPopup &&
        <div className="modal">
          <DealBreakerPopUp move={move} curr={curAction} update={updateDrawn} opTable={opCont} steal={breakSteal} pop={toggleBreakerPopup}/>
        </div>
      }

      {forcedPopup &&
        <div className="modal">
          <ForcedPopUp move={move} curr={curAction} update={updateDrawn} opTable={opCont} container={container} deal={forcedDeal} pop={toggleForcedPopup}/>
        </div>
      }

      {housePop &&
        <div className="modal">
          <HousePopUp move={move} curr={curAction} update={updateDrawn} container={container} place={placeHouse} pop={toggleHouse}/>
        </div>
      }

      {hotelPop &&
        <div className="modal">
          <HotelPopUp move={move} curr={curAction} update={updateDrawn} container={container} place={placeHotel} pop={toggleHotel}/>
        </div>
      }

      {/*Saying NO*/}

      {sayNo &&
        <div className="modal">
          <SayNo answer={answering} update={updateDrawn} drawn={drawn}/>
        </div>
      }

      {deny &&
        <div className="modal">
          <div className="distribute">
            <p>DENIED HAHA!!</p>
          </div>
        </div>
      }

      {/*------------------------DRAG DROP CONTEXT STARTS HERE------------------------*/}
      <DragDropContext onDragEnd={dragEndFunction} onDragStart={dragStartFunction}>


        {/* oppponent property section */}
        <div className="opUser">
          <div className="opUser-img"></div>
          { joined.length > 1 && (props.resp == "creator" ?
            joined[1].name : joined[0].name )
          }
        </div>
        <div className="opponent">

        <Droppable droppableId="opponent-property" direction="horizontal" type="two" isDropDisabled={true}>
        {
          (provided, snapshot)=>(
            <div className="opProperty" {...provided.droppableProps} ref={provided.innerRef}>
              {opCont.length > 0 ? (
                opCont.map((cont, index)=>{
                  return <PropertyContainer opponent={true} completion={complete} pop={toggleWildPopup} property={property} index={index} flip={flip} contains={cont} action={wildActionSet} isOpp={true}/>
                })
              ):(
                <div style={{textAlign:'center', alignItems:'center', display:'flex', justifyContent:'center', color:'white', width:'100%'}}>No Property</div>
              )}
              </div>
          )
        }
         
        </Droppable>
          <Droppable droppableId="op-money" direction="horizontal">
          {
            (provided)=>(
              <div className="opMoney" {...provided.droppableProps} ref={provided.innerRef} type="one">
                {opMoney.length > 0 ? (

                  <div className="moneyTable">

                    {opMoney.map((card, index)=>{
                      if(card.category == "rent"){
                        return <div className="moneyTable-money" style={{left:`${index*45}px`}}><RentCard placed={true} index={index} rent={card} colors={rentColors} isMoney={true}/></div>
                      }else if(card.category == "money"){
                        return <div className="moneyTable-money" style={{left:`${index*45}px`}}><MoneyCard money={card} index={index} placed={true} isMoney={true}/></div>
                      }else if(card.category == "action"){
                        return <div className="moneyTable-money" style={{left:`${index*45}px`}}><ActionCard action={card} index={index} placed={true} isMoney={true}/></div>
                      }      
                    }) }
                    {provided.placeholder}
                    
                  </div>

                  )
                  :
                  (
                    <div className="moneyTable" style={{textAlign:'center', alignItems:'center', display:'flex', justifyContent:'center', color:'white'}}>No Money</div>
                  )
                }
              </div>
            )
          }
          
          </Droppable>
          
        </div>


        
        {/* personal property section */}
        <div className="personal">

          <Droppable droppableId="property-containers" direction="horizontal" type="two" isDropDisabled={false} >
          {
            (provided)=>(
              <div className="personalProperty" {...provided.droppableProps} ref={provided.innerRef}>
                {container.length > 0 ? (
                  container.map((cont, index)=>{
                    return <PropertyContainer turn={turn} oppponent={false} renting={renting} completion={complete} pop={toggleWildPopup} property={property} index={index} flip={flip} contains={cont} action={wildActionSet} dragType={dragType}/>
                  })
                ):(
                  <div style={{textAlign:'center', alignItems:'center', display:'flex', justifyContent:'center', color:'white', width:'300px'}}>No Property</div>
                )}
                {provided.placeholder}
              </div>
            )
          }
          </Droppable>

          <Droppable droppableId="personal-property" direction="horizontal" type="one">
          {
            (provided)=>(
              <div className="new-property" {...provided.droppableProps} ref={provided.innerRef}>
                {provided.placeholder}
              </div>
              
            )
          }
          </Droppable>

          
          
          <div className="personalMoney" >
            <Droppable droppableId="money" direction="horizontal" type="one" className="dd">
            {
              (provided, snapshot)=>(
                <div className="moneyTable" {...provided.droppableProps} ref={provided.innerRef} style={{backgroundColor: snapshot.isDraggingOver ? "skyblue" : "" }}>
                  {moneyTable.length > 0 ? 
                      moneyTable.map((card, index)=>{
                        if(card.category == "rent"){
                          return <div className="moneyTable-money" style={{left:`${index*45}px`}}><RentCard placed={true} index={index} rent={card} colors={rentColors} isMoney={true}/></div>
                        }else if(card.category == "money"){
                          return <div className="moneyTable-money" style={{left:`${index*45}px`}}><MoneyCard money={card} index={index} placed={true} isMoney={true}/></div>
                        }else if(card.category == "action"){
                          return <div className="moneyTable-money" style={{left:`${index*45}px`}}><ActionCard action={card} index={index} placed={true} isMoney={true}/></div>
                        }      
                      }) 
                    :
                    (
                      <div className="moneyTable" style={{textAlign:'center', alignItems:'center', display:'flex', justifyContent:'center', color:'white'}}>No Money</div>
                      )
                  }
                </div>
                )
            }
            </Droppable>
          </div>
           
          
        
        </div>

        {/* drawn cards section */}
        <div className="draw">

          <div className="draw-left">
            <div className="skip" onClick={()=>{
              if(turn){ if(drawn.length > 7){
                  toggleEpop()
                }else pass()
              }}}>
              <p>Pass</p>
            </div>
            <Droppable droppableId="drawn-cards" direction="horizontal" type="one">
            {
              (provided)=>(
                <div className="drawn-cards" {...provided.droppableProps} ref={provided.innerRef}>

                  {drawn.length > 0  ? (
                    
                    drawn.map((card, index)=>{
                      if(card.category ==="property"){
                        return <PropertyCard update={updateDrawn} excess={excess} moves={moves} move={move} place={placeProperty} property={card} index={index} placed={false}/>
                      }else if(card.category === "action"){
                        return <ActionCard update={updateDrawn} excess={excess} current={currentAction} moves={moves} move={move} update={updateDrawn} bank={placeBank} index={index} popForced={toggleForcedPopup} popHotel={toggleHotel} popHouse={toggleHouse} placed={false} popSly={toggleSlyPopup} popBreak={toggleBreakerPopup} action={card} pass={passGo} get={requestRent}/>
                      }else if(card.category === "wildcard"){
                        return <WildCard update={updateDrawn} excess={excess} turn={turn} moves={moves} move={move} index={index} property={property} wild={card} place={placeProperty} placed={false} pop={toggleWildPopup} action={wildActionSet}/>
                      }else if(card.category === "rent"){
                        return <RentCard update={updateDrawn} excess={excess} moves={moves} move={move} bank={placeBank} index={index} rent={card} pop={toggleRentPopup} placed={false} colors={rentColors}/>
                      }else {
                        return <MoneyCard update={updateDrawn} excess={excess} moves={moves} move={move} index={index} place={placeBank} money={card} placed={false}/>
                      }        
                    }) ):( 
                    
                    <p>No cards drawn</p>  )
                  }

                  {provided.placeholder}

                </div>
              )
              

            }
              
            </Droppable>
          </div>

          <div style={{background: `${turn ? "rgb(0, 197, 0)" : "red"}`}} className="turn">
            { joined.length > 1 && (props.resp == "creator" ?
              joined[0].name : joined[1].name )
            }
          </div>
          

        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
