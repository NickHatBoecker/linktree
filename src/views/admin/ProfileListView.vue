<template>
    <div class="page fullheight">
        <div class="container">
            <h1>Profiles</h1>

            <table class="table table--hover full-width" cellpadding="12">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Profile name</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(profile, i) in profiles"
                        :key="`profile-${i}`"
                        @click="$router.push({ name: 'admin/editProfile', params: { id: profile.profile } })"
                    >
                        <td>{{ i + 1 }}</td>
                        <td>{{ profile.profile }}</td>
                        <td>{{ getUpdatedAt(profile.$updatedAt) }}</td>
                        <td>
                            <a class="btn btn-link" :href="getProfileUrl(profile.profile)" target="_blank" @click.stop>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                    <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                    <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/>
                                </svg>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button type="button" class="btn btn-submit full-width" style="margin-top: 48px;" @click="signOut">Sign out</button>
        </div>
    </div>
</template>

<script>
import Appwrite from '@/assets/appwrite'
import GetProfileList from '@/assets/database/GetProfileList'

export default {
    data: () => ({ profiles: [] }),

    mounted () {
        this.loadProfiles()
    },

    methods: {
        async loadProfiles () {
            try {
                this.profiles = await GetProfileList()
            } catch (e) {
                console.log(e)
                alert(e)
            }
        },

        getUpdatedAt (updatedAt) {
            const date = new Date(updatedAt)

            let day = date.getDate()
            if (day < 10) { day = `0${day}` }
            let month = date.getMonth() + 1
            if (month < 10) { month = `0${month}` }
            const year = date.getFullYear()

            let hours = date.getHours()
            if (hours < 10) { hours = `0${hours}` }
            let minutes = date.getMinutes()
            if (minutes < 10) { minutes = `0${minutes}` }

            return `${day}.${month}.${year}, ${hours}:${minutes}`
        },

        async signOut () {
            await Appwrite.account.deleteSessions()
            await this.$router.push({ name: 'home' })
        },

        getProfileUrl (profileId) {
            if (profileId === 'the5kyliner') {
                return 'https://the5kyliner.de/linktree'
            } else {
                return 'https://nick-hat-boecker.de/linktree'
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page { color: $white; }
h1 { color: orange; }

.btn-link svg {
    position: relative;
    top: 2px;
}
</style>
