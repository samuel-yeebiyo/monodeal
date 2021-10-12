import {useState, useRef, useEffect} from 'react' 


import './App.css';

import './components/css/start.css'


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
import HousePopUp from './components/HousePopUp';
import HotelPopUp from './components/HotelPopUp';
import SayNo from './components/SayNo';

//popups
import WildCardPopUp from './components/WildCardPopUp';
import RentPopUp from './components/RentPopUp';



const property = {
  black:{
    category:"property",
    value:2,
    color:"Black",
    nComplete:4,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}, {num:4, price:4}],
    hex:"#262626"
  },
  lightBlue:{
    category:"property",
    value:3,
    color:"Light Blue",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:3}],
    hex:"#8FC4FF"
  },
  green:{
    category:"property",
    value:2,
    color:"Green",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}],
    hex:"#00CB0E"
  },
  yellow:{
    category:"property",
    value:3,
    color:"Yellow",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:3}],
    hex:"#FFE600"
  },
  red:{
    category:"property",
    value:2,
    color:"Red",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}],
    hex:"#EF0000"
  },
  purple:{
    category:"property",
    value:3,
    color:"Purple",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:5}],
    hex:"#6400E6"
  },
  orange:{
    category:"property",
    value:3,
    color:"Orange",
    nComplete:3,
    each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}],
    hex:"#FF9900"
  },
  lightGreen:{
    category:"property",
    value:2,
    color:"Light Green",
    nComplete:2,
    each:[{num:1, price:2}, {num:2, price:3}],
    hex:"#7DFF7D"
  },
  blue:{
    category:"property",
    value:3,
    color:"Blue",
    nComplete:2,
    each:[{num:1, price:2}, {num:2, price:3}],
    hex:"#0014C8"
  },
  brown:{
    category:"property",
    value:3,
    color:"Brown",
    nComplete:2,
    each:[{num:1, price:2}, {num:2, price:3}],
    hex:"#7D4B00"
  }
}

const wild = {
  'purple and orange1':{
    num:1,
    color1:'Purple',
    color2:'Orange',
    hex1:"#6400E6",
    hex2:"#FF9900",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'purple and orange2':{
    num:1,
    color1:'Purple',
    color2:'Orange',
    hex1:"#6400E6",
    hex2:"#FF9900",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'red and yellow1':{
    num:1,
    color1:'Red',
    color2:'Yellow',
    hex1:"#EF0000",
    hex2:"#FFE600",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'red and yellow2':{
    num:1,
    color1:'Red',
    color2:'Yellow',
    hex1:"#EF0000",
    hex2:"#FFE600",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'light blue and brown':{
    num:1,
    color1:'Light Blue',
    color2:'Brown',
    hex1:"#8FC4FF",
    hex2:"#7D4B00",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'light blue and black':{
    num:1,
    color1:'Light Blue',
    color2:'Black',
    hex1:"#8FC4FF",
    hex2:"#262626",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'blue and green':{
    num:1,
    color1:'Blue',
    color2:'Green',
    hex1:"#0014C8",
    hex2:"#00CB0E",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'black and green':{
    num:1,
    color1:'Black',
    color2:'Green',
    hex1:"#262626",
    hex2:"#00CB0E",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:2,
    selected:'None'
  },
  'light green and black':{
    num:1,
    color1:'Light Green',
    color2:'Black',
    hex1:"#7DFF7D",
    hex2:"#262626",
    selectedHex:"#FFFF",
    category:'wildcard',
    value:1,
    selected:'None'
  },
  'wild property1':{
    num:1,
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
  'wild property2':{
    num:1,
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
    hex1:"#6400E6",
    hex2:"#FF9900",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "black and light green":{
    color1: "Black",
    color2: "Light Green",
    hex1:"#262626",
    hex2:"#7DFF7D",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "green and blue":{
    color1: "Green",
    color2: "Blue",
    hex1:"#00CB0E",
    hex2:"#0014C8",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "brown and light blue":{
    color1: "Brown",
    color2: "Light Blue",
    hex1:"#7D4B00",
    hex2:"#8FC4FF",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "red and yellow":{
    color1: "Red",
    color2: "Yellow",
    hex1:"#EF0000",
    hex2:"#FFE600",
    message: "Pick a property to apply rent",
    category:"rent",
    num:2,
    value:2
  },
  "wild rent":{
    color1: "all",
    color2: "all",
    hex1:"#FFFF",
    hex2:"#FFFF",
    message: "Pick a property to apply rent",
    category:"rent",
    num:3,
    value:2
  }
}

const action = {
  passGo:{
    name:"Pass and Go",
    num:10,
    message:"Draw 2 cards",
    category:"action",
    value:2
  },
  forceDeal:{
    name:"Forced Deal",
    num:4,
    message:"Choose cards to exchange",
    category:"action",
    value:2
  },
  sayNo:{
    name:"Just Say No",
    num:3,
    message:"Denied!!",
    category:"action",
    value:2
  },
  slyDeal:{
    name:"Sly Deal",
    num:3,
    message:"Pick a card to steal",
    category:"action",
    value:2
  },
  debtCollector:{
    name:"Debt Collector",
    num:3,
    message:"Collect $5",
    category:"action",
    value:2
  },
  birthday:{
    name:"It's My Birthday",
    num:3,
    message:"Collect $2",
    category:"action",
    value:2
  },
  house:{
    name:"House",
    num:3,
    message:"Choose a complete set to put down",
    category:"action",
    value:2
  },
  hotel:{
    name:"Hotel",
    num:3,
    message:"Choose a complete set with a house to put down",
    category:"action",
    value:2
  },
  dealBreaker:{
    name:"Deal Breaker",
    num:2,
    message:"Choose a complete set to steal",
    category:"action",
    value:2
  },
  doubleRent:{
    name:"Double The Rent",
    num:2,
    message:"Double the rent",
    category:"action",
    value:2
  }
}

const money = {
  $10:{
    value:10,
    num:1,
    category:"money",
    hex:"#FCD187"
  },
  $5:{
    value:5,
    num:2,
    category:"money",
    hex:"#D7A2FF"
  },
  $4:{
    value:4,
    num:3,
    category:"money",
    hex:"#B4CDFF"
  },
  $3:{
    value:3,
    num:3,
    category:"money",
    hex:"#E3FFE4"
  },$2:{
    value:2,
    num:5,
    category:"money",
    hex:"#FFC9C9"
  },$1:{
    value:1,
    num:6,
    category:"money",
    hex:"#FFDEBE"
  },
}


function App(props) {

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
  const [sayNo, showSayNo] = useState(true)  //should be true
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
    console.log("I have ", moves, " moves(s)")
    console.log("Excess: ", excess)
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
    props.socket.emit("updateDeck", deck, props.room)
    
    props.socket.emit("updateProperty", container, props.room)

    props.socket.emit("updateMoney", moneyTable, props.room)

    console.log(container)

  }, [update])



  useEffect(()=>{
    toggleSayNo()
  }, [no])

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

  props.socket.off("dist").on("dist", ()=>{
    draw(5)
  })

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

  Object.values(rent).forEach(val => {
    for(let i=0; i<val.num; i++){
      batch = [...batch, val]
    }
  })

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



  return (
    <div className="App">

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


      {dist &&
        <div className="modal">
          <div className="distribute">
            <p>Distribute cards</p>
            <button onClick={()=>{deal(); setDist(false) }}>Distribute</button>
          </div>
        </div>
      }

      {Epop &&
        <div className="modal">
          <div className="center">
            <h4>DISCARD EXTRA CARDS!</h4>
          </div>
        </div>
      }

      {wildpopUp &&
        <div className="modal" onClick={()=>{toggleWildPopup()}}>
          <WildCardPopUp move={move} action={wildAction} change={flip} place={placeProperty}/>
        </div>
      }

      {rentpopUp &&
        <div className="modal">
          <RentPopUp move={move} update={updateDrawn} drawn={drawn} pop={toggleRentPopup} get={requestRent} colors={colorRent} cont={container}/>
        </div>
      }

      {payPopup &&
        <div className="modal">
          <PayPopUp deny={denial} drawn={drawn} pop={togglePayPopup} send={sendPayment} money={moneyTable} property={container} amount={payAmount}/>
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
          <SayNo answer={answering} update={updateDrawn} drawn={drawn} />
        </div>
      }

      {deny &&
        <div className="modal">
          <div className="distribute">
            <p>DENIED HAHA!!</p>
          </div>
        </div>
      }


      {/* oppponent property section */}
      <div className="opponent">

        <div className="opMoney">
        {opMoney.length > 0 ? (
          <div className="moneyTable">

            {opMoney.map((card, index)=>{
              if(card.category == "rent"){
                return <div className="moneyTable-money" style={{left:`${index*45}px`}}><RentCard placed={true} rent={card} pop={toggleRentPopup} colors={rentColors}/></div>
              }else if(card.category == "money"){
                return <div className="moneyTable-money" style={{left:`${index*45}px`}}><MoneyCard money={card} index={index} placed={true}/></div>    
              }else if(card.category == "action"){
                return <div className="moneyTable-money" style={{left:`${index*45}px`}}><ActionCard action={card} index={index} placed={true}/></div>
              }  
            }) }
          </div>
          )
          :
          (<p>No Money</p>)
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
              return <PropertyContainer turn={turn} oppponent={false} renting={renting} completion={complete} pop={toggleWildPopup} property={property} index={index} flip={flip} contains={cont} action={wildActionSet}/>
            })
          ):(
            <p>No property placed</p>
          )}
        </div>
        <div className="personalMoney">
        {moneyTable.length > 0 ? (
          <div className="moneyTable">

            {moneyTable.map((card, index)=>{
              if(card.category == "rent"){
                return <div className="moneyTable-money" style={{left:`${index*45}px`}}><RentCard placed={true} index={index} rent={card} colors={rentColors}/></div>
              }else if(card.category == "money"){
                return <div className="moneyTable-money" style={{left:`${index*45}px`}}><MoneyCard money={card} index={index} placed={true}/></div>
              }else if(card.category == "action"){
                return <div className="moneyTable-money" style={{left:`${index*45}px`}}><ActionCard action={card} index={index} placed={true}/></div>
              }      
            }) }
            
          </div>
          )
          :
          (<p>No Money</p>)
        }
        </div>
      
      </div>

      {/* drawn cards section */}
      <div className="draw">
        <div className="drawn-cards">
          {drawn.length > 0  ? (
            
            drawn.map((card, index)=>{
              if(card.category ==="property"){
                return <PropertyCard update={updateDrawn} excess={excess} moves={moves} move={move} place={placeProperty} property={card} index={index} placed={false}/>
              }else if(card.category === "action"){
                return <ActionCard update={updateDrawn} excess={excess} current={currentAction} moves={moves} move={move} update={updateDrawn} bank={placeBank} index={index} popForced={toggleForcedPopup} popHotel={toggleHotel} popHouse={toggleHouse} placed={false} popSly={toggleSlyPopup} popBreak={toggleBreakerPopup} action={card} pass={passGo} get={requestRent}/>
              }else if(card.category === "wildcard"){
                return <WildCard update={updateDrawn} excess={excess} turn={turn} moves={moves} move={move} index={index} wild={card} place={placeProperty} placed={false} pop={toggleWildPopup} action={wildActionSet}/>
              }else if(card.category === "rent"){
                return <RentCard update={updateDrawn} excess={excess} moves={moves} move={move} bank={placeBank} index={index} rent={card} pop={toggleRentPopup} placed={false} colors={rentColors}/>
              }else {
                return <MoneyCard update={updateDrawn} excess={excess} moves={moves} move={move} index={index} place={placeBank} money={card} placed={false}/>
              }        
            }) ):( 
            
            <p>No cards drawn</p>  )
          }
        </div>

        <div className="skip" onClick={()=>{
          if(drawn.length > 7){
            toggleEpop()
          }else pass()
          }}><p>Pass</p>
        </div>

      </div>
    </div>
  );
}

export default App;
