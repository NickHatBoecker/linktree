<template>
    <div id="app" class="fullheight">
        <div class="page fullheight">
            <h1 class="sr-only">NickHatBoecker Linktree</h1>
            <div class="logo-wrapper">
                <img class="logo" width="100" height="100" alt="NickHatBoecker Logo" src="./assets/logo.png">
            </div>
            <linktree />

            <p class="disclaimer u-text-center">Icons provided by <a href="https://fontawesome.com/" target="_blank" rel="noopener">Font Awesome</a></p>
        </div>
    </div>
</template>

<script>
import Linktree from '@/components/Linktree'

export default {
    name: 'App',

    components: { Linktree },
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
        background: linear-gradient(180deg, $secondary 0%, $black 100%);
        padding: $spacing-unit*4 $spacing-unit*2;

        @media (min-width: $breakpointLg) {
            padding-top: $spacing-unit*12;
        }
    }

    .u-text-center {
        text-align: center;
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
        display: flex;
        justify-content: center;
        align-items: center;
        background: $primary;
        border-radius: 50%;
        margin-bottom: $spacing-unit*5;
        padding: $spacing-unit*4;
        width: $logo-size * 2;
    }

    .logo {
        image-rendering: pixelated;
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
