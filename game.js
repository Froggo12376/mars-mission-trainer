
/* START TO LOAD SCREEN */
const startButton = document.getElementById("start-btn"); // Finds your start button and stores it in a variable named start-btn (startButton)
const titleScreen = document.getElementById("title-screen"); //Finds the element holding titlescreen and stores it in a variable named titleScreen
const loadingScreen = document.getElementById("loading-screen"); //Finds the element holding gameScreen and stores it in a variable named gameScreen

startButton.addEventListener("click", function () { //tells browser to wait for a click on the start button and then run the function that follows
  titleScreen.classList.add("hidden"); //adds the hidden class to the titleScreen element
  loadingScreen.classList.remove("hidden"); //removes the hidden class from the gameScreen element, making it visible
  
});


/* LOAD TO COMMAND CENTER SCREEN */
const commandCenterButton = document.getElementById("command-btn");
const commandCenterScreen = document.getElementById("command-page"); 

commandCenterButton.addEventListener("click", function () { //tells browser to wait for a click on the start button and then run the function that follows
  loadingScreen.classList.add("hidden"); //adds the hidden class to the titleScreen element
  commandCenterScreen.classList.remove("hidden"); //removes the hidden class from the gameScreen element, making it visible
});

//Fetch API data and display it on the command center screen
checkMarsWeather();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --- EXISTING CODE (Just add the one line inside commandCenterButton) ---
commandCenterButton.addEventListener("click", function () {
  loadingScreen.classList.add("hidden"); 
  commandCenterScreen.classList.remove("hidden");
  
  checkMarsWeather(); // <-- ADD THIS ONE LINE HERE
});


// --- NEW: PASTE EVERYTHING BELOW THIS LINE AT THE BOTTOM OF game.js ---
async function checkMarsWeather() {
  const url = 'https://ccmc.gsfc.nasa.gov/DONKI-API/get/notifications?type=ALL';
  const eventTextView = document.getElementById("event-text");
  eventTextView.innerText = "Scanning deep-space telemetry from NASA...";

  try {
    const response = await fetch(url);
    const notifications = await response.json();

    // Find any alert mentioning Mars
    let marsAlert = null;
    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].messageBody.includes("Mars")) {
        marsAlert = notifications[i];
        break;
      }
    }

    if (marsAlert) {
      triggerEmergency(
        "NASA Alert: Solar storm detected near Mars orbit!",
        "Shield Habitat (-30% Power)",
        "Reroute Air Reserves (-10% Oxygen)",
        function() { eventTextView.innerText = "Hab shields locked! Radiation deflected."; },
        function() { eventTextView.innerText = "Air scrubbers maximized. Crew is safe."; }
      );
    } else {
      eventTextView.innerText = "All systems nominal. No solar storms threatening Mars.";
    }
  } catch (error) {
    eventTextView.innerText = "Sensor array offline. Operating on local backup.";
  }
}

function triggerEmergency(emergencyMessage, choiceAText, choiceBText, callbackA, callbackB) {
  const eventTextView = document.getElementById("event-text");
  eventTextView.innerHTML = "🚨 **CRISIS ALERT:** " + emergencyMessage;

  const choiceContainer = document.getElementById("choice-container");
  const btnA = document.getElementById("choice-a-btn");
  const btnB = document.getElementById("choice-b-btn");

  btnA.innerText = choiceAText;
  btnB.innerText = choiceBText;
  choiceContainer.classList.remove("hidden");

  btnA.onclick = function() {
    choiceContainer.classList.add("hidden");
    callbackA();
  };

  btnB.onclick = function() {
    choiceContainer.classList.add("hidden");
    callbackB();
  };
}