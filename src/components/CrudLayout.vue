<template>
    <div class="my-5">
        <div class="flex justify-between items-center">
            <h1 class="text-5xl capitalize font-bold text-gray-700">
                {{ $route.name | capitalize }}
            </h1>

            <button @click="showModal" class="flex bg-indigo-500 h-10 px-5 text-white rounded hover:bg-indigo-700 transition duration-500 font-bold">
                <svg viewBox="0 0 20 20" fill="currentColor" class="plus-circle w-6 h-6"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
                <span class="ml-3">Add New</span>
            </button>
        </div>
        <div class="mt-5">
            <slot></slot>
            <card>
                <div class=" p-5">
                    <table class="table-auto w-full">
                        <thead class="border-t-2 border-b-2">
                            <th class="w-auto px-4 py-2">#</th>
                            <th class="px-4 py-2 capitalize" v-for="column in columns" :key="column">
                                {{ column }}
                            </th>
                            <th class="w-auto px-4 py-2">
                                
                            </th>
                        </thead>
                        <tbody>
                            <slot name="table-row"></slot>
                        </tbody>
                    </table>
                    <base-pagination 
                        :data="data"
                        :currentPage="currentPage"
                        @page-click="pageClick"
                    />
                </div>
            </card>
            <vue-tailwind-modal
                :showing="isShowModal"
                @close="setShowModal(false)"
                :showClose="true"
                class="h-auto"
            >
                <form enctype="multipart/form-data" @submit.prevent="submitForm">
                    <component :is="formComponent" :formRecord="formRecord"></component>
                    <div class="flex justify-between mx-5">
                        <button type="submit" class="bg-indigo-500 text-white px-5 py-2 capitalize rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </vue-tailwind-modal>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    export default {
        props: ['columns', 'customSubmitAction', 'formComponent', 'formRecord', 'isLoading', 'modulename'],

        computed: {
            ...mapState({
                isShowModal: 'isShowModal',
                isEditing: 'isEditing'
            }),
            module () {
                return {
                    action: this.modulename + '/fetchAll',
                    module: this.modulename
                }
            }
        },

        data: () => ({
            data: null,
            currentPage: 1,
        }),

        methods: {
            ...mapMutations({
                setShowModal: 'setShowModal',
                setIsEditing: 'setIsEditing',
            }),

            async pageClick(p) {
                try {
                    await this.getData(p)
                    this.currentPage = p
                } catch (err) {
                    throw new Error(err)
                }
            },

            async getData(page = 1) {
                this.$Progress.start()
                try {
                    const data = await this.$store.dispatch(`${this.modulename}/fetchAll`, '?limit=10&page=' + page)
                    this.data = data.data
                    this.$Progress.finish()
                } catch (error) {
                    this.$Progress.fail()
                }
            },
            
            async submitForm() {
                if (this.customSubmitAction != undefined) {
                    this.customSubmitAction ()   
                } else {
                    if(!this.isEditing) {
                        try {
                            await this.$store.dispatch(`${this.modulename}/createData`, this.formRecord)
                            this.$swal.fire(
                                'Success',
                                'Data Created',
                                'success'
                            )
                            this.setShowModal(false)
                        } catch (error) {
                            this.$swal.fire(
                                'Failed',
                                'Error creating Data',
                                'error'
                            )
                        }
                    } else {
                        this.$Progress.start()
                        try {
                            await this.$store.dispatch(`${this.modulename}/updateData`, this.formRecord)
                            this.$swal.fire(
                                'Success',
                                'Data Updated',
                                'success'
                            )
                            this.$Progress.finish()
                            this.setShowModal(false)
                        } catch (err) {
                            this.$swal.fire(
                                'Failed',
                                'Error updating Data',
                                'error'
                            )
                            this.$Progress.fail()
                        }
                    }
                }
            },

            showModal () {
                this.setShowModal(true)
                this.setIsEditing(false)
                this.$emit('reset-data')
            }
        },

        async beforeMount() {
            await this.getData()
            // console.clear()
        }
    }
</script>