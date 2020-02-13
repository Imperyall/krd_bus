import { ActionTree, Commit } from 'vuex'

import { getGps } from '@/api'
import { DELAY, GPS_URL } from '@/helpers/constants'
import { RootState } from '@/store/types'
import { State } from './types'
import * as types from './mutation-types'

export const actions: ActionTree<State, RootState> = {
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
