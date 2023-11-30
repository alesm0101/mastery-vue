import { createApp, reactive} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)

// Create a reactive object
const GStore = reactive({ notifyMessage: '' })
app.provide('GStore', GStore) 

app.use(createPinia())
app.use(router)

app.mount('#app')
