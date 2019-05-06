'use strict';

window.onLoad = check();

// Saves options to chrome local storage
function saveOptions() {
  var styleLabel = document.getElementById('workoutStyle').value;
  var timeLabel = document.getElementById('workoutLength').value;
  chrome.storage.local.set({style : styleLabel, timeLeft : timeLabel}, function() {
    // Update status to let user know options were saved
    var saveStatus = document.getElementById('saveStatus');
    saveStatus.textContent = 'Options saved';
    setTimeout(function() {
      saveStatus.textContent = '';
    }, 1000);
  });
}

document.getElementById('saveOptions').addEventListener('click', saveOptions);