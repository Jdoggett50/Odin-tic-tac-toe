const boardModule = (function(){
    const generateBoard = () => {
        const spaces = 9;
        const board = [];
        for(let i = 0; i < spaces; i++){
            board.push([]);
        }
        return board;
    }

    //this should hide either main or the gameBoard.
    const hidePage = () => {
        const main = document.querySelector('.form-wrapper');
        main.classList.add('player-info-hide');
    }

    return {
        generateBoard,
        hidePage,
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

    const checkAssignments = () => {
        const assignments = get_Assignments();
        const p1Assignment = assignments[0];
        const p2Assignment = assignments[1];
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
    return checkAssignments();
}


const gameController = ((evt) => {
    
    //initialize the variables that store the data from the form and boardModule
    const players = makePlayers();
    const player1 = players.player1;
    const player2 = players.player2;

    //this creates and returns the board array on function call.
    const get_game_board = () => {
        const boardArray = boardModule.generateBoard();
        return boardArray;
    }
    const newGame = get_game_board();

    //get the data from the player clicks.
    const get_selection_index = (evt) => {
        let playerSelection = evt.target.dataset.index;
        return playerSelection
    }

    //check the selected spaces for an empty value
    const check_index_value = (evt) => {
        //loop over the array until the passed index matches and check for ''
        let selectionIndex = get_selection_index(evt);
        let squareAssignment = evt.target.dataset.assignment;
        for(let i = 0; i <= newGame.length; i++){
            if(i === +selectionIndex && squareAssignment === ''){
                return selectionIndex
            }
        }
        return false
    }

    //place assignment into array
    const insertAssignment = (evt) => {
        //as long as the above function returns true, receive the selection index value
        //and insert player assignment to the arrays index 
        if(check_index_value(evt)){
            let selectionIndex = check_index_value(evt)
            newGame[selectionIndex].push(player1.assignment);
            console.log(newGame)
        }
    }

    return {
        insertAssignment,
    }
})()

const submit = document.querySelector('button');
submit.addEventListener('click', () => {
    //this generates the board 
    //this is responsible for making the form disappear and starting the game 
    
});

const boardWrapper = document.querySelector('.board-wrapper');

boardWrapper.addEventListener('click', (e) => {
    //this is ONLY providing data to the gameController.
    gameController.insertAssignment(e);
    //this houses the function that controls the flow of the game.
})

//trying to get the player assignment to insert into the array. 
//This requires checking the array's index for an undefined value,
//getting the dataset.index value out of the DOM element then placing 
//the value of the player into the boardArray