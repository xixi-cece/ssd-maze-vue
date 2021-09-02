<template>
  <div id="LeftMenu">
    <img
      class="menulogo"
      v-if="accoutype == 'mentee'"
      src="../images/logo.png"
    />
    <img class="menulogo" v-else src="../images/logo_white.png" />
    <Menu
      v-if="
        accoutype == 'sales' ||
        accoutype == 'saleshead' ||
        accoutype == 'salesvp'
      "
      :theme="theme"
      width="auto"
      :active-name="activeMenu"
      :accordion="true"
    >
      <p class="line"></p>
      <div v-for="(v, i) in menus" :key="i">
        <MenuItem v-if="!v.children" :name="v.name" :to="v.path">
          <Icon :custom="v.icon" />
          {{ v.val }}
          <b class="tig fr" v-if="v.msgNum">{{ v.msgNum }}</b>
        </MenuItem>
        <!-- <p v-if="accoutype!='sales'&&accoutype!='customizedmentor'&&accoutype!='specialist'&&accoutype!='usmentor'&&accoutype!='intern'&&accoutype=='salesvp'&&i==4" class="line"></p>
                <p v-if="accoutype!='sales'&&accoutype!='customizedmentor'&&accoutype!='specialist'&&accoutype!='usmentor'&&accoutype!='intern'&&accoutype=='saleshead'&&i==2" class="line"></p> -->
        <p
          v-if="
            accoutype != 'sales' &&
            accoutype != 'customizedmentor' &&
            accoutype != 'specialist' &&
            accoutype != 'intern' &&
            accoutype == 'salesvp' &&
            i == 4
          "
          class="line"
        ></p>
        <p
          v-if="
            accoutype != 'sales' &&
            accoutype != 'customizedmentor' &&
            accoutype != 'specialist' &&
            accoutype != 'intern' &&
            accoutype == 'saleshead' &&
            i == 2
          "
          class="line"
        ></p>
        <p v-if="accoutype == 'salesvp' && i == 7" class="line"></p>
      </div>
    </Menu>
    <Tabs
      :value="checkMenu"
      v-else-if="
        accoutype == 'opmentor' ||
        accoutype == 'ophead' ||
        accoutype == 'plmentor' ||
        accoutype == 'plhead'
      "
    >
      <TabPane label="服务中客户" name="adname1">
        <Select
          class="selOut"
          v-model="modelval"
          filterable
          remote
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <span slot="prefix" class="endIcon">
            <Icon type="ios-close" @click="clearNull" />
          </span>
          <Option
            v-for="(option, index) in listmember"
            :value="option.username"
            :key="index"
            >{{ option.chinesename }}</Option
          >
        </Select>
        <Menu
          :theme="theme"
          width="auto"
          :active-name="activeMenu"
          :accordion="true"
        >
          <div v-for="(v, i) in menus" :key="i">
            <MenuItem v-if="!v.children" :name="v.name" :to="v.path">
              <Icon :custom="v.icon" />
              {{ v.val }}
              <b class="tig fr" v-if="v.msgNum">{{ v.msgNum }}</b>
            </MenuItem>
            <Submenu :name="v.name" v-if="v.children">
              <template slot="title">
                <Icon :custom="v.icon" />
                <span>{{ v.val }}</span>
              </template>
              <MenuItem
                ref="asideMenu"
                v-for="(item, index) in v.children"
                :key="index"
                @click.native="changeSelect(item)"
                :name="item.name"
                :to="item.path"
              >
                <Icon :type="item.icon" />
                {{ item.val }}
              </MenuItem>
            </Submenu>
          </div>
        </Menu>
      </TabPane>
      <TabPane label="业务管理" name="adname2">
        <Menu
          :theme="theme"
          width="auto"
          :active-name="activeMenu"
          :accordion="true"
        >
          <div v-for="(v, i) in adminmenu" :key="i">
            <MenuItem v-if="!v.children" :name="v.name" :to="v.path">
              <Icon :custom="v.icon" />
              {{ v.val }}
              <b class="tig fr" v-if="v.msgNum">{{ v.msgNum }}</b>
            </MenuItem>
          </div>
        </Menu>
      </TabPane>
    </Tabs>
    <Menu
      v-else
      :theme="theme"
      width="auto"
      :active-name="activeMenu"
      :accordion="true"
    >
      <p class="line"></p>
      <div v-if="accoutype == 'insightmenus'" class="insgbox">
        <Button @click="goPublish">发布规划活动</Button>
      </div>
      <div v-for="(v, i) in menus" :key="i">
        <MenuItem v-if="!v.children" :name="v.name" :to="v.path">
          <Icon :custom="v.icon" />
          {{ v.val }}
          <b class="tig fr" v-if="v.msgNum">{{ v.msgNum }}</b>
        </MenuItem>
        <p v-if="v.children" class="line"></p>
        <Submenu :name="v.name" v-if="v.children">
          <template slot="title">
            <Icon :custom="v.icon" />
            <span>{{ v.val }}</span>
          </template>
          <MenuItem
            ref="asideMenu"
            v-for="(item, index) in v.children"
            :key="index"
            @click.native="changeSelect(item)"
            :name="item.name"
            :to="item.path"
          >
            <Icon :type="item.icon" />
            {{ item.val }}
          </MenuItem>
        </Submenu>
      </div>
    </Menu>
  </div>
</template>

<script>
import salesmenu from "../config/salesmenu";
import headMenus from "../config/headmneus";
import salesvp from "../config/vpmenus";
import menteemenu from "../config/menteemenu";
import mentormenu from "../config/mentormenu";
import ActiveMenus from "../config/activemenus";
import Adminmenu from "../config/adminmenu";
import partmenu from "../config/partmentor";
import administrastatic from "../config/administrastatic";
import studentmenu from "../config/studentmenu";
import insightmenus from "@/config/insightmenus";
import schadmin from "@/config/schadmin";

import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      checkMenu: "adname2", //行政
      theme: "dark", //主题效果
      activeMenu: "1", //选中的项
      menus: [],
      adminmenu: [],
      MenuList: [], //菜单项
      accoutype: "", //账号类型
      modelval: "",
      loading: false,
      options: [],
      listmember: [], //所有客户，搜索用
    };
  },
  created() {
    const logintype = sessionStorage.getItem("logintype");
    this.accoutype = logintype;
    if (logintype == "mentee") {
      this.theme = "light";
    }
    // alert(logintype)
    if (logintype == "sales") {
      this.MenuList = salesmenu;
    } else if (logintype == "saleshead") {
      this.MenuList = headMenus;
    } else if (logintype == "salesvp") {
      this.MenuList = salesvp;
      // }else if(logintype=='customizedmentor'||logintype=='specialist'||logintype=='usmentor'){
    } else if (logintype == "customizedmentor" || logintype == "specialist") {
      this.MenuList = menteemenu;
    } else if (logintype == "intern") {
      this.MenuList = mentormenu;
    } else if (logintype == "admin") {
      this.MenuList = Adminmenu;
    } else if (logintype == "finance") {
      this.MenuList = partmenu;
    } else if (
      logintype == "opmentor" ||
      logintype == "ophead" ||
      logintype == "plmentor" ||
      logintype == "plhead"
    ) {
      this.adminmenu = administrastatic;
      // console.log(administrastatic)
    } else if (logintype == "mentee") {
      this.MenuList = studentmenu;
    } else if (logintype == "insightmenus") {
      this.MenuList = insightmenus;
    } else if (logintype == "schadmin") {
      this.MenuList = schadmin;
    }
    if (
      logintype == "sales" ||
      logintype == "saleshead" ||
      logintype == "salesvp"
    ) {
      this.menus = this.MenuList.concat(ActiveMenus);
    } else {
      this.menus = this.MenuList;
    }
  },
  mounted() {
    this.getstudentlist();
    //获取活动菜单列表
    this.$bus.$on("menteelist", (res) => {
      this.menus = res;
    });
    this.$bus.$on("changetab", (res) => {
      this.checkMenu = "adname1";
    });
    this.$bus.$on("upltMenu", (res) => {
      this.getstudentlist();
    });
    // 监听一级菜单事件
    this.$bus.$on("changeLeft", (res) => {
      console.log("主菜单" + res);
      this.$nextTick(() => {
        this.activeMenu = res;
      });
    });
    //监听子菜单事件
    this.$bus.$on("updateMenu", (res) => {
      // console.log('子菜单'+res);
      this.$nextTick(() => {
        if (res != 0) {
          const ref = this.$refs.asideMenu;
          //先收起（取消选择）
          ref.forEach((v) => {
            v.$parent.opened = false;
            v.active = false;
          });
          //再选择
          setTimeout(() => {
            ref.forEach((v) => {
              if (v.name == res) {
                v.active = true;
              }
              // MenuItem 处于选中状态就展开 Submenu
              if (v.active === true) {
                v.$parent.opened = true;
              }
            });
          }, 50);
        }
      });
    });
  },
  methods: {
    changeSelect(data) {
      // console.log(data);
      sessionStorage.setItem("mentame", data.chinesename);
      sessionStorage.setItem("mentusname", data.username);
      sessionStorage.setItem("menteeId", data.id);
      this.$bus.$emit("updateMenu", data.username);
      this.$bus.$emit("cName", data.chinesename);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          const list = this.listmember.map((item) => {
            return {
              value: item.username,
              label: item.chinesename,
              id: item.id,
            };
          });
          this.options = list.filter(
            (item) => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
          if (this.options.length) {
            this.changeSelect({
              username: this.options[0].value,
              chinesename: this.options[0].label,
              id: this.options[0].id,
            });
          }
        }, 200);
      } else {
        this.options = [];
      }
    },
    clearNull() {
      this.modelval = "";
    },
    getstudentlist() {
      this.$https.getclient({}).then((res) => {
        if (res && res.code == 200) {
          let arr = [];
          res.data.forEach((v) => {
            arr = arr.concat(v.list);
          });
          this.listmember = arr;
        } else {
          this.$Message.error("获取信息失败！");
        }
      });
    },
    goPublish() {
      this.$router.push({
        path: "/insightmenus/PublishActive",
      });
    },
  },
};
</script>

<style lang="scss">
#LeftMenu {
  box-sizing: border-box;
  width: 100%;
  .selOut {
    width: 185px;
    margin-left: 28px;
    position: relative;
    .ivu-select-selection {
      background-color: transparent !important;
    }
    .ivu-select-input {
      color: #9ea0a5;
    }
    .ivu-select-dropdown {
      z-index: 999;
    }
    .endIcon {
      position: absolute;
      top: 3px;
      right: 2px;
      z-index: 9;
    }
  }
  .menulogo {
    width: 170px;
    display: block;
    margin: 20px 32px;
  }
  .ivu-tabs-nav {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .ivu-tabs-tab {
    color: #6b6c6f;
    padding-left: 32px;
    margin-right: 0;
    padding: 10px 5px;
    flex: 1;
    text-align: center;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #fff;
    border-bottom: 3px solid #1665d8 !important;
  }
  .ivu-tabs-nav .ivu-tabs-tab:hover {
    color: #fff;
  }
  .ivu-tabs-bar {
    border-bottom: none;
  }
  .ivu-tabs-ink-bar {
    display: none;
  }
  .ivu-menu-item {
    padding: 10px 26px;
  }
  .ivu-menu-vertical {
    &:after {
      display: none;
    }
  }
  .ivu-menu-item-active,
  .ivu-menu-item-selected {
    position: relative;
    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background-color: #1665d8;
    }
    &:after {
      display: none;
    }
  }
  .ivu-menu-dark {
    background-color: #252529;
    color: #fff;
    .ivu-menu-submenu-title {
      background-color: #252529;
    }
    .ivu-menu-item {
      background-color: #252529;
    }
    .ivu-menu-item-active,
    .ivu-menu-item-selected {
      background: rgba(22, 101, 216, 0.3) !important;
      color: #fff;
    }
    .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      color: #fff;
      background: rgba(22, 101, 216, 0.3) !important;
    }
  }
  .ivu-menu-light {
    color: #313131;
    .ivu-menu-item-active,
    .ivu-menu-item-selected {
      color: #1665d8;
      background-color: rgba(22, 101, 216, 0.3) !important;
    }
    .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      color: #1665d8;
      background: rgba(22, 101, 216, 0.3);
    }
  }
  .line {
    height: 1px;
    background-color: rgba(188, 188, 188, 0.25);
    margin: 15px 30px;
  }
  .ivu-icon {
    font-size: 25px;
  }
  .icon_pic {
    width: 30px;
    display: inline-block;
    vertical-align: middle;
  }
  .tig {
    border-radius: 50%;
    font-size: 12px;
    background-color: #fff;
    color: #3e3f42;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
  //马丽端
  .insgbox {
    text-align: center;
    margin: 30px 0;
    .ivu-btn {
      background-color: #3e3f42;
      border-color: #3e3f42;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>