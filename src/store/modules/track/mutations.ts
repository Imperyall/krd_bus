import { MutationTree } from 'vuex'
import { State, Route } from './types'
import * as types from './mutation-types'

export const mutations: MutationTree<State> = {
  [types.UPDATE_ROUTES]: (state, payload: Route[]) => {
    state.routes = payload

    payload.forEach(route => {
      if (!(route.id in state.showed)) {
        state.showed[route.id] = []
      }
    })
  },
  [types.SET_INTERVAL]: (state, payload: number) => (state.interval = payload),
  [types.CLEAR_INTERVAL]: state => {
    clearInterval(state.interval)

    state.interval = undefined
  },
}
