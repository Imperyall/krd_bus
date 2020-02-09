<template>
  <v-col align="center" class="d-flex">
    <v-form ref="form" class="flex-grow-1">
      <v-switch
        :input-value="move"
        @change="updateMove"
        label="Только в пути"
      ></v-switch>
    </v-form>
  </v-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '@/store/modules/command/mutation-types'

export default {
  name: 'CommandBar',
  computed: mapState({
    move: state => state.command.move,
  }),
  methods: {
    ...mapMutations({
      updateMove: types.UPDATE_MOVE,
    }),
  },
}
</script>
