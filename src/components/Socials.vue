<template>
    <ul class="socials">
        <li v-for="(link, index) in links" :key="index">
            <a
                class="link"
                :href="link.url"
                target="_blank"
                rel="noopener"
                :title="link.label"
            >
                <fa-icon v-if="link.icon" class="link-icon" :icon="getIconList(link.icon)" />
            </a>
        </li>
    </ul>
</template>

<script>
import GetSocialLinkList from '@/assets/database/GetSocialLinkList'

export default {
    name: 'Socials',

    data: () => ({ links: [] }),

    async mounted () {
        try {
            this.links = await GetSocialLinkList()
        } catch (e) {
            console.log(e) // eslint-disable-line no-console
        }
    },

    methods: {
        getIconList (icon) {
            const prefixes = ['fab', 'fas']
            let iconName = icon
            let iconPrefix = ''

            prefixes.forEach(prefix => {
                if (icon.startsWith(`${prefix}-`)) {
                    iconPrefix = prefix
                    iconName = iconName.replace(`${prefix}-`, '')
                }
            })

            return [iconPrefix, iconName]
        },
    },
}
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/variables";

    .socials {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin-top: $spacing-unit * 4;
        margin-bottom: $spacing-unit * 5;

        .link-icon {
            font-size: 2.5em;
            color: #fff;
            margin: 0 $spacing-unit * 2;

            &:hover, &:active, &:focus {
                color: $primary !important;
                transform: scale(1.2);
            }
        }
    }
</style>
