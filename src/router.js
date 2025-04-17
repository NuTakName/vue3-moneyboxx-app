import { createRouter, createWebHistory } from "vue-router";
import MOperations from "./components/MOperations.vue";
import MAccount from "./components/MAccount.vue";
import MMoneybox from "./components/MMoneybox.vue";
import MListOperation from "./components/MListOperation.vue";
import MOperation from "./components/MOperation.vue";
import MAccountStatistic from "./components/MAccountStatistic.vue";
import MAllStatistic from "./components/MAllStatistic.vue";


const routes = [
    {path: '/', name: 'Operations', component: MOperations, props: true},
    {path: '/account', name: "Account", component: MAccount, props: true},
    {path: '/moneybox', name: "Moneybox", component: MMoneybox, props: true},
    {path: '/list_operation/:id?/:type_?', name: "ListOperations", component: MListOperation, props: true},
    {path: '/add_operation', name: 'AddOperation', component: MOperation},
    {path: '/statistic', name: "Ststistic", component: MAccountStatistic},
    {path: '/all_statistic/:type_', name: "AllStatistic", component: MAllStatistic, props: true}
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