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
                imgSrc: 'img/primary/' + firstPrefix+ secondPrefix + ".svg",
                hold: false
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

const checkDoubles = () => {

}
const determineWinRate = () => {
    
    checkDoubles()
    setTimeout(function(){
        $("#tempMessage").remove()
        bet()
    
    },3000)


}

const deal = () => {

    const $cardContainer = $('<div>').attr('id','cardContainer')

    for(let i = 0; i<5;i++){
        playerHand.push(deck.pop())
        
        const $videoPokerCard = `<img src='${playerHand[i+1].imgSrc}' class='cards' id='firstRound${i+1}'>`
        $($cardContainer).append($videoPokerCard)
   
    }

    $('body').append($cardContainer)

    $dealSecondButton = $("<button>").attr('id',"dealSecondButton").text("Deal Again")

    $('body').append($dealSecondButton)

    $dealSecondButton.on('click', function(){
        $(this).off()
        secondDeal()
    })


    $(`#firstRound1`).on('click', function(){
        
        if($(this).hasClass("highlight")==false){
            $(this).addClass("highlight")
        }else{
            $(this).removeClass("highlight")
        }
        
        playerHand[1].hold = !playerHand[1].hold
        console.log('setting to true')
    })

    $(`#firstRound2`).on('click', function(){
        
        if($(this).hasClass("highlight")==false){
            $(this).addClass("highlight")
        }else{
            $(this).removeClass("highlight")
        }

        playerHand[2].hold = !playerHand[2].hold
        console.log('setting to true')
    })

    $(`#firstRound3`).on('click', function(){

        if($(this).hasClass("highlight")==false){
            $(this).addClass("highlight")
        }else{
            $(this).removeClass("highlight")
        }

        playerHand[3].hold = !playerHand[3].hold
        console.log('setting to true')
    })

    $(`#firstRound4`).on('click', function(){

        if($(this).hasClass("highlight")==false){
            $(this).addClass("highlight")
        }else{
            $(this).removeClass("highlight")
        }
    
        playerHand[4].hold = !playerHand[4].hold
        console.log('setting to true')
    })

    $(`#firstRound5`).on('click', function(){

        if($(this).hasClass("highlight")==false){
            $(this).addClass("highlight")
        }else{
            $(this).removeClass("highlight")
        }

        playerHand[5].hold = !playerHand[5].hold
        console.log('setting to true')
    })

    
    // select()
}

const secondDeal = () => {

    $('#dealSecondButton').remove()

    for(let i = 0; i< 5; i++){

        if(playerHand[i+1].hold==false){
            playerHand[i+1]=deck.pop()        
        $(`#firstRound${i+1}`).attr("src",`${playerHand[i+1].imgSrc}`).addClass("secondFinish")
        }
    }

    $('body').append("<h1 id='tempMessage'>Evaluating the hand with a *GOOD* Algorithm is probably the hard part, lol, so I don't have that implemented yet.</h1>")
    console.log(playerHand)
    setTimeout(function(){
        determineWinRate()},3000)
 
}

const bet = () => {

    if($("#bet1").hasClass('disabled')){
        console.log("Is this running")
        for(let i=0; i< 5;i++){
            $(`#bet${i+1}`).removeClass("disabled")
            $(`.cards`).remove()
        }

        $('#bet1').on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount =1

            deal()
        })
        
        $('#bet2').on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=2
            deal()
        })
    
        $("#bet3").on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=3
            deal()
        })
    
        $("#bet4").on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=4
            deal()
        })
    
        $("#bet5").on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=5
            deal()
        })
       
    }else{

        $h1 = $("<h1>").text("How much would you like to bet? (Click cards to hold)")
        $('body').append($h1)
        $('h1').append("<br />")
        const $betContainer = $("<div>").attr('id','betContainer')
       
        
        
        for(let i = 1; i<=5; i++){
            $buttonBet = $("<button>")
            $buttonBet.text(`${i}`).addClass('betButton').attr("id", `bet${i}`)
            $($betContainer).append($buttonBet)
        }
    
        $('body').append($betContainer)
    
        //can this be done in the loop?
        $('#bet1').on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount =1
            deal()
        })
        
        $('#bet2').on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=2
            deal()
        })
    
        $("#bet3").on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=3
            deal()
        })
    
        $("#bet4").on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=4
            deal()
        })
    
        $("#bet5").on('click',function(){
            for(let i = 0; i< 5;i++){
                $(`#bet${i+1}`).off().addClass("disabled")
            }
            player.bet = betAmount=5
            deal()
        })
       
    }

}

createDeck()
shuffle()

$(() =>{

    bet()

   
})