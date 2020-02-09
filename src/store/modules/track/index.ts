import { Commit } from 'vuex'
import * as types from './mutation-types'
import { State, Track } from './types'
import { getGps } from '@/api'
import { DELAY, GPS_URL } from '@/helpers/constants'

const initialState: State = {
  interval: undefined,
  tracks: [],
}

const getters = {
  tracks: (state: State) => state.tracks,
}

const actions = {
  initTracks: async (context: { commit: Commit }): Promise<void> => {
    context.commit(types.UPDATE_TRACK, await getGps(GPS_URL))

    const interval = setInterval(
      async () => context.commit(types.UPDATE_TRACK, await getGps(GPS_URL)),
      DELAY,
    )

    context.commit(types.SET_INTERVAL, interval)
  },
  reset: (context: { commit: Commit }): void =>
    context.commit(types.CLEAR_INTERVAL),
}

const mutations = {
  [types.UPDATE_TRACK]: (state: State, payload: Track[]) =>
    (state.tracks = payload),
  [types.SET_INTERVAL]: (state: State, payload: number) =>
    (state.interval = payload),
  [types.CLEAR_INTERVAL]: (state: State) => {
    clearInterval(state.interval)

    state.interval = undefined
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
