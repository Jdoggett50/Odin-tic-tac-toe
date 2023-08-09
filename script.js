const boardModule = (()=>{
    const board = [[],[],[],[],[],[],[],[],[]];
    
    //returns created board for use in another function
    const getBoard = () => board;
    
    //takes the selection index and assignment and places it inside arr
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
    const player1 = {name:'john', assignment:'x',};
    const player2 = {name:'haleigh', assignment:'o',};
    const players = [player1,player2];
    const newGame = boardModule.getBoard();
    
    //switches player values
    const _cyclePlayers = (arr,players) => {
        const count = arr.filter(index => index != '')
        if(count.length === 0 || count.length % 2 === 0){
            return players[0].assignment;
        } else 
        return players[1].assignment;
    }
    
    //returns a boolean whether a win condition is met
    const _checkWin = (arr) => {
        let gameWinner = false
        const winCases = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        
        for(const [a,b,c] of winCases){
            if(arr[a].toString() === '' && arr[b].toString() === '' && arr[c].toString() === arr[b].toString()){
                return gameWinner
            }   else if (arr[a].toString() === arr[b].toString() && arr[b].toString() === arr[c].toString()) {
                gameWinner = arr[a].toString(); 
            }
        }
        return gameWinner
    };

    const _checkTie = (arr) => {
        if(arr.filter(element => element !== '') && !_checkWin(arr)){
            return true
        }
    }

    //calls the round's game logic
    const playRound = (selection) => {
        boardModule.insertAssignment(selection, _cyclePlayers(newGame,players))
        _checkWin(newGame)
        _checkTie(newGame)
    }

    return {
        playRound
        //winner will be returned from the other IIFE
    }
})()

const screenController = (() => {

    const _makePlayers = () => {
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
            let assignBool = true;
            const assignments = get_Assignments();
            const p1Assignment = assignments[0];
            const p2Assignment = assignments[1];
            if (p1Assignment == p2Assignment){
                assignBool = false;
                alert('Assignments must differ');
            }  
            if(assignBool){
                _hideForm()
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

    const _getWinner = (assignment,players) => {
        for(const player of players){
            if (assignment === player.assignment){
                return player.name;
            }
        };
    };

    const _hideForm = () => {
        //select the form to hide
        const form = document.querySelector('.form-wrapper');
        form.classList.add('no-show');
    }

    const submitClick = () => {
        //create the player
        const submitBtn = document.querySelector('button');
        submitBtn.addEventListener('click', ()=>{
            _makePlayers();
        })
    }

    const squareClick = () => {
        const boardWrapper = document.querySelector('.board-wrapper');
        boardWrapper.addEventListener('click', ()=>{
            //works
        });
    }
    
    submitClick()
    squareClick()

})() 