const boardModule = (function(){

    const generateBoard = () => {

    }

    const hideForm = () => {
        const main = document.querySelector('.wrapper');
        main.classList.add('player-info-hide');
    }

    return {
        generateBoard,
        hideForm,
    }
})()

const makePlayers = () => {
    const setInfo = (name, assignment) => {
        return {
            name,
            assignment,
        }
    };
    
    const getP1Name = () => {
        const p1Name = document.querySelector('#p1-name');
        return p1Name.value;
    };
    
    const getP2Name = () => {
        const p2Name = document.querySelector('#p2-name');
        return p2Name.value;
    }
    
    const getAssignments = () => {
        const radioAssignments = document.querySelectorAll('input[type="radio"]');
        let assignmentsArray = [];
        radioAssignments.forEach(index => {
            if(index.checked){
                assignmentsArray.push(index.dataset.assignment);
            }
        });
        
        let player1Assignment = assignmentsArray[0];
        let player2Assignment = assignmentsArray[1];
        
        if(player1Assignment == player2Assignment){
            alert('player values must be different');
        } else
        return {
            player1Assignment,
            player2Assignment,
        }
    }
    const checkAssignments = () => {
        if(getAssignments()){
        const {player1Assignment, player2Assignment} = getAssignments();
        let player1 = setInfo(getP1Name(), player1Assignment);
        let player2 = setInfo(getP2Name(), player2Assignment);
        return {
            player1, 
            player2,
        }
        }
    }
    return checkAssignments()   
}

const submit = document.querySelector('button');
submit.addEventListener('click', () => {
    if(makePlayers()){
        boardModule.hideForm();
    }
});


//Below is globally available to any other function that is created.
// const players = makePlayers();
// const player1 = players.player1;
// const player2 = players.player2;

