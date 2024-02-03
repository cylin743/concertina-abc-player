<script setup>
import ShareIcon from './components/icons/IconShare.vue'
import SpeedIcon from './components/icons/IconSpeed.vue'
import BasicModal from "./components/BasicModal.vue";
</script>

<template>
  <div id="app" class="container padding-xxxs">
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
            <v-textarea
              label="Text"
              spellcheck="false"
              v-model="tune"
              class="note-input margin-top-sm padding-x-md"
              style="width: 100%"
              rows="10"
              fluid
            ></v-textarea>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    
    <div id="player">
      <div id="main-midi"></div>
      <div id="speed">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="top"
        >
          <template v-slot:activator="{ props }">
            <a v-bind="props" >
            <SpeedIcon class="share-icon" color="white" />
          </a>
          </template>

          <v-card max-height="150" max-width="40">
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
import {dTune, scalePushList, scalePushMapping, scalePullList, scalePullMapping, getScaleAfterKeyConvert} from './components/Settings.vue'

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
        menu: false,
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
      aBReplay(){
        // console.log("predd")
        // this.control.pause()
        // this.control.play()
        // this.control.seek(18, "seconds")
      },
      clickListener(abcElem, tuneNumber, classes, analysis, drag, mouseEvent){
        var lastClicked = abcElem.midiPitches;
			  if (!lastClicked)
				  return;
        abcjs.synth.playEvent(lastClicked, abcElem.midiGraceNotePitches, this.control.visualObj.millisecondsPerMeasure()).then(function (response) {
			  }).catch(function (error) {
			  });
      },
      load(){
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
                  els[i][j].style.color = "red"
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
              // console.log("t", beatNumber/totalBeats*totalTime/1000)
              // if(beatNumber/totalBeats*totalTime/1000 > 10){
              //   parent.control.seek(5, "seconds")
              // }
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
        this.control.setWarp(this.bpm);
        this.link = `https://cylin743.github.io/concertina-abc-player/?tune=${encodeURIComponent(btoa(this.tune))}`
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
  line-height: 1.65;
  caret-color: orange;
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
  width: 100%
}
.share-icon {
  color: red;
  height: 100%;
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
}

</style>
