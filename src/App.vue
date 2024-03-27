<template>
    <div id="app" class="fullheight">
        <div class="page fullheight">
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
    </div>
</template>

<script>
import { propOr } from 'ramda'
import Linktree from '@/components/Linktree.vue'
import ItchGames from '@/components/ItchGames.vue'
import Socials from '@/components/Socials.vue'

export default {
    name: 'App',

    components: { ItchGames, Socials, Linktree },

    data: () => ({ logo: null, slogan: null }),

    computed: {
        showItchGames () {
            return process.env.VUE_APP_PLAUSIBLE_DOMAIN === 'nick-hat-boecker.de'
        },
    },

    async mounted () {
        try {
            const { options } = await (await fetch(`${process.env.VUE_APP_API_BASE_URL}/get-options`)).json()

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

<style lang="scss">
    @import '~@/assets/css/variables';

    * { box-sizing: border-box; }

    html, body {
        margin: 0;
        padding: 0;
        min-height: 100%;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
    }

    body {
        background: $secondary;
        background-image: url('./assets/background.jpg');
        padding: $spacing-unit*4 $spacing-unit*2;

        @media (min-width: $breakpointLg) {
            padding-top: $spacing-unit*12;
        }
    }

    .u-text-center {
        text-align: center;
    }

    .u-text-white {
        color: #fff;
    }

    .u-text-primary {
        color: $primary;
    }

    .fullheight {
        height: 100%;
    }

    .page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .logo-wrapper {
        max-width: 80vw;
    }

    .logo {
        max-width: 100%;
        border-radius: 50%;
    }

    .mb-8 {
        margin-bottom: $spacing-unit * 8;
    }

    .mt-36 {
        margin-top: $spacing-unit-36;
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
