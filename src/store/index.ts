import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import track from './modules/track'
import command from './modules/command'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  modules: {
    track,
    command,
  },
}
export default new Vuex.Store<RootState>(store)
