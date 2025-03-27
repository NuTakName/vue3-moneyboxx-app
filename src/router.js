import { createRouter, createWebHistory } from "vue-router";
import MOperation from "./components/MOperation.vue";
import MAccount from "./components/MAccount.vue";
import MMoneybox from "./components/MMoneybox.vue";


const routes = [
    {path: '/', name: 'Operations', component: MOperation, props: true},
    {path: '/account', name: "Account", component: MAccount, props: true},
    {path: '/moneybox', name: "Moneybox", component: MMoneybox, props: true},
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