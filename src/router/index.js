import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Appwrite from '@/assets/appwrite'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: false },
    },

    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresAuth: false },
    },

    {
        path: '/admin/profiles',
        name: 'admin/profileList',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/ProfileListView.vue'),
        meta: { requiresAuth: true },
    },

    {
        path: '/admin/profile/:id',
        name: 'admin/editProfile',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/EditProfileView.vue'),
        props: true,
        meta: { requiresAuth: true },
    },

    {
        path: '/admin/link/:profileId/:id?',
        name: 'admin/editLink',
        component: () => import(/* webpackChunkName: "admin" */ '../views/admin/EditLinkView.vue'),
        props: true,
        meta: { requiresAuth: true },
    },

    {
        path: '*',
        component: HomeView,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (typeof to.name === 'undefined' || !to.name || to.name === 'home') {
        next()
        return
    }

    const isLoggedIn = await Appwrite.isLoggedIn()

    if (!isLoggedIn && to.meta?.requiresAuth && to.name !== 'login') {
        next({ name: 'login' })
    } else if (isLoggedIn && ['login'].includes(to?.name)) {
        next({ name: 'admin/profileList' })
    } else {
        next()
    }
})

export default router
