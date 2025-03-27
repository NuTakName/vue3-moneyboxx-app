import { createRouter, createWebHistory } from "vue-router";
import MOperation from "./components/MOperation.vue";


const routes = [
    {path: '/', name: 'Operations', component: MOperation, props: true},
]

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

let lastRoute = null;


router.beforeEach((to, from, next) => {
    lastRoute = from;
    next();
  });
  
  export { router, lastRoute };