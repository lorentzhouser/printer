var currentPrintObject;
var gcodeNotification = document.getElementById("GCodeReservation");

window.addEventListener("drop", function(e) {
      resetNotificationView();
      e.preventDefault();
      document.getElementsByTagName("HTML")[0].style.opacity = 1;
      currentPrintObject = new printObject(e.dataTransfer);
    
      textLinesFromFile(currentPrintObject.getFileData(), function (lines) {
          gcodeProcessorWorker.postMessage([lines, settings]);
      });

      document.getElementById("GCodeTitle").innerHTML = currentPrintObject.getFilename();
      
      document.getElementById("cancelButton").addEventListener("click", function () {
          gcodeNotification.classList.remove("Visible");
          document.getElementById("GCodeReservation").style.height = "70px";
      });
});

window.addEventListener("dragover", function(e) {
    e.preventDefault();
});

var lastTarget = null;
window.addEventListener("dragenter", function(e) {
    lastTarget = e.target;
    document.getElementsByTagName("HTML")[0].style.opacity = 0.8;
});

window.addEventListener("dragleave", function(e) {
    if(e.target === lastTarget || e.target === document)
    {
        document.getElementsByTagName("HTML")[0].style.opacity = 1;
    }
});

//CONFIRM RESERVATION ACTIONS//
var reserveBtn = document.getElementById('reserve-button');
reserveBtn.addEventListener('click', (e) => {
    console.log('attempting to make confirmation');
    currentPrintObject.confirmReservation();
});

//go back to menu options
var backBtn = document.getElementById('back');
backBtn.addEventListener('click', (e) => {
    goBackNotificationView();
});

function refreshGCodeNotificationView() {
    //update DOM
    const printOptions = document.getElementById('PrintOptions');
    printOptions.innerHTML = '';
    printOptions.appendChild(currentPrintObject.getPrintProposalDOMElement());
    document.getElementById('GCodeTimeEstimate').innerHTML = currentPrintObject.getHumanReadableTimeEstimate();
    document.getElementById('GCodeTimeEstimate').style.display = "block";
    document.getElementById("GCodeReservation").style.height = "275px"; //+25 for margin
  }
  
function moveToConfirmation() {
    var schedule = document.getElementById('confirm-schedule');
    schedule.innerHTML = currentPrintObject.getSelectedReservation(); //make human readable
    var detailsDialog = document.getElementById('DetailsDialog');
    detailsDialog.classList = 'DetailsDialogSlide';
}

function goBackNotificationView() {
    var detailsDialog = document.getElementById('DetailsDialog');
    detailsDialog.classList = '';
}

function resetNotificationView() {
    currentPrintObject = {};
    goBackNotificationView();
    gcodeNotification.classList.add("Visible");
    const printOptions = document.getElementById('PrintOptions');
    printOptions.innerHTML = '';
    document.getElementById('GCodeTimeEstimate').innerHTML = '';
    document.getElementById("GCodeReservation").style.height = "70px"; //+25 for margin
    document.getElementById("LoadingBar").style.display = "block";
    document.getElementById("GCodeTimeEstimate").style.display = "none";
}