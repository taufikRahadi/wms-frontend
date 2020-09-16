<template>
    <vue-tailwind-modal
        :showing="detailModal"
        @close="$emit('hide-modal')"
        :showClose="true"
        v-show="product"
    >
        <div class="px-10 flex gap-3">
            <div class="mr-5">
                <img :src="product.photo_url">
            </div>
            <div class="flex flex-col justify-start">
                <h3 class="text-3xl font-bold text-gray-700">
                    {{ product.name | capitalize }}
                </h3>
                <h3 class="text-lg font-semibold text-gray-500">
                    {{ product.price | currency }}
                </h3>
                <h3 class="text-gray-800">
                    Stock: <span class="font-bold">{{ product.stock | stock }}</span>
                </h3>
                <h3 class="text-gray-800">
                    Supplier: {{ product.supplier.full_name }} {{ product.supplier.email }}, 
                </h3>
            </div>
        </div>
    </vue-tailwind-modal>
</template>

<script>
export default {
    props: ['detailModal', 'product'],
}
</script>
