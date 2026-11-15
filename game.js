
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

/* gemini code again*/

document.getElementById('fetch-btn').addEventListener('click', fetchSpaceWeatherUpdates);

async function fetchSpaceWeatherUpdates() {
    const container = document.getElementById('updates-container');
    const loading = document.getElementById('loading');
    
    // Clear old data and show loading text
    container.innerHTML = '';
    loading.classList.remove('hidden');

    // NASA DONKI API endpoint for general notifications
    const apiUrl = 'https://ccmc.gsfc.nasa.gov/DONKI-API/get/notifications';

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Hide loading indicator
        loading.classList.add('hidden');

        // Loop through the data array and display items on the page
        data.forEach(notification => {
            const card = document.createElement('div');
            card.className = 'update-card';

            card.innerHTML = `
                <h3>Type: ${notification.messageType}</h3>
                <p><strong>ID:</strong> ${notification.messageID}</p>
                <p><strong>Issue Time:</strong> ${notification.messageIssueTime}</p>
                <p><a href="${notification.messageURL}" target="_blank">View Original NASA Report</a></p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        loading.classList.add('hidden');
        container.innerHTML = `<p style="color: red;">Failed to load data: ${error.message}</p>`;
        console.h
        console.error('Error fetching data:', error);
    }
}

// Automatically fetch data when the page loads
window.onload = fetchSpaceWeatherUpdates;