<template>
    <nav class="bg-white shadow-sm py-6 text-gray-700 px-20 flex justify-end">
        <div class="flex">
            <router-link to="/">Home</router-link>
            <button class="bg-transparent ml-5" @click="logout">
                Logout
            </button>
            <!-- <router-link class="capitalize ml-10" v-for="route in routes" :key="route.path" :to="route.path">
                {{ route.name }}
            </router-link> -->
        </div>
    </nav>
</template>

<script>
import { routes } from '../router'
export default {
    data: () => ({
        routes: routes
    }),
    methods: {
        logout () {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "Your Session Will Be Ended!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if(result.value) {
                        if(this.$store.dispatch('auth/logout')) {
                            this.$swal.fire(
                                "Success",
                                "Logout Success",
                                "success"
                            )
                            this.$router.push({
                                name: 'login'
                            })
                        } else {
                            this.$swal.fire(
                                "Failed",
                                "Logout Fail",
                                "error"
                            )
                        }
                    } 
                })
        }
    }
}
</script>