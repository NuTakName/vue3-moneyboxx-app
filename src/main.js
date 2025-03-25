import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index';
import initUser from './api/init-user';

const app = createApp(App);
app.use(store);
initUser()
app.mount('#app');
