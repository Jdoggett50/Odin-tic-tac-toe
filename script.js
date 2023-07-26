//function expressions are not available throughout your code
//function expressions are used in effort to avoid polluting the 
//global namespace. That being said, I think that is what this lesson
//is trying to teach. How to write functions without polluting the
//global namespace and how to utilize factory functions for memory
//management. It wants me to utilize modules for the game
//functionality and it wants me to utilize factory functions to create
//players

//because the data is returned from the function, it's data is
//accessible globally.
const getPlayer = (name, assignment) => {
    return {
        name,
        assignment,
    }
}   

//remember that returning the data from the function, allow access
//to that data.
const setPlayer = () => {
    const p1Name = document.querySelector('#p1-name');
    let player1 = getPlayer('john', 'x');
    console.log(player1)
}

setPlayer()