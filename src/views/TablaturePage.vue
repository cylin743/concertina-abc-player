<script setup>
import Tablature from "../components/Tablature.vue";
</script>

<template>
  <div id="tablature-page" class="container padding-xxxs">
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
              v-model="tabs"
              class="note-input margin-top-sm padding-x-md"
              style="width: 100%"
              rows="10"
              fluid
            ></textarea>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-for="(item, index) in d" :key="index" >
      <Tablature :scales="item.scales" :def="item.def"/>
    </div>
  </div>
</template>

<script>
import {Tabs} from "../components/Res.vue";

export default {
  components: { Tablature },
    setup(){
    },
    data() {
      var datas = []
      if(this.$store.state.tabs.length > 0){
        datas = JSON.parse(this.$store.state.tabs)
      }
      const tabs = this.$store.state.tabs
      return {
        d: datas,
        tabs: tabs,
        panels:["editor"],
      }
    },
    mounted: function () {
	},
    watch: {
        tabs(v){
            this.load()
        }
    },
    methods: {
        load(){
            this.d = JSON.parse(this.tabs)
        }
    },
    created() {
    }
  }
</script>


<style lang="scss">
#tablature-page{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

}


</style>
