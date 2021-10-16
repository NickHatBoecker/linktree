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
            <socials />

            <p class="disclaimer u-text-center">Icons provided by <a href="https://fontawesome.com/" target="_blank" rel="noopener">Font Awesome</a></p>
        </div>
    </div>
</template>

<script>
import { pathOr } from 'ramda'
import Linktree from '@/components/Linktree'
import Socials from '@/components/Socials'

export default {
    name: 'App',

    components: { Socials, Linktree },

    data: () => ({ logo: null, slogan: null }),

    async mounted () {
        try {
            const { data: { stories } } = await this.$storyblok.get('cdn/stories', { starts_with: 'options' })
            const options = pathOr(null, [0, 'content'], stories)

            this.logo = pathOr(null, ['logo', 'filename'], options)
            this.slogan = pathOr(null, ['slogan'], options)
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
