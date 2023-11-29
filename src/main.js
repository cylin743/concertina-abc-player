import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"
import SmartTable from 'vuejs-smart-table'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { BootstrapVue, IconsPlugin,DropdownPlugin, TablePlugin } from 'bootstrap'

// import './assets/main.css'


const app = createApp(App)
// app.use(BootstrapVue)
app.use(ElementPlus)
app.use(SmartTable)
app.mount('#app')

