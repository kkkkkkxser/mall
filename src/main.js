// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vant的组件
import {Button} from'vant'
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Overlay } from 'vant';
import { Lazyload } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Rate } from 'vant'
import 'lib-flexible/flexible'


Vue.config.productionTip = false

// 使用引入的组件
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Overlay)
Vue.use(Lazyload)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Rate)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
