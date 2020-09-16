<template>
    <div class="flex text-gray-700 mt-5 justify-end">
        <button @click="prevPage" class="p-1 bg-white border-2 border-gray-200">
            <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-double-left w-6 h-6"><path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <button 
            @click="$emit('page-click', index)" 
            v-for="index in data.totalPages" 
            :key="index" 
            :class="index == currentPage ? 'text-indigo-500 bg-gray-400' : 'bg-white'" 
            class="px-2 font-light border-2 border-gray-200"
        >
            {{ index }}
        </button>
        <button @click="nextPage" class="p-1 bg-white border-2 border-gray-200">
            <svg viewBox="0 0 20 20" fill="currentColor" class="chevron-double-right w-6 h-6"><path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            totalPages: 1
        },
        currentPage: {
            default: 1,
        }
    },

    methods: {
        prevPage() {
            const page = this.currentPage >= 1 ? this.currentPage - 1 : this.currentPage
            this.$emit('page-click', page)
        },

        nextPage() {
            const page = this.currentPage >= this.data.totalPages ? this.currentPage : this.currentPage + 1
            this.$emit('page-click', page)
        }
    }
}
</script>