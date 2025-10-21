function loadMissions() {
    alert("MISSIONS LOG: Ready to dominate the court!");
    // You would replace the 'alert' with code to load the actual missions menu later!
}

function loadMyPlayer() {
    alert("MY PLAYER: Customizing your superstar...");
}

function loadOptions() {
    alert("OPTIONS: Adjusting settings...");
}

function quitGame() {
    alert("QUITTING: Thanks for playing!");
}
/* Styling for the Mission Log Buttons */
.missions-log-container {
    text-align: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    /* Missions Log specific size */
    width: 600px; 
}

.missions-log-container h2 {
    color: #ffcc00; /* Gold color for heading */
    margin-bottom: 30px;
}

.mission-item {
    display: block;
    width: 90%;
    padding: 10px;
    margin: 10px auto;
    font-size: 1em;
    text-align: left;
    color: white;
    background-color: #333;
    border: 1px solid #ffcc00;
    border-left: 5px solid #ffcc00; /* Little gold accent bar */
    cursor: pointer;
    transition: background-color 0.2s;
}

.mission-item:hover {
    background-color: #444;
}
