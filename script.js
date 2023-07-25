const createPeople = (function(){
    const startBtn = document.querySelector('button');
    const player1Name = document.querySelector('#p1-name');
    // const player1X = document.querySelector('#p1-x');
    // const player1O = document.querySelector('#p1-o');
    const player2Name = document.querySelector('#p2-name');
    // const player2X = document.querySelector('#p2-x');
    // const player2O = document.querySelector('#p2-o');
    const assignments = document.querySelectorAll('input[type="radio"]');

    const makePlayer = (name,assignment) => {
        return {name,assignment};
    };

    const getAssignment = () => {
        //return only the index value that return true
        let assignmentsArray = [];
        assignments.forEach( index => {
            if(index.checked){
                assignmentsArray.push(index.dataset.player)
            }
        })
        const player1Assignment = assignmentsArray[0];
        const player2Assignment = assignmentsArray[1];
        return {player1Assignment, player2Assignment}
    }

    console.log(getAssignment.player1Assignment)
    
    // let player1Assignment = giveSelection();
    // let player2Assignment = giveSelection();
    
    let player1 = makePlayer(player1Name.value);
    let player2 = makePlayer(player2Name.value);
    
    console.log(player1,player2)
    
    
})()


//the main goal of this code is to return 2 objects that are different.

// assignments.forEach(index => {
//     if(index.checked){
//         const playerAssignment = index.dataset.player;
//         console.log(playerAssignment)
//     }
// })