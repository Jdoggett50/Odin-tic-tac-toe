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

    //looks at tie on each iteration of the game
    const _checkTie = (arr) => {
        if(arr.filter(element => element !== '') && !_checkWin(arr)){
            return true
        }
    }

    //will receive t/f value to announce winners, value will be give to screencontroller if true
    const _getWinner = (assignment,players) => {
        for(const player of players){
            if (assignment === player.assignment){
                return player.name;
            }
        };
    };

    
    const playRound = (selection,arr) => {
        boardModule.insertAssignment(selection, _cyclePlayers(arr,players))
        _checkWin(arr)
        _checkTie(arr)
    }

    return {
        playRound,
    }
})()

const screenController = (() => {
    //template for creating players
    const _makePlayers = () => {
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

        //receives assignments from DOM
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

        //checks for assignment equality
        const checkAssignments = () => {
            let assignBool = true;
            if (p1Assignment == p2Assignment){
                alert('Assignments must differ');
                return assignBool = false;
            }
            return assignBool;
        }

        //sets the players if the assignments aren't the same
        const setPlayers = () => {
            if(checkAssignments()){
                _hideForm();
                const player1 = _getInfo(_getP1Name(), p1Assignment);
                const player2 = _getInfo(_getP2Name(), p2Assignment);
                return {
                    player1,
                    player2,
                }
            }
        }
        return setPlayers();
    }

    //this will double in functionality. if form is active I want to hide game. 
    //if game is active I want to hide form
    const _hideForm = () => {
        const form = document.querySelector('.form-wrapper');
        form.classList.add('no-show');
    }

    const submitClick = () => {
        //create the player
        const submitBtn = document.querySelector('button');
        submitBtn.addEventListener('click', ()=> {
            _makePlayers();
        })
    }

    const squareClick = () => {
        const boardWrapper = document.querySelector('.board-wrapper');
        boardWrapper.addEventListener('click', (evt)=> {
            
            playRound(evt.target.dataset.index,)
        });
    }

    //remove this
    
    submitClick()
    squareClick()

})() 

/* set the data in one function for use in another function.
on submit click, store the data.

pseudocode is as follows:
function playGame () {
		//data that derives from makePlayers()
		const newBoard = instance of the boardModule;
		const newPlayers = instance of this games players as an array
		const playRound() = () => {
				// this will execute the functions with the data inside 
		}
		return playRound
}

in short playGame will create the instance of game and playround will be returned as a 
method of playGame where it will use the stored data from the submission to play a single round.*/