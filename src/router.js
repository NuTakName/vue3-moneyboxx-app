import { createRouter, createWebHistory } from "vue-router";
import MOperations from "./components/MOperations.vue";
import MAccount from "./components/MAccount.vue";
import MMoneybox from "./components/MMoneybox.vue";
import MListOperation from "./components/MListOperation.vue";


const routes = [
    {path: '/', name: 'Operations', component: MOperations, props: true},
    {path: '/account', name: "Account", component: MAccount, props: true},
    {path: '/moneybox', name: "Moneybox", component: MMoneybox, props: true},
    {path: '/list_operation', name: "ListOperations", component: MListOperation}
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