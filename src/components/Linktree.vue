<template>
    <ul class="linktree">
        <li v-for="(link, index) in links" :key="index">
            <a
                :class="`link${link.theme === currentTheme ? ' link--current' : ''}`"
                :href="link.url"
                target="_blank"
                rel="noopener"
            >
                <fa-icon v-if="link.icon" class="link-icon" :icon="getIconList(link.icon)" />
                {{ link.label }}
            </a>
        </li>
    </ul>
</template>

<script>
import { propOr } from 'ramda'
const CURRENT_THEME = 'current'

export default {
    name: 'Linktree',

    data: () => ({ links: [], currentTheme: CURRENT_THEME }),

    async mounted () {
        try {
            const { links } = await (await fetch(`${process.env.VUE_APP_API_BASE_URL}/get-links`)).json()

            this.links = links
            this.links.sort(this.sortByPositionDesc)
        } catch (e) {
            console.log(e) // eslint-disable-line no-console
        }
    },

    methods: {
        getIconList (icon) {
            const list = icon.split('-')

            if (list.length === 1) {
                return ['', icon]
            }

            return list
        },

        sortByPositionDesc (a, b) {
            const defaultSort = 10

            if (propOr(defaultSort, 'position', a) > propOr(defaultSort, 'position', b)) return 1
            if (propOr(defaultSort, 'position', b) > propOr(defaultSort, 'position', a)) return -1

            return 0
        },
    },
}
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/variables";

    .linktree {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .link {
        display: block;
        background: $linkBackgroundColor;
        color: $linkColor;
        text-decoration: none;
        padding: $spacing-unit*2 $spacing-unit*4;
        margin-bottom: $spacing-unit*2;
        text-transform: uppercase;
        line-height: 1.2em;

        @media (max-width: $breakpointXs) {
            text-align: center;
        }

        &--current {
            background: $accent;
            color: $linkColor;
        }

        &:hover,
        &:active,
        &:focus {
            background: $linkColor;
            color: $accent;
            border: 2px solid $linkBackgroundColor;
            padding: ($spacing-unit*2 - 2) ($spacing-unit*4 - 2);
        }
    }

    .link-icon {
        margin-right: $spacing-unit;
        font-size: 1.5em;
        position: relative;
        top: 3px;

        @media (max-width: $breakpointXs) {
            display: block;
            margin: 0 auto $spacing-unit*2;
        }
    }
</style>
