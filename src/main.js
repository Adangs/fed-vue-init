import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './assets/style/index.less' // global css

import fetch from './utils/request' // global request
Vue.use(fetch)

import * as filters from './utils/filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局滚动事件
Vue.directive('xscroll', {
  bind(el, binding) {
    const container = el.attributes['x-scroll-container']
    const selectWrap = container ? el.querySelector(container.nodeValue) : el
    selectWrap.addEventListener('scroll', function() {
      const sign = el.attributes['xscroll-threshold'] ? el.attributes['xscroll-threshold'].nodeValue : 10
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        // console.log('滚动到底了')
        binding.value({ type: 'bottom', scrollTop: this.scrollTop, scrollHeight: this.scrollHeight, clientHeight: this.clientHeight })
      } else if (this.scrollTop <= 0) {
        // console.log('滚动到顶了')
        binding.value({ type: 'top', scrollTop: this.scrollTop, scrollHeight: this.scrollHeight, clientHeight: this.clientHeight })
      }
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
