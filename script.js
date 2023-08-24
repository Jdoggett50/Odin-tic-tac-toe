const boardModule = (()=>{

    const board = ['','','','','','','','',''];

    const getBoard = () => board;
    
    //checks array slot for availability and inserts the value if it is available. 
    const insertAvailable = (selection) => {
        if(!board[selection]){
            screenController.setAssignment(selection,gameController.cyclePlayers(getBoard()))
            return board[selection] = gameController.cyclePlayers(getBoard());
        }
    }

    return {
        getBoard,
        insertAvailable,
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

        const _checkAssignments = () => {
            let assignBool = true;
            if (p1Assignment == p2Assignment){
                alert('Assignments must differ');
                return assignBool = false; 
            }
            return assignBool;
        }
        const setPlayers = () => {
            if(_checkAssignments()){
                screenController.hide();
                const player1 = _getInfo(_getP1Name(), p1Assignment);
                const player2 = _getInfo(_getP2Name(), p2Assignment);
                const players = [player1,player2];
                return players;
            }
        }
        return setPlayers();
    }

    //in this case, arr is the gameBoard arr
    const cyclePlayers = (arr) => {
        //if winner is true, return
        const count = arr.filter(index => index != '')
        if(count.length === 0 || count.length % 2 === 0){
            return getPlayers()[0].assignment;
        } else
            return getPlayers()[1].assignment;
    }

    const checkWin = (arr) => {
        //this needs to either return the winner assignment or false
        const winCases = [ 
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ]

        for(const [a,b,c] of winCases){
            if(arr[a] && arr[b] === arr[a] && arr[b] === arr[c]){
                return arr[a];
            }
        }
        return false;
    }

    const playRound = (evt) => {
        if (checkWin(boardModule.getBoard())){
            return screenController.getWinner(checkWin(boardModule.getBoard()), getPlayers());
        } else (boardModule.insertAvailable(evt.target.dataset.index) && !checkWin(boardModule.getBoard()))
            return boardModule.insertAvailable(evt.target.dataset.index);
    }

    const _squareClick = () => {
        const boardWrapper = document.querySelector('.board-wrapper');
        boardWrapper.addEventListener('click', (evt) => {
            // console.log(`tie is : ${checkTie(boardModule.getBoard())}`);
            console.log(`win is : ${playRound(evt)}`);
        });
    }
    
    _squareClick();

    return {
        getPlayers,
        checkWin,
        cyclePlayers,
    }
})();

const screenController = (() => {
    //monitor the board for a winner, if there is, getWinner
    //look over the array and update the board with the values in 
    //the given array
    
    const getWinner = (assignment,players) => {
        for(const player of players){
            if (assignment === player.assignment){
                return player.name;
            }
        };
    };

    const setAssignment = (selection,assignment) => {
        const squares = document.querySelectorAll('.board-square');
        for(let i = 0; i < squares.length; i++){
            if(selection === squares[i].dataset.index){
                squares[i].textContent = assignment;
            }
        } 
    }

    const hide = () => {
        const form = document.querySelector('.form-wrapper');
        form.classList.add('no-show');
    }

    const _submitClick = () => {
        const submitBtn = document.querySelector('button');
        submitBtn.addEventListener('click', () => {
            gameController.getPlayers();
        })
    }

    _submitClick();
    
    return {
        hide,
        getWinner,
        setAssignment,
    }
})();


function hide(){
    const btnContainer = document.querySelector('.btn-container')
    const content = document.querySelector('.content-wrapper');
    const form = document.querySelector('.form-wrapper');
    // content.classList.add('no-show');
    form.classList.add('no-show');
    btnContainer.classList.add('no-show');
    // form.classList.add('hover-effect');
}

hide()