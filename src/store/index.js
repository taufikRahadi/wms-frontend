import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import product from './product'
import user from './user'
import out from './out'
import productIn from './in'
import http from '../helpers/http'

http.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowModal: false,
    isEditing: false,
  },
  mutations: {
    setShowModal (state, data) {
      state.isShowModal = data
    },
    setIsEditing (state, data) {
      state.isEditing = data
    }
  },
  actions: {
  },
  modules: {
    auth,
    product,
    user,
    out,
    productIn
  }
})
