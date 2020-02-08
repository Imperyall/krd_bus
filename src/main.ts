import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import YmapPlugin from 'vue-yandex-maps'

Vue.config.productionTip = false

const YandexMapsSettings = {
  apiKey: process.env.VUE_APP_MAP_API,
  lang: 'ru_RU',
}

Vue.use(YmapPlugin, YandexMapsSettings)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
