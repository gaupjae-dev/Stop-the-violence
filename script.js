let playerCurrentMission = 1; // 1 means 'The Jump Start'

// *** ALL SCREEN SWITCHING LOGIC ***
function showScreen(screenId) {
    // 1. Hide ALL possible screen containers first (This list is COMPLETE for all 9 screens!)
    document.getElementById('main-menu-container').style.display = 'none';
    document.getElementById('missions-screen').style.display = 'none';
    document.getElementById('my-hub-screen').style.display = 'none';
    document.getElementById('my-stats-screen').style.display = 'none';
    document.getElementById('options-screen').style.display = 'none';
    document.getElementById('quit-screen').style.display = 'none';
    document.getElementById('mission-1-screen').style.display = 'none';
    document.getElementById('mission-2-screen').style.display = 'none';

    // 2. Show the requested screen
    document.getElementById(screenId).style.display = 'block';
}

function showMainMenu() {
    showScreen('main-menu-container');
}

// *** MENU & NAVIGATION FUNCTIONS ***

function loadMissions() {
    showScreen('missions-screen');
    
    // Update the mission button text based on player progress
    let mission1Button = document.getElementById('mission-1-button');
    let mission2Button = document.getElementById('mission-2-button');
    
    if (playerCurrentMission === 1) {
        mission1Button.textContent = "1. The Jump Start (IN PROGRESS)";
        mission2Button.textContent = "2. The Rookie Contract (LOCKED)";
    } else if (playerCurrentMission === 2) {
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission2Button.textContent = "2. The Rookie Contract (AVAILABLE)";
    } else {
        mission1Button.textContent = "1. The Jump Start (COMPLETED)";
        mission2Button.textContent = "2. The Rookie Contract (COMPLETED)";
    }
}

function loadMyHub() {
    showScreen('my-hub-screen');
}

function loadMyStats() {
    showScreen('my-stats-screen');
    
    // --- PROGRESS BAR AND TEXT LOGIC ---
    let progressBar = document.getElementById('mission-progress-bar');
    let currentMissionText = document.querySelector('#my-stats-screen p strong'); 
    
    // Calculate progress
    let progress = 0;
    let missionTitle = "The Jump Start";
    
    if (playerCurrentMission === 2) {
        progress = 50; 
        missionTitle = "The Rookie Contract";
    } else if (playerCurrentMission >= 3) {
        progress = 100; 
        missionTitle = "THE G.O.A.T.!";
    }
    
    progressBar.style.width = progress + '%';
    currentMissionText.nextSibling.textContent = " " + missionTitle;
    // ----------------------------
}

function loadTraining() {
    alert("Training Facility Coming Soon!");
}

function loadOptions() {
    showScreen('options-screen');
}

function quitGame() {
    showScreen('quit-screen');
}


// *** MISSION & GAMEPLAY LOGIC ***

// Mission 1: Global Meter Variables
let meterInterval; 
let meterValue = 0; 

function startMission(missionId) {
    if (missionId === 1 && playerCurrentMission === 1) {
        launchMission1(); 
    } else if (missionId === 2 && playerCurrentMission === 2) {
        launchMission2();
    } else if (missionId === 1 && playerCurrentMission > 1) {
        alert("Mission 1 is already complete!");
    } else if (missionId === 2 && playerCurrentMission < 2) {
        alert("Mission 2 is LOCKED! Complete Mission 1 first.");
    }
}

// --- Mission 1 Functions ---
function launchMission1() {
    showScreen('mission-1-screen');
    
    meterValue = 0;
    document.getElementById('meter-display').textContent = meterValue;
    document.getElementById('mission-feedback').innerHTML = '';

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
        
        setTimeout(function() {
            alert("Mission 1 Complete! Returning to Main Menu.");
            playerCurrentMission = 2;
            showMainMenu();
        }, 1500); 
        
    } else {
        feedbackDiv.innerHTML = '<p style="color: #ff00ff; font-weight: bold; font-size: 1.5em;">MISSED IT! SCORE: ' + meterValue + '. Try again.</p>';
        setTimeout(launchMission1, 1500);
    }
}

// --- Mission 2 Functions ---
function launchMission2() {
    showScreen('mission-2-screen');
}

function completeMission2(choiceId) {
    let message = "";

    if (choiceId === 1) {
        message = "SMART CHOICE! You bet on your talent. Contract signed! Get ready for training camp.";
    } else {
        message = "The safer choice. Contract signed. But remember, the easy road rarely leads to greatness.";
    }

    alert("CONTRACT SIGNED! " + message);
    
    // ADVANCE TO FINAL STAGE
    playerCurrentMission = 3; 
    showMainMenu();
}
