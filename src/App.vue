<script setup>
import ShareIcon from './components/icons/IconShare.vue'
import BasicModal from "./components/BasicModal.vue";
</script>

<template>
  <div id="app" class="container padding-xxxs">
    <div class="text-center margin-bottom-sm">
      <h1>Concertina Player</h1>
    </div>
    <textarea
      spellcheck="false"
      v-model="tune"
      class="note-input margin-top-sm padding-x-md"
      style="width: 100%"
      rows="10"
    ></textarea>
    <div id="player">
      <div id="main-midi"></div>
     <div class="share">
       <ShareIcon class="share-icon" v-on:click="showDialog = !showDialog"/>
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
        const [visualObj] = abcObj
        var parent = this

        var lastEls = [];
        var CursorControl = function(){
            var self = this
            self.beatSubdivisions = 2;
            function colorElements(els) {
              var i;
              var j;
              console.log(els)
              for (i = 0; i < lastEls.length; i++) {
                for (j = 0; j < lastEls[i].length; j++) {
                  lastEls[i][j].style.color = ""
                }
              }
              for (i = 0; i < els.length; i++) {
                for (j = 0; j < els[i].length; j++) {
                  els[i][j].style.color = "red"
                }
              }
              lastEls = els;
            }
            self.onStart = function() {
              // console.log("The tune has started playing.");
            }
            self.onStop = function() {
              // console.log("stop")
            }
            self.onFinished = function() {
              // console.log("The tune has stopped playing.");
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
          displayRestart: false,
          displayPlay: true,
          displayProgress: true,
          displayLoop: false,
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

</style>
