

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
    <div id="main-midi"></div>
    <div>
      <div id="paper"></div>
    </div>
  </div>
</template>

<script>
import abcjs from "abcjs";
import 'abcjs/abcjs-audio.css';
export default {
    data() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
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
        test: "",
        tune: tune,
        constrolOpts: {
          // soundFontUrl: 'https://thesession.org/soundfonts/louder/',
          soundFontUrl: 'https://gleitz.github.io/midi-js-soundfonts/MusyngKite/',
          program: 21,
          chordsOff: true
        },
        opts: {
          viewportHorizontal: true,
          scrollHorizontal: true,
          add_classes: true,
          // responsive: 'resize',
          scale: 1,
        },

      }
    },
    mounted: function () {
			const [visualObj] = abcjs.renderAbc('paper', this.tune, {
        scale: 1,
        staffwidth: 700,
        paddingleft: 0,
        paddingright: 0,
        responsive: 'resize',
        oneSvgPerLine: true

      });
      const synthControl = new abcjs.synth.SynthController();
      synthControl.load('#main-midi', null, {
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayLoop: true,
        displayWarp: true,
      });
      this.control = synthControl;
      this.control.setTune(visualObj, false, this.constrolOpts);
		},
    watch: {
      tune(v) {
        console.log('b')
        const [visualObj] = abcjs.renderAbc('paper', this.tune, {
          scale: 1,
          staffwidth: 700,
          paddingleft: 0,
          paddingright: 0,
          responsive: 'resize',
          oneSvgPerLine: true

        });
        console.log(this.tune)
        const synthControl = new abcjs.synth.SynthController();
        synthControl.load('#main-midi', null, {
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          displayLoop: true,
          displayWarp: true,
        });
        this.control = synthControl;
        this.control.setTune(visualObj, false, this.constrolOpts);
        console.log(this.tune)
      
      },
    },
    methods: {
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

</style>
