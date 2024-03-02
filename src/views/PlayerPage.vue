<script setup>
import ShareIcon from '../components/icons/IconShare.vue'
import ABIcon from '../components/icons/IconAB.vue'
import BasicModal from "../components/BasicModal.vue";
</script>

<template>
  <div id="player-page" class="container">
    <div class="text-center margin-bottom-sm">
      <h1>Anglo Concertina Player</h1>
    </div>
    <v-expansion-panels v-model="panels">
      <v-expansion-panel
        title="Editor"
        value="editor"
      >
        <v-expansion-panel-text>
          <div class="accordion-body">
            <textarea
              label="Text"
              spellcheck="false"
              v-model="tune"
              class="note-input margin-top-sm padding-x-md"
              style="width: 100%"
              rows="10"
              fluid
            ></textarea>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    
    <div id="player">
      <div id="main-midi"></div>
      <div id="speed">
        <v-menu
          :open-on-click="true"
          :close-on-content-click="false"
          location="top center"
        >
          <template v-slot:activator="{ props }">
            <a v-bind="props" >
            <SpeedIcon class="speed-icon" color="" />
          </a>
          </template>

          <v-card min-height="150" min-width="45">
            <div id="bpm-text">{{bpm}}%</div>
            <v-slider
              v-model="bpm"
              direction="vertical"
              track-size="2"
              tick-size="5"
              thumb-size="10"
              :step="1"
              variant="outlined"
              v-on:end="sliderChange"
            ></v-slider>
            
          </v-card>
        </v-menu>
      </div>
      <div id="speed">
        <v-menu
          :open-on-click="true"
          :close-on-content-click="false"
          :no-click-animation="true"
          :persistent="true"
          location="bottom center"
        >
          <template v-slot:activator="{ props }">
            <a v-bind="props" >
              <ABIcon class="ab-icon" v-on:click="clickABMenu"/>
            </a>
          </template>

          <v-card class="ab-menu" min-height="60" min-width="250">
            <div class="ab-input">
              <div class="input-group mb-3 ab-input-group">
               <input type="text" 
                  v-model="abRepeater.startValue"
                  class="form-control ab-text-input" 
                  placeholder="Start" 
                  aria-label="Start">
               <span class="input-group-text ab-text-input-label">s</span>
              </div>
              <div class="input-group mb-3 ab-input-group">
               <input type="text" 
                  class="form-control ab-text-input" 
                  v-model="abRepeater.endValue"
                  placeholder="End" 
                  aria-label="End">
               <span class="input-group-text ab-text-input-label">s</span>
              </div>
            </div>
            <div class="ab-check">
              <input class="form-check-input" type="checkbox" v-model="abRepeater.enabled" id="flexCheckDefault">
              <label class="form-check-label ab-check-label" for="flexCheckDefault">
                Enable A-B
              </label>
              
            </div>
          </v-card>
        </v-menu>
      </div>
     <div class="share">
       <ShareIcon class="share-icon" v-on:click="showDialog = !showDialog"/>
     </div>
    </div>
    <div id="nav-tablature">
      <div id="concertina">
        <div id="left">
          <div id="first">
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l1a }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l2a }"></span>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l3a }"></span>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l4a }"></span>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l5a }"/>
          </div>
          <div id="second">
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l1 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l2 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l3 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l4 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l5 }"/>
          </div>
          <div id="third">
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l6 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l7 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l8 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l9 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.l10 }"/>
          </div>
        </div>
        <div id="right">
          <div id="first">
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r1a }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r2a }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r3a }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r4a }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r5a }"/>
          </div>
          <div id="second">
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r1 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r2 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r3 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r4 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r5 }"/>
          </div>
          <div id="third">
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r6 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r7 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r8 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r9 }"/>
            <span class="dot" v-bind:style="{ backgroundColor: concertina.r10 }"/>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div id="paper"></div>
    </div>
    
    
    <BasicModal v-if="showDialog" v-model="showDialog" :link="link" />
  </div>
</template>

<script>
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';
import { ref } from "vue";
import {dTune, scalePushList, scalePushMapping, scalePullList, scalePullMapping, getScaleAfterKeyConvert} from '../components/Settings.vue'

export default {
    setup(){
    },
    data() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const showDialog = ref(false);
      let tune = dTune
      if (urlParams.get('tune') !== null){
        tune = atob(urlParams.get('tune'));
      }
      return {
        panels:["editor"],
        abRepeater: {
          startValue: null,
          endValue: null,
          enabled: false,
        },
        repeat:false,
        menu: false,
        abMenu: false,
        bpm: 100,
        control: null,
        tune: tune,
        constrolOpts: {
          // soundFontUrl: 'https://thesession.org/soundfonts/louder/',
          soundFontUrl: 'https://gleitz.github.io/midi-js-soundfonts/MusyngKite/',
          program: 21,
          chordsOff: true
        },
        timingCallbacks: null,
        showDialog: showDialog,
        opts: {
          viewportHorizontal: true,
          scrollHorizontal: true,
          add_classes: true,
          // responsive: 'resize',
          scale: 1,
        },
        link: `https://cylin743.github.io/concertina-abc-player/?tune=${encodeURIComponent(btoa(tune))}`,
        concertina: {
          l1a: "#bbb",
          l2a: "#bbb",
          l3a: "#bbb",
          l4a: "#bbb",
          l5a: "#bbb",
          l1: "#bbb",
          l2: "#bbb",
          l3: "#bbb",
          l4: "#bbb",
          l5: "#bbb",
          l6: "#bbb",
          l7: "#bbb",
          l8: "#bbb",
          l9: "#bbb",
          l10: "#bbb",
          r1a: "#bbb",
          r2a: "#bbb",
          r3a: "#bbb",
          r4a: "#bbb",
          r5a: "#bbb",
          r1: "#bbb",
          r2: "#bbb",
          r3: "#bbb",
          r4: "#bbb",
          r5: "#bbb",
          r6: "#bbb",
          r7: "#bbb",
          r8: "#bbb",
          r9: "#bbb",
          r10: "#bbb",
        }
      }
    },
    mounted: function () {
      this.load()
		},
    watch: {
      tune(v) {
        this.control.pause()
        this.load()
      },
    },
    methods: {
      sliderChange(e){
        this.control.pause()
        this.load()
      },
      clickABMenu(){
        this.abRepeater.startClick = false
        this.abRepeater.endClick = false
      },
      aBReplay(ev){
      },
      clickAB(ev){
      },
      clickListener(abcElem, tuneNumber, classes, analysis, drag, mouseEvent){
        var lastClicked = abcElem.midiPitches;
			  if (!lastClicked)
				  return;
        console.log(abcElem)
        abcjs.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, this.control.visualObj.millisecondsPerMeasure()).then(function (response) {
			  }).catch(function (error) {
			  });
      },
      load(){
        this.abRepeater.startClick = false
        this.abRepeater.endClick = false
        const abcObj = abcjs.renderAbc('paper', this.tune, {
          scale: 1,
          staffwidth: 700,
          paddingleft: 0,
          paddingright: 0,
          responsive: 'resize',
          oneSvgPerLine: true,
          add_classes: true,
          clickListener: this.clickListener,
        });
        Object.keys(this.concertina).forEach((k)=>{
          this.concertina[k] = "#bbb"
        })
        const key = abcObj[0].lines[0].staff[0].key.root;
        const [visualObj] = abcObj
        var parent = this

        var lastEls = [];
        var lastScales = [];
        var lastWay = "";
        var pushCount = 0;
        var pullCount = 0;
        var CursorControl = function(){
            var self = this
            self.beatSubdivisions = 2;
            function colorElements(els) {
              var needPull = false
              var needPush = false
              var i;
              var j;
              for (i = 0; i < lastEls.length; i++) {
                for (j = 0; j < lastEls[i].length; j++) {
                  lastEls[i][j].style.color = ""
                }
              }
              var scales = []
              for (i = 0; i < els.length; i++) {
                for (j = 0; j < els[i].length; j++) {
                  els[i][j].style.color = "brown"
                  for (var k = 0; k < els[i][j].children.length; k ++){
                    if(els[i][j].children[k].dataset.name == "chord" || els[i][j].children[k].dataset.name == "lyric"){
                      const t = els[i][j].children[k].textContent.toLowerCase()
                      if(t == "push" || t == "r" || t == "]["){
                        needPush = true
                      }else if(t == "pull" || t == "b" || t == "[]"){
                        needPull = true
                      }
                    }
                    scales.push(getScaleAfterKeyConvert(key, els[i][j].children[k].dataset.name))
                  }
                }
              }
              const pushArray = scales.filter(value => scalePushList.includes(value));
              const pullArray = scales.filter(value => scalePullList.includes(value));

              lastScales.forEach((k)=>{
                  parent.concertina[k] = "#bbb"
              })
              if(pullArray.length > pushArray.length){
                pushCount = 0
                pullArray.forEach((scale)=>{
                  const k = scalePullMapping[scale]
                  parent.concertina[k] = "blue"
                })
                lastScales = pullArray.map((scale)=>scalePullMapping[scale])
                lastWay = "pull"
                pullCount++;
              } else if(pullArray.length < pushArray.length) {
                pullCount = 0
                pushArray.forEach((scale)=>{
                  const k = scalePushMapping[scale]
                  parent.concertina[k] = "red"
                })
                lastScales = pushArray.map((scale)=>scalePushMapping[scale])
                lastWay = "push"
                pushCount++
              } else if(needPull) {
                pushCount = 0
                pullArray.forEach((scale)=>{
                  const k = scalePullMapping[scale]
                  parent.concertina[k] = "blue"
                })
                lastScales = pullArray.map((scale)=>scalePullMapping[scale])
                lastWay = "pull"
                pullCount++;
              }else if(needPush) {
                pullCount = 0
                pushArray.forEach((scale)=>{
                  const k = scalePushMapping[scale]
                  parent.concertina[k] = "red"
                })
                lastScales = pushArray.map((scale)=>scalePushMapping[scale])
                lastWay = "push"
                pushCount++

              }else{
                if((lastWay === "pull" && pullCount < 5) || pushCount > 4){
                  pushCount = 0
                  pullArray.forEach((scale)=>{
                    const k = scalePullMapping[scale]
                    parent.concertina[k] = "blue"
                  })
                  lastScales = pullArray.map((scale)=>scalePullMapping[scale])
                  lastWay = "pull"
                  pullCount++;
                }else{
                  pullCount = 0
                  pushArray.forEach((scale)=>{
                    const k = scalePushMapping[scale]
                    parent.concertina[k] = "red"
                  })
                  lastScales = pushArray.map((scale)=>scalePushMapping[scale])
                  lastWay = "push"
                  pushCount++
                }

              }
              lastEls = els;
            }
            self.onStart = function() {
            }
            self.onStop = function() {
            }
            self.onFinished = function() {
              Object.keys(parent.concertina).forEach((k)=>{
                parent.concertina[k] = "#bbb"
              })
            }
            self.onBeat = function(beatNumber, totalBeats, totalTime) {
              if(parent.abRepeater.enabled && (Number(parent.abRepeater.startValue) < Number(parent.abRepeater.endValue))){
                const beatSec = beatNumber/totalBeats*totalTime/1000
                if(Number(parent.abRepeater.startValue) != 0){
                  if(beatSec < parent.abRepeater.startValue){
                    parent.control.seek(parent.abRepeater.startValue, "seconds")
                  }
                }
                if(Number(parent.abRepeater.endValue) != 0){
                  if(beatSec >= parent.abRepeater.endValue){
                    if(parent.control.isLooping){
                      parent.control.seek(Number(parent.abRepeater.startValue), "seconds")
                    }else{
                      parent.control.pause()
                    }
                  }
                }
              }
            }
            self.onEvent = function(ev) {
              colorElements(ev.elements)
            }
          }
        var cursorControl = new CursorControl();
        const synthControl = new abcjs.synth.SynthController();
        synthControl.load('#main-midi', cursorControl, {
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          displayLoop: true,
          displayWarp: true,
          showCursor: true,
        });
        this.control = synthControl;
        this.control.setTune(visualObj, false, this.constrolOpts);
        var keySignature = visualObj.getKeySignature()
        var timingCallbacks = new abcjs.TimingCallbacks(visualObj, {});
        var tunesSet = []
        var needPull = false
        var needPush = false
        var lastWay = "";
        var pushCount = 0;
        var pullCount = 0;
        for(var i = 0; i < timingCallbacks.noteTimings.length; i++){
          if(!timingCallbacks.noteTimings[i].hasOwnProperty("elements")){
            continue
          }
          var tuneSet = []
          for(var v= 0; v < timingCallbacks.noteTimings[i].elements.length; v++){
            for(var k = 0; k < timingCallbacks.noteTimings[i].elements[v][0].children.length; k++){
              const t = timingCallbacks.noteTimings[i].elements[v][0].children[k].textContent.toLowerCase()
              if(t == "push" || t == "r" || t == "]["){
                needPush = true
              }else if(t == "pull" || t == "b" || t == "[]"){
                needPull = true
              }
              var datastring = timingCallbacks.noteTimings[i].elements[v][0].children[k].dataset.name
              if(datastring.length <= 3){
                var scale = getScaleAfterKeyConvert(keySignature.root, datastring)
                tuneSet.push(scale)
              }
            }
          }
          if(tuneSet.length==0){
            continue
          }
          const pushArray = tuneSet.filter(value => scalePushList.includes(value));
          const pullArray = tuneSet.filter(value => scalePullList.includes(value));
          if(pullArray.length > pushArray.length){
            pushCount = 0
            lastWay = "pull"
            pullCount++;
            tunesSet.push({
                  "scales": pullArray,
                  "def": "pull"
                })
          }else if(pullArray.length < pushArray.length) {
            pullCount = 0
            lastWay = "push"
            pushCount++;
            tunesSet.push({
                  "scales": pushArray,
                  "def": "push"
                })
          }else if(needPull) {
            pushCount = 0
            lastWay = "pull"
            pullCount++;
            tunesSet.push({
                  "scales": pullArray,
                  "def": "pull"
                })
          }else if(needPush) {
            pullCount = 0
            lastWay = "push"
            pushCount++;
            tunesSet.push({
                  "scales": pushArray,
                  "def": "push"
                })
          }else{
            if((lastWay === "pull" && pullCount < 5) || pushCount > 4){
              pushCount = 0
              lastWay = "pull"
              pullCount++;
              tunesSet.push({
                  "scales": pullArray,
                  "def": "pull"
                })
            }else{
              pullCount = 0
              lastWay = "push"
              pushCount++;
              tunesSet.push({
                  "scales": pushArray,
                  "def": "push"
                })
            }
          }
        }
        this.$store.dispatch('updateTabs', JSON.stringify(tunesSet))
        this.control.setWarp(this.bpm);
        this.link = `https://cylin743.github.io/concertina-abc-player/?tune=${encodeURIComponent(btoa(this.tune))}`
        this.abRepeater.startValue = null
        this.abRepeater.endValue = null
      }
    },
    created() {
    }
  }
</script>


<style lang="scss">
@forward 'vuetify/settings' with (
  $slider-vertical-min-height: 100px,
);
html,
body {
  font-size: 16px;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.note-input {
  border: 1px solid black;
  line-height: 1.65;
  background-color: #fff;
  background-size: 100% 1.65em;
}
#paper .cursor {
  background-color: #ffffc0;
  opacity: 0.5;
}
.abcjs-cursor {
	stroke: red;
  width:2px;
}
#player {
  display: flex;
  margin-top: 20px;

}
#main-midi{
  width: 100%;
  height: 35px;
}
.abcjs-inline-audio{
  height: 35px;
  border-top-left-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 5px;
}
.share-icon {
  height: 100%;
  cursor: pointer;
}
.speed-icon {
  color: white;
  height: 100%;
  background:#424242;
  cursor: pointer;
}
.ab-icon{
  color: white;
  height: 100%;
  background:#424242;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}
.share {
  /* height: ; */
  width: 30px;
  display: flex;
  justify-content: center;    
  align-items: center;  
  align-content: center;
  /* border: 1px solid #000; */
}
.color {
	stroke: #ddd !important;
	fill: red !important;
  color: red !important;
}
.abcjs-cursor {
  stroke: blue;
}
@media (prefers-color-scheme: dark) {
  .abcjs-cursor {
    stroke: #000;
  }
}
path {
	transition: opacity 1s;
}
.abcjs-note.hidden, .abcjs-beam-elem.hidden {
	opacity: 0;
}
#nav-tablature{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
#concertina{
  margin: 10px 15px;
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
#concertina #left #first {
  margin-left:20px;
}
#concertina #left #second {
  margin-left:10px;
}
#concertina #right #third {
  margin-left:20px;
}
#concertina #right #second {
  margin-left:10px;
}
#concertina .dot {
  height: 25px;
  width: 25px;
  /* background-color: #bbb; */
  border-radius: 50%;
  display: inline-block;
}
.v-input__control{
  min-height: 100px !important;
}
.abcjs-midi-tempo{
  background-color: white !important;
}
#bpm-text{
  font-size: 12px;
  display: flex;
  justify-content: center;
}
.ab-menu{
  font-size: 12px;
}
.ab-input{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;
}
.ab-text-input-label {
  height: 20px;
  width: 20px;
}
.ab-text-input {
  width: 50px !important;
  height: 20px;
}
.ab-input-group {
  width: 100px !important;
  margin: 10px;
  height: 20px;
  font-size: 12px;
}
.ab-input-group input{
  font-size: 12px;
  max-width: 70px;
}
.ab-check{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5px;
}
.ab-check-label{
  margin-left: 5px;
}

</style>
