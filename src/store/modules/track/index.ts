import { Module } from 'vuex'

import { RootState } from '@/store/types'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { State } from './types'

const initialState: State = {
  interval: undefined,
  routes: [],
  showed: {},
}

const track: Module<State, RootState> = {
  state: initialState,
  getters,
  actions,
  mutations,
}

export default track
