'use strict';

function setAlarm(event) {
  var minutes = parseFloat(event.target.value);
  if(minutes == 30){
  chrome.browserAction.setBadgeText({text: '30m'});  
  }else if(minutes == 60){
    chrome.browserAction.setBadgeText({text: '60m'});  
  }else if(minutes == 90){
    chrome.browserAction.setBadgeText({text: '90m'});  
  }
  
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

function startWorkout(){
	// displays a page
	window.open("background.html");
	
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
// document.getElementById('sampleSec').addEventListener('click', setAlarm);
// document.getElementById('sampleMin').addEventListener('click', setAlarm);
document.getElementById('30min').addEventListener('click', setAlarm);
document.getElementById('60min').addEventListener('click', setAlarm);
document.getElementById('90min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('startWorkout').addEventListener('click', startWorkout);