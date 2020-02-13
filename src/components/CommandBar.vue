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
          <v-list-group v-for="group in routes" :key="group.id">
            <template #activator>
              <v-list-item-content>
                <v-list-item-title v-text="group.name"></v-list-item-title>
              </v-list-item-content>
            </template>
            <template #appendIcon>
              <v-icon small>fas fa-chevron-down</v-icon>
            </template>
            <v-list-item
              v-for="route in group.routes"
              :key="route.id"
              :ripple="false"
            >
              <template #default>
                <v-list-item-content>
                  <v-list-item-title v-text="route.route"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox
                    dense
                    :ripple="false"
                    @click="toggle"
                    v-model="route.checked"
                  ></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-row>
    </v-row>
    <v-row no-gutters class="flex-grow-0 px-3">
      <v-switch v-model="$vuetify.theme.dark" label="Темная тема"></v-switch>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { mapMutations, mapGetters } from 'vuex'
import * as types from '@/store/modules/command/mutation-types'

export default {
  name: 'CommandBar',
  computed: {
    ...mapGetters(['move', 'routes']),
  },
  methods: {
    toggle(e: any) {
      console.log(e)
    },
    ...mapMutations({
      updateMove: types.UPDATE_MOVE,
    }),
  },
  watch: {
    '$vuetify.theme.dark': (e: boolean): void =>
      localStorage.setItem('theme.dark', e.toString()),
  },
}
</script>
