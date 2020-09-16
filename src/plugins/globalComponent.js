import Vue from 'vue'
import VueTailwindModal from "vue-tailwind-modal"

Vue.component("VueTailwindModal", VueTailwindModal)
Vue.component('nav-bar', () => import(/* webpackChunkName: 'Navbar' */'../components/Navbar.vue'))
Vue.component('side-bar', () => import(/* webpackChunkName: 'sidebar' */'../components/Sidebar.vue'))
Vue.component('crud-layout', () => import(/* webpackChunkName: 'crud layout' */'../components/CrudLayout.vue'))
Vue.component('card', () => import(/* webpackChunkName: 'card' */'../components/Card.vue'))
Vue.component('action-button', () => import(/* webpackChunkName: 'action button' */'../components/ActionButton.vue'))
Vue.component('base-pagination', () => import(/* wepackChunkName: 'pagination' */'../components/Pagination.vue'))
