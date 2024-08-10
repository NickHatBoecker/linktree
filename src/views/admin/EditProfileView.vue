<template>
    <div class="page fullheight">
        <p v-if="!profile">Loading...</p>
        <div v-else class="container">
            <div class="full-width u-flex u-flex--column u-flex--horizontal-center" style="margin-bottom: 12px;">
                <button type="button" class="btn" @click="$router.push({ name: 'home' })">Go to Linktree</button>
            </div>
            <div class="full-width u-flex u-flex--column u-flex--horizontal-center" style="margin-bottom: 48px;">
                <h1>Links for {{ profile.profile }}</h1>

                <button type="button" class="btn full-width" @click="createLink">Create Link</button>
                <table class="table full-width" cellpadding="12">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Theme</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="(link, i) in links"
                        :key="`link-${i}`"
                    >
                        <td>{{ i + 1 }}</td>
                        <td>{{ link.title }}</td>
                        <td>{{ link.theme || '/' }}</td>
                        <td>{{ link.position || '/' }}</td>
                        <td>
                            <button type="button" class="btn" style="margin-right: 6px;" @click="editLink(link)">Edit</button>
                            <button type="button" class="btn btn-danger" @click="deleteLink(link)">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button type="button" class="btn full-width" @click="createLink">Create Link</button>
            </div>
            <div class="full-width u-flex u-flex--column u-flex--horizontal-center">
                <h1>Edit Profile {{ profile.profile }}</h1>

                <form class="full-width" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>Logo Source</label>
                        <input v-model="form.logoSrc" class="form-control" type="url" />
                    </div>

                    <div class="form-group">
                        <label>Slogan</label>
                        <input v-model="form.slogan" class="form-control" type="text" />
                    </div>

                    <button type="submit" class="full-width btn btn-submit" style="margin-bottom: 6px;">Save</button>
                    <button type="button" class="full-width btn" @click="$router.push({ name: 'admin/profileList' })">Cancel</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import GetProfileById from '@/assets/database/GetProfileById'
import GetLinkList from '@/assets/database/GetLinkList'
import DeleteLinkById from '@/assets/database/DeleteLinkById'
import { updateProfile } from '@/assets/database/CreateProfile'

export default {
    props: {
        id: { type: String, required: true },
    },

    data: () => ({
        profile: null,
        links: [],
        form: {
            logoSrc: '',
            slogan: '',
        },
    }),

    mounted () {
        this.loadProfile()
        this.loadLinks()
    },

    methods: {
        async loadProfile () {
            try {
                this.profile = await GetProfileById(this.id)
                this.form.logoSrc = this.profile.logoSrc
                this.form.slogan = this.profile.slogan
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },

        async loadLinks () {
            try {
                this.links = await GetLinkList(this.id)
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },

        async onSubmit () {
            try {
                await updateProfile(this.profile.$id, this.form)
                alert('DONE')
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },

        async deleteLink (link) {
            try {
                await DeleteLinkById(link.$id)
                await this.loadLinks()
                alert('DONE')
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },

        createLink () {
            this.$router.push({ name: 'admin/editLink', params: { profileId: this.id } })
        },

        editLink (link) {
            this.$router.push({ name: 'admin/editLink', params: { profileId: this.id, id: link.$id } })
        },
    },
}
</script>

<style lang="scss" scoped>
.page { color: $white; }
h1 { color: orange; }
</style>
