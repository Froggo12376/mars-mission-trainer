const startButton = document.getElementById("start-btn"); 
const titleScreen = document.getElementById("title-screen");
const gameScreen = document.getElementById("game-screen");

startButton.addEventListener("click", function () {
  titleScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
});
