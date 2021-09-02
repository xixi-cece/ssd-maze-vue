<template>
    <div id="payLook">
        <Modal
            class="payToast"
            v-model="showModal"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>
                    付款详情<b class="tig">{{splitperiod==1?'一期':splitperiod==2?'二期':splitperiod==3?'三期':''}}</b>
                </span>
                <span class="close">
                    <img src="../images/edit.png" style="margin-right:10px;" @click="editImg" v-if="!isedit">
                    <img src="../images/close.png" @click="closeToast">
                </span>
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{chinesename}}</span>
                </li>
                <li>
                    <h4 class="labTile">总金额</h4>
                    <span class="labCont">{{contractamount}}</span>
                </li>
                <li style="margin-right:0;">
                    <h4 class="labTile">支付进度</h4>
                    <div class="labCont">
                        <span class="progress">
                            <b v-if="splitperiod==1||splitperiod==2||splitperiod==3" :class="paidPeriod==1||paidPeriod==2||paidPeriod==3?'green':'opgreen'"></b>
                            <b v-if="splitperiod==2||splitperiod==3" :class="paidPeriod==2||paidPeriod==3?'green':'opgreen'"></b>
                            <b v-if="splitperiod==3" :class="paidPeriod==3?'green':'opgreen'"></b>
                        </span>
                    </div>
                </li>
            </ul>
            <div v-if="splitperiod==1||splitperiod==2||splitperiod==3">
                <p><Divider orientation="left">第一期</Divider></p>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">应收金额</h4>
                        <span class="labCont">{{period1money}}</span>
                    </li>
                    <li v-if="isedit">
                        <h4 class="labTile">汇款账号</h4>
                        <Input v-model="payaccount1" style="width: 80%;" />
                    </li>
                    <li v-else>
                        <h4 class="labTile">收款账户</h4>
                        <span class="labCont">{{paytype}}</span>
                    </li>                    
                    <li style="margin-right:0;">
                        <h4 class="labTile">收款状态</h4>
                        <span class="labCont">
                            <b :class="['tipstatu',paid1?'greentip':'orangetip']">{{paid1?'已支付':'未支付'}}</b>
                        </span>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">汇款人</h4>
                        <Input v-if="isedit" v-model="payer1" style="width: 80%;" />
                        <span v-else class="labCont">{{payer1}}</span>
                    </li>
                    <li>
                        <h4 class="labTile">汇款时间</h4>
                        <DatePicker type="date" v-if="isedit" v-model="period1time" @on-change="getsend1Time" placeholder="选择时间" style="width: 80%;"></DatePicker>
                        <span class="labCont" v-else>{{period1time}}</span>
                    </li>
                    <li style="margin-right:0;">
                        <h4 class="labTile">财务确认</h4>
                        <span class="labCont">
                            <b :class="['tipstatu',financeConfirm1?'greentip':'orangetip']">{{financeConfirm1?'已确认':'未确认'}}</b>
                        </span>
                    </li>
                </ul>
            </div>
            <div v-if="splitperiod==2||splitperiod==3">
                <p><Divider orientation="left">第二期</Divider></p>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">应收金额</h4>
                        <span class="labCont">{{period2money}}</span>
                    </li>
                    <!-- <li v-if="isedit">
                        <h4 class="labTile">汇款账号</h4>
                        <Input v-model="payaccount2" style="width: 80%;" />
                    </li>
                    <li v-else>
                        <h4 class="labTile">收款账户</h4>
                        <span class="labCont">{{paytype}}</span>
                    </li> -->
                    <li>
                        <h4 class="labTile">收款账户</h4>
                        <span class="labCont">{{paytype}}</span>
                    </li>
                    <li style="margin-right:0;">
                        <h4 class="labTile">收款状态</h4>
                        <span class="labCont">
                            <b :class="['tipstatu',paid2?'greentip':'orangetip']">{{paid2?'已支付':'未支付'}}</b>
                        </span>
                    </li>
                </ul>
                <ul class="labBox">
                    <!-- <li>
                        <h4 class="labTile">汇款人</h4>
                        <Input v-if="isedit" v-model="payer2" style="width: 80%;" />
                        <span v-else class="labCont">{{payer2}}</span>
                    </li>
                    <li>
                        <h4 class="labTile">汇款时间</h4>
                        <DatePicker type="date" v-if="isedit" v-model="period2time" @on-change="getsend2Time" placeholder="选择时间" style="width: 80%;"></DatePicker>
                        <span class="labCont" v-else>{{period2time}}</span>
                    </li> -->
                    <li>
                        <h4 class="labTile">汇款人</h4>
                        <span class="labCont">{{payer2}}</span>
                    </li>
                    <li>
                        <h4 class="labTile">汇款时间</h4>
                        <span class="labCont">{{period2time}}</span>
                    </li>
                    <li style="margin-right:0;">
                        <h4 class="labTile">财务确认</h4>
                        <span class="labCont">
                            <b :class="['tipstatu',financeConfirm2?'greentip':'orangetip']">{{financeConfirm2?'已确认':'未确认'}}</b>
                        </span>
                    </li>
                </ul>
            </div>
            <div v-if="splitperiod==3">
                <p><Divider orientation="left">第三期</Divider></p>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">应收金额</h4>
                        <span class="labCont">{{period3money}}</span>
                    </li>
                    <!-- <li v-if="isedit">
                        <h4 class="labTile">汇款账号</h4>
                        <Input v-model="payaccount3" style="width: 80%;" />
                    </li>
                    <li v-else>
                        <h4 class="labTile">收款账户</h4>
                        <span class="labCont">{{paytype}}</span>
                    </li> -->
                    <li>
                        <h4 class="labTile">收款账户</h4>
                        <span class="labCont">{{paytype}}</span>
                    </li>
                    <li style="margin-right:0;">
                        <h4 class="labTile">收款状态</h4>
                        <span class="labCont">
                            <b :class="['tipstatu',paid3?'greentip':'orangetip']">{{paid3?'已支付':'未支付'}}</b>
                        </span>
                    </li>
                </ul>
                <ul class="labBox">
                    <!-- <li>
                        <h4 class="labTile">汇款人</h4>
                        <Input v-if="isedit" v-model="payer3" style="width: 80%;" />
                        <span class="labCont" v-else>{{payer3}}</span>
                    </li>
                    <li>
                        <h4 class="labTile">汇款时间</h4>
                        <DatePicker type="date" v-if="isedit" v-model="period3time" @on-change="getsend3Time" placeholder="选择时间" style="width: 80%;"></DatePicker>
                        <span class="labCont" v-else>{{period3time}}</span>
                    </li> -->
                    <li>
                        <h4 class="labTile">汇款人</h4>
                        <span class="labCont">{{payer3}}</span>
                    </li>
                    <li>
                        <h4 class="labTile">汇款时间</h4>
                        <span class="labCont">{{period3time}}</span>
                    </li>
                    <li style="margin-right:0;">
                        <h4 class="labTile">财务确认</h4>
                        <span class="labCont">
                            <b :class="['tipstatu',financeConfirm3?'greentip':'orangetip']">{{financeConfirm3?'已确认':'未确认'}}</b>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="btmbtn" v-if="isedit">
                <Button @click="submitInfo">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'payLook',
    props:{
        showModal:{
            type: Boolean,
            default: false
        },
        dataJoson:{
            type: Object,
            default:()=>{}
        }
    },
    data() {
        return {
            selId:'',
            chinesename:'',
            splitperiod:'',//总共几期
            paidPeriod:'',//当前第几期
            contractamount:'',
            currentPeriod:'',
            period1money:'',
            paytype:'',
            payer1:'',
            payer2:'',
            payer3:'',
            period1time:'',
            period2money:'',
            period2time:'',
            period3money:'',
            period3time:'',
            paid1:'',
            financeConfirm1:'',
            paid2:'',
            financeConfirm2:'',
            paid3:'',
            payaccount1:'',
            payaccount2:'',
            financeConfirm3:'',
            isedit:false,
            totaldata:{}
        };
    },
    components: {

    },
    watch: {
        dataJoson:{
            handler(now){
                this.selId = now.uid;
                this.getlist();
            },
            deep:true,
            immediate:true
        }
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
    methods: {
        editImg(){
            this.isedit = true;
        },
        getsend1Time(data){
            this.period1time = data;
        },
        getsend2Time(data){
            this.period2time = data;
        },
        getsend3Time(data){
            this.period3time = data;
        },
        closeToast(){
            this.$emit('getpay',false);
        },
        submitInfo(){
            this.isedit = false;
            const params = [
                {
                    id:this.totaldata.period1?this.totaldata.period1.id:'',
                    payer:this.totaldata.period1?this.payer1:'',
                    paydate:this.totaldata.period1?this.period1time:'',
                    payaccount:this.totaldata.period1?this.payaccount1:'',
                    dueamount:this.totaldata.period1?this.dueamount:''
                },
                {
                    id:this.totaldata.period2?this.totaldata.period2.id:'',
                    payer:this.totaldata.period2?this.payer2:'',
                    paydate:this.totaldata.period2?this.period2time:'',
                    payaccount:this.totaldata.period2?this.payaccount2:'',
                    dueamount:this.totaldata.period2?this.dueamount:''
                },
                {
                    id:this.totaldata.period3?this.totaldata.period3.id:'',
                    payer:this.totaldata.period3?this.payer3:'',
                    paydate:this.totaldata.period3?this.period3time:'',
                    payaccount:this.totaldata.period3?this.payaccount3:'',
                    dueamount:this.totaldata.period1?this.dueamount:''
                }
            ];
            this.$https.submitInfo(params).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getlist();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getlist(){
            this.$https.getcontdetail({
                id:this.selId
            }).then(res=>{
                if(res&&res.code==200){
                    try{
                        this.totaldata = res.data;
                        this.chinesename = res.data.chinesename;
                        this.contractamount = res.data.contractamount
                        this.currentPeriod = res.data.currentPeriod;
                        this.period1money = res.data.period1.dueamount;
                        this.paytype = res.data.paytype;
                        this.splitperiod = res.data.splitperiod;
                        this.paidPeriod = res.data.paidPeriod;
                        this.payer1 = res.data.period1.payer;
                        this.period1time = res.data.period1.paydate;
                        this.paid1 = res.data.period1.paid;
                        this.payaccount1 = res.data.period1.payaccount;
                        this.financeConfirm1 = res.data.period1.financeConfirm;
                        if(res.data.period2){
                            this.payer2 = res.data.period2.payer;
                            this.period2money = res.data.period2.dueamount;
                            this.period2time = res.data.period2.paydate;
                            this.paid2 = res.data.period2.paid;
                            this.financeConfirm2 = res.data.period2.financeConfirm;
                            this.payaccount2 = res.data.period2.payaccount;
                        };
                        if(res.data.period3){
                            this.payer3 = res.data.period3.payer;
                            this.period3money = res.data.period3.dueamount;
                            this.period3time = res.data.period3.paydate;
                            this.paid3 = res.data.period3.paid;
                            this.financeConfirm3 = res.data.period3.financeConfirm;
                            this.payaccount3 = res.data.period3.payaccount;
                        };
                    }catch(e){console.log(e)}
                }else{
                    this.$Message.error('获取列表失败！');
                }
            })
        },
    }
};
</script>

<style lang='scss'>
// 模态框
.payToast{
    .ivu-divider-horizontal.ivu-divider-with-text-left:before{
        display: none;
    }
    .ivu-divider-inner-text{
        padding-left: 0!important;
        color: #1665D8;
        font-size: 14px;
    }
    .tipstatu{
        background-color: #F5F6FA;
        font-size: 12px;
        font-weight: normal;
        padding: 5px 10px;
        border-radius: 4px;
    }
    .btmbtn{
        padding: 20px 0 5px;
        text-align: center;
        .ivu-btn{
            background: #1665D8;
            color: #fff;
            padding: 0 30px;
        }
    }
    .greentip{
        color: #34AA44;
    }
    .orangetip{
        color:#F5BA5A;
    }
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #333;
        font-size: 18px;
        padding: 21px 16px;
        .close{
            float: right;
            margin-top: -4px;
            img{
                cursor: pointer;
                display: inline-block;
                width: 24px;
                height: 24px;
            }
        }
        .tig{
            display: inline-block;
            background-color: #F5F6FA;
            color: #1665D8;
            font-size: 12px;
            font-weight: normal;
            padding: 5px 6px;
            border-radius: 4px;
            vertical-align: middle;
            margin-left: 10px;
        }
    }
    .line{
        height: .5px;
        background-color: #ddd;
        width: 100%;
        margin: 15px 0;
    }
    .labBox{
        display: flex;
        flex-flow: wrap;
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
            .tileWet{
                color: #666;
                font-size: 16px;
            }
            .labCont{
                font-size: 16px;
                margin-top: 5px;
                display: block;
                .suerBtn{
                    vertical-align: middle;
                    float: right;
                }
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
    .tileTig{
        margin-top: 10px;
        font-weight: 400;
        font-size: 14px;
        color: #A3A3A3;
    }
    .suerBack{
        display: block;
        width: 100px;
        margin: 20px auto 0;
        background-color: #1665D8;
        color: #fff;
    }
    .saleBox{
        margin-top: 5px;
    }
    .progress{
        display: block;
        b{
            display: inline-block;
            width: 16px;
            height: 12px;
            margin-right: 5px;
            border-radius: 2px;
        }
        .green{
            background-color: #34AA44;
        }
        .opgreen{
            background-color: #E1F3E3;
        }
    }
}
</style>