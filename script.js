// 🏀 GLOBAL GAME STATE VARIABLES
let playerCurrentMission = 1; // 1: Jump Start (In Progress), 2: Rookie Contract (In Progress), 3: G.O.A.T. (Complete)
let playerOverall = 75;      // The player's overall rating
let missionProgress = 0;     // Progress percentage for the current mission (0 to 100)

// Mission 1: Global Meter Variables
let meterInterval;
let meterValue = 0;

// *** SAVE/LOAD GAME STATE LOGIC ***

function saveGame() {
    const gameState = {
        mission: playerCurrentMission,
        overall: playerOverall,
        progress: missionProgress 
    };
    // Save the entire game state object as a JSON string
    localStorage.setItem('goatProjectSave', JSON.stringify(gameState));
    console.log("Game Saved!");
}

function loadGame() {
    const savedState = localStorage.getItem('goatProjectSave');

    if (savedState) {
        const gameState = JSON.parse(savedState);
        
        // Restore global variables from the saved state
        playerCurrentMission = gameState.mission;
        playerOverall = gameState.overall;
        missionProgress = gameState.progress;
        
        console.log(`Game Loaded! Current Mission: ${playerCurrentMission}, Overall: ${playerOverall}`);
    } else {
        console.log("No saved game found. Starting new game.");
    }
}

// *** CORE SCREEN SWITCHING LOGIC ***

// A single function to hide all screens and show the one requested.
function showScreen(screenId) {
    // Stop any active mission meter before switching screens
    if (meterInterval) {
        clearInterval(meterInterval);
    }

    // 1. Hide ALL possible screen containers
    const screens = [
        'main-menu-container', 'missions-screen', 'my-hub-screen',
        'my-stats-screen', 'options-screen', 'quit-screen',
        'mission-1-screen', 'mission-2-screen'
    ];

    screens.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            // Hide all elements
            element.style.display = 'none';
        }
    });

    // 2. Show the requested screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        // Use 'flex' for the main menu (full screen), 'block' for content screens
        targetScreen.style.display = (screenId === 'main-menu-container') ? 'flex' : 'block';
        
        // Specific screen setup logic
        if (screenId === 'missions-screen') loadMissions();
        if (screenId === 'my-hub-screen') loadMyHub();
        if (screenId === 'my-stats-screen') loadMyStats();
    }
}

function showMainMenu() {
    showScreen('main-menu-container');
}

// *** MENU & NAVIGATION FUNCTIONS ***

function loadMissions() {
    // showScreen('missions-screen'); // showScreen is called inside showScreen
    
    // Update the mission button text and availability
    let mission1Button = document.getElementById('mission-1-button');
    let mission2Button = document.getElementById('mission-2-button');
    
    // Re-check lock/completion status on load
    if (playerCurrentMission === 1) {
        mission1Button.textContent = "1. The Jump Start (IN PROGRESS)";
        mission1Button.onclick = () => startMission(1);
        mission2Button.textContent = "2. The Rookie Contract (LOCKED)";
        mission2Button.onclick = () => {
            // Replaced alert() with console.error as per instruction
            console.error("Mission 2 is LOCKED! Complete Mission 1 first.");
            // Optional: Visually indicate lock state (already handled by CSS opacity)
        };
        mission2Button.disabled = true;
    } else if (playerCurrentMission === 2) {
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission1Button.disabled = true;
        mission2Button.textContent = "2. The Rookie Contract (AVAILABLE)";
        mission2Button.onclick = () => startMission(2); // Enable button for startMission(2)
        mission2Button.disabled = false;
    } else { // playerCurrentMission >= 3
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission1Button.disabled = true;
        mission2Button.textContent = "2. The Rookie Contract (COMPLETED)";
        mission2Button.onclick = () => {
            console.error("Mission 2 is already complete!");
        };
        mission2Button.disabled = true;
    }
}

function loadMyHub() {
    // showScreen('my-hub-screen'); // showScreen is called inside showScreen
}

function loadMyStats() {
    // showScreen('my-stats-screen'); // showScreen is called inside showScreen
    
    // --- UPDATE DYNAMIC STATS ---
    
    // 1. Update Overall Rating
    document.getElementById('overall-rating-stat').innerHTML = '<strong>Overall Rating:</strong> ' + playerOverall;

    // 2. Determine and Update Current Mission Text and Progress
    let missionTitle;
    let progress;

    if (playerCurrentMission === 1) {
        missionTitle = "The Jump Start";
        progress = missionProgress; // Uses the global progress variable (0-100)
    } else if (playerCurrentMission === 2) {
        missionTitle = "The Rookie Contract";
        // When mission 2 is active, its progress is reset, but we show a placeholder for the stats screen
        progress = 50; 
    } else {
        missionTitle = "THE G.O.A.T.!";
        progress = 100;
    }

    // Update the Current Mission display
    document.getElementById('current-mission-stat').innerHTML = '<strong>Current Mission:</strong> ' + missionTitle;

    // Update Progress Bar
    let progressBar = document.getElementById('mission-progress-bar');
    // Ensure the width is capped at 100%
    progressBar.style.width = Math.min(progress, 100) + '%'; 
    // ----------------------------
}

function loadTraining() {
    // Replaced alert() with a visual message/modal logic in a real app
    console.warn("Training Facility Coming Soon!");
    // Simulating a custom modal/message box
    const message = "Training Facility Coming Soon!";
    displayMessage(message);
    // loadMyHub(); // Removed auto-return to hub to allow user to dismiss message first
}

function loadOptions() {
    showScreen('options-screen');
}

function quitGame() {
    showScreen('quit-screen');
}

function quickPlay() {
    if (playerCurrentMission === 1) {
        // If player is still on Mission 1, launch it directly
        launchMission1();
    } else if (playerCurrentMission === 2) {
        // If player is on Mission 2, launch it directly
        launchMission2();
    } else {
        // If all main missions are complete, launch a practice/endgame activity
        // Replaced alert()
        displayMessage("Career complete! Launching practice drill: The Jump Start.");
        launchMission1(); 
    }
}

// --- Custom Message Box Logic (Replaces alert()) ---
function displayMessage(message, duration = 2000) {
    const modal = document.getElementById('custom-modal');
    const modalText = document.getElementById('custom-modal-text');
    
    if (modal && modalText) {
        modalText.textContent = message;
        modal.style.display = 'flex'; // Show the modal

        setTimeout(() => {
            modal.style.display = 'none'; // Hide after duration
        }, duration);
    } else {
        // Fallback for missing HTML element (shouldn't happen with the provided HTML)
        console.warn(`[Message Box Fallback] ${message}`);
    }
}


// *** MISSION & GAMEPLAY LOGIC ***

function startMission(missionId) {
    if (missionId === 1 && playerCurrentMission === 1) {
        launchMission1();
    } else if (missionId === 2 && playerCurrentMission === 2) {
        launchMission2();
    } else if (missionId === 1 && playerCurrentMission > 1) {
        displayMessage("Mission 1 is already complete!");
        showScreen('missions-screen');
    } else if (missionId === 2 && playerCurrentMission < 2) {
        displayMessage("Mission 2 is LOCKED! Complete Mission 1 first.");
        showScreen('missions-screen');
    }
}

// --- Mission 1 Functions ---
function launchMission1() {
    showScreen('mission-1-screen');
    
    // Reset meter
    meterValue = 0;
    document.getElementById('meter-display').textContent = meterValue;
    document.getElementById('mission-feedback').innerHTML = '';

    // Clear any existing interval
    if (meterInterval) {
        clearInterval(meterInterval);
    }

    // The meter loop logic
    meterInterval = setInterval(function() {
        meterValue += 1;
        if (meterValue > 100) {
            meterValue = 0; // Wraps around
        }
        document.getElementById('meter-display').textContent = meterValue;
    }, 20); // Fast interval for a challenging game
}

function stopMeter() {
    clearInterval(meterInterval);
    meterInterval = null; // Clear the variable so showScreen doesn't try to stop it again
    
    let feedbackDiv = document.getElementById('mission-feedback');

    if (meterValue >= 90 && meterValue <= 100) {
        feedbackDiv.innerHTML = '<p style="color: var(--neon-blue); font-weight: bold; font-size: 1.5em;">PERFECT PASS! SCORE: ' + meterValue + '</p>';
        
        // Reward: Advance player state and update stats
        playerOverall += 1;
        missionProgress = 100; // Mark mission progress as 100%
        
        setTimeout(function() {
            displayMessage("Mission 1 Complete! Overall Rating +1. Returning to Main Menu.");
            playerCurrentMission = 2; // Unlock Mission 2
            saveGame();              // <<< SAVE GAME AFTER COMPLETION
            showMainMenu();
        }, 1500);
        
    } else {
        feedbackDiv.innerHTML = '<p style="color: var(--neon-pink); font-weight: bold; font-size: 1.5em;">MISSED IT! SCORE: ' + meterValue + '. Trying again...</p>';
        // Reset the progress for the failed attempt, but we don't save it as it's not useful
        // missionProgress = meterValue; 
        setTimeout(launchMission1, 1500); // Relaunch the mission after a delay
    }
}

// --- Mission 2 Functions ---
function launchMission2() {
    showScreen('mission-2-screen');
}

function completeMission2(choiceId) {
    let message = "";
    
    // Apply different rewards based on the contract choice
    if (choiceId === 1) {
        // High Incentives choice (The risk/reward option)
        playerOverall += 5; 
        message = "SMART CHOICE! You bet on your talent. Contract signed! Your potential has increased (Overall +5).";
    } else {
        // Large Bonus choice (The safe option)
        playerOverall += 1;
        message = "The safer choice. Contract signed. You secured the bag, but the easy road rarely leads to greatness (Overall +1).";
    }

    displayMessage("CONTRACT SIGNED! " + message, 3000);
    
    // ADVANCE TO FINAL STAGE
    playerCurrentMission = 3; // Game is functionally complete/at the last stage
    saveGame();              // <<< SAVE GAME AFTER COMPLETION
    
    // Use a delay to show the message before returning to menu
    setTimeout(() => {
        showMainMenu();
    }, 3000);
}

// --- INITIALIZER ---
// Loads saved game data and shows the main menu when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadGame();   // <<< 1. Load any saved data first
    showMainMenu(); // 2. Then, display the main menu
});
