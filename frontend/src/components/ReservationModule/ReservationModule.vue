<template>
    <div id="GCodeDropNotification" class="GCodeReservation">
        <div class="GCodeReservation" id="GCodeReservation">
            <div class="GCodeReservationInfoContainer" id="back">
                <div class="GCodeTitle subtitle2" id="GCodeTitle">
                    project_name.gcode
                </div>
                <div class="GCodeDetail caption">
                <!-- <div id="PreviousButton"><</div> -->
                <div id="LoadingBar"></div>
                <div id="GCodeTimeEstimate"></div>
                </div>
            </div>
            <div class="Button GCodeClose" id="cancelButton"></div>
            
            <div id="DetailsDialog">
            <!-- First Slide Page -->
            <div id="PrintOptions">replaced by print object details</div>
            <!-- Second Slide Page -->
            <div id="Confirmation">
                <div class="receipt">
                <div id="confirm-schedule" class="subtitle">
                    8:15 tomorrow morning 
                </div>
                <div id="confirm-printer" class="caption">
                    printer 1
                </div>
                <div id="confirm-filament" class="caption">
                    1600.01 mm 
                </div>
                </div>
                <div id="reserve-button" class="confirm Button">RESERVE</div>
            </div>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    name: 'ReservationModule'
}
</script>

<style lang="scss" scoped>
    #GCodeDropNotification {
    
    .GCodeReservation {
      right: -310px;
      transition: 1s right;
      background-color: black;
      color: white;
      width: 300px;
      position: absolute;
      top: 80px;
      display: block;
      height: 70px;
      // height: 270px;
      z-index: 1000;
      -webkit-box-shadow: -2px 2px 8px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: -2px 2px 8px 0px rgba(0,0,0,0.75);
      box-shadow: -2px 2px 8px 0px rgba(0,0,0,0.75);
      box-shadow: black;
      -webkit-transition: all 0.5s ease-in-out;
      -moz-transition: all 0.5s ease-in-out;
      -o-transition: all 0.5s ease-in-out;
      transition: all 0.5s ease-in-out;
      overflow: hidden;
    }

    .Visible {
      right: 0px;
      // right: 200px;
      -webkit-transition: all 1s ease-in-out;
      -moz-transition: all 1s ease-in-out;
      -o-transition: all 1s ease-in-out;
      transition: all 1s ease-in-out;
    }
}

.GCodeReservationInfoContainer {
  width: 230px;
  height: 70px;
  background: black;
  padding: 10px;
  padding-top: 15px;
  float: left;
  cursor: pointer;
}

.GCodeReservationInfoContainer::selection {
  color: none;
  background: none;
}
/* For Mozilla Firefox */
.GCodeReservationInfoContainer::-moz-selection {
  color: none;
  background: none;
}

#DetailsDialog {
  display: block;
  float: left;
  width: 200%;
  height: 200px;
  border-top: 0.9px solid white;
  box-sizing: border-box;
  background-color: yellowgreen;
  padding-top: auto;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}

.DetailsDialogSlide {
  transform: translate(-300px, 0px);
}

#PrintOptions {
  display: block;
  padding: 10px;
  float: left;
  height: 100%;
  width: 50%;
  background-color: black;
  color: white;
}

#Confirmation { 
  display: block;
  padding: 10px;
  float: left;
  height: 100%;
  width: 50%;
  background-color: black;
  color: white;
}
.receipt {
  margin-bottom: 20px;
}

.confirm {
  cursor: pointer;
  width: 100%;
  height: 30%;
}

.confirm::selection {
  color: none;
  background: none;
}
/* For Mozilla Firefox */
.confirm::-moz-selection {
  color: none;
  background: none;
}

.GCodeTitle {
  cursor: pointer;
  height: 55%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.GCodeTitle::selection {
  color: none;
  background: none;
}
/* For Mozilla Firefox */
.GCodeTitle::-moz-selection {
  color: none;
  background: none;
}

#GCodeTimeEstimate {
display: block;
margin-top: auto;
}

#LoadingBar {
display: block;
background-color:white; 
width: 0%;
height: 5px;
margin-top: 10px;
}

.MenuOption {
  cursor: pointer;
  height: 50px;
  width: 100%;
  overflow: hidden;
}

.InfoTextOption {
  width: 85%;
  float: left;
}

#arrow {
  cursor: pointer;
  display: block;
  float: left;
  background-color: black;
  color: white;
  text-align: right;
  width: 10%;
  height: 100%;
  font-size: 15pt;
}

.PrivateOption {
  cursor: pointer;
  height: 30px;
  width: 100%;
}

.GCodeClose {
  float: left;
  box-sizing: border-box;
  height: 70px;
  width: 70px;
  text-align: center;
  border-left: 0.9px solid white;
  right: 0px;
  background-image: url(../../icons/close_white_thin.svg);
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
</style>