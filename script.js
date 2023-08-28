const boardModule = (()=>{

    const board = ['','','','','','','','',''];

    const getBoard = () => board;
    
    //checks array slot for availability and inserts the value if it is available. 
    const insertAvailable = (selection,arr) => {
        if(!arr[selection] && !gameController.checkWin(arr)){
            screenController.setAssignment(selection,_cyclePlayers(arr));
            return arr[selection] = _cyclePlayers(arr);
        }
    }

    const _cyclePlayers = (arr) => {
        const count = arr.filter(index => index != '')
        if(count.length === 0 || count.length % 2 === 0){
            return gameController.getPlayers()[0].assignment;
        } else
            return gameController.getPlayers()[1].assignment;
    }

    return {
        getBoard,
        insertAvailable,
        board,
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
            boardModule.insertAvailable(evt.target.dataset.index,boardModule.getBoard())
            screenController.displayStatus()
        });
    }

    _squareClick();

    return {
        getPlayers,
        checkWin,
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
    
    const _toggleDisplay = (e) => {
        //target all the sections
        const statusWrapper = document.querySelector('.status-wrapper');
        const formWrapper = document.querySelector('.form-wrapper');
        const boardWrapper = document.querySelector('.board-wrapper');
        if(e.target.dataset.btn === 'play-again'){
            console.log('reset board')
            //reset board 
        }
        if(e.target.dataset.btn === 'new-game'){
            console.log('reset board, hide board, show form, hide buttons')
            _hide(statusWrapper);
            _hide(boardWrapper);
            _show(formWrapper);
            //reset board, hide board, show form, hide buttons
        }
        if(e.target.dataset.btn === 'start-game'){
            console.log('show board, hide form, getPlayers')
            _hide(formWrapper);
            _show(boardWrapper);
            gameController.getPlayers();
            //show board, hide form
        }
    }

    //if there is a winner, insert the data received from 
    //the gameController function into another function

    const displayStatus = () => { 
        //target the status container
        const status = document.querySelector('.status');
        const statusWrapper = document.querySelector('.status-wrapper');
        if(gameController.checkWin(boardModule.getBoard())) {
            _show(statusWrapper);
            return status.textContent = `${getWinner(gameController.checkWin(boardModule.getBoard()), gameController.getPlayers())}`
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
