<template>
    <div class="page fullheight">
        <div class="container">
            <h1 class="display-3 fw-bold mb-5 text-warning">Sign in</h1>

            <form class="form full-width" @submit.prevent="onSubmit">
                <div class="form-group mb-4">
                    <label for="login-email">Email</label>
                    <input v-model="form.email" ref="email" id="login-email" name="email" class="form-control" type="email" autocomplete="email" />
                </div>

                <div class="form-group mb-4">
                    <label for="login-password">Password</label>
                    <input v-model="form.password" id="login-password" name="password" class="form-control" type="password" autocomplete="password" />
                </div>

                <input v-model="form.honeypot" type="hidden" name="username" />

                <button type="submit" class="btn btn-submit full-width">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script>
import Appwrite from '@/assets/appwrite.js'

export default {
    data () {
        return {
            form: {
                email: '',
                password: '',
                honeypot: null,
            },
        }
    },

    mounted () {
        // eslint-disable-next-line no-unused-expressions
        this.$refs.email?.focus()
    },

    methods: {
        async onSubmit () {
            try {
                if (this.form.honeypot) throw new Error('Error')

                await Appwrite.account.createEmailSession(
                    this.form.email,
                    this.form.password,
                )

                this.$router.push({ name: 'admin/profileList' })
            } catch (e) {
                alert('An error occurred.') // @TODO
                console.log(e)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
h1 { color: orange; }
</style>
