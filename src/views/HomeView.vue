<template>
    <div class="page fullheight pb-0">
        <h1 class="sr-only">Linktree</h1>

        <div v-if="logo" :class="{ 'logo-wrapper': true, 'mb-8': !slogan }">
            <img class="logo" width="auto" height="auto" alt="Logo" :src="logo">
        </div>
        <div v-if="slogan">
            <h2 class="u-text-white u-text-center mb-8" v-html="slogan" />
        </div>

        <linktree />
        <itch-games v-if="showItchGames" class="mt-36" />
        <socials />

        <p class="disclaimer u-text-center">Icons provided by <a href="https://fontawesome.com/" target="_blank" rel="noopener">Font Awesome</a></p>
    </div>
</template>

<script>
import { propOr } from 'ramda'
import GetProfileById from '@/assets/database/GetProfileById'
import Linktree from '@/components/Linktree.vue'
import ItchGames from '@/components/ItchGames.vue'
import Socials from '@/components/Socials.vue'

export default {
    components: { ItchGames, Socials, Linktree },

    data: () => ({ logo: null, slogan: null }),

    computed: {
        showItchGames () {
            // Unfortunately itch always shows error 429 Too Many Requests :(
            // return process.env.VUE_APP_PLAUSIBLE_DOMAIN === 'nick-hat-boecker.de'
            return false
        },
    },

    async mounted () {
        try {
            const options = await GetProfileById()

            this.logo = propOr(null, 'logoSrc', options)
            this.slogan = propOr(null, 'slogan', options)

            if (process.env.VUE_APP_PLAUSIBLE_DOMAIN) {
                const trackingScript = document.createElement('script')
                trackingScript.setAttribute('src', 'https://analytics.serverwueste.de/js/script.js')
                trackingScript.setAttribute('data-domain', process.env.VUE_APP_PLAUSIBLE_DOMAIN)
                document.body.appendChild(trackingScript)
            }
        } catch (e) {
            console.log(e) // eslint-disable-line no-console
        }
    },
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
    max-width: 80vw;
}

.logo {
    max-width: 100%;
    border-radius: 50%;
}

.disclaimer {
    font-size: 0.9em;
    color: $white;

    a {
        color: $accent;
        text-decoration: none;

        &:hover,
        &:active,
        &:focus {
            text-decoration: underline;
        }
    }
}
</style>
