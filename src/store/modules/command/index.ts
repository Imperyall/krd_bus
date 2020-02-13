import { Module, GetterTree, MutationTree } from 'vuex'

import { RootState } from '@/store/types'
import { State } from './types'
import * as types from './mutation-types'

const initialState: State = {
  move: true,
}

const getters: GetterTree<State, RootState> = {
  move: state => state.move,
}

const actions = {}

const mutations: MutationTree<State> = {
  [types.UPDATE_MOVE]: state => (state.move = !state.move),
}

const command: Module<State, RootState> = {
  state: initialState,
  getters,
  actions,
  mutations,
}

export default command
