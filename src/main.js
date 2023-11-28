import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

const app = createApp(App)

app.use(router)
app.use(store)

function checkLoogedIn() {
    if (localStorage.getItem('loggedIn')) {
        store.dispatch('login');
    } else {
        store.dispatch('logout');
    }
}

checkLoogedIn();
app.mount('#app')
