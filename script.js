// 🏀 GLOBAL GAME STATE VARIABLES
let playerCurrentMission = 1; // 1: Jump Start (In Progress), 2: Rookie Contract (In Progress), 3: G.O.A.T. (Complete)
let playerOverall = 75;      // The player's overall rating
let missionProgress = 0;     // Progress percentage for the current mission (0 to 100)

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
        // Use 'flex' for the main menu, 'block' for content screens, to handle their respective CSS layouts
        targetScreen.style.display = (screenId === 'main-menu-container') ? 'flex' : 'block';
    }
}

function showMainMenu() {
    // Stop any active mission meter before returning to menu
    if (meterInterval) {
        clearInterval(meterInterval);
    }
    showScreen('main-menu-container');
}

// *** MENU & NAVIGATION FUNCTIONS ***

function loadMissions() {
    showScreen('missions-screen');
    
    // Update the mission button text and availability
    let mission1Button = document.getElementById('mission-1-button');
    let mission2Button = document.getElementById('mission-2-button');
    
    // Re-check lock/completion status on load
    if (playerCurrentMission === 1) {
        mission1Button.textContent = "1. The Jump Start (IN PROGRESS)";
        mission2Button.textContent = "2. The Rookie Contract (LOCKED)";
        mission2Button.onclick = () => alert("Mission 2 is LOCKED! Complete Mission 1 first.");
    } else if (playerCurrentMission === 2) {
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission2Button.textContent = "2. The Rookie Contract (AVAILABLE)";
        mission2Button.onclick = () => startMission(2); // Enable button for startMission(2)
    } else { // playerCurrentMission >= 3
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission2Button.textContent = "2. The Rookie Contract (COMPLETED)";
        mission2Button.onclick = () => alert("Mission 2 is already complete!");
    }
}

function loadMyHub() {
    showScreen('my-hub-screen');
}

function loadMyStats() {
    showScreen('my-stats-screen');
    
    // --- UPDATE DYNAMIC STATS ---
    
    // 1. Update Overall Rating
    document.querySelector('#my-stats-screen p:nth-of-type(2)').innerHTML = '<strong>Overall Rating:</strong> ' + playerOverall;

    // 2. Determine and Update Current Mission Text and Progress
    let missionTitle;
    let progress;

    if (playerCurrentMission === 1) {
        missionTitle = "The Jump Start";
        progress = missionProgress; // Uses the global progress variable (0-100)
    } else if (playerCurrentMission === 2) {
        missionTitle = "The Rookie Contract";
        progress = 50; // Set a fixed progress for a mid-game state
    } else {
        missionTitle = "THE G.O.A.T.!";
        progress = 100;
    }

    // Update the Current Mission display
    document.querySelector('#my-stats-screen p:nth-of-type(4)').innerHTML = '<strong>Current Mission:</strong> ' + missionTitle;

    // Update Progress Bar
    let progressBar = document.getElementById('mission-progress-bar');
    progressBar.style.width = progress + '%';
    // ----------------------------
}

function loadTraining() {
    alert("Training Facility Coming Soon!");
    loadMyHub(); // Return to the Hub after the alert
}

function loadOptions() {
    showScreen('options-screen');
}

function quitGame() {
    showScreen('quit-screen');
}
// <<< ADD THIS NEW FUNCTION >>>
function quickPlay() {
    if (playerCurrentMission === 1) {
        // If player is still on Mission 1, launch it directly
        launchMission1();
    } else if (playerCurrentMission === 2) {
        // If player is on Mission 2, launch it directly
        launchMission2();
    } else {
        // If all main missions are complete, launch a practice/endgame activity
        alert("Career complete! Launching practice drill: The Jump Start.");
        launchMission1(); 
    }
}

// *** MISSION & GAMEPLAY LOGIC ***

function startMission(missionId) {
    if (missionId === 1 && playerCurrentMission === 1) {
        launchMission1();
    } else if (missionId === 2 && playerCurrentMission === 2) {
        launchMission2();
    } else if (missionId === 1 && playerCurrentMission > 1) {
        alert("Mission 1 is already complete!");
        loadMissions();
    } else if (missionId === 2 && playerCurrentMission < 2) {
        alert("Mission 2 is LOCKED! Complete Mission 1 first.");
        loadMissions();
    }
}

// --- Mission 1 Functions ---
function launchMission1() {
    showScreen('mission-1-screen');
    
    meterValue = 0;
    document.getElementById('meter-display').textContent = meterValue;
    document.getElementById('mission-feedback').innerHTML = '';

    // The meter loop logic
    meterInterval = setInterval(function() {
        meterValue += 1;
        if (meterValue > 100) {
            meterValue = 0;
        }
        document.getElementById('meter-display').textContent = meterValue;
    }, 20);
}

function stopMeter() {
    clearInterval(meterInterval);
    let feedbackDiv = document.getElementById('mission-feedback');

    if (meterValue >= 90 && meterValue <= 100) {
        feedbackDiv.innerHTML = '<p style="color: #00c4ff; font-weight: bold; font-size: 1.5em;">PERFECT PASS! SCORE: ' + meterValue + '</p>';
        
        // Reward: Advance player state and update stats
        playerOverall += 1;
        missionProgress = 100; // Mark mission progress as 100%
        
        setTimeout(function() {
            alert("Mission 1 Complete! Overall Rating +1. Returning to Main Menu.");
            playerCurrentMission = 2; // Unlock Mission 2
            saveGame();              // <<< SAVE GAME AFTER COMPLETION
            showMainMenu();
        }, 1500);
        
    } else {
        feedbackDiv.innerHTML = '<p style="color: #ff00ff; font-weight: bold; font-size: 1.5em;">MISSED IT! SCORE: ' + meterValue + '. Trying again...</p>';
        // Reset the progress for the failed attempt
        missionProgress = meterValue; 
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

    alert("CONTRACT SIGNED! " + message);
    
    // ADVANCE TO FINAL STAGE
    playerCurrentMission = 3; // Game is functionally complete/at the last stage
    saveGame();              // <<< SAVE GAME AFTER COMPLETION
    showMainMenu();
}

// --- INITIALIZER ---
// Loads saved game data and shows the main menu when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadGame();   // <<< 1. Load any saved data first
    showMainMenu(); // 2. Then, display the main menu
});
