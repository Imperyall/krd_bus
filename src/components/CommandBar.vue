<template>
  <v-form
    ref="form"
    class="d-flex flex-column flex-grow-1 overflow-x-hidden overflow-y-auto"
  >
    <v-row no-gutters class="flex-column flex-grow-1">
      <v-row no-gutters class="px-3 flex-grow-0">
        <v-switch
          class="flex-grow-1"
          :input-value="move"
          @change="updateMove"
          label="Только в пути"
        ></v-switch
      ></v-row>
      <v-row no-gutters class="px-3">
        <v-list dense nav class="flex-grow-1">
          <v-list-group v-for="route in routes" :key="route.id">
            <template #activator>
              <v-list-item-content>
                <v-list-item-title v-text="route.name"></v-list-item-title>
              </v-list-item-content>
            </template>
            <template #appendIcon>
              <v-icon small>fas fa-chevron-down</v-icon>
            </template>
            <v-list-item-group
              v-model="showed[route.id]"
              @change="showedToggle"
              multiple
            >
              <v-list-item
                v-for="track in distinct(route.tracks)"
                :key="track.id"
                :value="track.name"
                :ripple="false"
              >
                <template #default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="track.name"></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-checkbox
                      dense
                      :input-value="active"
                      :true-value="track.name"
                      :ripple="false"
                      @click="toggle"
                    ></v-checkbox>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </v-row>
    </v-row>
    <v-row no-gutters class="flex-grow-0 px-3">
      <v-switch
        v-model="$vuetify.theme.dark"
        @change="toggleTheme"
        label="Темная тема"
      ></v-switch>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@/store/modules/command/mutation-types'
import { Track } from '@/store/modules/track/types'

export default {
  name: 'CommandBar',
  computed: {
    ...mapGetters(['move', 'routes', 'active', 'showed']),
  },
  methods: {
    distinct: (tracks: Track[]) =>
      tracks
        .reduce((acc: Track[], cur: Track) => {
          if (acc.find(track => track.name === cur.name)) {
            return acc
          }

          return [...acc, cur]
        }, [])
        .sort((a: Track, b: Track) => {
          if (!isNaN(+a.name) || !isNaN(+b.name)) {
            return +a.name - +b.name
          }

          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        }),
    toggleTheme: (e: boolean) =>
      localStorage.setItem('theme.dark', e.toString()),
    ...mapMutations({
      updateMove: types.UPDATE_MOVE,
    }),
  },
  // watch: {
  // routes: (e: any) => console.log(e),
  //   '$vuetify.theme.dark': (e: boolean): void =>
  //     localStorage.setItem('theme.dark', e.toString()),
  // },
}
</script>
