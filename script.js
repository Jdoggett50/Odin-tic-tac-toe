const createPeople = (function(){
    const startBtn = document.querySelector('button');
    const player1Name = document.querySelector('#p1-name');
    const player2Name = document.querySelector('#p2-name');
    const assignments = document.querySelectorAll('input[type="radio"]');

    const makePlayer = (name,assignment) => {
        return {name,assignment};
    };

    let assignmentsArray = [];

    const getAssignment = () => {
        assignmentsArray = [];
        assignments.forEach( index => {
            if(index.checked){
                assignmentsArray.push(index.dataset.player)
            }
        })
    }
    
    startBtn.addEventListener('click', () => {  
        getAssignment()
        let player1 = makePlayer(player1Name.value, assignmentsArray[0]);
        let player2 = makePlayer(player2Name.value, assignmentsArray[1]);
        console.log(player1, player2)
        })
    
    // console.log(player1,player2)
    // return {player1, player2}
})()



