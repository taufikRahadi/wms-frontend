<template>
	<div class="my-20">
		<div class="grid grid-cols-4 gap-5">
			<div class="rounded shadow p-3 flex items-center bg-gradient-to-r from-teal-400 to-blue-500">
				<svg viewBox="0 0 20 20" fill="white" class="archive w-6 h-6"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
				<div class="flex flex-col ml-5 items center text-white">
					<h3 class="text-lg font-black">
						Products
					</h3>
					<h3 class="font-light text-md">
						{{ products.totalItems }}
					</h3>
				</div>
			</div>
			<div class="rounded shadow p-3 flex items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
				<svg viewBox="0 0 20 20" fill="white" class="user-group w-6 h-6"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
				<div class="flex flex-col ml-5 items center text-white">
					<h3 class="text-lg font-black">
						User
					</h3>
					<h3 class="font-light text-md">
						{{ users.totalItems}}
					</h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		
		computed: {
			...mapState('user', ['users']),
			
			...mapState('product', ['products'])
		},

		methods: {
			...mapActions({
				fetchProducts: 'product/fetchAll',
				fetchUser: 'user/fetchAll'
			}),
		},

		async beforeMount() {
			this.$Progress.start()
			try {
				await this.fetchProducts()
				await this.fetchUser()
				this.$Progress.finish()
			} catch (err) {
				this.$Progress.fail()
			}
		}
	}
</script>