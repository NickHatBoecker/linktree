import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as Contentful from 'contentful'

library.add(fas)
library.add(fab)

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
