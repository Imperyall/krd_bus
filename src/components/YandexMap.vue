<template>
  <yandex-map :coords="coords" :zoom="zoom" ymap-class="map"
    ><ymap-marker
      v-for="bus in tracks"
      :key="bus.id"
      :marker-id="bus.id"
      :coords="[bus.lat, bus.lng]"
      :options="{
        iconContentSize: [100, 20],
      }"
      :icon="{
        layout: 'default#imageWithContent',
        imageHref: bus.icon,
        imageSize: [20, 20],
        imageOffset: [-10, -10],
        contentOffset: [-40, -20],
        content: `<span class='content content-${bus.type}'>${bus.route}</span>`,
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
.content {
  border-radius: 4px;
  padding: 2px 5px;
  background: #fff;
  border: 1px solid;
}
.content-1 {
  border-color: #00695c;
}
.content-3 {
  border-color: #c62828;
}
.content-4 {
  border-color: #546e7a;
}
.content-5 {
  border-color: #f57c00;
}
.content-6 {
  border-color: #1565c0;
}
.content-0 {
  border-color: #388e3c;
}
</style>
