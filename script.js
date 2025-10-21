// Function to handle showing/hiding screens
function showScreen(screenId) {
    // 1. Hide ALL possible screen containers first
    document.getElementById('main-menu-container').style.display = 'none';
    document.getElementById('missions-screen').style.display = 'none';
    document.getElementById('my-player-screen').style.display = 'none'; // NEW: Added My Player screen

    // 2. Show the requested screen
    document.getElementById(screenId).style.display = 'block';
}

// Function called by the main menu's 'MISSIONS' button
function loadMissions() {
    showScreen('missions-screen');
}

// Function called by the main menu's 'MY PLAYER' button
function loadMyPlayer() {
    showScreen('my-player-screen'); // Must match the HTML ID exactly!
}

// Function called by the 'BACK' button on all sub-screens
function showMainMenu() {
    showScreen('main-menu-container');
}

// Logic for clicking a specific mission button
function startMission(missionId) {
    if (missionId === 1) {
        alert("LAUNCHING MISSION 1: The Jump Start. Let's hoop!");
    } else if (missionId === 2) {
        alert("Mission 2 is LOCKED! Complete Mission 1 first.");
    }
}

// Keep these functions for the other original menu buttons
function loadOptions() {
    alert("OPTIONS: Adjusting settings...");
}

function quitGame() {
    alert("QUITTING: Thanks for playing!");
}
