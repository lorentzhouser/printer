var selectedReservationTimeBeforeSubmit = -1;
var reservationDuration = -1;
var fileNameTitle = "";

function textLinesFromFile(file, complete) {
    var reader = new FileReader();
    reader.onload = function(progressEvent){
        var lines = this.result.split(/\s*[\r\n]+\s*/g);
        complete(lines);
    };
    reader.readAsText(file);
};

window.addEventListener("drop", function(e) {
        e.preventDefault();
        document.getElementsByTagName("HTML")[0].style.opacity = 1;
        var gcodeNotification = document.getElementById("GCodeReservation");

        var lastFile = e.dataTransfer.files[0];
        var fileName = lastFile.name;
        fileNameTitle = fileName;
        var nameElements = fileName.split(".");
        var fileTypeName = nameElements[nameElements.length-1].toLowerCase();

        if (fileTypeName == "gcode") {
            gcodeNotification.classList.add("Visible");
            textLinesFromFile(lastFile, function (lines) {
                console.log('!!new lines being baked!!');
                gcodeProcessorWorker.postMessage([lines, settings]);
            });

            document.getElementById("GCodeTitle").innerHTML = fileName;
            document.getElementById("LoadingBar").style.display = "block";
            document.getElementById("GCodeTimeEstimate").style.display = "none";

            var cancelButton = document.getElementById("cancelButton");
            cancelButton.addEventListener("click", function () {
                //remove file and close
                gcodeNotification.classList.remove("Visible");
                document.getElementById("GCodeReservation").style.height = "70px";
            });
        }
        else {
            console.log("not gcode file");
        }

});


window.addEventListener("dragover", function(e) {
    e.preventDefault();
});

var lastTarget = null;

window.addEventListener("dragenter", function(e)
{
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
    formData.set('duration', reservationDuration);
    formData.set('date',selectedReservationTimeBeforeSubmit); 
    formData.set('description', fileNameTitle);
    formData.set('device', 1);

    let request = new XMLHttpRequest();
    request.open("POST", postURL);
    request.send(formData);
});


var reserveBtn = document.getElementById('back');
reserveBtn.addEventListener('click', (e) => {
    document.getElementById('DetailsDialog').classList = '';
});

function refreshGCodeNotificationView(printEstimate, times) {
    //update DOM
    //make into more dynamic static object? make time a number variable and only dom updates with reformatted version. 
    var options = [
      ["Recommended",times[0]], 
      ["Urgent",times[1]],
      ["Other Options","Manual"]
    ];

    const printOptions = document.getElementById('PrintOptions');
    printOptions.innerHTML = '';
    for (let i = 0; i < options.length; i++) {
      const title = options[i][0];
      var detail;
      if (isNaN(options[i][1])) {
        detail = options[i][1];
      }
      else {
        detail = printTimeHumanReadable(options[i][1]);
      }
       
      var menuOption = document.createElement("div");
      menuOption.classList = "MenuOption";
      menuOption.setAttribute("title", title);
      menuOption.setAttribute("tag", i);
      menuOption.innerHTML = '<div class="InfoTextOption"><div class="subtitle2">' + title +'</div><div class="caption">'+detail+'</div></div><div id="arrow">></div>';
      menuOption.addEventListener("click", function(e) {
        const index = e.currentTarget.getAttribute('tag');
        // srcElement.innerHTML.toLowerCase();
        selectedReservationTimeBeforeSubmit = options[index][1];
        moveToConfirmation(options[index]);
      });
      printOptions.appendChild(menuOption);
    };
    const privateOption = document.createElement("div");
    privateOption.classList = 'PrivateOption';
    privateOption.innerHTML = '<div class="PrivateOption"><input type="checkbox">  Class Related</div>';
    printOptions.appendChild(privateOption);
  
    // document.getElementById('PrintOptions').appendChild(menuOption);
    if (printEstimate != -1) {
      document.getElementById('GCodeTimeEstimate').innerHTML = printTimeHumanReadable(printEstimate, true);
      reservationDuration = printEstimate;
    }
    document.getElementById('GCodeTimeEstimate').style.display = "block";
    document.getElementById("GCodeReservation").style.height = "275px"; //+25 for margin
  }
  
  function moveToConfirmation(chosenOption) {
    var schedule = document.getElementById('confirm-schedule');
    schedule.innerHTML = printTimeHumanReadable(chosenOption[1]);
  
    var detailsDialog = document.getElementById('DetailsDialog');
    detailsDialog.classList = 'DetailsDialogSlide';
    const value = reserveBtn.style.bottom;
  
  }