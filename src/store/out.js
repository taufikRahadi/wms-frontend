import http from '../helpers/http'

export default {
    namespaced: true,
    state: {
        productOut: []
    },
    mutations: {
        setProductOut (state, data) {
            state.productOut = data
        },
    },
    actions: {
        async fetchAll({ commit }, payload = '?limit=10&page=1') {
            try {
                const { data } = await http.get('out' + payload)
                commit('setProductOut', data.data)
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async createData({ dispatch }, payload) {
            try {
                const { data } = await http.post('out', { data: payload })
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async updateData({ dispatch }, payload) {
            try {
                const { data } = await http.put('out/' + payload.id, { data: payload })
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async destroyData({ dispatch }, payload) {
            try {
                const { data } = await http.delete('out/' + payload.id)
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        }
    }
}