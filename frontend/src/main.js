import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import config from '@/common/config'

import eventBus from '@/common/event-bus'

axios.defaults.baseURL = `${config.treeAPI}/api/v1`
axios.defaults.headers.common.Accept = 'application/json'
axios.interceptors.response.use(
    response => response,
    (error) => {
        return Promise.reject(error)
    }
)

Vue.config.productionTip = false;

Vue.prototype.$eventBus = eventBus;

new Vue({
    render: h => h(App),
}).$mount('#app')
