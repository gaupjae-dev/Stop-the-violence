let playerCurrentMission = 1; // 1 means 'The Jump Start'

// Function to handle showing/hiding screens
function showScreen(screenId) {
    // 1. Hide ALL possible screen containers first
    document.getElementById('main-menu-container').style.display = 'none';
    document.getElementById('missions-screen').style.display = 'none';
    document.getElementById('my-player-screen').style.display = 'none';
    document.getElementById('options-screen').style.display = 'none';
    document.getElementById('quit-screen').style.display = 'none';

    // 2. Show the requested screen
    document.getElementById(screenId).style.display = 'block';
}

// Function called by the main menu's 'MISSIONS' button
function loadMissions() {
    // 1. Switch the screen
    showScreen('missions-screen');
    
    // 2. Update the mission button text based on player progress
    let mission1Button = document.querySelector('[onclick="startMission(1)"]');
    let mission2Button = document.querySelector('[onclick="startMission(2)"]');
    
    if (playerCurrentMission === 1) {
        mission1Button.textContent = "1. The Jump Start (IN PROGRESS)";
        mission2Button.textContent = "2. The Rookie Contract (LOCKED)";
    } else if (playerCurrentMission === 2) {
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission2Button.textContent = "2. The Rookie Contract (AVAILABLE)";
    } else {
        // Assume player has done mission 2 or more
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission2Button.textContent = "2. The Rookie Contract (COMPLETED)";
    }
}

// Function called by the main menu's 'MY PLAYER' button
function loadMyPlayer() {
    showScreen('my-player-screen');
}

// Function called by the 'BACK' button on all sub-screens
function showMainMenu() {
    showScreen('main-menu-container');
}

// Logic for clicking a specific mission button
function startMission(missionId) {
    if (missionId === 1 && playerCurrentMission === 1) {
        alert("MISSION SUCCESS! Completing 'The Jump Start'...");
        playerCurrentMission = 2; // Advance the player to the next mission
        showMainMenu(); // Go back to the main menu
    } else if (missionId === 2 && playerCurrentMission === 2) {
        alert("MISSION SUCCESS! You earned your first contract.");
        playerCurrentMission = 3; // Advance the player
        showMainMenu();
    } else if (missionId === 1 && playerCurrentMission > 1) {
        alert("Mission 1 is already complete!");
    } else if (missionId === 2 && playerCurrentMission < 2) {
        alert("Mission 2 is LOCKED! Complete Mission 1 first.");
    }
}

// Keep these functions for the other original menu buttons
function loadOptions() {
    showScreen('options-screen');
}

function quitGame() {
    showScreen('quit-screen');
}
