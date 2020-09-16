<template>
    <div>
        <div class="flex">
            <h3 class="text-5xl font-bold text-gray-700">
                {{ $route.name | capitalize }}
            </h3>
        </div>

        <div class="flex">
            <card class="w-full">
                <div class="py-10 flex flex-col justify-center items-center">
                    <div class="w-1/2">
                        <div class="form-group">
                            <label class="input-label">
                                Report Type
                            </label>
                            <select v-model="type" class="bg-white input-group">
                                <option value="all">All In and Out Product Report</option>
                                <option value="in">Product In Report</option>
                                <option value="out">Product Out Report</option>
                            </select>
                        </div>
                        <button @click="print" class="text-white rounded bg-indigo-500 font-bold px-5 py-2">
                            Download Report
                        </button>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import http from '../helpers/http'
export default {
    data: () => ({
        type: 'all'
    }),
    methods: {
        async print() {
            try {
                await http.get('print?type=' + this.type)
                this.$swal.fire(
                    'Success',
                    'report printed successfully',
                    'success'
                )
            } catch (error) {
                this.$swal.fire(
                    'Failed',
                    'Failed print report',
                    'error'
                )
            }
        }
    }
}
</script>
