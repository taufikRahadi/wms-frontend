import http from '../helpers/http'
export default {
    namespaced: true,
    state: {
        products: [],
    },
    mutations: {
        setProducts (state, data) {
            state.products = data
        }
    },
    actions: {
        async fetchAll({ commit }, payload = '?limit=10&page=1' ) {
            try {
                const { data } = await http.get('product' + payload)
                commit('setProducts', data.data)
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async createData({ dispatch }, payload) {
            console.log
            try {
                const { data } = await http.post('product', payload )
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async updateData({ dispatch }, payload) {
            console.log(payload)
            try {
                const { data } = await http.put('product/' + payload.id, payload.data)
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        },

        async destroyData({ dispatch }, payload) {
            try {
                const { data } = await http.delete('product/' + payload.id)
                dispatch('fetchAll')
                return data
            } catch ({ response }) {
                throw new Error(response.data.message)
            }
        }
    }
}