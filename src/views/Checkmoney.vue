<template>
    <div id="Checkmoney">
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <div class="formBox">
            <Tabs :value="activeTab" @on-click='getTab'>
                <!-- <TabPane v-for="(item,j) in monthlist" :key="j" :label="tabsTabel(item)" :disabled="item.isgray?true:false"> -->
                <TabPane v-for="(item,j) in monthlist" :key="j" :label="item.showData" :name="item.showData" :disabled="item.isgray?true:false">
                    <div class="topBox">
                        <div class="lftbox">
                            <div class="itembox">
                                <span class="itg">本月总收入($):</span>
                                <span class="bluespan">{{totalObj.monthlyWageUSD}}</span>
                            </div>
                            <div class="itembox">
                                <span class="itg">本月总工时:</span>
                                <span class="bluespan">{{totalObj.monthlyWorkHours?(totalObj.monthlyWorkHours%60>0?Math.floor(totalObj.monthlyWorkHours/60)+'小时'+totalObj.monthlyWorkHours%60+'分钟':totalObj.monthlyWorkHours/60+'小时'):''}}</span>
                            </div>
                            <div class="itembox">
                                <span class="itg">收款方式:</span>
                                <span class="bluespan">{{totalObj.paymentTypeZN}}</span>
                            </div>
                            <div class="itembox">
                                <span class="itg">收款账号:</span>
                                <Tooltip :content="totalObj.paymentAccount">
                                    <span class="bluespan ell">{{totalObj.paymentAccount}}</span>
                                </Tooltip>
                            </div>
                        </div>
                        <div class="rtbox">
                            <Button type="success" v-if="totalObj.paid==0" class="btncolor" icon="ios-close-circle-outline" ghost>未发放</Button>
                            <Button type="success" v-if="totalObj.paid==1" class="green" icon="ios-checkmark-circle-outline" ghost>已发放</Button>
                        </div>
                    </div>
                    <Table :columns="columns" :data="datalist">
                        <template slot-scope="{row}" slot="menteeName">
                            <span style="color:#1665D8;">{{row.menteeName}}</span>
                        </template>
                    </Table>
                    <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';

export default {
    name: 'Checkmoney',
    props: {

    },
    components: {
        
    },
    data() {
        return {
            activeTab:'',
            checkyear:new Date().getFullYear(),
            yearList:[],//年份列表
            columns:[
                {
                    title: '工作类型',
                    minWidth:100,
                    align:'left',
                    key: 'workType'
                },
                {
                    title: '学员姓名',
                    minWidth:120,
                    sortable: true,
                    slot: 'menteeName'
                },
                {
                    title: '具体工作内容',
                    minWidth:180,
                    tooltip:true,
                    key: 'workContent'
                },
                {
                    title: '工作日期',
                    minWidth:120,
                    align:'left',
                    sortable: true,
                    key: 'workDate'
                },
                {
                    title: '开始时间',
                    minWidth:100,
                    align:'left',
                    key: 'startTime'
                },
                {
                    title: '结束时间',
                    minWidth:100,
                    align:'left',
                    key: 'endTime'
                },
                {
                    title: '工作时长',
                    minWidth:120,
                    align:'left',
                    tooltip:true,
                    key: 'workHours'
                },
                {
                    title: '提交日期',
                    minWidth:120,
                    align:'left',
                    sortable: true,
                    key: 'createDate'
                },
                {
                    title: '工资金额($)',
                    minWidth:110,
                    tooltip:true,
                    align:'left',
                    key: 'wageUSD'
                }
            ],
            datalist:[],
            paylist:[],
            totalObj:{},
            monthlist:[],
            curtRateobj:{},
            totalpage:0,
            pageSize:10,
            currentpage:1
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
            //                     h('div',{},data.year?data.year:2020),
            //                     h('div',{},data.currentMonth+'月')
            //                 ])
            //             ])
            //         ]);
            //     }
            // }
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
        this.getYear();
    },
    methods: {
        getList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.paylist = res.data.paytype;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
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
        getTab(val){
            console.log(val)
            this.activeTab = val;
            const arr = this.monthlist;
            arr.forEach(v=>{
                if(v.showData==val){
                    this.curtRateobj = v;
                };
            });
            this.getData();
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
            this.$https.lookWorks({
                year:this.curtRateobj.year,
                month:this.curtRateobj.month,
                page:this.currentpage,
                pageSize:this.pageSize
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalObj = res.data;
                    const arr = res.data.list;
                    arr.forEach(item=>{
                        item.createDate = utility.framateDate(item.createDate);
                        item.workDate = utility.framateDate(item.workDate);
                        const mintime = item.workHours;
                        item.workHours = mintime%60>0?(Math.floor(mintime/60)+'小时'+mintime%60+'分钟'):Math.floor(mintime/60)+'小时';
                    });
                    res.data.paymentTypeZN = utility.filterArr(res.data.paymentType,this.paylist);
                    this.datalist = arr;
                    this.totalpage = res.data.count;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        }
    }
};
</script>

<style lang="scss">
.btm_page{
  text-align: center;
  padding: 15px 0;
}
#Checkmoney{
    .selYear{
        position: fixed;
        top: 20px;
        left: 380px;
        z-index: 99;
        .yearbox{
            margin-left: 10px;
            width: 100px;
        }
    }
    .formBox{
        .nullBox{
            text-align: center;
        }
        .ivu-tabs-content{
            border-radius: 4px;
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
        .ivu-tabs-bar{
            border: none;
        }
        .ivu-tabs-ink-bar{
            display: none;
        }
        .ivu-tabs-tab{
            border-radius: 4px;
            background-color: #fff;
        }
        .ivu-tabs-tab-active{
            background-color: #1665D8;
            color: #fff;
        }
        .ivu-tabs-nav .ivu-tabs-tab-disabled{
            background-color: #ddd;
            color: #9EA0A4;
        }
        .topBox{
            border-bottom: 1px solid #E8EAEC;
            width: 100%;
            padding: 10px 15px;
            background-color: #fff;
            display: flex;
            .lftbox{
                flex: 1;
                padding-top: 5px;
                display: flex;
                .itembox{
                    flex: 1;
                }
            }
            .itg{
                color: #3E3F42;
                margin-right: 10px;
                font-size: 18px;
                font-weight: 600;
                display: inline-block;
                vertical-align: middle;
            }
            .bluespan{
                font-size: 18px;
                color: #1665D8;
                max-width: 135px;
                display: inline-block;
                vertical-align: middle;
            }
            .rtbox{
                min-width:120px;
                text-align: right;
                .btncolor{
                    border: none;
                    color: #F6AB2F;
                    background-color: rgba(246,171,47,.1);
                }
                .green{
                    background-color: rgba(52,170,68,.1);
                    border: none;
                }
            }
        }
    }
    .ivu-table-cell{
        font-weight: normal;
        .ivu-table-cell-sort{
            color: #9EA0A4;
        }
    }
    .ivu-table-header thead tr th{
        color: #9EA0A4;
    }
}
</style>