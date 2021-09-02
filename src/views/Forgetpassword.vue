<template>
    <div id="Forgetpassword">
        <section class="main">
            <Icon type="ios-arrow-back" class="arrlet" @click="backHome" />
            <img class="logoIcon" src="../images/icon.png">
            <h3 class="modtile">重置密码</h3>
            <div class="loginIpt">
                <h4 class="labelfirst">
                    <span class="tag">账号</span>
                    <span class="info" v-if="showzh">请输入账号</span>
                </h4>
                <Input v-model="username" type="text" placeholder="请输入要重置密码的账号" />
                <h4 class="labelfirst">
                    <span class="tag">账号验证邮箱</span>
                    <span class="info" v-if="showemerr">邮箱不正确</span>
                </h4>
                <Input v-model="email" type="text" placeholder="输入邮箱" />
                <h4 class="labelfirst">
                    <span class="tag">邮件验证码</span>
                    <span class="info" v-if="showyzm">请输入验证码</span>
                </h4>
                <div class="yzmBtn">
                    <Input v-model="yamcode" type="text" placeholder="输入验证码">
                        <!-- <Icon v-show="isSend" type="ios-checkmark" slot="suffix" /> -->
                        <span slot="suffix" class="timespan" v-show="isSend">{{timeEnd}}</span>
                    </Input>
                    <Button class="codebtn" @click="sendCode" :disabled="isSend">{{codeCN}}</Button>
                </div>
                <h4 class="labelfirst">
                    <span class="tag">新密码</span>
                </h4>
                <Input v-model="newpassword" type="text" placeholder="请输入新密码">
                    <Icon :type="newpassword?'ios-checkmark':'ios-close'" slot="suffix" />
                </Input>
                <h4 class="labelfirst">
                    <span class="tag">确认新密码</span>
                    <span class="info" v-if="newpassword!=againpassword">{{errpassword}}</span>
                </h4>
                <Input v-model="againpassword" type="text" placeholder="再次输入新密码">
                    <Icon :type="(newpassword==againpassword)&&newpassword?'ios-checkmark':'ios-close'" slot="suffix" />
                </Input>
                <Button type="primary" @click="sureResize">确认重置</Button>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Forgetpassword',
    components: {

    },
    data() {
        return {
            showemerr:false,
            errpassword:'两次输入的密码不一致',
            email:'',
            showyzm:false,
            yamcode:'',
            isSend:false,
            showzh:false,
            username:'',
            newpassword:'',
            againpassword:'',
            codeCN: '发送验证码',
            timer:null,
            timeEnd:60
        };
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
        backHome(){
            this.$router.push({
                path:'/Login'
            })
        },
        isNull(){
            const username = this.username;
            const newpassword = this.newpassword;
            const againpassword = this.againpassword;
            const yamcode = this.yamcode;
            const email = this.email;
            if(/^[0-9a-zA-Z_\.-]+[@][0-9a-zA-Z_\.-]+([\.][a-zA-Z]+){1,2}$/.test(email)){
                this.showemerr = false;
            }else{
                this.showemerr = true;
                return false;
            };
            if(!yamcode){
                this.showyzm = true;
                return false;
            }else{
                this.showyzm = false;
            };
            if(!username){
                this.showzh = true;
                return false;
            }else{
                this.showzh = false;
            };
            if(!newpassword||!againpassword){
                return false;
            };
            return true;
        },
        sureResize(){
            const flag = this.isNull();
            if(!flag){
                return;
            };
            this.$https.resetPsw({
                newpsd1:this.newpassword,
                newpsd2:this.againpassword,
                code:this.yamcode,
                username:this.username,
                email:this.email
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        sendCode(){
            if(!this.username){
                this.showzh = true;
                return;
            }else{
                this.showzh = false;
            };
            if(!this.email){
                this.showemerr = true;
                return;
            }else{
                this.showemerr = false;
            };
            this.isSend = true;
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                if(this.timeEnd==1){
                    clearInterval(this.timer);
                    this.timeEnd = 60;
                    this.isSend = false;
                    this.codeCN = '重新发送';
                }else{
                    this.timeEnd--;
                };
            },1000)
            this.$https.checkEmail({
                email:this.email,
                username:this.username
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('发送成功！');
                }else{
                    this.$Message.error(res.msg);
                };
            });
        }
    }
};
</script>

<style lang="scss">
#Forgetpassword{
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
            padding: 35px 0 30px;
            background-color: #FBFBFD;
        }
        .arrlet{
            position: absolute;
            left: 25px;
            top: 40px;
            font-size: 22px;
            cursor: pointer;
        }
        .loginIpt{
            background-color: #fff;
            padding: 30px 30px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            .labelfirst{
                display: flex;
                font-weight: normal;
                font-size: 12px;
                .tag{
                    width: 75px;
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
            .yzmBtn{
                display: flex;
                .codebtn{
                    width: 125px;
                    margin-left: 10px;
                    font-size: 14px;
                    vertical-align: middle;
                    margin-top: 5px;
                    background-color: #3E3F42;
                    box-shadow: none;
                    outline: none;
                    color: #fff;
                    &:active{
                        box-shadow: none;
                        outline: none;
                    }
                    &:hover{
                        box-shadow: none;
                        outline: none;
                        border-color: #fff;
                    }
                }
                input{
                    flex: 1;
                    vertical-align: middle;
                }
                .timespan{
                    color: #999;
                    display: inline-block;
                    line-height: normal;
                    margin-top: 6px;
                }
            }
            .ivu-input-suffix{
                top: 5px;
            }
            .ivu-input-suffix i{
                font-size: 30px;
            }
            .ivu-icon-ios-checkmark{
                color: #34AA44;
            }
            .ivu-icon-ios-close{
                color: #f00;
            }
            .othType{
                position: absolute;
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
    }
}
</style>