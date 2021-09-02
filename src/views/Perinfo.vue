<template>
    <div id="Perinfo">
        <div class="topTab">
            <h3 class="title">
                <span>基本信息</span>
                <img class="editIcon" src="../images/edit.png" @click.stop="showToast(1)">
            </h3>
            <div class="wrap_line">
                <div class="row_line">
                    <span class="tigname">姓名</span>
                    <span class="contval">{{curtjson.chinesename}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">入职时间</span>
                    <span class="contval">{{curtjson.entryTime}}</span>
                </div>
                <!-- <div class="row_line">
                    <span class="tigname">职位</span>
                    <span class="contval">专项导师</span>
                </div> -->
            </div>
            <div class="wrap_line">
                <div class="row_line">
                    <span class="tigname">微信</span>
                    <span class="contval">{{curtjson.wxid}}</span>
                </div>
                <div class="row_line">
                    <span class="tigname">电话</span>
                    <span class="contval">{{curtjson.phone}}</span>
                </div>
                <!-- <div class="row_line">
                    <span class="tigname">本科学校</span>
                    <span class="contval">浙江大学</span>
                </div>
                <div class="row_line">
                    <span class="tigname">研究生学校</span>
                    <span class="contval">耶鲁大学</span>
                </div> -->
            </div>
            <div class="wrap_line">
                <div class="row_line">
                    <span class="tigname">邮箱</span>
                    <span class="contval">{{curtjson.email}}</span>
                </div>
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
                        <span class="tigname">收款方式</span>
                        <span class="contval">{{moneytype}}</span>
                    </div>
                    <div class="row_line" style="margin-right:0;">
                        <span class="tigname">收款账号</span>
                        <span class="contval">{{curtjson.paymentAccount}}</span>
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
            <div class="row_box" v-if="infoType==1">
                <div class="col_line">
                    <span class="tigname">电话</span>
                    <Input v-model="phone" placeholder="请输入" style="width: 100%;" />
                </div>
                <div class="col_line">
                    <span class="tigname">微信</span>
                    <Input v-model="wxid" placeholder="请输入" style="width: 100%;" />
                </div>
            </div>
            <div class="row_box" v-if="infoType==1">
                <div class="col_line">
                    <span class="tigname">邮箱</span>
                    <Input v-model="email" placeholder="请输入" style="width: 100%;" />
                </div>
            </div>
            <div class="row_box" v-if="infoType==2">
                <div class="col_line">
                    <span class="tigname">收款方式</span>
                    <Select v-model="paytype" style="width:100%">
                        <Option v-for="item in payList" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                </div>
                <div class="col_line">
                    <span class="tigname">收款账号</span>
                    <Input v-model="payaccout" placeholder="请输入" style="width: 100%;" />
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
    name: 'Perinfo',
    props: {

    },
    components: {

    },
    data() {
        return {
            editTost:false,
            infoType:1,//1.基本信息2.工资信息
            chinesename:'',
            wxid:'',
            phone:'',
            email:'',
            paytype:'',
            payaccout:'',
            moneytype:'',
            payList:[],
            curtjson:{},//选中的项
            paytypelist:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getarealist();
        setTimeout(()=>{
            this.getData();
        },200)
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
            if(!this.paytype||!this.payaccout){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            this.editTost = false;
            this.$https.changeintmoney({
                phone:this.phone,
                wxid:this.wxid,
                email:this.email,
                paymentType:this.paytype,
                paymentAccount:this.payaccout
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error('操作失败！');
                }
            })
        },
        getarealist(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.paytypelist = res.data.paytype;
                    this.payList = res.data.paytype;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getData(){
            this.$https.getinerInfo({}).then(res=>{
                if(res&&res.code==200){
                    this.curtjson = res.data;
                    this.payaccout = res.data.paymentAccount;
                    this.chinesename = res.data.chinesename;
                    this.phone = res.data.phone;
                    this.email = res.data.email;
                    this.wxid = res.data.wxid;
                    this.paytype = res.data.paymentType;
                    this.moneytype = utility.filterArr(res.data.paymentType,this.paytypelist);
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        }
    }
};
</script>

<style lang="scss">
#Perinfo{
    .topTab{
        width: 520px;
        border-radius: 4px;
        overflow: hidden;
        background-color: #fff;
        margin-bottom: 20px;
        .title{
            position: relative;
            background-color: #fff;
            color:#3e3f42;
            font-weight: 600;
            border-bottom: 1px solid #EAEDF3;
            font-size: 18px;
            padding: 10px 15px;
            .editIcon{
                position: absolute;
                right: 10px;
                cursor: pointer;
                top: 8px;
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
                width: 0%;
                .editbtn{
                    float: right;
                    margin-top: 20px;
                    background-color: #346298;
                    color:#fff;
                    font-size: 13px;
                }
            }
        }
        .rowBox{
            padding: 10px 15px 10px;
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
            border: none;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>