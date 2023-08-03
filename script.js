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

const player1 = {name:'john', assignment:'x',};
const player2 = {name:'haleigh', assignment:'o',};

function switchPlayers(){
    //if every index is empty, return player1 object
    
}
console.log(switchPlayers())

const gameController = (() => {
    //this monitors the state of the board and insertions into the board
    const newBoard = boardModule.getBoard();
    const getPlayer = (name, assignment) => { 
        return {
            name, assignment
        }
    }
    return {
        getPlayer,
    }
})()

