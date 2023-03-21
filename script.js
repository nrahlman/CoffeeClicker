/* eslint-disable no-alert */

/***The line below allows us to access the data from the window object.
 * This comes from the data.js file***/
const data = window.data;

/***Before we can begin manipulating the DOM we need to gain access to two DOM Nodes***/
// 1. Declare a variable bigCoffee that holds reference to the element with id 'big_coffee'.
// your code here
const bigCoffee=document.getElementById("big_coffee")
// 2. Declare a variable producerContainer that holds reference to the element with id 'producer_container'.
// your code here
const producerContainer=document.getElementById("producer_container")

/***Don't worry about the specifics of the condition in this if statement for now.
 * Just follow the instructions in it to ensure the application has base functionality.
 * We'll discuss in depth later what process is, but it's not necessary just yet.***/
if (typeof process === 'undefined') {
  /********************
   *   Event Listeners
   ********************/

  /* 1. Add a 'click' event listener to the bigCoffee element(giant coffee emoji) you referenced above.
   * It should call the clickCoffee function below and be passed the global data object.*/
  // your code here
bigCoffee.addEventListener("click", (event)=>{clickCoffee(data)})
  /* 2. Add a 'click' event listener to the producerContainer(Coffee Producers panel) you referenced above.
   * It should call the buyButtonClick function below and be passed the browser event and global data object.*/
  // your code here
producerContainer.addEventListener("click", (event)=>{buyButtonClick(event, data)})
  // You don't need to edit this line of code. It calls the tick function passing in the data object every 1000ms or 1s.
  setInterval(() => tick(data), 1000);
}

// Now you're ready to start running the tests. Good luck!

/**************
 *   SLICE 1
 **************/

function updateCoffeeView(coffeeQty) {
  // your code here
  let coffeeCounter= document.getElementById("coffee_counter");
  coffeeCounter.innerText=coffeeQty;
  
}

function clickCoffee(data) {
  // your code here
  data.coffee++;
  updateCoffeeView(data.coffee);
  renderProducers(data);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, coffeeCount) {
  // your code here
  producers.forEach(element=>{
  if(coffeeCount>=element.price/2){
    element.unlocked=true;
  }
}
)
}

function getUnlockedProducers(data) {
  // your code here
const showUnlocked=data.producers.filter(element=>element.unlocked===true)
return showUnlocked}

function makeDisplayNameFromId(id) {
  const newWord = id.split('_');
  const titleCase = newWord.map(element => element.charAt(0).toUpperCase() + element.slice(1)).join(" ");
  return titleCase;
  // your code here
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
  const containerDiv = document.createElement('div');
  containerDiv.className = 'producer';
  const displayName = makeDisplayNameFromId(producer.id);
  const currentCost = producer.price;
  const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Coffee/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} coffee</div>
  </div>
  `;
  containerDiv.innerHTML = html;
  return containerDiv;
}

function deleteAllChildNodes(parent) {
  // your code here
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}

function renderProducers(data) {
  // your code here
  let producerContainer = document.getElementById("producer_container");
  deleteAllChildNodes(producerContainer);
  unlockProducers(data.producers, data.coffee);
  for(let i=0; i<data.producers.length; i++){
    if(data.producers[i].unlocked === true){
      producerContainer.appendChild(makeProducerDiv(data.producers[i]));
    }
  }
}

/**************
 *   SLICE 3
 **************/

function getProducerById(data, producerId) {
  // your code here
let producer=data.producers.filter((producer)=>producer.id===producerId);
return producer[0];
}

function canAffordProducer(data, producerId) {
  // your code here
  if (data.coffee > getProducerById(data, producerId).price) {
    return true;
  }
 else {
  return false;
 }
}

function updateCPSView(cps) {
  let CPS=document.getElementById("cps");
  CPS.innerText=cps;
  // your code here
}

function updatePrice(oldPrice) {
  // your code here
  return Math.floor(oldPrice*1.25)
}

function attemptToBuyProducer(data, producerId) {
  // your code here
  let producer = getProducerById(data, producerId)
  if(data.coffee > producer.price){
    data.coffee -= producer.price;
    data.totalCPS += producer.cps;
    producer.qty ++;
    producer.price = Math.floor(producer.price * 1.25);
    return true;
  } else {
    return false;
  }
}

function buyButtonClick(event, data) {
  if(event.target.tagName === "BUTTON"){
    const producerId = event.target.id.slice(4)
    if(attemptToBuyProducer(data, producerId)){
renderProducers(data);
updateCoffeeView(data.coffee)
updateCPSView(data.totalCPS)
    } else {
      window.alert("Not enough coffee!");
    }
  }
  // your code here

}

function tick(data) {
  // your code here
  data.coffee+=data.totalCPS;
  updateCoffeeView(data.coffee);
  renderProducers(data);
}

/**********************************
 *  Congratulations! You did it!
 **********************************/

// You don't need to edit any of the code below
// If we aren't in a browser and are instead in node
// we'll need to export the code written here so we can import and
// run the tests in Mocha. More on this later.
// Don't worry if it's not clear exactly what's going on here.
if (typeof process !== 'undefined') {
  console.log('------> process here!!!!!: ', process);
  module.exports = {
    updateCoffeeView,
    clickCoffee,
    unlockProducers,
    getUnlockedProducers,
    makeDisplayNameFromId,
    makeProducerDiv,
    deleteAllChildNodes,
    renderProducers,
    updateCPSView,
    getProducerById,
    canAffordProducer,
    updatePrice,
    attemptToBuyProducer,
    buyButtonClick,
    tick,
  };
}
