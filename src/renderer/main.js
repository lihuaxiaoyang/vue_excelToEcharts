import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import routes from './route';
import store from './store';
import filters from './utils/util';
import database from './utils/db';
import logger from './utils/logger';
import 'iview/dist/styles/iview.css';
import './assets/less/common.less';
import App from './App.vue';
// 升级脚本
import './utils/upgrade';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入测试变量
import globalv from './global_variable';
import EchartsOptions from './pages/visualpage/EchartsOptions'
import ProvinceXY from './pages/visualpage/provinceXY'
// import './pages/visualpage/VisualPageCss'
// 引入echart组件
// import Echarts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// Vue.component('chart', Echarts)
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.use(iView);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

const router = new VueRouter({
    routes,
});

//自定义（变量、方法）调用方式
Vue.prototype.$ec = EchartsOptions;
Vue.prototype.$val = globalv;
Vue.prototype.$db = database;
Vue.prototype.$logger = logger;
Vue.prototype.$xy = ProvinceXY;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});