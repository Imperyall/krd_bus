import { GetterTree } from 'vuex'

import { RootState } from '@/store/types'
import { State, Route, Track } from './types'

export const getters: GetterTree<State, RootState> = {
  routes: state => state.routes,
  showed: state => state.showed,
  // routes: state =>
  //   state.tracks.reduce((routes: Route[], track: Track) => {
  //     if (routes.find(r => r.id === track.type)) {
  //       return routes
  //     }

  //     return [...routes, { id: track.type, name: track.name }]
  //   }, []),
  // routes: state => {
  //   const tracks = [
  //     ...trackTypes.map(
  //       (trackType): TrackTypeWithRoutes => ({ ...trackType, routes: [] }),
  //     ),
  //   ]

  //   state.tracks.forEach(({ id, type, route }) => {
  //     const track = tracks.find(track => track.id === type)

  //     if (track && !track.routes.find(r => r.route === route)) {
  //       track.routes.push({ checked: true, id, route })
  //     }
  //   })

  //   return tracks.filter(track => track.routes.length > 0)
  // },
}
