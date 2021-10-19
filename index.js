
let deckId 
let computerScore = 0;
let playerScore = 0;
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const playerScoreEl = document.getElementById("player-score")


function handleClick(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => { 
        
        deckId = data.deck_id
        document.getElementById("remaining").textContent = `Total Number of cards: ${data.remaining}`
    })
    
}


newDeckBtn.addEventListener("click", handleClick)



drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
     .then(data => {
        remainingText.textContent = `Remaining cards: ${data.remaining}`
         cardsContainer.innerHTML = `<div class="card-slot"><img src=${data.cards[0].image} class="card" /></div>
         <div class="card-slot"><img src=${data.cards[1].image} class="card" /></div>`
         const winner = determineCardWinner(data.cards[0], data.cards[1])
         header.textContent = winner
         if(data.remaining === 0){
            drawCardBtn.disabled = true
            if(computerScore > playerScore){
                header.textContent = "Congratulation computer you have won"
            }
            else if(computerScore < playerScore) {
                header.textContent = "Congratulation player you have won"
            }
            else {
                header.textContent = "it is a tie"
            }
         }
     })
        
    
}) 








// // function callBack(){
// //     console.log("I finally ran")
// // }

// // setTimeout(callBack, 2000) 


// // const people = [
// //     { name: "Jack", hasPet: true },
// //     { name: "Jill", hasPet: false },
// //     { name: "Alice", hasPet: true },
// //     { name: "Bob", hasPet: false },
// // ]

// // function newpetofTrue(person){
// //  return person.hasPet
// // }

// // const PetofTrue = people.filter(newpetofTrue)
  
// // console.log(PetofTrue)


// const people = [
//     { name: "Jack", hasPet: true },
//     { name: "Jill", hasPet: false },
//     { name: "Alice", hasPet: true },
//     { name: "Bob", hasPet: false },
// ]

// function filterArray(array, callBack){
//     const resultingArray = []
//     for(let item of array){
//         const shouldbeIncluded = callBack(item)
//         if(shouldbeIncluded){
//             resultingArray.push(item)
//         }
//     }
//     return resultingArray 
// } 

// const peopleWithpet = filterArray(people, function(person){
//     return person.hasPet
// })

// console.log(peopleWithpet) 



// document.getElementById("new-deck").addEventListener("click", function(){
//     console.log("clicked")
// })

// const voters = [
//     {name: "Joe", email: "joe@joe.com", voted: true},
//     {name: "Jane", email: "jane@jane.com", voted: true},
//     {name: "Bo", email: "bo@bo.com", voted: false},
//     {name: "Bane", email: "bane@bane.com", voted: false}
// ]

// const votedPeople = voters.filter(voter => voter.voted).map(voter => voter.email)
// console.log(votedPeople)
 





function determineCardWinner(card1, card2){
    const valueArrayIndex = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const indexCard1Value = valueArrayIndex.indexOf(card1.value)
    const indexCard2Value = valueArrayIndex.indexOf(card2.value)
    
    if(indexCard1Value > indexCard2Value){
        computerScore++
        computerScoreEl.textContent = `computer score: ${computerScore}`
        return "computer wins"
    }
    else if(indexCard2Value > indexCard1Value){
        playerScore++
        playerScoreEl.textContent = `player score: ${playerScore}` 
       return "player wins"
    }
    else {
        return "War"
    }
 
}
 // const card1obj = {
//     value: "5"
// }

// const card2obj = {
//     value: "QUEEN"
// }
// determineCardWinner(card1obj, card2obj)

  