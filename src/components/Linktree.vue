<template>
    <ul class="linktree">
        <li v-for="(link, index) in links" :key="index">
            <a
                :class="`link${link.theme === currentTheme ? ' link--current' : ''}`"
                :href="link.url"
                target="_blank"
                rel="noopener"
            >
                <fa-icon v-if="link.icon" class="link-icon" :icon="[link.iconPrefix || '', link.icon || '']" />
                {{ link.title }}
            </a>
        </li>
    </ul>
</template>

<script>
const CURRENT_THEME = 'current'

export default {
    name: 'Linktree',

    data: () => ({ links: [], currentTheme: CURRENT_THEME }),

    async mounted () {
        try {
            const { items } = await this.$contentful.getEntries({
                content_type: process.env.VUE_APP_CONTENTFUL_LINK_TYPE,
            })

            const links = items.map(x => x.fields)
            links.sort(this.sortByPosition)

            this.links = links
        } catch (e) {
            console.log(e) // eslint-disable-line no-console
        }
    },

    methods: {
        sortByPosition (a, b) {
            // Always show current links on top
            if (a.theme === CURRENT_THEME && b.theme !== CURRENT_THEME) return -1

            if (a.position < b.position) return 1
            if (b.position < a.position) return -1

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