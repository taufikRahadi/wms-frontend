import http from '../helpers/http'
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('access_token') | null,
        currentUser: {}
    },
    mutations: {
        setToken (state, token) {
            state.token = token
        },

        setCurrentUser (state, user) {
            state.currentUser = user
        }
    },
    actions: {
        async login ({ commit }, payload) {
            try {
                const { data } = await http.post('auth/login', { data: payload })
                localStorage.setItem('access_token', data.data.token)
                commit('setToken', data.data.token)
                console.log(data)
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async signup ({ commit }, payload) {
            try {
                const { data } = await http.post('auth/signup', { data: payload })
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        logout ({ commit }) {
            try {
                localStorage.removeItem('access_token')
                commit('setToken', null)
            } catch (err) {
                throw new Error(err.message)
            }
        }
    },
    getters: {
        isLoggedIn: state => {
            if (state.token || localStorage.getItem('access_token')) {
                return true
            }
            
            return false
        }
    }
}
