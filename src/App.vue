<script setup>
</script>

<template>
<section>
    <v-tabs
      bg-color="primary"
    >
      <v-tab @click="goToPlayerPage">Player</v-tab>
      <v-tab @click="goToTablaturePage">Tablature Editor</v-tab>
    </v-tabs>
    <div id="app">
        <router-view/>
    </div>
</section>
</template>

<script>

export default {
    setup(){
    },
    data() {
      return {
      }
    },
    mounted: function () {
		},
    watch: {
    },
    methods: {
        goToTablaturePage() {
            this.$router.push("/tablature");
        },
        goToPlayerPage() {
            this.$router.push("/");
        }
    },
    created() {
    }
  }
</script>


<style lang="scss">
</style>
