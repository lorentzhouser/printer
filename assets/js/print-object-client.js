class printObject {
    //all dates and times are in seconds from EPOCH
    //previous constructor used simply filename
    //possibly the print object should make calls and post time estimate request?

    constructor(dataTransfer, printTime = -1, startTime = -1) {
      var lastFile = dataTransfer.files[0];
      const filename = lastFile.name;
      if (!this.hasGCodeExtension(filename)) {
        //alert user that filename cannot have non-delimiting periods and must be .gcode file
        throw "invalid file type";
      }
      this.fileData = lastFile;
      this.filename = filename;
      this.printTime = printTime;
      this.startTime = startTime;
      printObject.selectedReservation  = -1;
    }

    setFilename(filename) { this.filename = filename; }
    setPrintTime(printTime) { this.printTime = printTime; }
    setStartTime(startTime) { this.startTime = startTime; }
    //update to recommended time-slot-object when printer details incorporated
    setRecommendedTime(seconds) { this.recommendedTime = seconds; }
    setUrgentTime(seconds) { this.urgentTime = seconds; }

    static setSelectedReservation(index) { printObject.selectedReservation = index; }
    getFileData() { return this.fileData; }
    getFilename() { return this.filename; }
    getCleanFilename() {
      const nameElements = filename.split(".");
      return nameElements[0];
    }

    getPrintTime() { return printTime; }
    getStartTime() { return startTime; }
    getHumanReadableRecommendedTime() { return printObject.getGenericHumanReadableDate(this.recommendedTime); }
    getHumanReadableUrgentTime() { return printObject.getGenericHumanReadableDate(this.urgentTime); }
    getSelectedReservation() {
      switch(Number(printObject.selectedReservation)) {
        case -1:
          return "none";
        case 0:
          return this.getHumanReadableRecommendedTime();
        case 1:
          return this.getHumanReadableUrgentTime();
        default:
          return "url for manual entry?";
      }
    }

    getPrintProposalDOMElement() {
      //update with human readable
      var printOptions = document.createElement('div');
      const data = {"Recommended":this.getHumanReadableRecommendedTime(), "Urgent":this.getHumanReadableUrgentTime(), "Other Options":"Manual"};
      var index = 0;
      for (var key in data) {
        var menuOption = document.createElement("div");
        menuOption.classList = "MenuOption";
        menuOption.setAttribute("tag", index);
        menuOption.innerHTML = '<div class="InfoTextOption"><div class="subtitle2">' + key +'</div><div class="caption">'+ data[key] +'</div></div><div id="arrow">></div>';
        menuOption.addEventListener("click", function(e) {
          const index = e.currentTarget.getAttribute('tag');
          printObject.setSelectedReservation(index);
          moveToConfirmation();
        });
        printOptions.appendChild(menuOption);
        index++;
      }

      const privateOption = document.createElement("div");
      privateOption.classList = 'PrivateOption';
      privateOption.innerHTML = '<div class="PrivateOption"><input type="checkbox">  Class Related</div>';
      printOptions.appendChild(privateOption);
      return printOptions;      
    }

    hasGCodeExtension(filename) {
      //boolean function that parses the extension from filename to check for correct filetype
      const nameElements = filename.split(".");
      const fileTypeName = nameElements[nameElements.length-1].toLowerCase();
      return ((fileTypeName == 'gcode') && (nameElements.length == 2));
    }
    //deallocation of memory and destroy upon uploading a new file

    //HUMAN READABLE FUNCTIONS
    getHumanReadableTimeEstimate() {
      if (this.printTime == -1) { return "undefined"; }
      var durationDate = new Date(1970, 0, 1); // Epoch
      durationDate.setSeconds(this.printTime);
      return durationDate.getHours() + ' hrs ' + durationDate.getMinutes() + ' mins';
    }

    getHumanReadableDate() {
      return(printObject.getGenericHumanReadableDate(this.startTime));
    }

    static getGenericHumanReadableDate(seconds) {
      const pastSecondsMargin = 10*60; //10 minutes 'timeout' essentially
      if (seconds == -1) { return "undefined"; }
      const currenSecondsSince1970 = Math.round((new Date()).getTime() / 1000);
      if ((seconds <= currenSecondsSince1970) && (Math.abs(seconds-currenSecondsSince1970) <= pastSecondsMargin)) {
        //make sure not to recommend times that are far in time..
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
}