import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'auth',
    redirect: { name: 'login' },
    component: () => import(/* webpackChunkName: 'auth' */'../views/Auth.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: 'login' */'../views/Auth/Login.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import(/* webpackChunkName: 'signup' */'../views/Auth/Signup.vue')
      }
    ]
  },
  {
    path: '/master',
    redirect: { name: 'Home' },
    component: () => import(/* webpackChunkName: 'Master' */'../views/Master.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'products',
        name: 'products',
        component: () => import(/* webpackChunkName: 'products' */'../views/Products.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'users',
        name: 'users',
        component: () => import(/* webpackChunkName: 'users' */'../views/Users.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'productin',
        name: 'product in',
        component: () => import(/* webpackChunkName: 'productin' */'../views/ProductIn.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'productout',
        name: 'product out',
        component: () => import(/* webpackChunkName: 'productout' */'../views/ProductOut.vue'),
        meta: {
          requiresAuth: true
        },
      },
      {
        path: 'print',
        name: 'print report',
        component: () => import(/* webpackChunkName: 'printreport' */'../views/Print.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth) {
    if(!store.getters['auth/isLoggedIn']) {
      return next({
        name: 'login'
      })
    } else {
      return next()
    }
  } else {
    if(store.getters['auth/isLoggedIn']) {
      return next({
        name: 'Home'
      })
    } else {
      return next()
    }
  }
})

export {router, routes}
