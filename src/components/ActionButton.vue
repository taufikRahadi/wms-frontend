<template>
    <div class="flex justify-between">
        <slot></slot>
        <button @click="editButton" class="bg-orange-400 text-white px-5 py-2 capitalize rounded">
            <svg viewBox="0 0 20 20" fill="currentColor" class="pencil-alt w-6 h-6"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
        </button>
        <button @click="deleteButton" class="bg-red-500 text-white px-5 py-2 capitalize rounded">
            <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
</template>

<script>
    export default {
        props: ['record', 'formRecord', 'modulename'],
        methods: {
            deleteButton () {
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "Deleted data cant be retrieved",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                }).then(async result => {
                    if(result.value) {
                        try {
                            this.$Progress.start()
                            await this.$store.dispatch(`${this.modulename}/destroyData`, this.record)
                            this.$Progress.finish()
                            this.$swal.fire(
                                'Success',
                                'Data deleted',
                                'success'
                            )
                        } catch (err) {
                            this.$Progress.fail()
                            this.$swal.fire(
                                'Error',
                                'Error deleting data',
                                'error'
                            )
                        }
                    }
                })
            },
    
            editButton () {
                this.$emit('fill-data', this.record)
                this.$store.commit('setShowModal', true)
                this.$store.commit('setIsEditing', true)
            }
        }
    }
</script>