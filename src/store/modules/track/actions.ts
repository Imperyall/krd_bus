import { ActionTree } from 'vuex'

import { getGps } from '@/api'
import { DELAY, GPS_URL } from '@/helpers/constants'
import { RootState } from '@/store/types'
import { State } from './types'
import * as types from './mutation-types'

export const actions: ActionTree<State, RootState> = {
  initRoutes: async ({ dispatch, commit }) => {
    const interval = setInterval(async () => dispatch('updateRoutes'), DELAY)

    commit(types.SET_INTERVAL, interval)
  },
  updateRoutes: async ({ commit }) => {
    commit(types.UPDATE_ROUTES, await getGps(GPS_URL))
  },
  reset: ({ commit }) => commit(types.CLEAR_INTERVAL),
}
