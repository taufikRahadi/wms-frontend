<template>
    <div>
        <div class="form-group">
            <label class="input-label">Full Name</label>
            <input type="text" v-model="formRecord.full_name" class="input-group" placeholder="Full Name">
        </div>
        <div class="form-group">
            <label class="input-label">Username</label>
            <input type="text" v-model="formRecord.username" class="input-group" placeholder="Username">
        </div>
        <div class="form-group">
            <label class="input-label">Email Address</label>
            <input type="email" v-model="formRecord.email" placeholder="Email Address" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Phone Number</label>
            <input type="text" v-model="formRecord.phone_number" class="input-group" placeholder="Phone Number">
        </div>
        <div class="form-group">
            <label class="input-label">Password</label>
            <input type="password" v-model="formRecord.password" placeholder="Password" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Password Confirmation</label>
            <input type="password" placeholder="Password Confirmation" class="input-group">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['formRecord']
    }
</script>

<style lang="scss" scoped>

</style>