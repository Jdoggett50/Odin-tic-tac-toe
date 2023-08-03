const boardModule = (()=>{
    //this changes the state of the board.
    const board = [[],[],[],[],[],[],[],[],[]];

    const getBoard = () => board;

    const insertAssignment = (selection,assignment) => {
        if(board[selection].length < 1){
            return board[selection].push(assignment);
        } else 
        return false;
    }

    return {
        getBoard,
        insertAssignment,
    }
})()


const gameController = (() => {
    //this monitors the state of the board and insertions into the board
    const newBoard = boardModule.getBoard();
    const player1 = {name:'john', assignment:'x',};
    const player2 = {name:'haleigh', assignment:'o',};

    const players = [player1,player2];
    const setPlayer = (name, assignment) => { 
        return {
            name, assignment
        }
    }

    let turnCounter = 0;
    const _getassignment = (players) => {
        turnCounter++
        const _switchPlayer = () => {
            if(turnCounter % 2 === 0){
            return players[1].assignment;
            } else
            return players[0].assignment;
        }
        return _switchPlayer()
    }



    return {
        setPlayer,
    }
})()

