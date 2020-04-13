const Http = new XMLHttpRequest();

var gcodeProcessorWorker = new Worker('js/gcodeProcessor.js');
var gcodeLines = undefined;
var selectedSettings = 0;
var results = Array(4);
var resultFieldIds = [];
var currentCalculationSetting = 0;

function textLinesFromFile(file, complete) {
  var reader = new FileReader();
  reader.onload = function(progressEvent){
      var lines = this.result.split(/\s*[\r\n]+\s*/g);
      complete(lines);
  };
  reader.readAsText(file);
};

gcodeProcessorWorker.onmessage = function (e) {
  if ("progress" in e.data) {
    setProgressBarPercent(e.data.progress);
  } else if ("complete" in e.data) {
    document.getElementById("LoadingBar").style.display = "none";
    setProgressBarPercent(0);
  } else if ("result" in e.data) {
    const printEstimate = Math.floor(e.data.result['printTime']);    
    currentPrintObject.setDuration(printEstimate);
    const url='http://localhost:1337/reservation-proposal/'+printEstimate;
    Http.open("GET", url);
    Http.send();

  } else if ("layers" in e.data) {
    gcodeProcessorWorker.postMessage("cleanup");
  }
}

Http.onreadystatechange = (e) => {
  const response = Http.responseText;
  //Check if response exists. Better validation is probably a good idea
  if (response == '') {
    return;
  }
  const responseObj = JSON.parse(response);
  //should get a better reference to data actually changing so that refreshGCodNotificationView only happens once

  currentPrintObject.setRecommendedTime(responseObj.recommendJobStart);
  currentPrintObject.setUrgentTime(responseObj.urgentJobStart);
  refreshGCodeNotificationView();
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