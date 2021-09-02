<template>
    <div id="Totalgoing">
        <div class="areaSelect">
            <div class="selYear">
                <span>年份</span>
                <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                    <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                </Select>
            </div>
            <RadioGroup v-model="areamodal" type="button" @on-change="changeRadio">
                <Radio v-for="(v,i) in arealist" :key="i" :label="v.key">{{v.value}}</Radio>
                <!-- <Radio label="all">全部地区</Radio>
                <Radio label="bj">北京</Radio>
                <Radio label="sh">上海</Radio>
                <Radio label="hz">杭州</Radio> -->
            </RadioGroup>
        </div>
        <div class="formBox">
            <div class="panlistBox">
                <!-- <div class="nulldata" v-if="!datalist.length">暂无数据</div> -->
                <Tabs :value="activeTab" @on-click='getTab'>
                    <TabPane v-for="(item,j) in monthlist" :key="j" :label="item.showData" :name="item.showData" :disabled="item.isgray?true:false">
                        <Table :columns="columns" :data="datalist">
                            <template slot-scope="{row}" slot="chinesename">
                                <span style="color:#1665D8;">{{row.chinesename}}</span>
                            </template>
                            <template slot-scope="{row}" slot="typecn">
                                <span class="typeBtn" v-if="row.type!='n'">
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
                                    <span>{{row.typecn}}</span>
                                </span>
                            </template>
                            <template slot-scope="{row}" slot="status">
                                <span>{{row.status=='ongoing'?'正在勾搭':row.status=='newbie'?'已分配':row.status=='done'?'付款完成':row.status=='gone'?'放弃签约':row.status=='unassigned'?'未分配':row.status=='signing'?'签约中':row.status=='signed'?'签约完成':row.status=='survey'?'已发问卷':''}}</span>
                            </template>
                        </Table>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
export default {
    name: 'Totalgoing',
    components: {

    },
    data() {
        return {
            areamodal:'all',
            arealist:[],
            activeTab:'',
            columns:[
                // {
                //     title:' ',
                //     slot:'lookbtn',
                //     minWidth:90,
                //     width:'90px'
                // },
                {
                    title:'学员姓名',
                    slot:'chinesename',
                    minWidth:120,
                    sortable: true
                },
                // {
                //     title:'联系人',
                //     key:'contactname',
                //     minWidth:120,
                //     sortable: true
                // },
                {
                    title: '申请类型',
                    slot: 'typecn',
                    minWidth:180,
                    sortable: true,
                    // filters: [
                    //     {
                    //         label: '本科',
                    //         value: 'u'
                    //     },
                    //     {
                    //         label: '研究生',
                    //         value: 'g'
                    //     },
                    //     {
                    //         label: '转学',
                    //         value: 't'
                    //     },
                    //     {
                    //         label: '英国',
                    //         value: 'uk'
                    //     },
                    //     {
                    //         label: '单篇PS',
                    //         value: 'p'
                    //     },
                    //     {
                    //         label: '其他国家',
                    //         value: 'c'
                    //     },
                    //     {
                    //         label: '其他单篇',
                    //         value: 's'
                    //     },
                    //     {
                    //         label: '其他',
                    //         value: 'o'
                    //     }
                    // ],
                    // filterMultiple: false,//是否可以多选
                    // filterMethod (value, row) {
                    //     if(value === 'u') {
                    //         return row.type === 'u';
                    //     }else if (value === 'g') {
                    //         return row.type === 'g';
                    //     }else if (value === 't') {
                    //         return row.type === 't';
                    //     }else if (value === 'uk') {
                    //         return row.type === 'uk';
                    //     }else if (value === 'p') {
                    //         return row.type === 'p';
                    //     }else if (value === 's') {
                    //         return row.type === 's';
                    //     }else if (value === 'o') {
                    //         return row.type === 'o';
                    //     }
                    // }
                },
                {
                    title: '申请年份',
                    minWidth:120,
                    sortable: true,
                    key: 'appyear'
                },
                {
                    title: '当前阶段',
                    minWidth:120,
                    sortable: true,
                    slot: 'status'
                },
                {
                    title: '学员籍贯',
                    minWidth:120,
                    key: 'area',
                },
                {
                    title:'高中',
                    minWidth:120,
                    key:'highschool'
                },
                {
                    title:'表面来源',
                    minWidth:120,
                    key:'comefrom'
                },
                {
                    title: '所属办公室',
                    minWidth:140,
                    key: 'sales_areaZN'
                },
                {
                    title: '销售',
                    sortable: true,
                    minWidth:120,
                    key:'sales',
                }
            ],
            datalist:[],
            checkyear:new Date().getFullYear(),
            yearList:[],
            curtRateobj:{},
            monthlist:[]
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
        this.getArea();
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
        lookManger(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id
            });
        },
        getArea(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.arealist = res.data.area;
                    this.getYear();
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getData(){
            this.$https.totalnumlist({
                area:this.areamodal,
                year:this.curtRateobj.year,
                month:this.curtRateobj.month
            }).then(res=>{
                if(res&&res.status=='success'){
                    res.data.datatables.forEach(item=>{
                        item.sales_areaZN = utility.filterArr(item.sales_area,this.arealist);
                    });
                    this.datalist = res.data.datatables;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        changeRadio(val){
            this.areamodal = val;
            this.getData();
        }
    }
};
</script>

<style lang="scss">
#Totalgoing{
    position: relative;
    .selYear{
        position: fixed;
        top: 18px;
        left: 650px;
        z-index: 99;
        .yearbox{
            margin-left: 10px;
            width: 100px;
        }
    }
    .ivu-tabs-bar{
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
    .areaSelect{
        position: fixed;
        top: 18px;
        left: 370px;
        z-index: 9;
        .ivu-radio-wrapper{
            border:none;
            &:before{
                display:none;
            }
            &:after{
                display:none;
            }
        }
        .ivu-radio-wrapper-checked{
            box-shadow: none;
        }
    }
    .formBox{
        .panlistBox{
            .nulldata{
                text-align: center;
            }
            .tilehead{
                display: inline-block;
                color: #fff;
                width: 95%;
                .rightBox{
                    b{
                        font-weight: normal;
                        margin-left: 50px;
                    }
                }
            }
            .looktxt{
                padding: 0 10px;
                line-height: normal;
                display: inline-block;
                vertical-align: middle;
                border:none;
                background-color: #346197;
                color: #fff;
                border-radius: 4px;
                height: 30px;
                cursor: pointer;
            }
            .typeBtn{
                // background-color: #ECECEC;
                color: #939393;
                border-radius: 4px;
                display: inline-block;
                padding: 4px 10px;
                border: 1px solid #ddd;
                .ivu-icon {
                    font-size: 24px;
                }
            }
            .ivu-table{
                padding: 0 15px;
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
        }
    }
}
</style>