import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginstate:false,//登录状态
    listInfo:{},//列表数据
  },
  mutations: {
    changeLoginstate(state,data){
      state.loginstate = data;
    },
    changeListInfo(state,data){
      state.listInfo = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
