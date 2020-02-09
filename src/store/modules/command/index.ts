import { Commit } from 'vuex'
import * as types from './mutation-types'
import { State } from './types'

const initialState: State = {
  move: true,
}

const getters = {
  move: (state: State) => state.move,
}

const actions = {}

const mutations = {
  [types.UPDATE_MOVE]: (state: State) => (state.move = !state.move),
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
