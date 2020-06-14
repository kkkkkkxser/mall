// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// vant的组件
import { Button as VanButton } from 'vant'
import { Tabbar, TabbarItem } from 'vant';
import { Image as VanImage } from 'vant';
import { Overlay } from 'vant';
import { Lazyload } from 'vant'
import { Swipe, SwipeItem } from 'vant'
import { Rate } from 'vant'
import { Tab, Tabs } from 'vant'
// element ui组件
import { Button, Select } from 'element-ui';
// 自适应
import 'lib-flexible/flexible'
// 百度地图
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'PICssFCsjwTVXrFfav5rM08QAlncGpad'
// })

Vue.config.productionTip = false

// element ui的组件
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
// 使用引入vant的组件
Vue.component(VanButton.name, VanButton)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Overlay)
Vue.use(Lazyload)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Rate)
Vue.use(Tab)
Vue.use(Tabs)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
