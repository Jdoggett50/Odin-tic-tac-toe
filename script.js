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
    
    const players = makePlayers();
    const player1 = players.player1;
    const player2 = players.player2;

    const get_index = (evt) => {
        if(evt.target.closest('.board-square').dataset.assignment === ''){
            //should return true and the data-index at the location of the click
            let targetIndex = evt.target.dataset.index; 
            console.log(targetIndex)
            return {
                targetIndex,
            }
        }
    };
    
    const change_player = () => {
        
    }

    const set_index = (player) => {
        // let player = returned value from cycle_player
        // if there is a value not existing at the clicked location
        let isAssigned = true;
        if(isAssigned){
            return player.assignment;
        } 
    }

    //receive the array index that the player has selected.
    //the loop below is looking at all the div.board-squares and returning a matching
    // index with a variable that is passed into it. 

    const match_index = () => {
        //testVar is the variable received from 
        //variable that is received from player assignment
        const assignment = set_index(player1);
        console.log(set_index(player1))
        const boardArray = boardModule.generateBoard();
        for(let i = 0; i < boardArray; i++){
            if(i == matched){
                return boardArray[i].push(assignment);
            };
        };
    };

    match_index()

    return {
        // match_index,
        // get_index,
    }
})()

    //if players exist, create the board
    //player1 always goes first. after player1 logs his selection,
    //switch to player2 
    //don't allow values in squares that have existing values
    //what is a win?
    //what is a tie?

const submit = document.querySelector('button');
submit.addEventListener('click', () => {
    gameController.get_selection();
});

const boardWrapper = document.querySelector('.board-wrapper');

boardWrapper.addEventListener('click', (e) => {
    // gameController.get_index(e);
    // console.log(gameController.match_index());
})
