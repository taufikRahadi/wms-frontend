<template>
    <div class="flex flex-col px-5 py-3">
        <div class="form-group">
            <label class="input-label">Name</label>
            <input class="input-group" v-model="formRecord.name" type="text" placeholder="Product Name">
        </div>
        <div class="form-group">
            <label class="input-label">Stock</label>
            <input class="input-group" v-model="formRecord.stock" type="number" placeholder="Stock">
        </div>
        <div class="form-group">
            <label class="input-label">Price</label>
            <input class="input-group" v-model="formRecord.price" id="username" type="number" placeholder="Price">
        </div>
        <div class="form-group">
            <label class="input-label">Photo</label>
            <input type="file" ref="file" @change="handleImage" class="input-group">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['formRecord'],
        methods: {
            handleImage () {
                this.formRecord.photo = this.$refs.file.files[0]
            }
        }
    }
</script>