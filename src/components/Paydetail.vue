<template>
    <div id="Paydetail" v-if="showPay">
        <div class="htDetail" ref="childMask">
            <h3 slot="header" class="headTile">
                <span>{{currentDate==1?'第一期':currentDate==2?'第二期':currentDate==3?'第三期':''}}付款详情</span>
                <span class="rigtIcon">
                    <img class="closeIcon" src="../images/close.png" @click="closeToast">
                </span>
            </h3>
            <div class="contBox">
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">学员姓名</h4>
                        <span class="labCont">{{menteeName}}</span>
                    </li>
                    <li>
                        <h4 class="labTile tiletip">支付时间</h4>
                        <span class="labCont">{{shouldpaytime}}</span>
                    </li>
                </ul>
                <!-- <p class="line"></p> -->
                <ul class="labBox">
                    <li>
                        <h4 class="labTile tiletip">应付款金额</h4>
                        <span class="labCont">{{shouldpaymoney}}</span>
                    </li>
                    <li>
                        <h4 class="labTile tiletip">收款账户</h4>
                        <span class="labCont">{{shouldpayaccout}}</span>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile tiletip">汇款人</h4>
                        <Input v-model="paymoneypeo" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile tiletip">汇款时间</h4>
                        <!-- <Input v-model="sendmoneytime" style="width: 100%;" /> -->
                        <DatePicker type="date" @on-change="getsendTime" placeholder="选择时间" style="width: 100%;"></DatePicker>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile tiletip">汇款账号信息</h4>
                        <Input v-model="paymoneyaccout" style="width: 100%;" />
                    </li>
                </ul>
                <Button class="suerBtn" @click="sureSend">提交财务确认</Button>
                <!-- <p class="tig">点击空白区域取消</p> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        selId:'',//学员id
        menteeName:{
            type:String,
            default:''
        },
        showPay:{
            type:Boolean,
            default:false
        }
    },
    components: {

    },
    data() {
        return {
            shouldpaytime:'',//应付款时间
            shouldpaymoney:'',//应付款金额
            shouldpayaccout:'',//应付款账户
            sendmoneytime:'',//汇款时间
            paymoneypeo:'',//汇款人
            paymoneyaccout:'',//汇款账号信息,
            currentDate:1,//当前期数
            contractkey:''
        };
    },
    computed: {

    },
    created() {
        
    },
    mounted() {
        if(this.selId){
            this.getlist();
        }
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {
        selId:{
            handler(now,old){
                this.getlist();
            }
        }
    },
    methods: {
        closeToast(e){
            // const dom = this.$refs.childMask;
            // if(dom){
            //     if(!dom.contains(e.target)){
            //         this.$emit('finsh','noend');
            //     }
            // }
            this.$emit('finsh',0);
        },
        getsendTime(data){
            this.sendmoneytime = data;
        },
        getlist(){
            this.$https.getcontdetail({
                id:this.selId
            }).then(res=>{
                if(res&&res.code==200){
                    this.shouldpayaccout = res.data.paytype;
                    this.contractkey = res.data.contractkey;
                    this.currentDate = res.data.period1.currentPeriod;
                    this.shouldpaytime = res.data.period1.duedate;
                    this.shouldpaymoney = res.data.period1.dueamount;

                    // if(res.data.currentPeriod==1){
                    //     this.shouldpaytime = res.data.period1.duedate;
                    //     this.shouldpaymoney = res.data.period1.dueamount;
                    // }else if(res.data.currentPeriod==2){
                    //     this.shouldpaytime = res.data.period2.duedate;
                    //     this.shouldpaymoney = res.data.period2.dueamount;
                    // }else if(res.data.currentPeriod==3){
                    //     this.shouldpaytime = res.data.period3.duedate;
                    //     this.shouldpaymoney = res.data.period3.dueamount;
                    // };
                }else{
                    this.$Message.error('获取列表失败！');
                }
            })
        },
        sureSend(){
            this.$https.submitconfirmpayment({
                id:this.selId,
                payer:this.paymoneypeo,
                paydate:this.sendmoneytime,
                payaccount:this.paymoneyaccout,
                dueamount:this.shouldpaymoney,
                currentPeriod:this.currentDate,
                contractkey:this.contractkey
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.$emit('finsh',1);
                }else{
                    this.$Message.error('操作失败！');
                }
            })
        }
    }
};
</script>

<style lang="scss">
#Paydetail{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 20;
    background-color: rgba(55,55,55,.6);
    .htDetail{
        position: absolute;
        width: 388px;
        box-sizing: border-box;
        top:50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: #fff;
        border-radius: 4px;
        .ivu-modal-header{
            border-radius: 4px 4px 0 0;
            background-color: #fff;
            color: #3E3F42;
        }
        .headTile{
            border-radius: 4px 4px 0 0;
            background-color: #fff;
            color: #3E3F42;
            padding: 10px 20px;
            border-bottom: 1px solid #EEEFF0;
            .rigtIcon{
                position: absolute;
                right: 10px;
                top: 8px;
                .editIcon{
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    margin-right: 10px;
                }
                .closeIcon{
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
            }
        }
        .contBox{
            padding: 20px;
            .fqBox{
                margin-bottom: 140px!important;
            }
            .fqBox_1{
                margin-bottom: 200px!important;
            }
            .endBox{
                background-color: #ddd;
                padding: 16px;
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 148px;
                background-color: #ddd;
                >.sjx{
                    position: absolute;
                    width: 0;
                    top: -14px;
                    left: 25px;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 15px solid #ddd;
                }
            }
            .endBox_1{
                bottom: 210px;
                
            }
            .threeBox{
                padding: 0 16px 16px;
                bottom: 140px;
                >.sjx{
                    display: none;
                }
            }
            .labBox{
                display: flex;
                flex-flow: wrap;
                margin-bottom: 15px;
                >li{
                    flex: 1;
                    box-sizing: border-box;
                    &:first-of-type{
                        margin-right: 30px;
                    }
                    .labTile{
                        font-weight: 400;
                        font-size: 14px;
                        color: #A3A3A3;
                    }
                    .tiletip{
                        font-size: 14px;
                        color:#A3A3A3;
                        margin-bottom: 5px;
                    }
                    .labCont{
                        font-size: 16px;
                        margin-top: 5px;
                        display: block;
                    }
                    .gpBox{
                        margin-top: 5px;
                        .ivu-radio-inner:after{
                            top:2.5px;
                            left: 2.5px;
                        }
                    }
                }
            }
            .line{
                background-color: #eee;
                width: 100%;
                height: 1px;
                margin-bottom: 15px;
            }
            .tileTig{
                margin-top: 5px;
            }
            .saleBox{
                margin-top: 5px;
            }
            .suerBtn{
                width: 112px;
                margin: 0 auto;
                display: block;
                background-color: #1665D8;
                color: #fff;
                border: 1px solid #1665D8;
            }
            .tig{
                position: absolute;
                bottom: -32px;
                left: 50%;
                color: #fff;
                transform: translateX(-50%);
            }
        }
    }
}
</style>