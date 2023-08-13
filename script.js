const boardModule = (()=>{
    const board = [[],[],[],[],[],[],[],[],[]];
    
    const getBoard = () => board;
    
    const insertAssignment = (selection,assignment) => {
        if(board[selection].length < 1){
            return board[selection].push(assignment);
        } return false
    }

    return {
        getBoard,
        insertAssignment,
    }
})()

const gameController = (() => {
    const getPlayers = () => {
        const _getInfo = (name, assignment) => {
            return {
                name,
                assignment,
            }
        };
        
        const _getP1Name = () => {
            const p1Name = document.querySelector('#p1-name');
            return p1Name.value;
        };

        const _getP2Name = () => {
            const p2Name = document.querySelector('#p2-name');
            return p2Name.value;
        }

        const _getAssignments = () => {
            const radioAssignments = document.querySelectorAll('input[type="radio"]');
            let assignmentsArray = [];
            radioAssignments.forEach(index => { 
                if(index.checked){
                    assignmentsArray.push(index.dataset.assignment);
                }
            });
            return assignmentsArray;
        }
        
        const assignments = _getAssignments();
        const p1Assignment = assignments[0];
        const p2Assignment = assignments[1];

        const checkAssignments = () => {
            let assignBool = true;
            if (p1Assignment == p2Assignment){
                alert('Assignments must differ');
                return assignBool = false;
            }
            return assignBool;
        }
        const setPlayers = () => {
            if(checkAssignments()){
                screenController.hideForm();
                const player1 = _getInfo(_getP1Name(), p1Assignment);
                const player2 = _getInfo(_getP2Name(), p2Assignment);
                const players = [player1,player2];
                return players
            }
        }
        return setPlayers()
    }

    //in this case, arr is the gameBoard arr
    const _cyclePlayers = (arr) => {
        const count = arr.filter(index => index != '')
        if(count.length === 0 || count.length % 2 === 0){
            return getPlayers()[0].assignment;
        } else
            return getPlayers()[1].assignment;
    }

    const checkWin = (arr) => {
        let winner = false;
        const winCases = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        
        for(const [a,b,c] of winCases){
            if(arr[a].toString() === '' && arr[b].toString() === '' && arr[c].toString() === arr[b].toString()){
                return winner
            }   else if (arr[a].toString() === arr[b].toString() && arr[b].toString() === arr[c].toString()) {
                winner = arr[a].toString(); 
            }
        }
        return winner
    };

    const checkTie = (arr) => {
        if(arr.filter(element => element !== '') && !checkWin(arr)){
            return true
        }
    };

    const getWinner = (assignment,players) => {
        for(const player of players){
            if (assignment === player.assignment){
                return player.name;
            }
        };
    };

    const squareClick = () => {
        const boardWrapper = document.querySelector('.board-wrapper');
        boardWrapper.addEventListener('click', (evt) => {
            boardModule.insertAssignment(evt.target.dataset.index,_cyclePlayers(boardModule.getBoard()))
            screenController.gameStatus()
            console.log(boardModule.getBoard())
        });
    }
    squareClick();

    return {
        getPlayers,
        checkTie,
        checkWin,
        getWinner,
    }
})()

const screenController = (() => {
    //monitor the board for a winner, if there is, getWinner
    //look over the array and update the board with the values in 
    //the given array

    const gameStatus = () => {
        const winner = false;
        if(gameController.checkTie(boardModule.getBoard())){
            //monitor the board for a tie, if there is, 
            // two buttons should appear at bottom to 
            // play again or new game, if it's a new game,
            // hide the game and display the form
            //if it's play again, wipe the board clean. 

        } 
        if(gameController.checkWin(boardModule.getBoard())){
            console.log(`winner is: ${gameController.getWinner(gameController.checkWin(boardModule.getBoard()),gameController.getPlayers())}`);
        }
    }



    const hideForm = () => {
        const form = document.querySelector('.form-wrapper');
        form.classList.add('no-show');
    }

    const submitClick = () => {
        const submitBtn = document.querySelector('button');
        submitBtn.addEventListener('click', () => {
            gameController.getPlayers();
        })
    }

    submitClick()
    
    return {
        hideForm,
        gameStatus,
    }
})() 
