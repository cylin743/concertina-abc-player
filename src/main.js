import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from './store'


const vuetify = createVuetify({
  components,
  directives
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'player',
      component: () => import('./views/PlayerPage.vue')
    },
    {
      path: '/tablature',
      name: 'tablature',
      component: () => import('./views/TablaturePage.vue')
    }
  ]
})



const app = createApp(App)
app.use(ElementPlus)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')

