<template>
  <v-app app dark color="primary">
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  components: {},
})
</script>

<style>
html {
  overflow-y: auto !important;
}
</style>
