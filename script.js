const boardModule = (function(){

    const generateBoard = () => {

        const getSpaces = () => { 
            const spaces = 9;
            const board = [];
            for(let i = 0; i < spaces; i++){
                board.push([]);
            }
            return board;
        }

        // const display_Squares = () => {
        //     if(getSpaces()) {
                
        //     }
        // }

        return {
            // display_Squares,
            getSpaces,
        }
    }

    //this can hide either main or the gameBoard.
    const hideForm = () => {
        const main = document.querySelector('.form-wrapper');
        main.classList.add('player-info-hide');
    }

    return {
        generateBoard,
        hideForm,
    }
})()

const makePlayers = () => {
    const set_Info = (name, assignment) => {
        return {
            name,
            assignment,
        }
    };
    
    const get_P1Name = () => {
        const p1Name = document.querySelector('#p1-name');
        return p1Name.value;
    };
    
    const get_P2Name = () => {
        const p2Name = document.querySelector('#p2-name');
        return p2Name.value;
    }

    const get_Assignments = () => {
        const radioAssignments = document.querySelectorAll('input[type="radio"]');
        let assignmentsArray = [];
        radioAssignments.forEach(index => {
            if(index.checked){
                assignmentsArray.push(index.dataset.assignment);
            }
        });
        return assignmentsArray;
    }

    const checkAssignments = ()=> {
        const assignments = get_Assignments();
        const p1Assignment = assignments[0];
        const p2Assignment = assignments[1]
        if (p1Assignment == p2Assignment){
            return alert('Assignments must differ');
        }  
        const player1 = set_Info(get_P1Name(), p1Assignment);
        const player2 = set_Info(get_P2Name(), p2Assignment);
        return {
            player1,
            player2,
        }
    }
    return checkAssignments()
}

const submit = document.querySelector('button');
submit.addEventListener('click', () => {
    //this should be handled in a control flow object or module
    //right now it is in here for testing purposes.
    const players = makePlayers();
    const player1 = players.player1;
    const player2 = players.player2;
    if(player1 || player2){
        const newBoard = boardModule.generateBoard();
        newBoard.hideForm();
    }
});

//when I generateBoard, the divs and array are supposed to be empty
//on click of the submit button, generate the board  


//Below is globally available to any other function that is created.
// const getPlayers = makePlayers();
// const players = getPlayers.setPlayers();
// let player1 = players.player1;
// let player2 = players.player2;
