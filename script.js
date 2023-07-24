const createPeople = (function(){
    const startBtn = document.querySelector('button');
    const makePlayer = (name,assignment) => {
        return {name, assignment};
    };
    //target the values of the inputs
    const playerNames = document.querySelectorAll('input[type="text"]');
    playerNames.forEach(index => console.log(index.value));

    const playerAssignments = document.querySelectorAll('input[type="radio"]');
    playerAssignments.forEach(index => {
        if(index.checked){
            console.log(index.dataset)
    }
})}
)()


//the main goal of this code is to return 2 objects that are different.
