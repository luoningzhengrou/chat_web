// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {obj} from '../static/js/utils'
import '../static/css/reset.css'
// import 'amfe-flexible'
Vue.config.productionTip = false
//vant
//导航
import { NavBar } from 'vant';
Vue.use(NavBar);
//搜索框
import { Search } from 'vant';
Vue.use(Search);
//左箭头图标
import { Icon } from 'vant';
Vue.use(Icon);
//滑动
import { SwipeCell } from 'vant';
Vue.use(SwipeCell);
//按钮
import { Button } from 'vant';
Vue.use(Button);
//单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
//遮罩层
import { Overlay } from 'vant';
Vue.use(Overlay);
//开关单元格
import { SwitchCell } from 'vant';
Vue.use(SwitchCell);
//上拉刷新
import { ActionSheet } from 'vant';
Vue.use(ActionSheet);
//弹出框
import { Dialog } from 'vant';
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//import { Dialog } from 'vant';
Vue.use(Dialog);
//展示弹出层
import { Popup } from 'vant';
Vue.use(Popup)
//加载
import { Loading } from 'vant';
Vue.use(Loading);
//单选框
import { RadioGroup, Radio } from 'vant';
Vue.use(RadioGroup);
Vue.use(Radio);
//输入框
import { Field } from 'vant';
Vue.use(Field);
//上传文件
import { Uploader } from 'vant';
Vue.use(Uploader);
//vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//解决点透vue-tap
// import vueTap from 'v-tap' // 引入插件
// Vue.use(vueTap) // 全局注册
//aixos
import axios from 'axios'




import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios
// import qs from 'qs';
// Vue.prototype.$qs = qs;

//1.13

const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout:20000,
  headers:{
    'Content-Type':'application/json;charset=utf-8'
  }
})




axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

Vue.use(VueAxios, axios)
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
// Vue.prototype.$axios = axios

//WebSocket封装方法
// import * as socketApi from './api/socket1'
// Vue.prototype.socketApi = socketApi

//引入仓库数据
import store from './store'
//websocket
// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket);
// import moment from 'moment';
// Vue.prototype.$moment = moment
//Vue.use(moment)
//Vue.use(require('vue-moment'));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  mounted(){
    obj.setRem();
    window.onresize=obj.setRem;
  },
  // beforeCreate(){
  //   this.$router.push('/Mymessage');
  // },
//   created(){ 
//     if(this.$router.path !== '/Mymessage'){
//         this.$router.replace('/Mymessage')
//     }
// },
  components: { App },
  template: '<App/>'
})
