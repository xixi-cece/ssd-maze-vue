<template>
    <div id="Login">
        <section class="main">
            <Icon type="ios-arrow-back" class="arrlet" @click="backHome" />
            <img class="logoIcon" src="../images/icon.png">
            <h3 class="modtile">绑定账号</h3>
            <p class="yellowtig">该微信尚未绑定账号，绑定账号后将自动登录</p>
            <div class="loginBox">
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
                <Button type="primary" @click="bindAccout">绑定账号并登录</Button>
            </div>
        </section>
        <Selidentity :showIdent="showIdent" :identitylist='identitylist' @closeIdenty="getIdenty"></Selidentity>
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
import { utility } from '../assets/lib/common';
import Selidentity from '../components/Selidentity';

export default {
    name:'Bind',
    data() {
        return {
            showIdent:false,
            identitylist:[],//身份列表
            errmsg:'',
            username:'',
            password:'',
            code:'',
            state:''
        };
    },
    components: {
        Selidentity
    },
    computed: {

    },
    created() {

    },
    mounted() {
        const code = utility.GetQueryString('code');
        const state = utility.GetQueryString('state');
        this.code = code;
        this.state = state;
        // console.log(code);
        // console.log(state);
        if(code&&state){
            this.getWchatstate();
        };  
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
        bindAccout(){
            if(this.username==''||this.password==''){
                this.$Message.error('请填写完整再操作！')
                return;
            };
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
                        h('div', '页面跳转中...')
                    ])
                }
            });
            this.$https.bindAccout({
                username:this.username,
                password:this.password,
                code:this.code
            }).then(res=>{
                this.$Spin.hide();
                if(res.status=='success'){
                    sessionStorage.setItem('username',res.username);
                    sessionStorage.setItem('chinesename',res.chinesename);
                    sessionStorage.setItem('token',res.token);
                    this.$Spin.hide();
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
                    this.$Spin.hide();
                    // this.errmsg = res.msg;
                    this.$Message.error(res.err_msg);
                }
            }).catch(err=>{
                this.$Spin.hide();
                this.$Message.error('服务器崩溃了！');
            })
        },
        getWchatstate(){
            this.$https.getwechatInfo({
                code:this.code,
                state:this.state
            }).then(res=>{
                // console.log(res);
                if(res&&res.status=='needbind'){
                    this.$Message.success('授权成功，请绑定账号进行登录！');
                    return;
                };
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
                    this.$Message.error(res.msg);   
                };
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
        backHome(){
            this.$router.push({
                path:'/Login'
            })
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
        background-color: #fff;
        border-radius: 5px;
        // box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
        border: 1px solid #EAEDF3;
        .arrlet{
            position: absolute;
            left: 25px;
            top: 62px;
            font-size: 22px;
            cursor: pointer;
        }
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
            padding: 30px 0;
            margin-top: 30px;
        }
        .yellowtig{
            text-align: center;
            background-color: #FACF55;
            color:#fff;
            font-size: 12px;
            padding: 10px 0;
        }
        .loginBox{
            background-color: #fff;
            padding: 20px 30px 50px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
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
    }
}
</style>