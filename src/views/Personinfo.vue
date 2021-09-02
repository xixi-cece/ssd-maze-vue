<template>
    <div id="Personinfo">
        <div class="topTab">
            <h3 class="title">
                <span>基本信息</span>
                <img class="editIcon" src="../images/edit.png" @click.stop="showToast(1)">
            </h3>
            <div class="wrap_line">
                <div class="row_line">
                    <span class="tigname">姓名</span>
                    <span class="contval">{{infoData.chinesename}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">职位</span>
                    <span class="contval">{{infoData.identityZN}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">入职时间</span>
                    <span class="contval">{{infoData.entryTime}}</span>
                </div>
            </div>
            <div class="wrap_line">
                <div class="row_line">
                    <span class="tigname">微信</span>
                    <span class="contval">{{infoData.wxid}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">电话</span>
                    <span class="contval">{{infoData.phone}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">邮箱</span>
                    <span class="contval">{{infoData.email}}</span>
                </div>
            </div>
            <div class="wrap_line">
                <div class="row_line">
                    <span class="tigname">本科学校</span>
                    <span class="contval">{{infoData.undergraduateSchool}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">研究生学校</span>
                    <span class="contval">{{infoData.graduateSchool}}</span>
                </div>
                <div class="row_line"></div>
            </div>
        </div>
        <div class="topTab">
            <h3 class="title">
                <span>工资信息</span>
                <img class="editIcon" src="../images/edit.png" @click.stop="showToast(2)">
            </h3>
            <div class="rowBox">
                <div class="wrap_line" style="padding-left:0;">
                    <div class="row_line">
                        <span class="tigname">时薪($)</span>
                        <span class="contval">{{infoData.hourlyWage}}</span>
                    </div>
                    <div class="row_line">
                        <span class="tigname">收款方式</span>
                        <span class="contval">{{infoData.paymentTypeZN}}</span>
                    </div>
                    <div class="row_line">
                        <span class="tigname">收款账号</span>
                        <span class="contval">{{infoData.paymentAccount}}</span>
                    </div>
                    <!-- <div class="edbox">
                        <Button class="editbtn" @click.stop="editTost=true">编辑</Button>
                    </div> -->
                </div>
            </div>
        </div>
        <Modal
            class="perModal"
            v-model="editTost"
            :closable="false"
            :mask-closable='false'
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>修改{{infoType==1?'基本':'薪资'}}信息</span>
                    <img class="close" src="../images/close.png" @click="editTost=false">
                </div>
            </template>
            <div class="row_box" v-if='infoType==1'>
                <div class="col_line">
                    <span class="tigname">微信</span>
                    <Input v-model="wxid" placeholder="微信" style="width: 100%;" />
                </div>
                <div class="col_line">
                    <span class="tigname">电话</span>
                    <Input v-model="phone" placeholder="电话" style="width: 100%;" />
                </div>
            </div>
            <div class="row_box" v-if='infoType==1'>
                <div class="col_line">
                    <span class="tigname">邮箱</span>
                    <Input v-model="email" placeholder="邮箱" style="width: 100%;" />
                </div>
                <div class="col_line">
                    <span class="tigname">本科学校</span>
                    <Input v-model="undergraduateSchool" placeholder="本科学校" style="width: 100%;" />
                </div>
            </div>
            <div class="row_box" v-if='infoType==1'>
                <div class="col_line">
                    <span class="tigname">研究生学校</span>
                    <Input v-model="graduateSchool" placeholder="研究生学校" style="width: 100%;" />
                </div>
            </div>
            <div class="row_box" v-if='infoType==2'>
                <div class="col_line">
                    <span class="tigname">收款方式</span>
                    <Select v-model="paytypemethod" style="width:100%">
                        <Option v-for="item in paylist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                </div>
                <div class="col_line">
                    <span class="tigname">收款账号</span>
                    <Input v-model="payaccount" placeholder="请输入" style="width: 100%;" />
                </div>
            </div>
            <div class="btnBox">
                <Button class="button" @click="oksure">确定</Button>
                <Button class="button" @click="cancelbtn">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
 
export default {
    name: 'Personinfo',
    props: {

    },
    components: {

    },
    data() {
        return {
            infoType:1,//1.基本2.工资
            editTost:false,
            paytypemethod:'',
            payaccount:'',
            infoData:{},
            wxid:'',
            phone:'',
            email:'',
            undergraduateSchool:'',
            graduateSchool:'',
            identitylist:[],
            paylist:[]
        };
    },
    computed: {

    },
    created() {
        this.getarealist();
        setTimeout(()=>{
            this.getInfo();
        },200);
    },
    mounted() {

    },
    methods: {
        cancelbtn(){
            this.editTost = false;
        },
        showToast(type){
            this.editTost = true;
            this.infoType = type;
        },
        oksure(){
            if(!this.paytypemethod||!this.payaccount){
                this.$Message.error('请填写完整再提交！')
                return;
            };
            this.editTost = false;
            this.$https.changementormoney({
                wxid:this.wxid,
                phone:this.phone,
                email:this.email,
                undergraduateSchool:this.undergraduateSchool,
                graduateSchool:this.graduateSchool,
                paymentType:this.paytypemethod,
                paymentAccount:this.payaccount
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getInfo();
                }else{
                    this.$Message.error('修改失败！');
                }
            })
        },
        getarealist(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.identitylist = res.data.role;
                    this.paylist = res.data.paytype;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getInfo(){
            this.$https.getperInfo({}).then(res=>{
                if(res&&res.code==200){
                    try{
                        res.data.identityZN = utility.filterArr(res.data.identity,this.identitylist);
                        res.data.paymentTypeZN = utility.filterArr(res.data.paymentType,this.paylist);
                    }catch(e){}
                    this.infoData = res.data;
                    this.paytypemethod = res.data.paymentType;
                    this.payaccount = res.data.paymentAccount;
                    this.wxid = res.data.wxid;
                    this.phone = res.data.phone;
                    this.email = res.data.email;
                    this.undergraduateSchool = res.data.undergraduateSchool;
                    this.graduateSchool = res.data.graduateSchool;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        }
    }
};
</script>

<style lang="scss">
#Personinfo{
    .topTab{
        width: 736px;
        border-radius: 4px;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 30px;
        .title{
            position: relative;
            background-color: #fff;
            color:#3e3f42;
            border-bottom: 1px solid #EAEDF3;
            font-size: 18px;
            font-weight: 600;
            padding: 23px 15px;
            .editIcon{
                position: absolute;
                right: 10px;
                cursor: pointer;
                top: 22px;
                width: 28px;
                height: 28px;
            }
        }
        .wrap_line{
            display: flex;
            padding: 0 15px 10px;
            .row_line{
                flex: 1;
                margin-right: 20px;
                &:last-of-type{
                    margin-right: 0;
                }
                .tigname{
                    display: block;
                    color: #9Ea0a5;
                    height: 40px;
                    line-height: 40px;
                    width: 100%;
                }
            }
            .edbox{
                width: 50%;
                .editbtn{
                    float: right;
                    margin-top: 10px;
                    background-color: #346298;
                    color:#fff;
                    font-size: 13px;
                }
            }
        }
        .rowBox{
            padding: 10px 15px;
            .labtig{
                color: #9Ea0a5;
                margin-right: 10px;
            }
            .line{
                height: 1px solid #9Ea0a5;
                width: 90%;
                display: block;
                margin: 0 auto;
            }
            .continfo{

            }
        }
    }
}
.perModal{
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        padding: 21px 16px;
        .tilehead{
            color: #3e3f42;
            font-weight: 600;
            .close{
                float: right;
                cursor: pointer;
                margin-top: -4px;
                width: 24px;
                height: 24px;
            }
        }
    }
    .row_box{
        display: flex;
        .col_line{
            flex: 1;
            margin-right: 20px;
            &:last-of-type{
                margin-right: 0;
            }
            .tigname{
                display: block;
                color: #9Ea0a5;
                height: 40px;
                line-height: 40px;
                width: 100%;
            }
            .time{
                color: #515A6E;
                height: 30px;
                line-height: 30px;
                display: block;
            }
        }
    }
    .titletig{
      color: #9Ea0a5;
      font-weight: normal;
      line-height: 35px;
      height: 35px;
    }
    .iptbox{
      height: 120px;
      textarea{
        height: 100%;
      }
    }
    .btnBox{
        margin-top: 20px;
        display: flex;
        .button{
            flex: 1;
            background-color: #1665D8;
            color: #fff;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>