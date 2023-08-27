const boardModule = (()=>{

    const board = ['','','','','','','','',''];

    const getBoard = () => board;
    
    //checks array slot for availability and inserts the value if it is available. 
    const insertAvailable = (selection) => {
        if(!board[selection] && !gameController.checkWin(getBoard())){
            screenController.setAssignment(selection,gameController.cyclePlayers(getBoard()));
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
                // screenController.hide();
                const player1 = _getInfo(_getP1Name(), p1Assignment);
                const player2 = _getInfo(_getP2Name(), p2Assignment);
                const players = [player1,player2];
                return players;
            }
        }
        return setPlayers();
    }

    const cyclePlayers = () => {
        const count = boardModule.getBoard().filter(index => index != '')
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
                return arr[a]
            }
        }
        return false;
    }

    const _squareClick = () => {
        const boardWrapper = document.querySelector('.board-wrapper');
        boardWrapper.addEventListener('click', (evt) => {
            boardModule.insertAvailable(evt.target.dataset.index)
            console.log(boardModule.getBoard())
            console.log(screenController.displayStatus())
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

    const _btnListeners = () => {
        const btns = document.querySelectorAll('button');
        return btns.forEach(btn => btn.addEventListener('click', (evt) => {
            _toggleDisplay(evt);
        }))
    }
    _btnListeners();

    const _toggleDisplay = (e) => {
        if(e.target.dataset.btn === 'play-again'){
            console.log('reset board')
            //reset board 
        }
        if(e.target.dataset.btn === 'new-game'){
            console.log('reset board, hide board, show form, hide buttons')
            //reset board, hide board, show form, hide buttons
        }
        if(e.target.dataset.btn === 'start-game'){
            console.log('show board, hide form, getPlayers')
            //show board, hide form
        }
    }

    //if there is a winner, insert the data received from 
    //the gameController function into another function

    const displayStatus = () => { 
        //target the status container
        const status = document.querySelector('.status');
        if(gameController.checkWin(boardModule.getBoard())) {
            status.textContent = `${getWinner(gameController.checkWin(boardModule.getBoard()), gameController.getPlayers())}`
        }
    }
    

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
    
    return {
        getWinner,
        setAssignment,
        displayStatus,
    }
})();


function hide(){
    const formWrapper = document.querySelector('.form-wrapper');
    const statusWrapper = document.querySelector('.status-wrapper');
    const boardWrapper = document.querySelector('.board-wrapper');
    formWrapper.classList.add('no-show');
    // boardWrapper.classList.add('no-show');
    // statusWrapper.classList.add('no-show');
}

hide()