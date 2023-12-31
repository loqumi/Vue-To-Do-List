import Vue from 'vue';
import VueRouter from 'vue-router';
import TaskListPage from '../views/TaskListPage.vue';
import HomePage from "@/views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/tasks',
        name: 'TaskList',
        component: TaskListPage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
