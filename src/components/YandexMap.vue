<template>
  <yandex-map :coords="coords" :zoom="zoom" ymap-class="map"
    ><ymap-marker
      v-for="bus in tracks"
      :key="bus.id"
      :marker-id="bus.id"
      :coords="[bus.lat, bus.lng]"
      :options="{
        iconContentSize: [40, 18],
      }"
      :icon="{
        layout: 'default#imageWithContent',
        imageHref: bus.icon,
        imageSize: [20, 20],
        imageOffset: [-10, -10],
        contentOffset: [-10, 22],
        content: `<span class='black--text'>${bus.route}</span>`,
      }"
    >
    </ymap-marker>
  </yandex-map>
</template>

<script>
import { mapState } from 'vuex'
import { DEFAULT_COORDS, DEFAULT_ZOOM } from '@/helpers/constants'

export default {
  name: 'YandexMaps',
  data: () => ({
    coords: DEFAULT_COORDS,
    zoom: DEFAULT_ZOOM,
  }),
  mounted() {
    this.$store.dispatch('initTracks')
  },
  destroyed() {
    this.$store.dispatch('reset')
  },
  computed: mapState({
    tracks: state =>
      state.track.tracks.filter(
        track => !state.command.move || track.speed > 0,
      ),
  }),
  methods: {},
}
</script>

<style>
.map {
  width: calc(100vw - 24px - 300px);
  height: calc(100vh - 24px);
}
</style>
