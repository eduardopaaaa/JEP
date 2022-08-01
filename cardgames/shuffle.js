const username = "Placeholder"
const suite = ["Spades", "Hearts", "Diamonds", "Clubs"]
const cardValue = ["Ace", "2", "3", "4", "5", "6","7","8","9","10","Jack","Queen","King"]
const deck = []

const player = {
    name: username, 
    money: 100, 
    bet: 5,
    hand: []
}

const playerHand = [{}]

let playerInput=""

const createDeck = () => {
    for(let i = 0; i < suite.length;i++){
        for(let j = 0; j<cardValue.length; j++){

            let firstPrefix, secondPrefix

            if(cardValue[j].charAt(0) ==1){
                firstPrefix="T"
            }else{
                firstPrefix=cardValue[j].charAt(0)
            }

            secondPrefix = suite[i].charAt(0)

            deck.push({
                name: "" + cardValue[j] + " of " + suite[i],
                suite: suite[i],
                value: j + 1,
                raw: cardValue[j].charAt(0) + suite[i].charAt(0), 
                imgSrc: firstPrefix+ secondPrefix + ".svg"
            })
        }
    }
}

const shuffle = () => {
    let temp = {}
    let roll = 0

    for(let i = 0; i<deck.length; i++){
        roll = Math.floor(Math.random()*52)
        temp = deck[i]
        deck[i] = deck[roll]
        deck[roll] = temp
    }
}


const select = () => {
    playerInput = prompt("Which cards would you like to keep?")

    for(let i = 1; i <=5; i++){
        if(playerInput.indexOf(i)>-1){
            playerHand[i].holdCard = true 
        }else{
            playerHand[i].holdCard = false
        }
    }
    console.log(playerHand)
    secondDeal()
}

const deal = () => {
    for(let i = 0; i<5;i++){
        playerHand.push(deck.pop())
        console.log(`${i+1} # ${playerHand[i].name}`)
    }
    select()
}

const secondDeal = () => {
    for(let i = 0; i< 5; i++){
        if(playerHand[i].holdCard==false){
            playerHand[i]=deck.pop()
        }
    }
    console.log(playerHand)
}
const bet = () => {
    console.log("How much would you like to bet?")
    console.log("You can bet 1, 2, 3, 4 or 5 credits")
    playerInput = prompt("    choice     :")

    if(playerInput > 0 & playerInput <=5){
        player.bet = playerInput
        deal()
    } else {
        console.log("Thanks for playing, you started with 100 points and you now have " + player.money)
    }

}

createDeck()
// shuffle()
// console.log(deck)
// bet()

$(() =>{

    // const displayCards = () => {
    //     for(let i = 0; i < deck.length; i++){
    //         let $img = `<img src ='img/primary/${deck[i].imgSrc}' id='${deck[i].raw}' class='cards'>`
            
    //         setTimeout(function(){

    //             $('body').append($img)

    //         }, 100*i)
            
    //     }
    // }

    // const removeCards = () => {
    //     // for(let i = 0; i<deck.length; i++){
    //     //     const cardId = '#' + deck[i].raw
    //     //     $(`${cardId}`).attr("src",'img/primary/2B.svg').fadeOut(3000)
    //     // }
    //     $(".cards").attr("src",'img/primary/2B.svg').fadeOut(3000)
    // }
    // displayCards()

    $('body').prepend("<button id='shuffle'>Shuffle</button>")
    // shuffle()
    // $('.cards').fadeOut(1000)
    
    let $shuffle = $("#shuffle")

    $shuffle.click(function(){
        removeCards()
        shuffle()
        setTimeout(function(){
            displayCards()},3001)
    })

    // $(document).on('click',"#shuffle", function(){
        
    //     removeCards()
    //     shuffle()
    //     setTimeout(function(){
    //     displayCards()
    //     }, 3001)
    // })
})