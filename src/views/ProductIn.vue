<template>
    <div>
        <crud-layout
            :formComponent="formComponent"
            :formRecord="form"
            :columns="columns"
            @reset-data="resetData"
            modulename="productIn"
        >
            <template v-slot:table-row>
                <tr
                    :class="index % 2 == 0 ? 'bg-gray-200' : ''" 
                    v-for="(productIn, index) in $store.state.productIn.productIn.data" 
                    :key="productIn.id"
                >
                    <td class="px-4 py-3">
                        {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3">
                        {{ productIn.date | readableDate }}
                    </td>
                    <td class="px-4 py-3">
                        {{ productIn.total | stock }}
                    </td>
                    <td class="px-4 py-3">
                        {{ productIn.Product.id }} - {{ productIn.Product.name }}
                    </td>
                    <td class="w-8">
                        <action-button 
                            modulename="productIn"
                            @fill-data="fillData"
                            :record="productIn"
                            :formRecord="form"
                        />
                    </td>
                </tr>
            </template>
        </crud-layout>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import http from '../helpers/http'
    export default {
        data: () => ({
            columns: [
                'date', 'total out', 'product'
            ],
            formComponent: () => import('../forms/ProductInForm'),
            form: {
                id: '',
                date: new Date(),
                total: 0,
                product_id: ''
            }
        }),
        methods: {
            fillData(data) {
                this.form = { ...data, product_id: data.Product.id }
            },
            resetData(data) {
                this.form = {
                    date: new Date(),
                    total: 0,
                    product_id: ''
                }
            }
        },
        computed: {
        }
    }
</script>