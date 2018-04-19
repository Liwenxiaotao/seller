// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
// js中引入less需要加loader
require('!style-loader!css-loader!less-loader!./common/less/index.less');


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.config.productionTip = false;
const routes=[
  {
    path:'/goods',
    name:'goods',
    component:goods
  },
  {
    path:'/ratings',
    name:'rating',
    component:ratings
  },
  {
    path:'/seller',
    name:'seller',
    component:seller
  },
  {
    path:'/*',
    //redirect:'goods'
    component:goods
  },
];
const router=new VueRouter({
  routes,
  // 设置活跃状态的router-link的样式
  linkActiveClass:'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App),
});
