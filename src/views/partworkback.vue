<template>
    <div id="partworkback">
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <!-- <div class="nulldata" v-if="!datalist.length">暂无数据</div> -->
        <Tabs :value="activeTab">
            <!-- <TabPane v-for="(item,j) in datalist" :key="j" :label="item.date" :name="item.date" :disabled="item.isgray?true:false"> -->
            <TabPane v-for="(item,j) in monthlist" :key="j" :label="item.showData" :name="item.showData" :disabled="item.isgray?true:false">
                <div class="curmoney">
                    <span>当月总返点(￥)：<span class="blue">{{totalObj.monthlyTotalWages}}</span></span>
                    <Button class="allbtn grebtn">添加返点</Button>
                    <Button class="allbtn">一键已发</Button>
                </div>
                <div class="tableBox">
                    <Table :columns="columns" :data="datalist">
                        <template slot-scope="{row}" slot="menteename">
                            <span style="color:#1665D8;cursor:pointer;">{{row.menteename}}</span>
                        </template>
                        <template slot-scope="{row}" slot="typecn">
                            <span v-if="row.type" class="typeBtn">
                                <Icon 
                                    :custom="row.type=='u'?'iconfont iconmeiguobenke'
                                    :row.type=='g'?'iconfont iconyanjiusheng':row.type=='t'?
                                    'iconfont iconzhuanxue':row.type=='uk'?'iconfont iconyingguobenke':
                                    row.type=='p'?'iconfont icondanpianPS':row.type=='s'?'iconfont iconqitadanpianPS'
                                    :row.type=='o'?'iconfont iconqita':''"
                                    :style="row.type=='u'?'color:#1665D8':row.type=='g'?'color:#E6492D'
                                    :row.type=='t'?'color:#6758F3':row.type=='uk'?'color:#34AA44':
                                    row.type=='p'?'color:#F6AB2F':row.type=='s'?'color:#FACF55':
                                    row.type=='o'?'color:#3E3F42':''"
                                ></Icon>
                                <span>{{row.typecn}}</span>
                            </span>
                        </template>
                        <template slot-scope="{row}" slot="Paid">
                            <Icon class="contstau blue" v-if='row.Paid' custom="iconfont iconyifafang" />
                            <Icon class="contstau" v-else custom="iconfont iconweifafang" />
                        </template>
                    </Table>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';

export default {
    name: 'partworkback',
    components: {

    },
    data() {
        return {
            checkyear:new Date().getFullYear(),
            yearList:[],//年份列表
            monthlist:[],
            activeTab:'',
            datalist:[],
            totalObj:{},
            columns:[
                {
                    title: '学生姓名',
                    slot: 'menteename',
                    minWidth:120,
                    align:'left',
                    sortable: true
                },
                {
                    title: '申请类型',
                    minWidth:180,
                    slot: 'typecn',
                    sortable: true
                },
                {
                    title: '申请年份',
                    key: 'appyear',
                    align:'left',
                    minWidth:100
                },
                {
                    title: '合同金额',
                    key: 'contractamount',
                    align:'left',
                    minWidth:100
                },
                {
                    title: '当期付款金额',
                    key: 'currentPayment',
                    align:'left',
                    minWidth:120
                },
                {
                    title: '合作机构名称',
                    key: 'partnerName',
                    minWidth:180,
                    align:'left',
                    sortable: true
                },
                {
                    title: '返点比例',
                    key: 'rebateProportion',
                    minWidth:100,
                    align:'center'
                },
                {
                    title: '支付方式',
                    key: 'paymentType',
                    minWidth:100,
                    align:'center'
                },
                {
                    title: '目标账号',
                    key: 'paymentAccount',
                    minWidth:180,
                    align:'center'
                },
                {
                    title: '是否发放',
                    slot: 'Paid',
                    align:'left',
                    minWidth:120,
                    sortable: true
                }
            ],
            datalist:[
                // {
                //     date:'2021',
                //     totalmoney:'123456',
                //     datatables:[
                //         {
                //             chinesename:'随时',
                //             type:'uk',
                //             typecn:'本科'
                //         }
                //     ]
                // }
            ]
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
        getData(){
            // this.$https.friendback({
            //     year:new Date().getFullYear
            // }).then(res=>{
            //     if(res&&res.code==200){
            //         res.data.forEach(v=>{
            //             v.isgray = new Date(v.date).getMonth()>new Date().getMonth()?true:false;
            //         });
            //         this.datalist = res.data;
            //         if(res.data.length){
            //             this.activeTab = res.data[0].date;
            //         }
            //     }else{
            //         this.$Message.error('获取信息失败！');
            //     }
            // })
        }
    }
};
</script>

<style lang="scss">
#partworkback{
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
        padding: 4px 0;
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
    .curmoney{
        position: relative;
        background-color: #fff;
        padding: 15px 30px;
        border-bottom: 1px solid #E8EAEC;
        color:#3E3F42;
        >span{
            font-size: 18px;
            font-weight: 600;
        }
        .allbtn{
            position: absolute;
            top: 10px;
            right: 30px;
        }
        .grebtn{
            right: 130px;
            border-color: #34AA44;
            color: #34AA44;
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
    .typeBtn{
        color: #939393;
        border-radius: 4px;
        display: inline-block;
        padding: 4px 10px;
        border: 1px solid #ddd;
        .ivu-icon {
            font-size: 24px;
        }
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
</style>