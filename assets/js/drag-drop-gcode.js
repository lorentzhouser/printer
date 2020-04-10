var currentPrintObject;

window.addEventListener("drop", function(e) {
      e.preventDefault();
      document.getElementsByTagName("HTML")[0].style.opacity = 1;
      var gcodeNotification = document.getElementById("GCodeReservation");
      currentPrintObject = new printObject(e.dataTransfer);
      
      gcodeNotification.classList.add("Visible");
      textLinesFromFile(currentPrintObject.getFileData(), function (lines) {
          console.log('!!new lines being baked!!');
          gcodeProcessorWorker.postMessage([lines, settings]);
      });

      document.getElementById("GCodeTitle").innerHTML = currentPrintObject.getFilename();
      document.getElementById("LoadingBar").style.display = "block";
      document.getElementById("GCodeTimeEstimate").style.display = "none";

      var cancelButton = document.getElementById("cancelButton");
      cancelButton.addEventListener("click", function () {
          //remove file and close
          currentPrintObject = {};
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
    // const postURL = 'http://localhost:1337/api/v1/reserve-job';
    const postURL = '/api/v1/reserve-job';

    if ((reservationDuration == -1) || (selectedReservationTimeBeforeSubmit == -1)) {
        console.log("one date variable has not been initialized");
        return;
    }

    var formData = new FormData()
    formData.set('duration', currentPrintObject.getPrintTime());
    formData.set('date', currentPrintObject.getSelectedReservation()); 
    formData.set('description', currentPrintObject.getFilename());
    formData.set('device', 1);

    let request = new XMLHttpRequest();
    request.open("POST", postURL);
    request.send(formData);
});

//go back to menu options
var backBtn = document.getElementById('back');
backBtn.addEventListener('click', (e) => {
    document.getElementById('DetailsDialog').classList = '';
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
    const value = reserveBtn.style.bottom;
  
  }