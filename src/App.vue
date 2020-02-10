<template>
  <v-app app color="primary">
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  components: {},
  created() {
    this.$vuetify.theme.dark = localStorage.getItem('theme.dark') !== 'false'
  },
})
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
