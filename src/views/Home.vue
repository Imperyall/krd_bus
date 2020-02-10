<template>
  <v-content>
    <v-row class="ma-0 root">
      <v-col>
        <v-card elevation="2">
          <yandex-map></yandex-map>
        </v-card>
      </v-col>
      <v-col class="command-bar d-flex">
        <v-card elevation="2" class="d-flex flex-grow-1">
          <command-bar></command-bar>
        </v-card>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
// @ is an alias to /src
import YandexMap from '@/components/YandexMap.vue'
import CommandBar from '@/components/CommandBar.vue'

export default {
  name: 'Home',
  components: {
    YandexMap,
    CommandBar,
  },
}
</script>

<style>
.root {
  width: 100vw;
  overflow: hidden;
}
.root .col {
  height: 100vh;
}
.command-bar {
  width: 300px !important;
}
</style>
