import request from '../helpers/apiRequest'
import http from '../helpers/http'
export default {
    namespaced: true,
    state: {
        users: [],
    },
    mutations: {
        setUsers (state, data) {
            state.users = data
        } 
    },
    actions: {
        async fetchAll({ commit }, endpoint = '?limit=10&page=1') {
            try {
                const { data } = await http.get('user' + endpoint)
                commit('setUsers', data.data)
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async createData({ dispatch }, payload) {
            try {
                const { data } = await http.post('user', { data: payload })
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async destroyData({ dispatch }, payload) {
            try {
                const data = await request.destroyData('user/' + payload.id)
                dispatch('fetchAll')
                return data
            } catch (err) {
                throw new Error(err)
            }
        },

        async updateData({ dispatch }, payload) {
            try {
                const data = await request.updateData(`user/${payload.id}`, { data: payload })
                dispatch('fetchAll')
                return data
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}
