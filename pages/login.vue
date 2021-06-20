<script lang="ts">
import { auth } from '@store'
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
	layout: 'no-layout'
})
export default class PageLogin extends Vue {
	creds = {
		username: '',
		password: ''
	}

	beforeMount() {
		const query = this.$route.query
		if (query && query.logout) {
			auth.logout().finally(() => {
				window.location.href = '/'
			})
		}
	}

	login() {
		return auth
			.login(this.creds)
			.then(() => {
				console.log('logged in')
				this.$router.push('/admin')
			})
			.catch(err => {
				const res = err.response
				if (!res) throw new Error('invalid username or password')
				throw res.data
			})
			.catch(err => alert(err))
	}
}
</script>

<template>
	<page-base class="login">
		<form-component class="login" @submit="login">
			{{ $store.state.test }}
			<form-input v-model="creds.username" class="username" label="Username" />

			<form-input
				v-model="creds.password"
				class="password"
				label="Password"
				type="password"
			/>

			<form-button>Login</form-button>
		</form-component>
	</page-base>
</template>

<style lang="scss" scoped>
@import '@sassy';

.page.login {
	@include flex(column, center, center);

	.form.login {
		@include flex(column);
	}
}
</style>
