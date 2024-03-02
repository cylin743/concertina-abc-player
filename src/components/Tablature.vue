<script setup>
</script>

<template>
  <transition name="modal" @after-leave="afterLeave">
    <div id="nav-tablature">
      <div id="tablature-concertina">
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
  </transition>
</template>

<script>
import {scalePushMapping, scalePullMapping} from './Settings.vue'

export default {
    props: ['scales', 'def'],
    setup(props){
    },
    data() {
      return {
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

    },
    watch: {},
    methods: {
    },
    created() {
      console.log(this.scales)
      this.scales.forEach((scale)=>{
        if(this.def == "push"){
          const k = scalePushMapping[scale]
          this.concertina[k] = "red"
        }else{
          const k = scalePullMapping[scale]
          this.concertina[k] = "blue"
        }
      })
    }
  }
</script>


<style lang="scss">
@forward 'vuetify/settings' with (
  $slider-vertical-min-height: 100px,
);
.color {
	stroke: #ddd !important;
	fill: red !important;
  color: red !important;
}


#nav-tablature{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
#tablature-concertina{
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  border: 1px solid black;
}
#tablature-concertina #first {
  height: 18px;
}
#tablature-concertina #second {
  height: 18px;
}
#tablature-concertina #third {
  height: 18px;
}
#tablature-concertina #left #first {
  margin-left:10px;
}
#tablature-concertina #left #second {
  margin-left:5px;
}
#tablature-concertina #right #third {
  margin-left:10px;
}
#tablature-concertina #right #second {
  margin-left:5px;
}
#tablature-concertina .dot {
  height: 15px;
  width: 15px;
  /* background-color: #bbb; */
  border-radius: 50%;
  display: inline-block;
}

</style>
