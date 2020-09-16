import http from './http'

export default {
    async fetchAll(url) {
        try {
            const { data } = await http.get(url)
            return data.data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    },

    async createData(url) {

    },

    async destroyData(url) {
        try {
            const { data } = await http.delete(url)
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    },

    async updateData(url, payload) {
        try {
            const { data } = await http.put(url, payload)
            return data
        } catch ({ response }) {
            throw new Error(response.data.message)
        }
    }
}
