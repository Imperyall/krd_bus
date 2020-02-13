import { MutationTree } from 'vuex'
import { State, Track } from './types'
import * as types from './mutation-types'

export const mutations: MutationTree<State> = {
  [types.UPDATE_TRACK]: (state, payload: Track[]) => (state.tracks = payload),
  [types.SET_INTERVAL]: (state, payload: number) => (state.interval = payload),
  [types.CLEAR_INTERVAL]: state => {
    clearInterval(state.interval)

    state.interval = undefined
  },
}
