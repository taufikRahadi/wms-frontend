<template>
    <div class="bg-indigo-500 text-white flex h-full flex-col">
        <div class="bg-indigo-400">
            <h3 class="text-lg font-black px-5 py-10">Logo</h3>
        </div>
        <div class="ml-10 my-10">
            <router-link 
                class="capitalize" 
                exactActiveClass="active-class" 
                v-for="route in routes[1].children" 
                :key="route.name" 
                :to="{ name: route.name }"
            >
                <div class="px-5 py-5 flex flex-col">
                        {{ route.name | capitalize }}
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { routes } from '../router'
export default {
    data: () => ({
        routes: routes
    })
}
</script>