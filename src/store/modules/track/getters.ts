import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { trackTypes } from '@/api'
import { TrackTypeWithRoutes } from '@/api/types'
import { State } from './types'

export const getters: GetterTree<State, RootState> = {
  tracks: state => state.tracks,
  routes: state => {
    const tracks = [
      ...trackTypes.map(
        (trackType): TrackTypeWithRoutes => ({ ...trackType, routes: [] }),
      ),
    ]

    state.tracks.forEach(({ id, type, route }) => {
      const track = tracks.find(track => track.id === type)

      if (track && !track.routes.find(r => r.route === route)) {
        track.routes.push({ checked: true, id, route })
      }
    })

    return tracks
  },
}
