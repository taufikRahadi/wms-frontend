<template>
    <div>
        <crud-layout 
            :formComponent="formComponent"
            :formRecord="form"
            :columns="columns"
            modulename="user"
            @reset-data="resetData"
        >
            <template v-slot:table-row>
                <tr 
                    :class="index % 2 == 0 ? 'bg-gray-200' : ''" 
                    v-for="(user, index) in users.data" 
                    :key="user.id"
                >
                    <td class="px-4 py-3">
                        {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3">
                        {{ user.full_name | capitalize }}
                    </td>
                    <td class="px-4 py-3">
                        {{ user.username }}
                    </td>
                    <td class="px-4 py-3">
                        {{ user.email }}
                    </td>
                    <td class="px-4 py-3">
                        {{ user.phone_number }}
                    </td>
                    <td class="px-4 py-3">
                        {{ user.role | capitalize }}
                    </td>
                    <td class="w-8">
                        <action-button
                            @fill-data="fillData"
                            :record="user"
                            :formRecord="form"
                            modulename="user"
                        />
                    </td>
                </tr>
            </template>
        </crud-layout>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        columns: [
            'full name', 'username', 'email', 'phone number', 'role'
        ],
        formComponent: () => import('../forms/UserForm'),
        form: {
            id: '',
            username: '',
            full_name: '',
            email: '',
            password: '',
            phone_number: '',
            username: ''
        }
    }),
    computed: {
        ...mapState('user', ['users'])
    },
    methods: {
        fillData(data) {
            this.form.id = data.id
            this.form.full_name = data.full_name
            this.form.username = data.username
            this.form.email = data.email
            this.form.phone_number = data.phone_number
            this.username = data.username
        },
        resetData() {
            this.form = {
                full_name: '',
                username: '',
                email: '',
                password: '',
                phone_number: '',
                username: ''
            }
        },
    },
}
</script>