<template>
    <div>
        <div class="form-group">
            <label class="input-label">In Date</label>
             <VueTailwindPicker
                v-if="$store.state.isEditing"
                :start-date="formRecord.date"
                @change="(v) => formRecord.date = v"
             >
                 <input class="input-group w-full" type="text" v-model="formRecord.date" />
             </VueTailwindPicker>
             <VueTailwindPicker
                v-else
                @change="(v) => formRecord.date = v"
             >
                 <input class="input-group w-full" type="text" v-model="formRecord.date" />
             </VueTailwindPicker>
        </div>
        <div class="form-group">
            <label class="input-label">Total In</label>
            <input type="number" v-model="formRecord.total" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Product</label>
            <select v-model="formRecord.product_id" class="input-group bg-white">
                <option value=""></option>
                <option :selected="product.id === formRecord.product_id" v-for="product in $store.state.product.products.data" :key="product.id" :value="product.id">
                    {{ product.id }} - {{ product.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import VueTailwindPicker from 'vue-tailwind-picker'
    export default {
        props: ['formRecord'],
        components: {
            VueTailwindPicker 
        },
        async mounted() {
            await this.$store.dispatch('product/fetchAll', '?limit=50&page=1')
        }
    }
</script>