const boardModule = (()=>{
    const board = [[],[],[],[],[],[],[],[],[]];
    
    //returns created board for use in another function
    const getBoard = () => board;
    
    //takes the selection index and assignment and places it inside arr
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
    const player1 = {name:'john', assignment:'x',};
    const player2 = {name:'haleigh', assignment:'o',};
    const players = [player1,player2];
    const newGame = boardModule.getBoard()
    
    //switches player values
    const _cyclePlayers = (arr,players) => {
        const count = arr.filter(index => index != '')
        if(count.length === 0 || count.length % 2 === 0){
            return players[0].assignment;
        } else 
        return players[1].assignment;
    }

    //gets the assignments from the submission of the form and creates
    //the players
    const _setPlayer = (name, assignment) => { 
        return {
            name, 
            assignment,
        }
    }
    
    //returns a boolean whether a win condition is met
    const _checkWin = (arr) => {
        let gameWin = false
        const winCases = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        
        for(const [a,b,c] of winCases){
            if(arr[a].toString() === '' && arr[b].toString() === '' && arr[c].toString() === arr[b].toString()){
                return gameWin
            }   else if (arr[a].toString() === arr[b].toString() && arr[b].toString() === arr[c].toString()) {
                gameWin = true;
            }
        }
        return gameWin
    }
        

    const playRound = () => {
        
    }
    
    const startGame = (arr) => {
        //this will cycle through the turns
        //place the inputs inside the game
    }
    
    return {
        
    }
})()