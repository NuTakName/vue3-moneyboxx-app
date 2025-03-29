import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index';
import initUser from './api/init-user';
import { router } from './router';

const app = createApp(App);
app.use(store);
app.use(router);

const initApp = async () => {
  await initUser();
  app.mount('#app');
};

initApp();