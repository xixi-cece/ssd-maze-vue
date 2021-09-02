import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store';
import Bus from './store/bus';

//引入第三方库
import ViewUI from 'view-design';
// import style
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
Vue.use(Bus);
//引入字体库
import './assets/font/iconfont.css';
//使用彩色图标
import './assets/font/iconfont.js';

import Echarts from 'vue-echarts';
Vue.component('chart',Echarts);

//引入图例和工具
import 'echarts/lib/chart/line';//引入折线图
import 'echarts/lib/chart/bar';//引入柱状图
import 'echarts/lib/component/legend';//引入图例
import 'echarts/lib/component/tooltip';//引入提示
import 'echarts/lib/component/toolbox';//引入（右上角）图例操作
import 'echarts/lib/component/title';//引入标题

//引入接口文件
import httpServe from './server/https';
Vue.prototype.$https = httpServe;

// 是否显示生产消息
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
