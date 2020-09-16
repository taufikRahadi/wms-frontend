<template>
    <div class="flex flex-col py-10 justify-center px-5">
        <h2 class="text-lg font-bold mb-10">Login</h2>
        <div class="form-group">
            <label class="input-label">Username</label>
            <input type="text" v-model="form.username" placeholder="Username" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Fullname</label>
            <input type="text" v-model="form.full_name" placeholder="Fullname" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Email Address</label>
            <input type="email" v-model="form.email" placeholder="Email" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Phone Number</label>
            <input type="text" v-model="form.phone_number" placeholder="Phone Number" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Password</label>
            <input type="password" v-model="form.password" placeholder="Password" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Password Confirmation</label>
            <input type="password" placeholder="Confirm Your Password" class="input-group">
        </div>
        <div class="flex justify-between">
            <button @click="signupUser" type="submit" class="bg-blue-400 text-white rounded px-5 py-1">Login</button>
            <router-link class="text-blue-400 hover:text-blue-500" :to="{ name: 'login' }">
                Login With Existing Account
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        form: {
            username: '',
            full_name: '',
            email: '',
            phone_number: '',
            password: ''
        }
    }),

    methods: {
        async signupUser () {
            try {
                await this.$store.dispatch('auth/signup', this.form)
                this.$swal.fire(
                    'Success',
                    'Signup Success',
                    'success'
                )
                this.$router.push({ name: 'login' })
            } catch (err) {
                this.$swal.fire(
                    'Error',
                    err,
                    'error'
                )
            }
        }
    }
}
</script>
