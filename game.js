document.addEventListener("DOMContentLoaded", function () {
  console.log("Mars Outpost script loaded successfully!");

  // --- GAME RESOURCE STATS ---
  let gameStats = {
    oxygen: 100,
    power: 100,
    radiation: 10,
  };

  let currentDay = 1;
  let crisisStep = 1; // Tracks crisis 1, 2, 3 per day

  // --- GLOSSARY DICTIONARY (Clickable definitions for kids) ---
  const glossary = {
    "solar storm": "A massive burst of energy and radiation from the Sun that can fry electronics and harm astronauts!",
    "radiation": "Invisible energy rays in space that can make you sick if you don't wear heavy shields.",
    "airlock": "A sealed room with two doors that lets astronauts go outside without losing the base's air.",
    "rover": "A robotic car driven or controlled by astronauts to explore the rocky surface of Mars.",
    "sol": "The word scientists use for a single day on Mars (it's about 39 minutes longer than an Earth day!)."
  };

  // --- UPDATE UI FUNCTION ---
  function updateResourceDisplay() {
    const oxyEl = document.getElementById("oxygen-text");
    const powEl = document.getElementById("power-text");
    const radEl = document.getElementById("radiation-text");

    if (oxyEl) oxyEl.innerText = gameStats.oxygen + "%";
    if (powEl) powEl.innerText = gameStats.power + "%";
    if (radEl) radEl.innerText = gameStats.radiation + "%";

    document.getElementById("day-display").innerText = `DAY ${currentDay}: -- Crisis ${crisisStep} of 3`;

        // --- FAIL CONDITION CHECKS ---
    if (gameStats.radiation >= 100) {
      triggerGameOver("Radiation levels reached 100%! The habitat became too radioactive for the crew.");
    } else if (gameStats.oxygen <= 0) {
      triggerGameOver("Oxygen reserves depleted to 0%! The crew ran out of breathable air.");
    } else if (gameStats.power <= 0) {
      triggerGameOver("Power grid completely failed! The base froze in the Martian night.");
    }
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
      startCurrentDayCrisis();
    });
  }

  // --- DAY & CRISIS ROUTER ---
  function startCurrentDayCrisis() {
    if (currentDay === 1) {
      if (crisisStep === 1) triggerSolarStormCrisis();
      else if (crisisStep === 2) triggerAirlockCrisis();
      else if (crisisStep === 3) triggerDustStormCrisis();
    } else if (currentDay === 2) {
      if (crisisStep === 1) triggerDay2RoverCrisis();
      else if (crisisStep === 2) triggerDay2MeteorCrisis();
      else if (crisisStep === 3) triggerDay2CommsCrisis();
    }
  }

  // ==========================================
  // --- DAY 1 CRISES ---
  // ==========================================
  function triggerSolarStormCrisis() {
    triggerEmergency(
      'Nasa - A massive <span class="glossary-term" data-word="solar storm">solar storm</span> is hitting Mars orbit! High <span class="glossary-term" data-word="radiation">radiation</span> incoming!',
      "Shield Habitat (-30% Power)",
      "Reroute Air Scrubbers (-10% Oxygen, +30% Radiation)",
      function() {
        gameStats.power -= 30;
        updateResourceDisplay();
        setEventText("Hab shields locked! Power dropped to " + gameStats.power + "%, but radiation was deflected.");
        finishCrisisStep();
      },
      function() {
        gameStats.oxygen -= 10;
        gameStats.radiation += 30;
        updateResourceDisplay();
        setEventText("Air filters maximized. Oxygen down to " + gameStats.oxygen + "%, radiation increased.");
        finishCrisisStep();
      }
    );
  }

  function triggerAirlockCrisis() {
    triggerEmergency(
      'Maintenance - The main <span class="glossary-term" data-word="airlock">airlock</span> seal is leaking air pressure!',
      "Repair Outside (+30% Radiation exposure)",
      "Patch from Inside (-20% Oxygen, -20% Power)",
      function() {
        gameStats.radiation += 30;
        updateResourceDisplay();
        setEventText("Airlock fixed outside, but crew soaked up extra space radiation.");
        finishCrisisStep();
      },
      function() {
        gameStats.oxygen -= 20;
        gameStats.power -= 20;
        updateResourceDisplay();
        setEventText("Patched from inside safely, but life support took a heavy hit.");
        finishCrisisStep();
      }
    );
  }

  function triggerDustStormCrisis() {
    triggerEmergency(
      'Environmental - A planetary dust storm is blocking sunlight from the solar panels!',
      "Clean Panels Manually (+10% Radiation)",
      "Switch to Emergency Battery (-25% Power)",
      function() {
        gameStats.radiation += 10;
        updateResourceDisplay();
        setEventText("Panels wiped clean during a dangerous spacewalk.");
        finishDayOneCelebration(); // Day 1 ends here!
      },
      function() {
        gameStats.power -= 25;
        updateResourceDisplay();
        setEventText("Ran on backup battery power to ride out the storm.");
        finishDayOneCelebration(); // Day 1 ends here!
      }
    );
  }

  // ==========================================
  // --- DAY 2 CRISES (New Questions!) ---
  // ==========================================
  function triggerDay2RoverCrisis() {
    triggerEmergency(
      'Science - The exploration <span class="glossary-term" data-word="rover">rover</span> is stuck in a deep Martian crater!',
      "Send Rescue Drone (-20% Power)",
      "Guide Crew Remotely (-10% Oxygen)",
      function() {
        gameStats.power -= 20;
        updateResourceDisplay();
        setEventText("Drone successfully pulled the rover free!");
        finishCrisisStep();
      },
      function() {
        gameStats.oxygen -= 10;
        updateResourceDisplay();
        setEventText("Guided them via radio link. Mission successful!");
        finishCrisisStep();
      }
    );
  }

  function triggerDay2MeteorCrisis() {
    triggerEmergency(
      'Radar - Space debris is hurtling toward the base greenhouse!',
      "Fire Laser Defense Grid (-30% Power)",
      "Evacuate Greenhouse Sector (-15% Oxygen)",
      function() {
        gameStats.power -= 30;
        updateResourceDisplay();
        setEventText("Laser blasted the debris into space dust!");
        finishCrisisStep();
      },
      function() {
        gameStats.oxygen -= 15;
        updateResourceDisplay();
        setEventText("Greenhouse sealed off safely, plants took minor shock.");
        finishCrisisStep();
      }
    );
  }

  function triggerDay2CommsCrisis() {
    triggerEmergency(
      'Station - Earth communication relay dish is misaligned!',
      "Climb Tower to Adjust (+20% Radiation)",
      "Recalibrate Dish Remotely (-15% Power)",
      function() {
        gameStats.radiation += 20;
        updateResourceDisplay();
        setEventText("Dish locked onto Earth signal again!");
        finishDayTwoCelebration();
      },
      function() {
        gameStats.power -= 15;
        updateResourceDisplay();
        setEventText("Remote recalibration successful!");
        finishDayTwoCelebration();
      }
    );
  }

  // --- PROGRESSION & CELEBRATIONS ---
  function finishCrisisStep() {
    crisisStep++;
    showContinueButton(startCurrentDayCrisis);
  }

  function finishDayOneCelebration() {
    setEventText("🎉 <strong>DAY 1 COMPLETE!</strong> You survived your first <span class='glossary-term' data-word='sol'>sol</span> on Mars! Outstanding job, Commander!");
    triggerConfetti();
    
    currentDay = 2;
    crisisStep = 1;
    showContinueButton(startCurrentDayCrisis, "START DAY 2");
  }

  function finishDayTwoCelebration() {
    setEventText("🏆 <strong>MISSION VICTORY!</strong> You conquered Day 2 and proved you're a master space commander!");
    triggerConfetti();
    showContinueButton(() => { location.reload(); }, "PLAY AGAIN");
  }

// --- EGO TOO BIG CONFETTI EFFECT ---
  function triggerConfetti() {
    for (let i = 0; i < 75; i++) {
      const drop = document.createElement("div");
      drop.classList.add("confetti");
      drop.style.left = Math.random() * window.innerWidth + "px";
      drop.style.backgroundColor = ['#38bdf8', '#f43f5e', '#4ade80', '#fbbf24', '#a855f7', '#ec4899'][Math.floor(Math.random() * 6)];
      drop.style.animationDuration = (1.5 + Math.random() * 2) + "s";
      drop.style.animationDelay = (Math.random() * 0.4) + "s";
      document.body.appendChild(drop);
      setTimeout(() => drop.remove(), 4000);
    }
  }

  // --- UI HELPER FUNCTIONS ---
  function setEventText(message) {
    const eventTextView = document.getElementById("event-text");
    if (eventTextView) {
      eventTextView.innerHTML = message;
      attachGlossaryListeners(); // Make new terms clickable!
    }
  }

  function triggerEmergency(emergencyMessage, choiceAText, choiceBText, callbackA, callbackB) {
    setEventText("🚨 <strong>CRISIS ALERT:</strong> " + emergencyMessage);

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

  function showContinueButton(nextCallback, buttonText = "CONTINUE MISSION") {
    const continueContainer = document.getElementById("continue-container");
    const continueBtn = document.getElementById("continue-btn");

    if (continueContainer) continueContainer.classList.remove("hidden");
    if (continueBtn) {
      continueBtn.innerText = buttonText;
      continueBtn.onclick = function() {
        if (continueContainer) continueContainer.classList.add("hidden");
        if (nextCallback) nextCallback();
      };
    }
  }

  // --- GLOSSARY CLICK HANDLERS ---
  function attachGlossaryListeners() {
    const terms = document.querySelectorAll(".glossary-term");
    const defModal = document.getElementById("def-modal");
    const defTitle = document.getElementById("def-title");
    const defText = document.getElementById("def-text");
    const closeBtn = document.getElementById("close-def-btn");

    terms.forEach(term => {
      term.onclick = function() {
        const wordKey = term.getAttribute("data-word");
        if (glossary[wordKey]) {
          defTitle.innerText = "📖 STEM Glossary: " + term.innerText;
          defText.innerText = glossary[wordKey];
          defModal.classList.remove("hidden");
        }
      };
    });

    if (closeBtn) {
      closeBtn.onclick = function() {
        defModal.classList.add("hidden");
      };
    }
  }
});

  // --- GAME OVER HANDLER ---
  function triggerGameOver(reasonText) {
    const gameOverModal = document.getElementById("game-over-modal");
    const commandCenterScreen = document.getElementById("command-page"); 
    const defModal = document.getElementById("def-modal");
    const reasonEl = document.getElementById("game-over-reason");
    const restartBtn = document.getElementById("restart-btn");

    if (reasonEl) reasonEl.innerText = reasonText;
    if (gameOverModal) {
      gameOverModal.style.display = "flex"; // Forces it to show instantly!
      commandCenterScreen.classList.add("hidden");
      gameOverModal.classList.remove("hidden");
      defModal.classList.add("hidden");
    }

    if (restartBtn) {
      restartBtn.onclick = function() {
        location.reload(); // Resets the game
      };
    }
  }

  /* DATES */
  function movingDate() {
    let month = 10
    let day = 16
    for (var i = 0; i < 31; i++) {
        console.log(month + "/" + day + "/2026")
        day++;
        if (day >31)  {
            month ++;
            day = 1;
        }
    }
}

movingDate()