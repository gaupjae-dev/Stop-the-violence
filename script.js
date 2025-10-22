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
    let mission1Button = document.getElementById('mission-1-button');
    let mission2Button = document.getElementById('mission-2-button');
    
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
    
    // --- PROGRESS BAR AND TEXT LOGIC ---
    let progressBar = document.getElementById('mission-progress-bar');
    let currentMissionText = document.querySelector('.my-player-container p strong'); 
    
    // Calculate progress (Mission 1 = 0%, Mission 2 = 50%, Mission 3/Done = 100%)
    let progress = 0;
    let missionTitle = "The Jump Start"; // Default mission title
    
    if (playerCurrentMission === 2) {
        progress = 50; // After completing mission 1
        missionTitle = "The Rookie Contract";
    } else if (playerCurrentMission >= 3) {
        progress = 100; // After completing mission 2
        missionTitle = "THE G.O.A.T.!";
    }
    
    // Update the visual bar and the mission title text
    progressBar.style.width = progress + '%';
    currentMissionText.nextSibling.textContent = " " + missionTitle;
    // ----------------------------
}

// Function called by the 'BACK' button on all sub-screens
function showMainMenu() {
    showScreen('main-menu-container');
}

// Logic for clicking a specific mission button
function startMission(missionId) {
    if (missionId === 1 && playerCurrentMission === 1) {
        // Instead of an alert, we launch the mini-game screen!
        launchMission1(); 
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
// Global variables for Mission 1 mini-game
let meterInterval; // Stores the timer
let meterValue = 0; // The counting number

// Function to start the Mission 1 mini-game
function launchMission1() {
    // 1. Hide the Missions Log and show the Mission 1 screen
    showScreen('mission-1-screen');
    
    // 2. Reset the game
    meterValue = 0;
    document.getElementById('meter-display').textContent = meterValue;
    document.getElementById('mission-feedback').innerHTML = ''; // Clear old feedback

    // 3. Start the meter counting rapidly
    meterInterval = setInterval(function() {
        meterValue += 1; // Increment the value
        if (meterValue > 100) {
            meterValue = 0; // Wrap back to 0
        }
        document.getElementById('meter-display').textContent = meterValue;
    }, 20); // Changes every 20 milliseconds (very fast!)
}

// Function to stop the meter and check the score
function stopMeter() {
    // 1. Stop the interval timer
    clearInterval(meterInterval);

    let feedbackDiv = document.getElementById('mission-feedback');

    // 2. Check the score
    if (meterValue >= 90 && meterValue <= 100) {
        // SUCCESS: Between 90 and 100 is a "Perfect" or "Great" score
        feedbackDiv.innerHTML = '<p style="color: #00c4ff; font-weight: bold; font-size: 1.5em;">PERFECT PASS! SCORE: ' + meterValue + '</p>';
        
        // 3. Immediately advance the player's progress after success
        setTimeout(function() {
            alert("Mission 1 Complete! Returning to Main Menu.");
            playerCurrentMission = 2; // Advance to the next mission
            showMainMenu();
        }, 1500); // Wait 1.5 seconds before returning
        
    } else {
        // FAIL: Score outside the sweet spot
        feedbackDiv.innerHTML = '<p style="color: #ff00ff; font-weight: bold; font-size: 1.5em;">MISSED IT! SCORE: ' + meterValue + '. Try again.</p>';
        
        // 4. Restart the mission after a slight delay
        setTimeout(launchMission1, 1500);
    }
}
