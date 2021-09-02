<template>
    <div id="Login">
        <section class="main">
            <img class="logoIcon" src="../images/icon.png">
            <h3 class="modtile" v-if='loginId==1'>登录&nbsp;Maze</h3>
            <div class="loginIpt" v-if='loginId==1'>
                <h4 class="labelfirst">
                    <span class="tag">账号</span>
                    <span class="info">{{errmsg}}</span>
                </h4>
                <Input v-model="username" type="text" placeholder="输入账号" />
                <h4 class="labelfirst">
                    <span class="tag">密码</span>
                    <span class="info">
                        <span class="forget" @click="goForget">忘记密码？</span>
                    </span>
                </h4>
                <Input v-model="password" type="password" password placeholder="输入密码"/>
                <!-- <Button type="primary" @click="isBindWx">登录</Button> -->
                <Button type="primary" @click="LoginIn">登录</Button>
                <div class="othType" @click="wechLogin">
                    <img class="weIcon" src="../images/wechat.png">
                    <p>其它登录方式</p>
                </div>
            </div>
            <div class="weCode" v-if='loginId==2'>
                <Icon type="ios-arrow-back" class="arrlet" @click="backHome" />
                <wxlogin
                    :appid="appid"
                    :state="state"
                    :scope="scope" 
                    :redirect_uri="redirecturl"
                    :theme="'black'"
                ></wxlogin>
            </div>
        </section>
        <Selidentity :showIdent="showIdent" :identitylist='identitylist' @closeIdenty="getIdenty"></Selidentity>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import wxlogin from 'vue-wxlogin';
import { utility } from '../assets/lib/common';
import { config } from '../assets/lib/config';
import Selidentity from '../components/Selidentity';

export default {
    data() {
        return {
            showIdent:false,
            identitylist:[],//身份列表
            errmsg:'',
            loginId:1,
            username:'',
            password:'',
            curtstatus:'1',
            appid:'wxba5cd3deb29ab6b9',
            scope:'snsapi_login',
            state:'Stoooges#wechat_redirect',
            redirecturl:config.wx_url+'/Bind'
        };
    },
    components: {
        wxlogin,
        Selidentity
    },
    computed: {

    },
    created() {
        
    },
    mounted() {

    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
        ...mapMutations(['changeLoginstate']),
        getIdenty(data){
            // console.log(data);
            this.showIdent = false;
            if(data){
                this.getLogin(data.id);
            }
        },
        isBindWx(){
            const rename = this.username;
            this.$https.isBindwx({
                username:rename
            }).then(res=>{
                if(res&&res.code==200){
                    this.LoginIn();
                }else{
                    this.$Modal.confirm({
                        title:'温馨提示：',
                        content:'建议绑定微信号，方便小程序操作。',
                        okText:'好的，马上去',
                        onOk:(res)=>{
                            this.loginId = 2;
                        },
                        cancelText:'下次再说吧',
                        onCancel:()=>{
                            this.LoginIn(rename);
                        }
                    })
                };
            }).catch(err=>{
                this.$Message.error('服务器崩溃了！');
            });
        },
        LoginIn(rename){
            this.$Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', '登录中...')
                    ])
                }
            });
            this.$https.Login({
                // username:rename?rename:this.username,
                username:this.username,
                password:this.password
            }).then(res=>{
                this.$Spin.hide();
                if(res&&res.status=='success'){
                    sessionStorage.setItem('username',res.username);
                    sessionStorage.setItem('chinesename',res.chinesename);
                    sessionStorage.setItem('token',res.token);
                    //获取身份列表
                    this.$https.getidentity({}).then(rde=>{
                        if(rde&&rde.code==200){
                            if(rde.data.length==1){
                                this.getLogin(rde.data[0].id);
                            }else{//选择身份
                                this.showIdent = true;
                                this.identitylist = rde.data;
                            }
                        }else{
                            this.$Message.error(rde.msg);
                        };
                    });
                }else{
                    this.errmsg = res.err_msg;
                };
            }).catch(err=>{
                this.$Spin.hide();
                this.$Message.error('服务器崩溃了！');
            })
        },
        getLogin(id){
            this.$https.getLogin({
                id:id
            }).then(res=>{
                if(res&&res.code==200){
                    sessionStorage.setItem('token',res.data.token);
                    sessionStorage.setItem('logintype',res.data.identity);
                    sessionStorage.setItem("area",res.data.area);
                    sessionStorage.setItem("login",true);
                    this.$bus.$emit('uplogintype',res.data.identity);
                    this.$bus.$emit('logIn',true);
                    this.changeLoginstate(true);
                    //控制修改密码弹窗
                    if(utility.md5(this.password)=='0058750E06F7A0F02A25F3D34AB04D6C'){
                        this.$bus.$emit('showpw',true);
                        sessionStorage.setItem('pw',true);
                    };
                    if(res.data.identity=='sales'||res.data.identity=='saleshead'||res.data.identity=='salesvp'){
                        this.$router.push({
                            path: '/sales/Home'
                        });
                    // }else if(res.identity=='customizedmentor'||res.identity=='specialist'||res.identity=='usmentor'){
                    }else if(res.data.identity=='customizedmentor'||res.data.identity=='specialist'){
                        this.$router.push({
                            path:'/individuation/Report'
                        });
                    }else if(res.data.identity=='intern'){
                        this.$router.push({
                            path:'/trainee/Writetime'
                        });
                    }else if(res.data.identity=='admin'){
                        this.$router.push({
                            path:'/admin/user'
                        });
                    }else if(res.data.identity=='finance'){
                        this.$router.push({
                            path:'/partur/partmoney'
                        });
                    }else if(res.data.identity=='opmentor'||res.data.identity=='ophead'||res.data.identity=='plmentor'||res.data.identity=='plhead'){
                        this.$router.push({
                            path:'/administration/Extrareport'
                        });
                    }else if(res.data.identity=='mentee'){
                        this.$router.push({
                            path:'/mentee/Totalinfo'
                        });
                    }else if(res.data.identity=='insightmenus'){
                        this.$router.push({
                            path:'/insightmenus/Insclassactive'
                        });
                    }else if(res.data.identity=='schadmin'){
                        this.$router.push({
                            path:'/schadmin/Addsch'
                        });
                    };
                }else{
                    this.$Message.error(res.msg);
                };
            }).catch(err=>{
                this.$Message.error('服务器崩溃了！');
            })
        },
        wechLogin(){
            this.loginId = 2;
        },
        backHome(){
            this.loginId = 1;
        },
        goForget(){
            this.$router.push({
                path:'/Forgetpassword'
            });
        }
    }
};
</script>

<style lang="scss">
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
#Login{
    .header{
        padding-top: 80px;
        max-width: 360px;
        margin: 0 auto;
        img{
            width: 100%
        }
    }
    .main{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 408px;
        margin: 0 auto;
        background-color: #fff;
        // padding: 30px;
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        .logoIcon{
            position: absolute;
            width: 70px;
            height: 70px;
            left: 50%;
            top: -10%;
            transform: translateX(-50%);
        }
        .modtile{
            text-align: center;
            font-weight: normal;
            font-weight: 600;
            padding: 45px 0 30px;
        }
        .loginIpt{
            background-color: #fff;
            padding: 30px 30px 50px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            margin-bottom: 70px;
            .labelfirst{
                display: flex;
                font-weight: normal;
                font-size: 12px;
                .tag{
                    width: 40px;
                }
                .info{
                    flex: 1;
                    text-align: right;
                    color: #f00;
                    .forget{
                        color:#9EA0A5;
                        cursor: pointer;
                    }
                }
            }
            .othType{
                position: absolute;
                background-color: #fff;
                left: 50%;
                bottom: 5%;
                font-size: 12px;
                color: #9EA0A5;
                cursor: pointer;
                text-align: center;
                transform: translateX(-50%);
                .weIcon{
                    width: 50px;
                    height: 50px;
                }
            }
        }
        .ivu-input{
            outline: 0;
            width: 100%;
            border: 0;
            padding: 15px;
            box-sizing: border-box;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-top: 5px;
            margin-bottom: 10px;
        }
        .ivu-btn-primary{
            outline: 0;
            width: 100%;
            border: 0;
            color: #FFFFFF;
            font-size: 14px;
            cursor: pointer;
            margin-top: 10px;
            background-color: #1665D8;
            border-color: #1665D8;
        }
        .ivu-input-suffix{
            top: 4px;
        }
        .ivu-input:focus{
            box-shadow: none;
        }
        .weCode{
            text-align: center;
            padding-top: 30px;
            .arrlet{
                position: absolute;
                left: 25px;
                top: 35px;
                font-size: 22px;
                cursor: pointer;
            }
        }
    }
}
</style>