import http from '../helpers/http'

export default {
    namespaced: true,
    state: {
        productIn: [],
    },
    mutations: {
        setProductIn (state, data) {
            state.productIn = data
        }
    },
    actions: {
        async fetchAll ({ commit }, payload = '?limit=10&page=1') {
            try {
                const { data } = await http.get('in' + payload)
                commit('setProductIn', data.data)
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async createData ({ dispatch }, payload) {
            try {
                const { data } = await http.post('in', { data: payload })
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async updateData ({ dispatch }, payload) {
            try {
                const { data } = await http.put('in/' + payload.id, { data: payload })
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async destroyData ({ dispatch }, payload) {
            try {
                const { data } = await http.delete('in/' + payload.id)
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        }
    }
}
