const startButton = document.getElementById("start-btn"); // Finds your start button and stores it in a variable named start-btn (startButton)
const titleScreen = document.getElementById("title-screen"); //Finds the element holding titlescreen and stores it in a variable named titleScreen
const gameScreen = document.getElementById("game-screen"); //Finds the element holding gameScreen and stores it in a variable named gameScreen

startButton.addEventListener("click", function () { //tells browser to wait for a click on the start button and then run the function that follows
  titleScreen.classList.add("hidden"); //adds the hidden class to the titleScreen element
  gameScreen.classList.remove("hidden"); //removes the hidden class from the gameScreen element, making it visible
  
});
