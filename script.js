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
    const check_assignment = (evt) => {
        if(evt.target.closest('.board-square').dataset.assignment === ''){
            console.log('true')
            return true;
        }   else
        console.log('false')
        return false;
    };
    
    const change_player = () => {
        
    }

    const set_assignment = () => {
        let isAssigned = check_assignment();
        if(isAssigned()){
            return 
        }
        
    }



    //receive the array index that the player has selected.
    //the loop below is looking at all the div.board-squares and returning a matching
    // index with a variable that is passed into it. 
    const match_Selection = () => {
        const boardSquares = document.querySelectorAll('.board-square');
        for(let i = 0; i < boardSquares.length; i++){
            if(i == testVar){
                return i;
            };
        };
    };
    return {
        check_assignment,
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
    gameController.check_assignment(e);
})

function checkArray(index) {
    if(testArray[index] == ''){
        return true
    } else 
        return false
}

let currentPlayer = '';
let player1 = 'haleigh'
let player2 = 'john'

let testArray = [[],[],[],[],[]];

function pushArray(index) {
    if(checkArray(index)){
        currentPlayer = player1;
        testArray[index].push(currentPlayer);
    }
    return testArray
}

console.log(pushArray(3))
