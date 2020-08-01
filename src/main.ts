import 'remixicon/fonts/remixicon.css'
import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Buefy, {
  defaultIconPack: 'remixicons',
  customIconPacks: {
    remixicons: {
      sizes: {
        'default': 'ri-1x',
        'is-small': 'ri-sm',
        'is-medium': 'ri-xl',
        'is-large': 'ri-3x'
      },
      iconPrefix: 'ri-',
      internalIcons: {
        'check': 'check-line',
        'information': 'information-line',
        'check-circle': 'checkbox-circle-line',
        'alert': 'error-warning-line',
        'alert-circle': 'error-warning-line',
        'arrow-up': 'arrow-up-line',
        'chevron-right': 'arrow-right-line',
        'chevron-left': 'arrow-left-line',
        'chevron-down': 'arrow-down-line',
        'eye': 'eye-line',
        'eye-off': 'eye-off-line',
        'menu-down': 'arrow-drop-down-line',
        'menu-up': 'arrow-drop-up-line'
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
