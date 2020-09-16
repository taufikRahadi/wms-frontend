<template>
    <div>
        <crud-layout
            :formComponent="formComponent"
            :formRecord="form"
            :columns="columns"
            @reset-data="resetData"
            modulename="out"
        >
            <template v-slot:table-row>
                <tr
                    :class="index % 2 == 0 ? 'bg-gray-200' : ''" 
                    v-for="(out, index) in productOut.data" 
                    :key="out.id"
                >
                    <td class="px-4 py-3">
                        {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3">
                        {{ out.date | readableDate }}
                    </td>
                    <td class="px-4 py-3">
                        {{ out.total | stock }}
                    </td>
                    <td class="px-4 py-3">
                        {{ out.Product.id }} - {{ out.Product.name }}
                    </td>
                    <td class="w-8">
                        <action-button 
                            modulename="out"
                            @fill-data="fillData"
                            :record="out"
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
            formComponent: () => import('../forms/ProductOutForm'),
            form: {
                id: '',
                date: new Date(),
                total: 0,
                product_id: ''
            }
        }),
        computed: {
            ...mapState('out', ['productOut'])
        },
        methods: {
            fillData(data) {
                console.log(data)
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
    }
</script>