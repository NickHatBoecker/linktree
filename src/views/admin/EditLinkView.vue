<template>
    <div class="page fullheight">
        <div class="container">
            <h1>{{ link ? 'Edit Link' : 'Create Link' }}</h1>

            <form class="form full-width" @submit.prevent="onSubmit">
                <div class="form-group">
                    <label>Title <sup>*</sup></label>
                    <input v-model="form.title" class="form-control" type="text" required />
                </div>

                <div class="form-group">
                    <label>Icon</label>
                    <input v-model="form.icon" class="form-control" type="text" />
                </div>

                <div class="form-group">
                    <label>Label <sup>*</sup></label>
                    <input v-model="form.label" class="form-control" type="text" required />
                </div>

                <div class="form-group">
                    <label>Theme</label>
                    <select v-model="form.theme" class="form-control">
                        <option value="">Default</option>
                        <option value="icon-only">icon-only</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>URL <sup>*</sup></label>
                    <input v-model="form.url" class="form-control" type="url" required />
                </div>

                <div class="form-group">
                    <label>Position</label>
                    <input v-model="form.position" class="form-control" type="number" />
                </div>

                <div class="form-group">
                    <label>Profile <sup>*</sup></label>
                    <input v-model="form.profile" class="form-control" type="text" readonly required />
                </div>

                <button type="submit" class="full-width btn btn-submit" style="margin-bottom: 6px;">Save</button>
                <button type="button" class="full-width btn" @click="$router.push({ name: 'admin/editProfile', params: { id: profileId } })">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script>
import GetLinkById from '@/assets/database/GetLinkById'
import { createLink, updateLink } from '@/assets/database/CreateLink'

export default {
    props: {
        profileId: { type: String, required: true },
        id: { type: String, default: '' },
    },

    data () {
        return {
            link: null,
            form: {
                title: '',
                icon: '',
                label: '',
                theme: '',
                url: '',
                position: 0,
                profile: this.profileId,
            },
        }
    },

    mounted () {
        if (this.id) {
            this.loadLink()
        }
    },

    methods: {
        async loadLink () {
            try {
                this.link = await GetLinkById(this.id)
                this.form.title = this.link.title
                this.form.icon = this.link.icon
                this.form.label = this.link.label
                this.form.theme = this.link.theme
                this.form.url = this.link.url
                this.form.position = this.link.position
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },
        async onSubmit () {
            try {
                if (this.link) {
                    // UPDATE
                    await updateLink(this.id, this.form)
                } else {
                    // CREATE
                    await createLink(this.form)
                    this.$router.push({ name: 'admin/editProfile', params: { id: this.profileId } })
                }
                alert('DONE')
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
h1 { color: orange; }
</style>
