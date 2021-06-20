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
			<brand-name element="h1" />

			<form-input
				v-model="creds.username"
				class="username expanded flat"
				label="Username"
				placeholder="jimmy.james"
			/>

			<form-input
				v-model="creds.password"
				class="password expanded flat"
				label="Password"
				type="password"
				placeholder="epic-passss"
			/>

			<form-button type="submit" class="flat">
				<span>Login</span>
				<i class="fas fa-key" />
			</form-button>
		</form-component>
	</page-base>
</template>

<style lang="scss" scoped>
@import '@sassy';

.page.login {
	@include flex(column, center, center);

	.form.login {
		width: 500px;
		max-width: 90%;

		.form.button {
			justify-self: end;
		}
	}
}
</style>
