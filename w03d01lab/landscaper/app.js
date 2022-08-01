
//9:45 start
let playerInput = ""

const landscapeTools = [
    {
        name: 'scissors',
        cost: 5,
        cutRate: 5
    }, {
        name: 'lawnmower',
        cost: 25,
        cutRate: 50
    }, {
        name: 'battery powered lawnmower',
        cost: 250,
        cutRate: 100
    }, {
        name: 'team of starving students',
        cost: 500,
        cutRate: 250
    }]

const player = {
    amountOfMoney: 0,
    currentTool: 'teeth',
    currentCutRate: 1
}


const buy = (playerInput) => {

        if (player.amountOfMoney >= landscapeTools[playerInput].cost) {
            player.amountOfMoney -= landscapeTools[playerInput].cost
            player.currentTool = landscapeTools[playerInput].name
            player.currentCutRate = landscapeTools[playerInput].cutRate

}
}

const checkWin = () => {
    if(player.amountOfMoney >=1000){
        alert("You won!")
    }
}



$(()=> {
    const $cutGrassButton = $("<button>").text("Cut Grass with Current Equipment").addClass("cutGrassButton")
    const $landscapeContainer = $("<div>").addClass("landscapeContainer")
    const $currentMoney = $("<h1>").text(`$${player.amountOfMoney}`).attr("id","moneyCounter")

    $('body').append($cutGrassButton, $currentMoney, $landscapeContainer)
    
    for(let i = 0; i < landscapeTools.length; i++){
        const $landscapeToolsButton = $("<button>").text(`${landscapeTools[i].name} $${landscapeTools[i].cost}`).attr('id',`tools${i}`)
        $('.landscapeContainer').append($landscapeToolsButton)
    }

    
    $('#tools0').on("click",function(){
        if(player.amountOfMoney>=landscapeTools[0].cost){
            buy(0)
            $(this).off('click')
            $(this).addClass('bought')

        $("h1").text(`$${player.amountOfMoney}`)
        }else {
            alert("Not enough money!")
        }
    })

    $('#tools1').on("click",function(){
        if(player.amountOfMoney>=landscapeTools[1].cost){
            buy(1)
            $(this).off('click')
            $(this).addClass('bought')

        $("h1").text(`$${player.amountOfMoney}`)
        }else {
            alert("Not enough money!")
        }
    })


    $('#tools2').on("click",function(){
        if(player.amountOfMoney>=landscapeTools[2].cost){
            buy(2)
            $(this).off('click')
            $(this).addClass('bought')

        $("h1").text(`$${player.amountOfMoney}`)
        }else{
            alert("Not enough money!")
        }
    })


    $('#tools3').on("click",function(){
        if(player.amountOfMoney>=landscapeTools[3].cost){
            buy(3)
            $(this).off('click')
            $(this).addClass('bought')

        $("h1").text(`$${player.amountOfMoney}`)
        }else{
            alert("Not enough money!")
        }
    })

    $('.cutGrassButton').on('click', function(){
        player.amountOfMoney += player.currentCutRate
        $("h1").text(`$${player.amountOfMoney}`)
        console.log("is this being clicked" + player.amountOfMoney)
        checkWin()
    })

})