const property = {
    black:{
      category:"property",
      id:"prop1",
      value:2,
      color:"Black",
      nComplete:4,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}, {num:4, price:4}],
      hex:"#262626"
    },
    lightBlue:{
      category:"property",
      id:"prop2",
      value:3,
      color:"Light Blue",
      nComplete:3,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:3}],
      hex:"#8FC4FF"
    },
    green:{
      category:"property",
      id:"prop3",
      value:2,
      color:"Green",
      nComplete:3,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}],
      hex:"#00CB0E"
    },
    yellow:{
      category:"property",
      id:"prop4",
      value:3,
      color:"Yellow",
      nComplete:3,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:3}],
      hex:"#FFE600"
    },
    red:{
      category:"property",
      id:"prop5",
      value:2,
      color:"Red",
      nComplete:3,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}],
      hex:"#EF0000"
    },
    purple:{
      category:"property",
      id:"prop6",
      value:3,
      color:"Purple",
      nComplete:3,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:5}],
      hex:"#6400E6"
    },
    orange:{
      category:"property",
      id:"prop7",
      value:3,
      color:"Orange",
      nComplete:3,
      each:[{num:1, price:2}, {num:2, price:3}, {num:3, price:4}],
      hex:"#FF9900"
    },
    lightGreen:{
      category:"property",
      id:"prop8",
      value:2,
      color:"Light Green",
      nComplete:2,
      each:[{num:1, price:2}, {num:2, price:3}],
      hex:"#7DFF7D"
    },
    blue:{
      category:"property",
      id:"prop9",
      value:3,
      color:"Blue",
      nComplete:2,
      each:[{num:1, price:2}, {num:2, price:3}],
      hex:"#0014C8"
    },
    brown:{
      category:"property",
      id:"prop10",
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
      id:"wild1",
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
      id:"wild2",
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
      id:"wild3",
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
      id:"wild4",
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
      id:"wild5",
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
      id:"wild6",
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
      id:"wild7",
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
      id:"wild8",
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
      id:"wild9",
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
      id:"wild10",
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
      id:"wild11",
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
      id:"rent1",
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
      id:"rent2",
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
      id:"rent3",
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
      id:"rent4",
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
      id:"rent5",
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
      id:"rent6",
      value:2
    }
  }
  
  const action = {
    passGo:{
      name:"Pass and Go",
      num:10,
      message:"Draw 2 cards",
      category:"action",
      value:2,
      id:"action1"
    },
    forceDeal:{
      name:"Forced Deal",
      num:4,
      message:"Choose cards to exchange",
      category:"action",
      value:2,
      id:"action2"
    },
    sayNo:{
      name:"Just Say No",
      num:3,
      message:"Denied!!",
      category:"action",
      value:2,
      id:"action3"
    },
    slyDeal:{
      name:"Sly Deal",
      num:3,
      message:"Pick a card to steal",
      category:"action",
      value:2,
      id:"action4"
    },
    debtCollector:{
      name:"Debt Collector",
      num:3,
      message:"Collect $5",
      category:"action",
      value:2,
      id:"action5"
    },
    birthday:{
      name:"It's My Birthday",
      num:3,
      message:"Collect $2",
      category:"action",
      value:2,
      id:"action6"
    },
    house:{
      name:"House",
      num:3,
      message:"Choose a complete set to put down",
      category:"action",
      value:2,
      id:"action7"
    },
    hotel:{
      name:"Hotel",
      num:3,
      message:"Choose a complete set with a house to put down",
      category:"action",
      value:2,
      id:"action8"
    },
    dealBreaker:{
      name:"Deal Breaker",
      num:2,
      message:"Choose a complete set to steal",
      category:"action",
      value:2,
      id:"action9"
    },
    doubleRent:{
      name:"Double The Rent",
      num:2,
      message:"Double the rent",
      category:"action",
      value:2,
      id:"action10"
    }
  }
  
  const money = {
    $10:{
      value:10,
      num:1,
      category:"money",
      hex:"#FCD187",
      id:"money1",
    },
    $5:{
      value:5,
      num:2,
      category:"money",
      hex:"#D7A2FF",
      id:"money2",
    },
    $4:{
      value:4,
      num:3,
      category:"money",
      hex:"#B4CDFF",
      id:"money3",
    },
    $3:{
      value:3,
      num:3,
      category:"money",
      hex:"#E3FFE4",
      id:"money4",
    },$2:{
      value:2,
      num:5,
      category:"money",
      hex:"#FFC9C9",
      id:"money5",
    },$1:{
      value:1,
      num:6,
      category:"money",
      hex:"#FFDEBE",
      id:"money6",
    },
  }
  
  module.exports =  {property, wild, rent, action, money}