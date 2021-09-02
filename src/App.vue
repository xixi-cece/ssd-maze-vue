<template>
  <div id="app" @click="closeOther($event)">
    <!-- 左侧菜单 -->
    <div
      class="leftMenu"
      :style="identity == 'mentee' ? 'background-color:#fff;' : ''"
      v-if="isLogin"
    >
      <!-- <img class="logoImg" src="./images/logo.png" alt="三士渡教育"> -->
      <leftMenu></leftMenu>
    </div>
    <!-- 右侧内容 -->
    <div class="rightCont" ref="wrapView" v-if="isLogin">
      <div class="contview">
        <HeadMenu></HeadMenu>
        <router-view />
        <!-- <wechatinfo v-if="showBar"></wechatinfo> -->
        <!-- <FooterMenu></FooterMenu> -->
      </div>
      <chage-password
        :showpassword="showpassword"
        @closepassword="closepassword"
      ></chage-password>
    </div>
    <div class="loginBox" v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import Wechatinfo from "@/components/Wechatinfo";
import chagePassword from "@/components/chagePassword";
import LeftMenu from "@/components/LeftMenu";
import HeadMenu from "@/components/HeadMenu";
import FooterMenu from "@/components/FooterMenu";

import { mapState, mapMutations } from "vuex";
import { utility } from "./assets/lib/common";
import salesmenu from "./config/salesmenu";
import headMenus from "./config/headmneus";
import salesvp from "./config/vpmenus";
import menteemenu from "./config/menteemenu";
import mentormenu from "./config/mentormenu";
import activeMenus from "./config/activemenus";
import adminmenu from "./config/adminmenu";
import partmenu from "./config/partmentor";
import administrastatic from "./config/administrastatic";
import studentmenu from "./config/studentmenu";
import insightmenus from "@/config/insightmenus";
import schadmin from "@/config/schadmin";

export default {
  data() {
    return {
      showpassword: false,
      isLogin: false,
      showBar: false, //是否显示侧边悬浮
      MenuList: [], //菜单列表
      identity: "", //身份类型
    };
  },
  components: {
    HeadMenu,
    LeftMenu,
    Wechatinfo,
    FooterMenu,
    chagePassword,
  },
  computed: {
    ...mapState(["loginstate"]),
  },
  watch: {
    $route(to, from) {
      if (to.fullPath == "/Login") {
        sessionStorage.clear();
        this.isLogin = false;
        this.changeLoginstate(false);
        return;
      }
      const fromPath = from.path;
      const fullPath = this.$route.path;
      let index = "";
      this.MenuList.forEach((v) => {
        if (v.path == fullPath) {
          index = v.name;
          return;
        }
      });
      //同一路由多个页面
      if (!index) {
        const partPath = this.$route.meta.parentpath;
        if (
          this.identity == "opmentor" ||
          this.identity == "ophead" ||
          this.identity == "plhead" ||
          this.identity == "plmentor"
        ) {
          administrastatic.forEach((v) => {
            if (v.path == fullPath || v.path == partPath) {
              index = v.name;
              return;
            }
          });
        } else {
          this.MenuList.forEach((v) => {
            if (v.path == partPath) {
              index = v.name;
              return;
            }
          });
        }
      }
      //修改主菜单选中
      this.$bus.$emit("changeLeft", index);
      //修改子菜单逻辑
      let flag = false; //是否有子菜单
      const childsMenus = activeMenus[0].children;
      childsMenus.forEach((v) => {
        if (v.path === fullPath) {
          flag = true;
          //修改子菜单选中
          this.$bus.$emit("updateMenu", v.name);
        }
      });
      //从其它地方进来选中之前的菜单
      let oldindex = "";
      this.MenuList.forEach((v) => {
        if (v.path == fromPath) {
          oldindex = v.name;
          sessionStorage.setItem("oldnum", oldindex);
          return;
        }
      });
      const oldnum = sessionStorage.getItem("oldnum");
      if (this.$route.name == "Wait" || this.$route.name == "EditInfo") {
        //修改主菜单选中
        this.$bus.$emit("changeLeft", oldnum);
      }
      // console.log(this.$route)
      if (
        this.$route.matched[0].path ==
        "/administration/Custermor/:id/:username/:type"
      ) {
        this.getadmintorMenu();
      }
      // if(this.$route.name=='Wait'|| this.$route.name=='EditInfo'){
      //   if(!flag){
      //     if(!childsMenus.length){
      //       //修改主菜单选中
      //       this.$bus.$emit('changeLeft',oldnum);
      //     }else{
      //       const isChnange = true;
      //       childsMenus.forEach(v=>{
      //         const snum = v.path.lastIndexOf('/');
      //         const lastId = v.path.slice(snum+1);
      //         const hId = utility.GetQueryString('id');
      //         if(lastId==hId){
      //           isChnange = false;
      //         };
      //       });
      //       if(isChnange){
      //         //修改主菜单选中
      //         this.$bus.$emit('changeLeft',oldnum);
      //       };
      //     }
      //   }
      // };
    },
  },
  created() {
    this.showchangepsw();
    const login = JSON.parse(sessionStorage.getItem("login"));
    this.isLogin = this.loginstate || login;
    const logintype = sessionStorage.getItem("logintype");
    this.identity = logintype;
    if (logintype == "sales") {
      this.MenuList = salesmenu;
    } else if (logintype == "saleshead") {
      this.MenuList = headMenus;
    } else if (logintype == "salesvp") {
      this.MenuList = salesvp;
      // }else if(logintype=='customizedmentor'||logintype=='specialist'||logintype=='usmentor'){
    } else if (logintype == "customizedmentor" || logintype == "specialist") {
      this.MenuList = menteemenu;
      this.showBar = true;
    } else if (logintype == "intern") {
      this.MenuList = mentormenu;
      this.showBar = true;
    } else if (logintype == "admin") {
      this.MenuList = adminmenu;
    } else if (logintype == "finance") {
      this.MenuList = partmenu;
    } else if (
      logintype == "opmentor" ||
      logintype == "ophead" ||
      logintype == "plmentor" ||
      logintype == "plhead"
    ) {
      this.getadmintorMenu();
    } else if (logintype == "mentee") {
      this.MenuList = studentmenu;
    } else if (logintype == "insightmenus") {
      this.MenuList = insightmenus;
    } else if (logintype == "schadmin") {
      this.MenuList = schadmin;
    }
    this.$bus.$on("uplogintype", (res) => {
      if (res == "sales") {
        this.MenuList = salesmenu;
      } else if (res == "saleshead") {
        this.MenuList = headMenus;
      } else if (res == "salesvp") {
        this.MenuList = salesvp;
        // }else if(res=='customizedmentor'||res=='specialist'||res=='usmentor'){
      } else if (res == "customizedmentor" || res == "specialist") {
        this.MenuList = menteemenu;
        this.showBar = true;
      } else if (res == "intern") {
        this.MenuList = mentormenu;
        this.showBar = true;
      } else if (res == "admin") {
        this.MenuList = adminmenu;
      } else if (res == "finance") {
        this.MenuList = partmenu;
      } else if (
        res == "opmentor" ||
        res == "ophead" ||
        res == "plmentor" ||
        res == "plhead"
      ) {
        this.getadmintorMenu();
      } else if (res == "mentee") {
        this.MenuList = studentmenu;
      } else if (res == "insightmenus") {
        this.MenuList = insightmenus;
      } else if (res == "schadmin") {
        this.MenuList = schadmin;
      }
    });
  },
  mounted() {
    this.$bus.$on("goTop", (res) => {
      this.$refs.wrapView.scrollTop = 0;
    });
    this.$bus.$on("logIn", () => {
      this.isLogin = true;
      const logintype = window.sessionStorage.getItem("logintype");
      this.identity = logintype;
      if (
        logintype == "sales" ||
        logintype == "saleshead" ||
        logintype == "salesvp"
      ) {
        // this.getdataList();
        this.gettolnum(); //获取统计数据
      }
      // if(logintype=='customizedmentor'||logintype=='specialist'||logintype=='usmentor'||logintype=='intern'){
      if (
        logintype == "customizedmentor" ||
        logintype == "specialist" ||
        logintype == "intern"
      ) {
        this.showBar = true;
      } else {
        this.showBar = false;
      }
      this.$bus.$on("showpw", (res) => {
        this.showpassword = res;
      });
      this.showchangepsw();
    });
    this.$bus.$on("uplist", () => {
      // this.getdataList();
      this.gettolnum(); //获取统计数据
    });
    const status =
      JSON.parse(sessionStorage.getItem("login")) || this.loginstate;
    const logintype = window.sessionStorage.getItem("logintype");
    if (
      status &&
      (logintype == "sales" ||
        logintype == "saleshead" ||
        logintype == "salesvp")
    ) {
      // this.getdataList();
      this.gettolnum(); //获取统计数据
    }
    this.$bus.$on("backxz", () => {
      this.getadmintorMenu();
    });
    this.$bus.$on("upltMenu", (res) => {
      this.getadmintorMenu();
    });
  },
  methods: {
    ...mapMutations(["changeListInfo", "changeLoginstate"]),
    showchangepsw() {
      this.showpassword = JSON.parse(sessionStorage.getItem("pw"));
    },
    closepassword() {
      this.showpassword = false;
    },
    closeOther(e) {
      this.$bus.emit("closeAll", false);
    },
    //获取统计数据
    gettolnum() {
      this.$https.datanumbox({}).then((res) => {
        if (res && res.code == 200) {
          const marr = this.MenuList;
          marr.forEach((v) => {
            if (v.path == "/sales/Waitclient") {
              v.msgNum = res.data.pendingCount;
            } else if (v.path == "/sales/Talking") {
              v.msgNum = res.data.ongoingCount;
            } else if (v.path == "/sales/Sinclient") {
              v.msgNum = res.data.signedCount;
            } else if (v.path == "/sales/CacheSign") {
              v.msgNum = res.data.goneCount;
            } else if (v.path == "/sales/Waitsplit") {
              v.msgNum = res.data.unassignedCount;
            }
          });
        }
      });
    },
    //获取行政导师列表数据
    getadmintorMenu() {
      //行政导师重新定义路由
      this.$https.getclient({}).then((res) => {
        if (res && res.code == 200) {
          res.data.forEach((v, i) => {
            (v.name = "th_" + i), (v.val = v.year);
            v.list.forEach((item) => {
              item.name = item.username;
              item.menteeId = item.id;
              item.val = item.chinesename;
              item.path =
                "/administration/Custermor/" +
                item.id +
                "/" +
                item.username +
                "/" +
                item.type;
            });
            v.children = v.list;
          });
          this.MenuList = res.data;
          this.$bus.$emit("menteelist", res.data);
          //选中活动列表项
          const fullPath = this.$route.path;
          this.MenuList.forEach((vm) => {
            vm.children.forEach((cm) => {
              if (cm.path == fullPath) {
                sessionStorage.setItem("mentame", cm.val);
                this.$bus.$emit("updateMenu", cm.name);
                this.$bus.$emit("changetab", true); //修改行政选中服务中的客户tab
              }
              //行政处理
              if (
                this.identity == "opmentor" ||
                this.identity == "ophead" ||
                this.identity == "plmentor" ||
                this.identity == "plhead"
              ) {
                const routerparam = this.$route;
                // console.log(routerparam)
                if (
                  routerparam.path == "/administration/Voicerecord" ||
                  routerparam.path == "/administration/Groupinfo"
                ) {
                  sessionStorage.setItem("mentame", cm.val);
                  sessionStorage.setItem("mentusname", cm.val);
                  this.$bus.$emit("updateMenu", cm.name);
                  this.$bus.$emit("changetab", true); //修改行政选中服务中的客户tab
                }
              }
            });
          });
        } else {
          this.$Message.error("获取信息失败！");
        }
      });
      // setTimeout(()=>{
      //   this.MenuList = administration;
      //   this.$bus.$emit('updateMenu','1_11');
      //   this.$router.push({
      //     path:'/administration/Custermor/'+'1_11'
      //   });
      // },2000)
    },
    //获取tab栏正在处理中的列表
    // getdataList(){
    //   this.$https.goinglist().then(res=>{
    //     if(res&&res.status=='success'){
    //       // console.log(res)
    //       const arr = res.ongoinglist.concat(res.insurveylist).concat(res.signinglist).concat(res.paymentdonelist);
    //       const newArr = [];
    //       arr.forEach((v)=>{
    //         newArr.push({
    //           name:v.id*10,
    //           val:v.chinesename,
    //           icon:'iconfont iconkehuxiangqing',
    //           path:'/sales/Wait/'+v.id
    //         });
    //       });
    //       activeMenus[0].children = newArr;
    //       //选中活动列表项
    //       const fullPath = this.$route.path;
    //       newArr.forEach(v=>{
    //         if(v.path === fullPath){
    //           this.$bus.$emit('updateMenu',v.name);
    //         };
    //       });
    //     }else{
    //       this.$Message.error('获取信息失败！');
    //     };
    //   })
    // },
    //获取正在勾搭的列表
    // getdataList11111(){
    //     this.$https.getongoingList({}).then(res=>{
    //         if(res&&res.status=='success'){
    //             const arr = res.ongoinglist;
    //             const newArr = [];
    //             arr.forEach((v)=>{
    //               newArr.push({
    //                 name:v.id*10,
    //                 val:v.chinesename,
    //                 icon:'iconfont iconkehuxiangqing',
    //                 path:'/sales/Wait/'+v.id
    //               });
    //             });
    //             activeMenus[0].children = newArr;
    //             const routeParam = this.$route;
    //             const fullPath = this.$route.path;
    //             let flag = false;//是否走的子菜单
    //             newArr.forEach(v=>{
    //               if(v.path === fullPath){
    //                 flag = true;
    //                 this.$bus.$emit('updateMenu',v.name);
    //               };
    //             });
    //             if(routeParam.path == '/sales/EditInfo'){
    //               const num = routeParam.query.id;
    //               this.$bus.$emit('updateMenu',num*10);
    //             };
    //             //修改主菜单
    //             let index = '';
    //             this.MenuList.forEach(v=>{
    //               //增加左侧列表数量
    //               if(v.routname=='Talking'){
    //                 v.msgNum = res.ongoinglist.length;
    //               };
    //               //记录主菜单选中
    //               if(v.path == fullPath){
    //                 index = v.name;
    //                 return;
    //               };
    //             });
    //             this.$bus.$emit('changeLeft',index);
    //             const oldnum = sessionStorage.getItem('oldnum');
    //             if(this.$route.name=='Wait'||this.$route.name=='EditInfo'){
    //               if(!flag){
    //                 if(!activeMenus[0].children.length){
    //                   //修改主菜单选中
    //                   this.$bus.$emit('changeLeft',oldnum);
    //                 }else{
    //                   if(this.$route.name=='Wait'||this.$route.name=='EditInfo'){
    //                     const isChnange = true;
    //                     activeMenus[0].children.forEach(v=>{
    //                       const snum = v.path.lastIndexOf('/');
    //                       const lastId = v.path.slice(snum+1);
    //                       const hId = utility.GetQueryString('id');
    //                       if(lastId==hId){
    //                         isChnange = false;
    //                       };
    //                     });
    //                     if(isChnange){
    //                       //修改主菜单选中
    //                       this.$bus.$emit('changeLeft',oldnum);
    //                     };
    //                   }
    //                 }
    //               };
    //             };
    //         }else{
    //           this.$Message.error('获取信息失败！');
    //         }
    //     })
    // }
  },
};
</script>

<style lang="scss">
.ivu-spin-fix {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.ivu-modal-mask {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.ivu-btn {
  box-shadow: none !important;
  &:focus {
    box-shadow: none !important;
  }
}
.ivu-table {
  color: #3f4042 !important;
}
.ivu-table th {
  background-color: #fff;
  padding: 20px 0 !important;
}
.ivu-table td {
  border-bottom: 0 !important;
  padding: 10px 0 !important;
}
.ivu-table:before {
  display: none;
}
.colicon {
  width: 7em;
  height: 2.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#app {
  font-family: "PingFangSC-Semibold,PingFang SC,Microsoft YaHei,MicrosoftJhengHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3e3f42;
  height: 100vh;
  display: flex;
  background-color: #edf1f5;
  .leftMenu {
    min-width: 240px;
    width: 240px;
    background-color: #252529;
    box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.08);
    overflow-y: auto;
    position: relative;
    // margin-top: 64px;
    z-index: 6;
  }
  .rightCont {
    flex: 1;
    background-color: #edf1f5;
    // background: url('./images/bg.png') no-repeat 30% center;
    height: 100vh;
    // overflow-x: hidden;
    overflow-y: auto;
    padding: 80px 0 38px;
    background-size: 100% 100%;
    .contview {
      margin: 0 auto;
      min-width: 1148px;
      max-width: 1628px;
      width: 96.8%;
      box-sizing: border-box;
      padding: 0 20px;
      overflow: auto;
      .tableBox {
        padding: 0 12px !important;
        background-color: #fff;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #eaedf3;
      }
    }
  }
  .loginBox {
    width: 100%;
    height: 100%;
    background: #f5f6fa url("./images/bg.jpg") no-repeat left center;
    background-size: cover;
  }
}
//弹窗
.psw_modal {
  .pswitem {
    margin-bottom: 15px;
    .pswtip {
      font-weight: normal;
      margin-bottom: 10px;
    }
  }
  .pswbtnbox {
    padding: 10px 0;
    text-align: center;
    .ivu-btn {
      height: 35px;
      width: 120px;
    }
  }
}
//解决富文本编辑器层级过高
.w-e-text-container,
.w-e-menu {
  z-index: inherit !important;
}
</style>
