// --- SCREEN SWITCHING LOGIC ---
const startButton = document.getElementById("start-btn");
const titleScreen = document.getElementById("title-screen");
const loadingScreen = document.getElementById("loading-screen");

startButton.addEventListener("click", function () {
  titleScreen.classList.add("hidden"); 
  loadingScreen.classList.remove("hidden"); 
});

const commandCenterButton = document.getElementById("command-btn");
const commandCenterScreen = document.getElementById("command-page"); 

commandCenterButton.addEventListener("click", function () {
  loadingScreen.classList.add("hidden"); 
  commandCenterScreen.classList.remove("hidden");
  
  // Trigger NASA Mars weather check when entering Command Center
  checkMarsWeather();
});


// --- NASA DONKI API & MARS FILTER LOGIC ---
async function checkMarsWeather() {
  const url = 'https://ccmc.gsfc.nasa.gov/DONKI-API/get/notifications?type=ALL';
  const eventTextView = document.getElementById("event-text");

  eventTextView.innerText = "Scanning deep-space telemetry from NASA CCMC...";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const notifications = await response.json();

    // Search for any alert mentioning Mars
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
        function() { 
          eventTextView.innerText = "Hab shields locked! Radiation deflected successfully."; 
        },
        function() { 
          eventTextView.innerText = "Air scrubbers maximized. Crew is safe."; 
        }
      );
    } else {
      eventTextView.innerText = "All systems nominal. No active solar storms threatening Mars.";
    }

  } catch (error) {
    console.error('Error fetching NASA data:', error);
    eventTextView.innerText = "Sensor array offline. Operating on local habitat backup.";
  }
}


// --- DECISION ENGINE ---
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

