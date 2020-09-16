<template>
    <div>
        <crud-layout
            :columns="columns"
            :formComponent="productForm"
            :formRecord="form"
            modulename="product"
            @reset-data="resetData"
            :customSubmitAction="submitAction"
        >
            <template v-slot v-if="detailModal">
                <DetailProduct
                    :detailModal="detailModal"
                    :product="product"
                    @hide-modal="hideDetail"
                />
            </template>
            <template v-slot:table-row>
                <tr 
                    :class="index % 2 == 0 ? 'bg-gray-200' : ''" 
                    v-for="(product, index) in products.data" 
                    :key="product.id"
                >
                    <td class="px-4 py-3">
                        {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3">
                        {{ product.name | capitalize }}
                    </td>
                    <td class="px-4 py-3">
                        {{ product.stock | stock }}
                    </td>
                    <td class="px-4 py-3">
                        {{ product.price | currency }}
                    </td>
                    <td class="px-4 py-3">
                        {{ product.supplier.full_name }}
                    </td>
                    <td class="w-8">
                        <action-button 
                            :record="product"
                            :formRecord="form"
                            modulename="product"
                            @fill-data="fillData"
                        >
                            <button @click="detailData(product.id)" class="bg-teal-400 text-white px-5 py-2 capitalize rounded">
                                <svg viewBox="0 0 20 20" fill="currentColor" class="eye w-6 h-6"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                            </button>
                        </action-button>
                    </td>
                </tr>
            </template>
        </crud-layout>
    </div>
</template>

<script>
import http from '../helpers/http'
import DetailProduct from '../components/Product/DetailProduct'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    components: {
        DetailProduct,
    },
    data: () => ({
        productForm: () => import('../forms/ProductForm'),
        form: {
            id: '',
            name: '',
            stock: 0,
            price: 0,
            photo: null
        },
        columns: [
            'name', 'stock', 'price', 'supplier name'
        ],
        detailModal: false,
        product: null       
    }),

    computed: {
        ...mapState('product', ['products']),
        ...mapState(['isEditing'])
    },

    methods: {
        ...mapMutations(['setShowModal']),
        ...mapActions('product', ['fetchAll', 'updateData', 'createData']),

        async submitAction () {
            this.$Progress.start()
            const formData = new FormData()
            if (this.isEditing) {
                formData.append('id', this.form.id)
                formData.append('name', this.form.name)
                formData.append('stock', this.form.stock)
                formData.append('price', this.form.price)
                formData.append('photo', this.form.photo)
                try {
                    await this.updateData({ id: this.form.id, data: formData })
                    this.$Progress.finish()
                    this.$swal.fire(
                        'Success',
                        'Data Updated',
                        'success'
                    )
                    this.setShowModal(false)
                } catch (err) {
                    this.$Progress.fail()
                    this.$swal.fire(
                        'Failed',
                        'Fail Updating Data',
                        'error'
                    )
                }
            } else {
                formData.append('name', this.form.name)
                formData.append('stock', this.form.stock)
                formData.append('price', this.form.price)
                formData.append('photo', this.form.photo)
                try {
                    await this.createData(formData)
                    this.$Progress.finish()
                    this.$swal.fire(
                        'Success',
                        'Data Created',
                        'success'
                    )
                    this.setShowModal(false)
                } catch (err) {
                    this.$Progress.fail()
                    this.$swal.fire(
                        'Failed',
                        'Fail Creating Data',
                        'error'
                    )
                }
            }
        },
        async detailData (id) {
            this.$Progress.start()
            try {
                const { data } = await http.get('product/' + id)
                this.product = data.data
                this.$Progress.finish()
                this.detailModal = true
            } catch ({ response }) {
                const err = response.data.message
                this.$swal.fire(
                    'Error',
                    err,
                    'error'
                )
                this.$Progress.fail()
            }
        },
        hideDetail () {
            this.detailModal = false
        },
        fillData (data) {
            this.form = { ...data, photo: data.photo_url }
        },
        resetData () {
            this.form = {
                name: '',
                stock: 0,
                price: 0,
                photo: null
            }
        }
    },

}
</script>