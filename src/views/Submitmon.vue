<template>
    <div id="Submitmon">
        <!-- <div class="nullbox" v-if="!datalist.length">暂无数据</div> -->
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <Tabs :value="String(activeTab)" @on-click='getTab'>
            <TabPane v-for="(item,j) in monthlist" :key="j" :label="tabsTabel(item)" :name="item.showData" :disabled="item.isgray?true:false">
                <div class="formbox">
                    <div class="tablebox">
                        <Table :columns="columns" :data="datalist">
                            <template slot-scope="{row}" slot="chinesename">
                                <span style="color:#1665D8;cursor:pointer;">{{row.chinesename}}</span>
                            </template>
                            <template slot-scope="{row}" slot="typeCN">
                                <span v-if="row.typeCN" class="typeBtn">
                                    <Icon
                                        :custom="row.type=='u'?'iconfont iconmeiguobenke'
                                        :row.type=='g'?'iconfont iconyanjiusheng':row.type=='t'?
                                        'iconfont iconzhuanxue':row.type=='uk'?'iconfont iconyingguobenke':
                                        row.type=='p'?'iconfont icondanpianPS':row.type=='s'?'iconfont iconqitadanpianPS'
                                        :row.type=='o'?'iconfont iconqita':row.type=='c'?'iconfont iconqitaguojia1':''"
                                        :style="row.type=='u'?'color:#1665D8':row.type=='g'?'color:#E6492D'
                                        :row.type=='t'?'color:#6758F3':row.type=='uk'?'color:#34AA44':
                                        row.type=='p'?'color:#F6AB2F':row.type=='s'?'color:#FACF55':
                                        row.type=='o'?'color:#3E3F42':row.type=='c'?'color:#1BBBBB':''"
                                    ></Icon>
                                    <span>{{row.typeCN}}</span>
                                </span>
                            </template>
                        </Table>
                        <!-- <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="page" @on-change="getcurtpage" @on-page-size-change="getshowpage" /> -->
                    </div>
                    <div class="rtbox">
                        <div class="toptab" v-if='totalObj.commissionStatus==0'>
                            <div class="tilabel">当月签约提成</div>
                            <div class="tabval">{{totalObj.signedCommissionMonthly}}</div>
                            <div class="tilabel">当月总额部分提成</div>
                            <div class="tabval">{{totalObj.commissionMonthly}}</div>
                        </div>
                        <div class="toptab" v-if='totalObj.commissionStatus==1'>
                            <div class="tilabel">当月签约提成</div>
                            <div class="tabval">{{totalObj.signedCommissionMonthly}}</div>
                            <div class="tilabel">当月总额部分提成</div>
                            <div class="tabval">{{totalObj.commissionMonthly}}</div>
                        </div>
                        <div class="toptab" v-if='totalObj.commissionStatus==2'>
                            <div class="tilabel">当月签约提成</div>
                            <div class="tabval">{{totalObj.signedCommissionMonthly}}</div>
                            <div class="tilabel">当月总额部分提成</div>
                            <div class="tabval">{{totalObj.commissionMonthly}}</div>
                            <div class="tilabel">当月辅助签约提成</div>
                            <div class="tabval">{{totalObj.assistedCommission}}</div>
                            <Divider />
                            <div class="tilabel">当月总提成</div>
                            <div class="tabval" style="color:#1665D8;">{{totalObj.totalCommissionMonthly}}</div>
                        </div>
                        <Button v-if="totalObj.commissionStatus==0" class="btnsure" type='primary' @click="sureSubmit(totalObj)">确认提交</Button>
                        <Button v-if="totalObj.commissionStatus==1" class="btnsure surenull" icon="ios-checkmark-circle-outline">已提交</Button>
                        <Button v-if="totalObj.commissionStatus==2" class="btnsure greenbtn" icon="ios-checkmark-circle-outline">已发放</Button>
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
export default {
    name:'Submitmon',
    data() {
        return {
            activeTab:'',
            checkyear:new Date().getFullYear(),
            yearList:[],//年份列表
            monthlist:[],
            curtRateobj:{},
            totalObj:{},
            page:1,
            pageSize:10,
            totalpage:0,
            datalist:[],
            columns:[
                {
                    title: '学员姓名',
                    minWidth:120,
                    sortable: true,
                    slot: 'chinesename'
                },
                {
                    title: '申请类型',
                    minWidth:180,
                    sortable: true,
                    slot: 'typeCN'
                },
                {
                    title: '申请年份',
                    minWidth:120,
                    sortable: true,
                    key: 'appyear'
                },
                {
                    title: '学生类型',
                    minWidth:160,
                    sortable: true,
                    tooltip:true,
                    key: 'level'
                },
                {
                    title: '签约类型',
                    minWidth:160,
                    sortable: true,
                    key: 'signedType'
                },
                {
                    title: '合同总额',
                    minWidth:160,
                    tooltip:true,
                    key: 'contractamount'
                },
                {
                    title: '辅助销售',
                    minWidth:120,
                    // sortable: true,
                    tooltip:true,
                    key: 'assistedSales'
                },
                {
                    title: '提成金额',
                    minWidth:160,
                    key: 'commission'
                }
            ],
            tabsTabel(data){
                return (h)=>{
                    return h('div', {
                        style:{
                            textAlign:'center'
                        }
                    },[
                        h('div',{
                            style:{
                                display:'flex'
                            },
                        },[
                            h('div',{
                                style:{
                                    flex:1,
                                }
                            },[
                                h('div',{},data.year),
                                h('div',{
                                    style:{
                                        margin:'5px 0 0 0'
                                    }
                                },data.month+'月')
                            ])
                        ])
                    ]);
                }
            },
            applaylist:[],
            identity:''
        };
    },
    components: {

    },
    watch: {

    },
    computed: {

    },
    created() {
        this.identity = sessionStorage.getItem('logintype');
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
        this.getselList();        
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

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
        getselList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.applaylist = res.data.customer;
                    this.$nextTick(()=>{
                        this.getYear();
                    });
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getcurtpage(data){
            this.page = data;
            this.getData();
        },
        getshowpage(data){
            this.pageSize = data;
            if(this.page!=1){
                this.page = 1;
            }else{
                this.getData();
            };
        },
        getData(){
            this.$https.salesmoney({
                year:this.curtRateobj.year,
                month:this.curtRateobj.month,
                pageSize:this.pageSize,
                page:this.page,
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalObj = res.data;
                    const arr = res.data.list;
                    arr.forEach(v=>{
                        v.typeCN = utility.filterArr(v.type,this.applaylist);
                    });
                    this.totalpage = res.data.count;
                    this.datalist = res.data.list;
                }else{
                    this.$Message.error(res.msg);
                };
            });
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
        sureSubmit(data){
            this.$https.submitmoney({
                id:data.id,
                identity:this.identity
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        }
    }
};
</script>

<style lang='scss'>
#Submitmon{
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
    .nullbox{
        text-align: center;
    }
    .btm_page{
        text-align: center;
        padding: 15px 0;
    }
    .ivu-tabs-nav-prev,.ivu-tabs-nav-next{
        top: 50%;
        transform: translateY(-50%);
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
        padding: 8px 20px;
    }
    .ivu-table th{
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
    .ivu-table-cell{
        font-weight: normal;
        .ivu-table-cell-sort{
            color: #B0B0B0;
        }
    }
    .ivu-table-header thead tr th{
        color: #B0B0B0;
    }
    .formbox{
        display: flex;
        .tablebox{
            width: 75%;
            overflow: hidden;
            .ivu-table-wrapper{
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
                border-radius: 8px;
                border: 1px solid #EAEDF3;
            }
        }
        .rtbox{
            width: 200px;            
            // box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
            border-radius: 8px;
            // border: 1px solid #EAEDF3;
            margin-left: 20px;
            text-align: center;
            overflow: hidden;
            .toptab{
                padding: 10px 20px;
                background-color: #fff;
                .tilabel{
                    line-height: 35px;
                    height: 35px;
                    font-size: 16px;
                }
                .tabval{
                    font-size: 24px;
                }
                .ivu-divider-horizontal{
                    margin: 10px 0;
                }
            }
            .btnsure{
                height: 38px;
                width: 100%;
                background: #1665D8;
                margin-top: 16px;
            }
            .surenull{
                background-color: #EAEDF3;
                color: #1665D8;
                border-color: #EAEDF3;
            }
            .greenbtn{
                background-color: #EAEDF3;
                color: #34AA44;
                border-color: #EAEDF3;
            }
        }
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
}
</style>