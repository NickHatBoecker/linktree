import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faYoutube, faItunesNote, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as Contentful from 'contentful'

library.add([faGlobe, faTwitter, faYoutube, faItunesNote, faGithub])

Vue.component('fa-icon', FontAwesomeIcon)

// Access via this.$contentful in vue components
Vue.prototype.$contentful = Contentful.createClient({
    space: process.env.VUE_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN,
})

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
