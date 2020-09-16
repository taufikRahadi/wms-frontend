<template>
    <div class="flex flex-col py-10 justify-center px-5">
        <h2 class="text-lg font-bold mb-10">Login</h2>
        <div class="form-group">
            <label class="input-label">Username</label>
            <input type="text" v-model="form.username" placeholder="Username" class="input-group">
        </div>
        <div class="form-group">
            <label class="input-label">Password</label>
            <input type="password" v-model="form.password" placeholder="Password" class="input-group">
        </div>
        <div class="flex justify-between">
            <button @click="loginUser" type="submit" class="bg-blue-400 text-white rounded px-5 py-1">Login</button>
            <router-link class="text-blue-400 hover:text-blue-500" :to="{ name: 'signup' }">
                Create New Account
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            form: {
                username: '',
                password: ''
            }
        }),

        methods: {
            async loginUser () {
                try {
                    await this.$store.dispatch('auth/login', this.form)
                    this.$swal.fire(
                        'Success',
                        'Login Success',
                        'success'
                    )
                    this.$router.push({ name: 'Home' })
                } catch (err) {
                    console.log(err)
                    this.$swal.fire(
                        'Failed',
                        err.message,
                        'error'
                    )
                }
            }
        }
    }
</script>