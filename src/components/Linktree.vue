<template>
    <ul class="linktree">
        <li v-for="(link, index) in links" :key="index">
            <a :class="`link${link.theme === 'current' ? ' link--current' : ''}`" :href="link.url" target="_blank">
                <fa-icon v-if="link.icon" class="link-icon" :icon="link.icon" />
                {{ link.title }}
            </a>
        </li>
    </ul>
</template>

<script>
import links from '@/assets/links'

export default {
    name: 'Linktree',

    data: () => ({ links }),
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
