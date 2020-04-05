const Http = new XMLHttpRequest();



var gcodeProcessorWorker = new Worker('js/gcodeProcessor.js');
var gcodeLines = undefined;
var selectedSettings = 0;
var results = Array(4);
var resultFieldIds = [];
var currentCalculationSetting = 0;

function printTimeHumanReadable(seconds, duration = false) {
    if (duration) { 
      var durationDate = new Date(1970, 0, 1); // Epoch
      durationDate.setSeconds(seconds);
      return durationDate.getHours() + ' hrs ' + durationDate.getMinutes() + ' mins';
    }; 
    const currenSecondsSince1970 = Math.round((new Date()).getTime() / 1000);
    if (seconds <= currenSecondsSince1970) {
      return 'now';
    }
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const now = new Date()
    const date = new Date(0);
    date.setUTCSeconds(seconds);

    var dayString = ""
    if (date.getDate() == now.getDate()) {
      dayString = "Today";
    }
    else if (date.getDate() == now.getDate() + 1) {
      dayString = "Tomorrow";
    }
    else {
      dayString = "" + monthNames[date.getMonth()] + ' ' + date.getDate();
    }
    return dayString + ' at ' + date.getHours() + ':' + date.getMinutes();
}

gcodeProcessorWorker.onmessage = function (e) {
  if ("progress" in e.data) {
    setProgressBarPercent(e.data.progress);
  } else if ("complete" in e.data) {
    document.getElementById("LoadingBar").style.display = "none";
    setProgressBarPercent(0);
  } else if ("result" in e.data) {
    const printEstimate = Math.floor(e.data.result['printTime']);    
    const printEstimateString = ""+e.data.result['printTimeHumanReadable'];    

    refreshGCodeNotificationView(printEstimate, ['','']);
    const url='http://localhost:1337/reservation-proposal/'+printEstimate;
    Http.open("GET", url);
    Http.send();

  } else if ("layers" in e.data) {
    gcodeProcessorWorker.postMessage("cleanup");
  }
}

Http.onreadystatechange = (e) => {
  const response = Http.responseText;
  const responseObj = JSON.parse(response);
  console.log("state change for http");
  refreshGCodeNotificationView(-1,[responseObj.recommendJobStart, responseObj.urgentJobStart]);
}

function setProgressBarPercent(percent) {
  var progressBar = document.getElementById("LoadingBar");
  progressBar.style.width = "" + percent + "%";
  progressBar.setAttribute("aria-valuenow", percent);
  //probably should percentage
}

function selectSettings(newSelectedSettings) {
  document.getElementById("selectSettings" + selectedSettings).className = "btn btn-info";
  document.getElementById("selectSettings" + newSelectedSettings).className = "btn btn-info active";
  selectedSettings = newSelectedSettings;
  displaySettings();
  displayResult();
}

function displayProgressBar() {
  setProgressBarPercent(0);
  document.getElementById("progress").style = "margin-bottom: 14px; display:true;";
  document.getElementById("calculateButton").style = "display:none;";
}

function refreshStatistics() {
  if (gcodeLines != undefined) {
    displayProgressBar();
    gcodeProcessorWorker.postMessage([gcodeLines, simpleSettingsDict(selectedSettings)]);
    currentCalculationSetting = selectedSettings;
  }
}

function onloadInit() {
  // Request Result Format
  gcodeProcessorWorker.postMessage("getResultFormat");
  // Printer Attribute
  loadSettings();
  collapsePanels();
  addTableEntries();
  displaySettings();
 
}