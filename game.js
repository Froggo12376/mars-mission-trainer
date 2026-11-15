document.addEventListener("DOMContentLoaded", function () {
  console.log("Mars Outpost script loaded successfully!");

  // --- GAME RESOURCE STATS ---
  let gameStats = {
    oxygen: 100,
    power: 100,
    radiation: 10,
  };

  // --- UPDATE UI FUNCTION ---
  function updateResourceDisplay() {
    const oxyEl = document.getElementById("oxygen-text");
    const powEl = document.getElementById("power-text");
    const radEl = document.getElementById("radiation-text");

    if (oxyEl) oxyEl.innerText = gameStats.oxygen + "%";
    if (powEl) powEl.innerText = gameStats.power + "%";
    if (radEl) radEl.innerText = gameStats.radiation + "%";
  }

  // --- SCREEN SWITCHING LOGIC ---
  const startButton = document.getElementById("start-btn");
  const titleScreen = document.getElementById("title-screen");
  const loadingScreen = document.getElementById("loading-screen");

  if (startButton) {
    startButton.addEventListener("click", function () {
      if (titleScreen) titleScreen.classList.add("hidden"); 
      if (loadingScreen) loadingScreen.classList.remove("hidden"); 
    });
  }

  const commandCenterButton = document.getElementById("command-btn");
  const commandCenterScreen = document.getElementById("command-page"); 

  if (commandCenterButton) {
    commandCenterButton.addEventListener("click", function () {
      if (loadingScreen) loadingScreen.classList.add("hidden"); 
      if (commandCenterScreen) commandCenterScreen.classList.remove("hidden");

      updateResourceDisplay();
      startCrisisLoop();
    });
  }

  // --- CRISIS LOOP SYSTEM ---
  function startCrisisLoop() {
    triggerSolarStormCrisis();
  }

  // --- CRISIS 1: Solar Storm ---
  function triggerSolarStormCrisis() {
    triggerEmergency(
      "Nasa Alert: Solar storm detected near Mars orbit!",
      "Shield Habitat (-30% Power)",
      "Reroute Air Reserves (-10% Oxygen, +30% Radiation)",
      
      // Choice A
      function() {
        gameStats.power -= 30;
        updateResourceDisplay();
        setEventText("Hab shields locked! Power dropped to " + gameStats.power + "%, but radiation was deflected.");
        showContinueButton(triggerAirlockCrisis);
      },
      // Choice B
      function() {
        gameStats.oxygen -= 10;
        gameStats.radiation += 30;
        updateResourceDisplay();
        setEventText("Air scrubbers maximized. Oxygen: " + gameStats.oxygen + "%, Radiation increased.");
        showContinueButton(triggerAirlockCrisis);
      }
    );
  }

  // --- CRISIS 2: Airlock Leak ---
  function triggerAirlockCrisis() {
    triggerEmergency(
      "Maintenance Alert: Habitat airlock seal is leaking pressure!",
      "Repair Outside (+30% Radiation)",
      "Patch from Inside (-20% Oxygen, -20% Power)",
      
      // Choice A
      function() {
        gameStats.radiation += 30;
        updateResourceDisplay();
        setEventText("Airlock repaired outside, but crew took minor radiation exposure.");
        showContinueButton(triggerRoverCrisis);
      },
      // Choice B
      function() {
        gameStats.oxygen -= 20;
        gameStats.power -= 20;
        updateResourceDisplay();
        setEventText("Patched from inside! Resources took a heavy hit.");
        showContinueButton(triggerRoverCrisis);
      }
    );
  }

  // --- CRISIS 3: Rover Breakdown (Loops back or continues) ---
  function triggerRoverCrisis() {
    triggerEmergency(
      "Science Alert: Dust storm threatening the solar panels!",
      "Clean Panels Manually (+10% Radiation)",
      "Switch to Reserve Battery (-25% Power)",
      
      // Choice A
      function() {
        gameStats.radiation += 10;
        updateResourceDisplay();
        setEventText("Panels wiped clean of dust. Solar generation restored.");
        showContinueButton(triggerSolarStormCrisis); // Loops back to storm or next event!
      },
      // Choice B
      function() {
        gameStats.power -= 25;
        updateResourceDisplay();
        setEventText("Switched to reserve battery successfully.");
        showContinueButton(triggerSolarStormCrisis); // Loops back
      }
    );
  }

  // --- UI HELPER FUNCTIONS ---
  function setEventText(message) {
    const eventTextView = document.getElementById("event-text");
    if (eventTextView) eventTextView.innerText = message;
  }

  function triggerEmergency(emergencyMessage, choiceAText, choiceBText, callbackA, callbackB) {
    setEventText("🚨 **CRISIS ALERT:** " + emergencyMessage);

    const choiceContainer = document.getElementById("choice-container");
    const continueContainer = document.getElementById("continue-container");
    const btnA = document.getElementById("choice-a-btn");
    const btnB = document.getElementById("choice-b-btn");

    if (continueContainer) continueContainer.classList.add("hidden");
    if (choiceContainer) choiceContainer.classList.remove("hidden");

    if (btnA) btnA.innerText = choiceAText;
    if (btnB) btnB.innerText = choiceBText;

    if (btnA) {
      btnA.onclick = function() {
        if (choiceContainer) choiceContainer.classList.add("hidden");
        if (callbackA) callbackA();
      };
    }

    if (btnB) {
      btnB.onclick = function() {
        if (choiceContainer) choiceContainer.classList.add("hidden");
        if (callbackB) callbackB();
      };
    }
  }

  function showContinueButton(nextCallback) {
    const continueContainer = document.getElementById("continue-container");
    const continueBtn = document.getElementById("continue-btn");

    if (continueContainer) continueContainer.classList.remove("hidden");

    if (continueBtn) {
      continueBtn.onclick = function() {
        if (continueContainer) continueContainer.classList.add("hidden");
        if (nextCallback) nextCallback();
      };
    }
  }
});