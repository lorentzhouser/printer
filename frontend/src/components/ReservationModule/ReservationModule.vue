<template>
    <div class="Notification">
        <div id="GCodeDropNotification" class="GCodeReservation">
          <div class="GCodeReservation" v-bind:class="{ Visible: visibilty, ShowDetail: showDetail }" id="GCodeReservation">
              <div class="GCodeReservationInfoContainer" id="back" @click="back">
                  <div class="GCodeTitle subtitle2" id="GCodeTitle">
                      {{this.fileObject.filename}}
                  </div>
                  <div class="GCodeDetail caption">
                  <div id="LoadingBar" :style="{width:progressPercent + '%'}"></div>
                  <div id="GCodeTimeEstimate">{{fileObject.humanReadableDuration}}</div>
                  </div>
              </div>
              <div @click="hide" class="Button GCodeClose" id="cancelButton"></div>
              <div id="DetailsDialog" v-bind:class=" { DetailsDialogSlide : showConfirmation }">
                <Options v-bind:proposal="proposal" v-on:selectOption="selectOption" v-on:hide="hide" v-on:makeCourseRelated="makeCourseRelated"/>
                <Confirmation v-bind:receipt="generateReceipt"/>
              </div>
          </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Options from './Options.vue'
import Confirmation from './Confirmation.vue'
var gcodeProcessorWorker = new Worker('../../assets/js/GcodeProcessor.js', { type: "module" });

export default {
    name: 'ReservationModule',
    components: {
      Options,
      Confirmation
    },
    props: ["visibilty", "file"],
    data: function() {
      return {
        progressPercent: 0,
        fileObject: { 
          filename: 'filename.gcode',
          duration: 5353,
          humanReadableDuration: '',
          filament: 5932,
          courseRelated: false,
          lines: ''
        },
        proposal: {
          recommended: {
            startTime: 100,
            printer: 1
          },
          urgent: {
            startTime: 50,
            printer: 2
          },
        },
        selectedOption: '',
      }      
    },
    computed: {
      showDetail: function() {
        if (Object.keys(this.proposal).length === 0) {
          return false;
        }
        return true;
      },
      showConfirmation: function() {
        if (this.selectedOption === '') {
          return false;
        }
        return true;
      },
      generateReceipt: function() {
        var receipt = {
          startTime: '',
          device: '',
          filament: this.fileObject.filament,
        };
        
        if (this.selectedOption == 'recommended') {
          receipt.startTime = this.proposal.recommended.startTime;
          receipt.printer = this.proposal.recommended.printer;  
        }
        else if (this.selectedOption == 'urgent') {
          receipt.startTime = this.proposal.urgent.startTime;
          receipt.printer = this.proposal.urgent.printer;  
        }
         
        return receipt;
      }
    },
    mount: function() {
      
    },
    watch: {
      file: function() {
        this.listenToMessages();
        const self = this;
        if (this.file) {
          //page opacity perhaps css
          this.textLinesFromFile(this.file, function (lines) {
            console.log('lines captured');
            self.fileObject.lines = lines;
            const settings = {"maxSpeed":[100,100,10,100],"maxPrintAcceleration":[1000,1000,100,10000],"maxTravelAcceleration":[1000,1000,100,10000],"maxJerk":[10,10,1,10],"absoluteExtrusion":false,"feedrateMultiplyer":100,"filamentDiameter":1.75,"firmwareRetractLength":2,"firmwareUnretractLength":2,"firmwareRetractSpeed":50,"firmwareUnretractSpeed":50,"firmwareRetractZhop":0,"timeScale":1.01};
            gcodeProcessorWorker.postMessage({
                message: 'processGcodes',
                data: [lines, settings]
            });
          });
          this.fileObject.filename = this.file.name;
        }
        else {
          this.hide();
        }
      }
    },
    methods: {
      //works but whole module needs restructuring
      hide: function() {
        this.$emit('toggleVisibility', false);
        this.resetData();
      },
      back: function() {
        this.selectedOption = '';
      },
      selectOption: function(option) {
        this.selectedOption = option;
      },
      resetData: function() { 
        this.proposal = {};
      },
      makeCourseRelated: function(checked) {
        this.fileObject.courseRelated = checked;
      },
      textLinesFromFile: function(file, complete) {
        var reader = new FileReader();
        reader.onload = function(){
          var lines = this.result.split(/\s*[\r\n]+\s*/g);
          complete(lines);
        };
        reader.readAsText(file);
      },
      listenToMessages: function() {
        var self = this;
        gcodeProcessorWorker.onmessage = function (e) {
        if ("progress" in e.data) {
          self.progressPercent = e.data.progress;
        } else if ("complete" in e.data) {
          document.getElementById("LoadingBar").style.display = "none";
          self.progressPercent = 0;
        } else if ("result" in e.data) {
          const result = e.data.result;
          const duration = Math.floor(result.printTime);

          self.fileObject.duration = duration
          self.fileObject.filament = result.filamentUsage;
          self.fileObject.humanReadableDuration = result.printTimeHumanReadable;

          const url='http://localhost:1337/reservation-proposal/'+duration;
          axios.get(url)
            .then(res => this.proposal = res.data)
            .catch(err => console.log("error " + err));

        } else if ("layers" in e.data) {
          gcodeProcessorWorker.postMessage("cleanup");
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
   @import "@/assets/css/components/_reservation-module.scss";
</style>