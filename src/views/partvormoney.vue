<template>
    <div id="partvormoney">
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <Tabs :value="activeTab" @on-click='getTab'>
            <!-- <TabPane v-for="(item,j) in monthlist" :key="j" :label="tabsTabel(item)" :name="item.startDate" :disabled="item.isgray?true:false"> -->
            <TabPane v-for="(item,j) in monthlist" :key="j" :label="item.showData" :name="item.showData" :disabled="item.isgray?true:false">
                <div class="curmoney">
                    <Input v-model="serMentor" placeholder="搜索实习生" icon="ios-search" class="serIpt" clearable @on-change="serchData"/>
                    <!--<span style="margin-right:20px;">当月总工资($)：<span class="blue">{{totalObj.monthlyTotalWagesUSD}}</span></span>-->
                    <span>当月总工资(￥)：<span class="blue">{{totalObj.monthlyTotalWagesCNY}}</span></span>
                    <!-- <Button class="etbtn" v-if="!totalObj.exchangeRate" @click="addRate">填写汇率</Button>
                    <Input v-else class="iptval" v-model="totalObj.exchangeRate" @on-blur="blurRate(totalObj.exchangeRate)" /> -->
                    <Button class="allbtn" @click="sendAll(totalObj)">一键已发</Button>
                </div>
                <div class="tableBox">
                    <Table :columns="columns" :data="datalist" @on-filter-change="filterData">
                        <template slot-scope="{row}" slot="chinesename">
                            <span style="color:#1665D8;cursor:pointer;" @click="lookMentor(row)">{{row.chinesename}}</span>
                        </template>
                        <template slot-scope="{row}" slot="paid">
                            <Icon v-if="row.paid" class="contstau blue" @click="changePaid(row)" custom="iconfont iconyifafang" />
                            <Icon v-else class="contstau" @click="changePaid(row)" custom="iconfont iconweifafang" />
                        </template>
                    </Table>
                </div>
                <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
            </TabPane>
        </Tabs>
        <!-- 弹窗 -->
        <Modal
            v-model="showRate"
            title="请输入汇率"
            width="388"
            @on-ok="ok(1)"
            @on-cancel="ok(0)">
            <div style="margin:30px 0;">
                <Input class="iptval" placeholder="请输入汇率" v-model="rateVal"/>
            </div>
        </Modal>
        <!-- 弹窗 -->
        <Modal
            v-model="showModal"
            class="adduserinfo"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
            width="388"
        >
            <h3 slot="header" class="headTile">
                <span>实习生工资明细</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="showModal=false">
                </span>
            </h3>
            <div>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">姓名</h4>
                        <div class="contval">{{selMentor.chinesename}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">薪资周期</h4>
                        <div class="contval">{{selMentor.date}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">当月工资(￥)</h4>
                        <div class="contval">{{selMentor.monthlyWageCNY}}</div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile" style="margin:30px 0 20px;">工作详情</h4>
                        <div class="workdetail">
                            <div v-for="(item,i) in selMentor.list" :key="i" class="detailBox">
                                <span class="tipspan">{{item.createDate}}</span>
                                <span class="midcont ell" :title="item.workContent">{{item.workContent}}</span>
                                <span class="moneyspan ell">￥{{item.wageCNY}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Modal>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';

export default {
    name: 'partvormoney',
    components: {

    },
    data() {
        return {
            checkyear:new Date().getFullYear(),
            yearList:[],//年份列表
            showRate:false,
            showModal:false,
            selMentor:{},//选择的项
            totalObj:{},
            curtRateobj:{},
            rateVal:'',
            activeTab:'',
            serMentor:'',
            columns:[
                {
                    title: '实习生姓名',
                    slot: 'chinesename',
                    minWidth:100,
                    tooltip:true,
                    align:'left'
                },
                {
                    title: '时薪(￥)',
                    key: 'hourlyWage',
                    align:'left',
                    tooltip:true,
                    minWidth:100
                },
                {
                    title: '当月工时',
                    key: 'monthlyWorkHours',
                    align:'left',
                    tooltip:true,
                    minWidth:100,
                    sortable: true
                },
                // {
                //     title: '效率系数',
                //     key: 'efficiency',
                //     align:'left',
                //     tooltip:true,
                //     minWidth:100
                // },
                // {
                //     title: '当月工资($)',
                //     key: 'monthlyWageUSD',
                //     align:'left',
                //     tooltip:true,
                //     minWidth:120
                // },
                {
                    title: '当月工资(￥)',
                    key: 'monthlyWageCNY',
                    align:'left',
                    tooltip:true,
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '支付方式',
                    key: 'paymentTypeCN',
                    minWidth:120,
                    align:'left',
                    tooltip:true,
                    filters: [
                        {
                            value:'QuickPay',
                            label:'QuickPay'
                        },
                        {
                            value:'Paypal',
                            label:'Paypal'
                        },
                        {
                            value:'bandCard',
                            label:'银行卡'
                        },
                        {
                            value:'zfb',
                            label:'支付宝'
                        },
                        {
                            value:'wx',
                            label:'微信'
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        return value == row.paymentType;
                    }
                },
                {
                    title: '目标账号',
                    key: 'paymentAccount',
                    minWidth:120,
                    tooltip:true,
                    align:'center'
                },
                {
                    title: '是否发放',
                    slot: 'paid',
                    align:'left',
                    minWidth:120,
                    filters: [
                        {
                            value:1,
                            label:'已发'
                        },
                        {
                            value:0,
                            label:'未发'
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        return value == row.paid;
                    }
                }
            ],
            monthlist:[],
            currentpage:1,
            pageSize:10,
            totalpage:0,
            datalist:[],
            paymentType:'',
            paid:'',
            // tabsTabel(data){
            //     return (h)=>{
            //         return h('div', {
            //             style:{
            //                 textAlign:'center'
            //             }
            //         },[
            //             h('div',{
            //                 style:{
            //                     display:'flex'
            //                 },
            //             },[
            //                 h('div',{
            //                     style:{
            //                         flex:1
            //                     }
            //                 },[
            //                     h('div',{},new Date(data.startDate).getFullYear()),
            //                     h('div',{},(new Date(data.startDate).getMonth()+1)+'.'+(new Date(data.startDate).getDate()))
            //                 ]),
            //                 h('span',{
            //                     style:{
            //                         marginTop:'20px',
            //                         marginLeft:'10px',
            //                         marginRight:'10px'
            //                     }
            //                 },'-'),
            //                 h('div',{
            //                     style:{
            //                         flex:1
            //                     }
            //                 },[
            //                     h('div',{},new Date(data.endDate).getFullYear()),
            //                     h('div',{},(new Date(data.endDate).getMonth()+1)+'.'+(new Date(data.endDate).getDate()))
            //                 ])
            //             ])
            //         ]);
            //     }
            // },
            paylist:[]
        };
    },
    computed: {

    },
    created() {
        const year = new Date().getFullYear();
        const arr = [];
        for(var i=year;i>=year-10;i--){
            arr.push({
                value:i
            });
        };
        this.yearList = arr;
    },
    mounted() {
        this.getList();
        // setTimeout(()=>{
        //     this.getMonth();
        // },500)
        this.getYear();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
        changeYear(data){
            this.getYear(data);
        },
        getYear(year){
            const nowyear = new Date().getFullYear();
            let arr = [];
            if(year){
                arr = utility.createYear(year);
            }else{
                arr = utility.createYear();
            };
            arr.forEach(v=>{
                if(!year){
                    v.isgray = new Date(v.showData).getMonth()>new Date().getMonth()?true:false;
                }else{
                    if(nowyear<=year){
                        v.isgray = new Date(v.showData).getMonth()>new Date().getMonth()?true:false;
                    }else{
                        v.isgray = false;
                    };
                };
                if(v.isCurrentMonth){
                    this.activeTab = v.showData;
                    this.curtRateobj = v;
                    this.getData();
                };
            });
            this.monthlist = arr;
        },
        filterData(data){
            if(data.key&&data.key=='paymentTypeCN'){
                this.paymentType = data._filterChecked.length?data._filterChecked[0]:'';
            }else if(data.slot&&data.slot=='paid'){
                this.paid = data._filterChecked.length?data._filterChecked[0]:'';
            };
            this.serchData();
        },
        serchData(){
            this.currentpage = 1;
            this.pageSize = 10;
            this.getData();
        },
        getcurtpage(data){
            this.currentpage = data;
            this.getData();
        },
        getshowpage(data){
            this.pageSize = data;
            if(this.currentpage!=1){
                this.currentpage = 1;
            }else{
                this.getData();
            };
        },
        // getMonth(){
        //     this.$https.getMonth({
        //         year:new Date().getFullYear()
        //     }).then(res=>{
        //         if(res&&res.code==200){
        //             res.data.forEach(v=>{
        //                 v.isgray = new Date(v.showData).getMonth()>new Date().getMonth()?true:false;
        //                 if(v.isCurrentMonth){
        //                     this.activeTab = v.showData;
        //                     this.curtRateobj = v;
        //                     this.getData();
        //                 };
        //             });
        //             this.monthlist = res.data;
        //         }else{
        //             this.$Message.error(res.msg);
        //         }
        //     })
        // },
        getData(){
            this.$https.getintermoney({
                year:this.curtRateobj.year,
                month:this.curtRateobj.month,
                period:this.curtRateobj.period,
                pageSize:this.pageSize,
                page:this.currentpage,
                keyword:this.serMentor,
                paid:this.paid,
                paymentType:this.paymentType
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalObj = res.data;
                    res.data.list.forEach(v=>{
                        const mintime = v.monthlyWorkHours;
                        v.monthlyWorkHours = mintime%60>0?(Math.floor(mintime/60)+'小时'+mintime%60+'分钟'):Math.floor(mintime/60)+'小时';
                        v.paymentTypeCN = utility.filterArr(v.paymentType,this.paylist);
                        if(!v.monthlyWageCNY){
                            v.monthlyWageCNY = '-';
                        };
                    });
                    this.totalpage = res.data.count;
                    this.datalist = res.data.list;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        lookMentor(data){
            this.showModal = true;
            this.$https.getfancedata({
                userId:data.userId,
                year:data.year,
                month:data.month
            }).then(res=>{
                if(res&&res.code==200){
                    // res.data.identityCN = utility.filterArr(res.data.identity,this.identitylist);
                    // res.data.paymentTypeCN = utility.filterArr(res.data.paymentType,this.paylist);
                    res.data.list.forEach(v=>{
                        v.createDate = utility.framateDate(v.createDate)
                    });
                    this.selMentor = res.data;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.paylist = res.data.paytype;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getTab(val){
            this.activeTab = val;
            const arr = this.monthlist;
            arr.forEach(v=>{
                if(v.showData==val){
                    this.curtRateobj = v;
                };
            });
            this.getData();
        },
        changePaid(data){
            this.$https.changeIntpaid({
                paid:data.paid?0:1,
                userId:data.userId,
                month:data.month,
                year:data.year
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('修改成功！');
                    this.getData(this.activeTab)
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        sendAll(data){
            this.$https.changeIntpaid({
                paid:1,
                year:data.year,
                month:data.month
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('修改成功！');
                    this.getData(this.activeTab);
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        addRate(data){
            this.showRate = true;
        },
        blurRate(data){
            this.$https.setRotate({
                exchangeRate:Number(data),
                year:this.curtRateobj.year,
                period:this.curtRateobj.period
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData(this.activeTab);
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        ok(type){
            console.log(type);
            if(type==1){
                if(this.rateVal){
                    this.$https.setRotate({
                        exchangeRate:Number(this.rateVal),
                        year:this.curtRateobj.year,
                        period:this.curtRateobj.period
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.rateVal = '';
                            this.getData(this.activeTab);
                        }else{
                            this.$Message.error(res.msg);
                        };
                    });
                }
            }
        }
    }
};
</script>

<style lang="scss">
#partvormoney{
    .selYear{
        position: fixed;
        top: 20px;
        left: 390px;
        z-index: 99;
        .yearbox{
            margin-left: 10px;
            width: 100px;
        }
    }
    .ivu-tabs-bar{
        // margin-bottom: 0;
        // background-color: #fff;
        border: none;
    }
    .ivu-tabs-nav-scrollable{
        padding: 0 50px;
    }
    .ivu-tabs-nav-prev,.ivu-tabs-nav-next{
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        padding: 15px 0;
    }
    .ivu-tabs-ink-bar{
        display: none;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
        background-color: #fff;
        color: #3E3F42;
        border-radius: 4px;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active{
        color: #fff;
        background-color: #1665D8;
    }
    .ivu-tabs-nav .ivu-tabs-tab-disabled{
        background-color: #ddd;
        color: #9EA0A4;
    }
    .nulldata{
        text-align: center;
    }
    .ivu-table th{
        background-color: #fff;
        font-weight: 400;
        color: #B0B0B0;
    }
    .ivu-table td{
        font-size: 16px;
    }
    .ivu-collapse{
        background-color: transparent;
        border: 0;
    }
    .ivu-collapse-item{
        margin-bottom: 20px;
        background-color: #2F2F30;
        overflow: hidden;
        border-radius: 2px;
        .ivu-icon-ios-arrow-forward{
            float: right;
            margin-top: 12px;
            color: #fff;
        }
        .ivu-collapse-content-box{
            padding: 0;
        }
        .ivu-collapse-content{
            padding: 0;
        }
    }
    .btm_page{
        text-align: center;
        padding: 15px 0;
    }
    .curmoney{
        position: relative;
        background-color: #fff;
        padding: 15px 30px;
        border-bottom: 1px solid #E8EAEC;
        color:#3E3F42;
        text-align: center;
        .serIpt{
            float: left;
            width:150px;
        }
        >span{
            font-size: 18px;
            font-weight: 600;
        }
        .allbtn{
            position: absolute;
            top: 10px;
            right: 30px;
        }
        .etbtn{
            position: absolute;
            top: 10px;
            right: 130px;
        }
        .iptval{
            position: absolute;
            top: 10px;
            right: 130px;
            width: 88px;
            .ivu-input{
                background-color: #ddd;
                &:focus{
                    background-color: #fff;
                }
            }
        }
    }
    .contstau{
        font-size: 24px;
        cursor: pointer;
    }
    .idedBox{
        border: 1px solid #BCBCBC;
        border-radius: 4px;
        text-align: center;
        padding: 4px 10px;
    }
    .purple{
        color:#6758F3;
    }
    .blue{
        color: #1665D8;
    }
    .green{
        color: #34AA44;
    }
    .orange{
        color: #F6AB2F;
    }
    .new{
        color: #99CB00;
    }
    .mgree{
        color: #1BBBBB;
    }
    .red{
        color: #E6492D;
    }
    .pink{
        color: #D94C7B;
    }
}
// 模态框
.adduserinfo{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #3E3F42;
        font-size: 18px;
        padding: 21px 16px;
    }
    .idtybox{
        border: 1px solid #BCBCBC;
        padding: 4px 5px;
        border-radius: 3px;
        font-weight: normal;
        text-align: center;
        margin-left: 20px;
        font-size: 13px;
    }
    .iconBox{
        float: right;
        .editicon{
            vertical-align: middle;
            margin-top: -4px;
            width: 24px;
            margin-right: 15px;
            cursor: pointer;
        }
        .close{
            float: right;
            cursor: pointer;
            margin-top: -4px;
            width: 24px;
            height: 24px;
        }
    }
    .labBox{
        display: flex;
        flex-flow: wrap;
        >li{
            flex: 1;
            box-sizing: border-box;
            .labTile{
                font-weight: 400;
                font-size: 14px;
                color: #A3A3A3;
                margin: 5px 0;
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
    .tileTig{
        margin-top: 5px;
        font-weight: 400;
        font-size: 14px;
        color: #A3A3A3;
    }
    .oneline{
        display: flex;
        padding-top: 10px;
        .squar{
            flex: 1;
            color: #333;
        }
        .ivu-radio-group{
            display: flex;
            .ivu-radio-wrapper{
                flex: 1;
                text-align: left;
            }
        }
    }
    .saleBox{
        margin-top: 5px;
    }
    .btnBox{
        text-align: center;
        .suerBtn{
            display: inline-block;
            width: 100px;
            margin: 20px 20px 0;
            background-color: #1665D8;
            color: #fff;
            border: 1px solid #1665D8;
        }
        .garybtn{
            background-color: #6B6C6F;
            border-color: #6B6C6F;
        }
    }
    .contval{
        height: 32px;
        line-height: 32px;
    }
    .workdetail{
        min-height: 50px;
        max-height: 150px;
        overflow-y: auto;
        .detailBox{
            height: 32px;
            line-height: 32px;
            width: 100%;
            >span{
                display: inline-block;
                vertical-align: middle;
                text-align: left;
            }
            .tipspan{
                width: 100px;
            }
            .midcont{
                width: 180px;
            }
            .moneyspan{
                width: 50px;
            }
        }
    }
    .tig{
        position: absolute;
        bottom: -32px;
        left: 50%;
        color: #fff;
        transform: translateX(-50%);
    }
    .tip{
        color:#1665D8;
    }
    .footBox{
        display: flex;
        text-align: center;
        button{
            flex: 1;
            color: #fff;
            margin-top: 15px;
            &:first-of-type{
                margin-right: 15px;
                background-color: #1665D8;
            }
            &:last-of-type{
                background-color: #6B6C6F;
            }
        }
    }
    .ftBtn{
        text-align: center;
        .bluebtn{
            flex: none;
            display: inline-block;
            background-color: #1665D8!important;
            color: #fff;
            width: 100px;
        }
    }
}
</style>