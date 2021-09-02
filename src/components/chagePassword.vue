<template>
    <div>
        <Modal
            class="changepassword"
            width="388"
            v-model="showpassword"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <p slot="header" class="tiletip">请设置新密码<span>（请认真填写）</span></p>
            <div class="mainbox">
                <div class="flexbox">
                    <div class="flexitem">
                        <div class="flexlab">请输入邮箱</div>
                        <div class="flexcont">
                            <Input v-model="emailval" autofocus placeholder="请输入邮箱"  @on-blur="ruleInput"/>
                            <p v-if="isemail" class="errorInfo">请输入正确的邮箱</p>
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="flexitem">
                        <div class="flexlab">请输入新密码</div>
                        <div class="flexcont">
                            <Input v-model="newpassword" placeholder="请输入新密码"  />
                            <p v-if="newpassword!=aginpassword||showpsw" class="errorInfo">两次输入的密码不一致，请核对后重新输入</p>
                        </div>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="flexitem">
                        <div class="flexlab">再次输入密码</div>
                        <div class="flexcont">
                            <Input v-model="aginpassword" placeholder="再次输入密码"  />
                            <p v-if="newpassword!=aginpassword||showpsw" class="errorInfo">两次输入的密码不一致，请核对后重新输入</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btmbox">
                <Button type="primary" @click="sureModal">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
        showpassword:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            emailval:'',
            newpassword:'',
            aginpassword:'',
            isemail:false,
            showpsw:false
        };
    },
    methods: {
        sureModal(){
            if(this.isemail){
                return;
            };
            if(!this.newpassword||!this.aginpassword){
                this.showpsw = true;
                return;
            }else{
                this.showpsw = false;
            };
            this.$https.changeEmail({
                email:this.emailval
            }).then(res=>{
                if(res&&res.code==200){
                    this.changePsw();
                }else{
                    this.$Message.error(res.msg);
                };
            })
            this.$emit('closepassword',true);
        },
        changePsw(){
            this.$https.resetPassword({
                newPwd1:this.newpassword,
                newPwd2:this.aginpassword
            }).then(res=>{
                if(res&&res.code==200){
                    sessionStorage.setItem('pw',false);
                    this.$Message.success('修改成功，下次请使用新密码登录！');
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        ruleInput(){
            const val = this.emailval;
            if(/^[0-9a-zA-Z_\.-]+[@][0-9a-zA-Z_\.-]+([\.][a-zA-Z]+){1,2}$/.test(val)){
                this.isemail = false;
            }else{
                this.isemail = true;
            };
        }
    }
};
</script>

<style lang='scss'>
.changepassword{
    .ivu-modal-header{
        padding: 20px;
        .tiletip{
            font-size: 18px;
            >span{
                color: #f00;
                font-size: 12px;
            }
        }
    }
    .ivu-modal-body{
        padding: 10px 20px 20px;
        .errorInfo{
            font-size: 12px;
            color: #f00;
        }
        .mainbox{
            .flexbox{
                display: flex;
                margin-bottom: 10px;
                .flexitem{
                    flex: 1;
                    .flexlab{
                        line-height: 35px;
                        height: 35px;
                    }
                }
            }
        }
        .btmbox{
            text-align: center;
            .ivu-btn{
                width: 100%;
                margin: 20px 0 10px;
            }
        }
    }
}
</style>