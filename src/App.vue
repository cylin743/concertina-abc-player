<script setup>
import ShareIcon from './components/icons/IconShare.vue'
import BasicModal from "./components/BasicModal.vue";
</script>

<template>
  <div id="app" class="container padding-xxxs">
    <div class="text-center margin-bottom-sm">
      <h1>Concertina Player</h1>
    </div>
    <div class="accordion">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Editor
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <textarea
              spellcheck="false"
              v-model="tune"
              class="note-input margin-top-sm padding-x-md"
              style="width: 100%"
              rows="10"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    
    <div id="player">
      <div id="main-midi"></div>
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
const scaleMap = {
  "left":{
    "push": {
      "E,": "l1a",
      "A,": "l2a",
      "^C": "l3a",
      "A": "l4a",
      "^G": "l5a",
      "C,": "l1",
      "G,": "l2",
      "C": "l3",
      "E": "l4",
      "G": "l5",
      "B,": "l6",
      "D": "l7",
      "B": "l9",
      "d": "l10",
    },
    "pull":{
      "F,": "l1a",
      "_B,": "l2a",
      "^D": "l3a",
      "G": "l4a",
      "_B": "l5a",
      "G,": "l1",
      "B,": "l2",
      "D": "l3",
      "F": "l4",
      "A": "l5",
      "A,": "l6",
      "^F": "l7",
      "c": "l9",
      "e": "l10",
    }
  },
  "right":{
    "push": {
      "^c": "r1a",
      "a": "r2a",
      "^g": "r3a",
      "^c'": "r4a",
      "F'": "r5a",
      "c": "r1",
      "e": "r2",
      "g": "r3",
      "c'": "r4",
      "e'": "r5",
      "b": "r7",
      "d'": "r8",
      "g'": "r9",
      "b'": "r10",
    },
    "pull":{
      "^d": "r1a",
      "g": "r2a",
      "_b": "r3a",
      "^d'": "r4a",
      "a'": "r5a",
      "B": "r1",
      "d": "r2",
      "f": "r3",
      "b": "r5",
      "^f": "r6",
      "a": "r7",
      "c'": "r8",
      "e'": "r9",
      "^f'": "r10",
    }
  }
}
var scalePush = Object.keys(scaleMap["right"]["push"]).concat(Object.keys(scaleMap["left"]["push"]))
var scalePushMap = {}
Object.keys(scaleMap["right"]["push"]).map(function(key){
  scalePushMap[key] = scaleMap["right"]["push"][key]
})
Object.keys(scaleMap["left"]["push"]).map(function(key){
  scalePushMap[key] = scaleMap["left"]["push"][key]
})
var scalePull = Object.keys(scaleMap["right"]["pull"]).concat(Object.keys(scaleMap["left"]["pull"]))
var scalePullMap = {}
Object.keys(scaleMap["right"]["pull"]).map(function(key){
  scalePullMap[key] = scaleMap["right"]["pull"][key]
})
Object.keys(scaleMap["left"]["pull"]).map(function(key){
  scalePullMap[key] = scaleMap["left"]["pull"][key]
})
export default {
    data() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const showDialog = ref(false);
      let tune = `X: 3
T:Happy Birthday to You
M:3/4
L:1/8
Q:80
K:G
D>D | E2 D2 G2 | F4 D>D | E2 D2 A2 | G4 D>D | d2 B2 G2 | (F2 E2) c>c |
B2 G2 A2 | G6 |]`
      if (urlParams.get('tune') !== null){
        tune = atob(urlParams.get('tune'));
      }
      
      return {
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
        concertina:{
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
      load(){
        const abcObj = abcjs.renderAbc('paper', this.tune, {
          scale: 1,
          staffwidth: 700,
          paddingleft: 0,
          paddingright: 0,
          responsive: 'resize',
          oneSvgPerLine: true,
          add_classes: true

        });
        Object.keys(this.concertina).forEach((k)=>{
          this.concertina[k] = "#bbb"
        })
        const key = abcObj[0].lines[0].staff[0].key.root;
        const [visualObj] = abcObj
        var parent = this

        var lastEls = [];
        const handleKey = function(key, scale){
          switch(key){
            case 'D':
              if(scale == "F"){
                scale = "^F"
              }
              if(scale == "f"){
                scale = "^f"
              }
              if(scale == "c"){
                scale = "^c"
              }
              if(scale == "C"){
                scale = "^C"
              }
              break
            case 'G':
              if(scale == "F"){
                scale = "^F"
              }
              if(scale == "f"){
                scale = "^f"
              }
              break
            case 'F':
              if(scale == "b"){
                scale = "_b"
              }
              if(scale == "B"){
                scale = "_B"
              }
              if(scale == "B,"){
                scale = "_B,"
              }
              break
          }
          return scale
        }
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
                    scales.push(handleKey(key, els[i][j].children[k].dataset.name))
                  }
                }
              }
              const pushArray = scales.filter(value => scalePush.includes(value));
              const pullArray = scales.filter(value => scalePull.includes(value));

              lastScales.forEach((k)=>{
                  parent.concertina[k] = "#bbb"
              })
              if(pullArray.length > pushArray.length){
                pushCount = 0
                pullArray.forEach((scale)=>{
                  const k = scalePullMap[scale]
                  parent.concertina[k] = "blue"
                })
                lastScales = pullArray.map((scale)=>scalePullMap[scale])
                lastWay = "pull"
                pullCount++;
              } else if(pullArray.length < pushArray.length) {
                pullCount = 0
                pushArray.forEach((scale)=>{
                  const k = scalePushMap[scale]
                  parent.concertina[k] = "red"
                })
                lastScales = pushArray.map((scale)=>scalePushMap[scale])
                lastWay = "push"
                pushCount++
              } else if(needPull) {
                pushCount = 0
                pullArray.forEach((scale)=>{
                  const k = scalePullMap[scale]
                  parent.concertina[k] = "blue"
                })
                lastScales = pullArray.map((scale)=>scalePullMap[scale])
                lastWay = "pull"
                pullCount++;
              }else if(needPush) {
                pullCount = 0
                pushArray.forEach((scale)=>{
                  const k = scalePushMap[scale]
                  parent.concertina[k] = "red"
                })
                lastScales = pushArray.map((scale)=>scalePushMap[scale])
                lastWay = "push"
                pushCount++

              }else{
                if((lastWay === "pull" && pullCount < 5) || pushCount > 4){
                  pushCount = 0
                  pullArray.forEach((scale)=>{
                    const k = scalePullMap[scale]
                    parent.concertina[k] = "blue"
                  })
                  lastScales = pullArray.map((scale)=>scalePullMap[scale])
                  lastWay = "pull"
                  pullCount++;
                }else{
                  pullCount = 0
                  pushArray.forEach((scale)=>{
                    const k = scalePushMap[scale]
                    parent.concertina[k] = "red"
                  })
                  lastScales = pushArray.map((scale)=>scalePushMap[scale])
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
        this.link = `https://cylin743.github.io/concertina-abc-player/?tune=${encodeURIComponent(btoa(this.tune))}`
      }
    },
    created() {
    }
  }
</script>


<style scoped>
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

</style>
