// Function to show a screen by ID
function showScreen(screenId) {
    // 1. Hide the main menu
    document.querySelector('.main-menu-container').style.display = 'none';
    
    // 2. Hide the missions screen (in case we're switching screens later)
    document.getElementById('missions-screen').style.display = 'none';

    // 3. Show the requested screen
    document.getElementById(screenId).style.display = 'block';
}

// Function called by the main menu's 'MISSIONS' button
function loadMissions() {
    showScreen('missions-screen');
}

// Function called by the 'BACK' button on the mission log
function showMainMenu() {
    showScreen('main-menu-container');
}

// Function called by mission buttons
function startMission(missionId) {
    if (missionId === 1) {
        alert("LAUNCHING MISSION 1: The Jump Start. Get ready!");
    } else if (missionId === 2) {
        alert("Mission 2 is LOCKED! Complete Mission 1 first.");
    }
}

// Keep these functions for the other menu buttons
function loadMyPlayer() {
    alert("MY PLAYER: Customizing your superstar...");
}

function loadOptions() {
    alert("OPTIONS: Adjusting settings...");
}

function quitGame() {
    alert("QUITTING: Thanks for playing!");
}

// On first load, ensure the main menu is visible
// NOTE: We need to change the main menu container in index.html to have an ID
// Let's assume the class '.main-menu-container' is enough for now, but we should add id="main-menu-container" to the HTML
