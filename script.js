const boardModule = (()=>{

    let board = ['','','','','','','','',''];

    const getBoard = () => board;

    const resetBoard = () => board = ['','','','','','','','',''];
     
    const insertAvailable = (selection,arr) => {
        if(!arr[selection] && !gameController.checkWin(arr)){
            screenController.setAssignment(selection,_cyclePlayers(arr));
            return arr[selection] = _cyclePlayers(arr);
        }
    }

    const _cyclePlayers = (arr) => {
        const count = arr.filter(index => index != '')
        if(count.length === 0 || count.length % 2 === 0){
            return playerModule.getPlayers()[0].assignment;
        } else
            return playerModule.getPlayers()[1].assignment;
    }

    return {
        getBoard,
        resetBoard,
        insertAvailable,
    }
})()

const gameController = (() => {

    const checkWin = (arr) => {
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

    const checkTie = (arr) => {
        if(!checkWin(arr) && !arr.includes('')){
            return true;
        } else
        return false

    };

    const _squareClick = () => {
        const board = document.querySelector('.board');
        board.addEventListener('click', (evt) => {
            boardModule.insertAvailable(evt.target.dataset.index,boardModule.getBoard())
            screenController.displayStatus(boardModule.getBoard())
        });
    }

    _squareClick();

    return {
        checkWin,
        checkTie
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

    const _hide = (segment) => {
        return segment.classList.add('no-show');
    }

    const _show = (segment) => {
        return segment.classList.remove('no-show');
    }

    const checkAssignments = (player1,player2) => {
        let isValid = true;
        if (player1 == player2){
            alert('Assignments must differ');
            return isValid = false;
        } 
        return isValid;
    }
    
    const _toggleDisplay = (e) => {
        const statusWrapper = document.querySelector('.status-wrapper');
        const formWrapper = document.querySelector('.form-wrapper');
        const gameWrapper = document.querySelector('.game-wrapper');
        const quitBtn = document.querySelector('.quit-button');
        if(e.target.dataset.btn === 'play-again'){
            boardModule.resetBoard();
            eraseBoard();
        }
        if(e.target.dataset.btn === 'new-game'){
            console.log('reset board, hide board, show form, hide buttons')
            boardModule.resetBoard();
            eraseBoard()
            _hide(quitBtn)
            _hide(statusWrapper);
            _hide(gameWrapper);
            _show(formWrapper);
        }
        if(e.target.dataset.btn === 'start-game'){
            console.log('show board, hide form, getPlayers')
            _hide(formWrapper);
            _show(gameWrapper);
            _show(quitBtn);
            playerModule.getPlayers();
        }
        if(e.target.dataset.btn === 'quit-game'){
            boardModule.resetBoard();
            eraseBoard();
            _hide(quitBtn);
            _hide(gameWrapper);
            _hide(statusWrapper);
            _show(formWrapper);
        }
    }

    const displayStatus = (arr) => { 
        const status = document.querySelector('.status');
        const statusWrapper = document.querySelector('.status-wrapper');
        if(gameController.checkWin(arr)){
            _show(statusWrapper);
            return status.textContent = `Winner is : ${getWinner(gameController.checkWin(arr), playerModule.getPlayers())}`;
        } else if (gameController.checkTie(arr)){
            _show(statusWrapper);
            return status.textContent = `Tie Game`;
        }
    }

    const getWinner = (assignment,players) => {
        for(const player of players){
            if (assignment === player.assignment){
                return player.name;
            };
        };
    };

    const eraseBoard = () => {
        const status = document.querySelector('.status');
        const boardSquares = document.querySelectorAll('.board-square');
        status.textContent = '';
        return boardSquares.forEach(el => el.textContent = '');
    }

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
        checkAssignments,
    }
})();

const playerModule = (()=>{

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


        const setPlayers = () => {
            if(screenController.checkAssignments(p1Assignment,p2Assignment)){
                const player1 = _getInfo(_getP1Name(), p1Assignment);
                const player2 = _getInfo(_getP2Name(), p2Assignment);
                const players = [player1,player2];
                return players;
            }
        }
        return setPlayers();
    }

    return {
        getPlayers,
    }
})()
