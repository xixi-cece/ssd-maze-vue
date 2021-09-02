<template>
    <div id="Comcalc">
        <!-- <div class="nullbox" v-if="!monthlist.length">暂无数据</div> -->
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <Tabs :value="String(activeTab)" @on-click="getTab">
            <TabPane v-for="(v,i) in monthlist" :key="i" :label="tabsTabel(v)" :name="v.showData" :disabled="v.isgray?true:false">
                <div class="nullbox" v-if="!datalist.length">暂无数据</div>
                <div class="dataBox" v-if="datalist">
                    <Collapse>
                        <Panel :name="v.date" v-for="(item,j) in datalist" :key="j">
                            <div class="tilehead clearfix">
                                <span class="fl">{{item.salesName}}</span>
                                <span class="fr rightBox">
                                    <!-- <b>当月单数：{{item.signedNum}}</b>
                                    <b>总合同额：{{item.totalSignMonthly}}</b> -->
                                    <b>总提成额：{{item.totalCommissionMonthly}}</b>
                                    <b v-if="!item.salesvpConfirm">
                                        <!-- <Button class="stubtn gray" @click.stop="showChange(item)">修改</Button> -->
                                        <!-- <Button class="stubtn blue" @click.stop="sureBtn(item)">确认</Button> -->
                                        <Button class="stubtn blue" @click.stop="showChange(item)">审批</Button>
                                    </b>
                                    <b v-else>
                                        <Button class="stubtn gray" @click.stop="showChange(item)">修改</Button>
                                        <Button class="bluebtn" icon="ios-checkmark-circle-outline">已确认</Button>
                                    </b>
                                </span>
                            </div>
                            <p slot="content">
                                <Table :columns="columns" :data="item.list">
                                    <template slot-scope="{row}" slot="chinesename">
                                        <span style="color:#1665D8;">{{row.chinesename}}</span>
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
                                    <template slot-scope="{row}" slot='signedType'>
                                        <span v-if="row.signedType=='独签'||row.signedType=='主签'">{{row.signedType}}</span>
                                        <Poptip v-else trigger="hover" transfer>
                                            <span>{{row.signedType}}</span>
                                            <svg class="tigImg" aria-hidden="true">
                                                <use :xlink:href="row.assistedType=='第三档'?'#iconquankaoCarry':row.assistedType=='第二档'?'#iconfeichanggeili':row.assistedType=='第一档'?'#icongeili':''"></use>
                                            </svg>
                                            <div slot="content">{{row.assistedType}}</div>
                                        </Poptip>
                                    </template>
                                    <template slot-scope="{row}" slot="commission">
                                        <span>{{row.commission}}</span>
                                    </template>
                                </Table>
                            </p>
                        </Panel>
                    </Collapse>
                </div>
            </TabPane>
        </Tabs>
        <div class="btmbox">
            <span><b>当月总提成：</b>{{curtmoney}}</span>
            <Button v-if="salesvpissure&&!submitHR" disabled>提交HR</Button>
            <Button v-else-if="!submitHR" @click="subHRbtn">提交HR</Button>
            <Button v-else class="btnsure" icon="ios-checkmark-circle-outline">已提交</Button>
        </div>
        <!-- 弹窗 -->
        <Modal
            class="modalTost"
            width="950"
            v-model="showtable"
            :closable="false"
            :mask-closable="false"
            :footer-hide='true'
        >
            <div slot="header">
                <span>修改提成</span>
                <span class="optionbtn">
                    <Button @click="showtable=false">取消</Button>
                    <Button @click="sureModal">确认</Button>
                </span>
            </div>
            <div class="tabbox">
                <Table height="400" :columns="columns" :data="currentlist">
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;">{{row.chinesename}}</span>
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
                    <template slot-scope="{row}" slot='signedType'>
                        <span v-if="row.signedType=='独签'||row.signedType=='主签'">{{row.signedType}}</span>
                        <Poptip v-else trigger="hover" transfer>
                            <span>{{row.signedType}}</span>
                            <svg class="tigImg" aria-hidden="true">
                                <use :xlink:href="row.assistedType=='第三档'?'#iconquankaoCarry':row.assistedType=='第二档'?'#iconfeichanggeili':row.assistedType=='第一档'?'#icongeili':''"></use>
                            </svg>
                            <div slot="content">{{row.assistedType}}</div>
                        </Poptip>
                    </template>
                    <template slot-scope="{row}" slot="commission">
                        <Input v-model="row.commission" @on-blur="changeData(row.commission,row)"/>
                    </template>
                </Table>
            </div>
        </Modal>
        <FullLoad v-if='showLoad'></FullLoad>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
import FullLoad from '../components/FullLoad';

export default {
    name:'Comcalc',
    data() {
        return {
            showLoad:false,
            showtable:false,
            activeTab:'',
            checkyear:new Date().getFullYear(),
            yearList:[],//年份列表
            monthlist:[],
            curtmoney:'',//当月总提成
            salesvpissure:false,//所有数据修改完了是否确认
            submitHR:0,//是否提交HR确认
            columns:[
                {
                    title:'学员姓名',
                    slot:'chinesename',
                    minWidth:120,
                    sortable: true
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
                    minWidth:120,
                    sortable: true,
                    tooltip:true,
                    key: 'level'
                },
                {
                    title: '签约类型',
                    minWidth:120,
                    sortable: true,
                    slot: 'signedType'
                },
                {
                    title: '合同总额',
                    minWidth:120,
                    key: 'contractamount'
                },
                {
                    title: '提成金额',
                    minWidth:120,
                    slot: 'commission'
                }
            ],
            datalist:[],
            currentlist:[],
            tabsTabel(data){
                return (h)=>{
                    return h('div',{
                        style:{
                            
                        }
                    },data.year+'.'+data.month)
                }
            },
            applaylist:[],
            identity:'',
            curentobj:{},
            clickId:'',
            changelist:[]//修改提成弹窗用
        };
    },
    components: {
        FullLoad
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
                    this.curentobj = v;
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
                    this.curentobj = v;
                };
            });
            this.showLoad = true;
            this.getData();
        },
        showChange(data){
            // console.log(data)
            this.showtable = true;
            this.currentlist = JSON.parse(JSON.stringify(data.list));
            this.clickId = data.id;
        },
        sureBtn(data){
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
        },
        subHRbtn(){
            this.$https.submithr({
                month:this.curentobj.month,
                year:this.curentobj.year
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        changeData(money,data){
            const arr = JSON.parse(JSON.stringify(this.currentlist));
            arr.forEach(v=>{
                if(data.id==v.id){
                    v.commission = money;
                };
            });
            this.changelist = arr;
        },
        sureModal(){
            this.showtable = false;
            let arr = [];
            this.changelist.forEach(v=>{
                arr.push({
                    'id':v.id,
                    "signedType":v.signedType,
                    'commission':Number(v.commission)
                });
            });
            const params = {
                id:this.clickId,
                params:arr
            };
            // console.log(params)
            this.$https.changevpmoney(params).then(res=>{
                if(res&&res.code==200){
                    this.sureBtn({
                        id:this.clickId
                    });
                }else{
                    this.$Message.error(res.msg);
                }
            })
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
        getData(){
            this.$https.getvpmoney({
                year:this.curentobj.year,
                month:this.curentobj.month
            }).then(res=>{
                if(res&&res.code==200){
                    const arr = res.data.data;
                    arr.forEach(v=>{
                        if(v&&!v.salesvpConfirm){
                            this.salesvpissure = true;
                        };
                        v.list.forEach(ivm=>{
                            ivm.typeCN = utility.filterArr(ivm.type,this.applaylist);
                        });
                    })
                    this.datalist = res.data.data;
                    this.submitHR = res.data.submitHR;
                    this.showLoad = false;
                }else{
                    this.$Message.error(res.msg);
                    this.showLoad = false;
                };
            })
        }
    }
};
</script>

<style lang='scss'>
#Comcalc{
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
    }
    .ivu-tabs-tab-active{
        background-color: #1665D8;
        color: #fff;
    }
    .ivu-tabs-nav .ivu-tabs-tab-disabled{
        background-color: #ddd;
        color: #9EA0A4;
    }
    .ivu-collapse{
        border: 0;
        background-color: transparent;
        .ivu-collapse-item{
            margin-bottom: 20px;
            background-color: #fff;
            overflow: hidden;
            border-radius: 2px;
            .ivu-collapse-header{
                height: 64px;
                line-height: 64px;
            }
            .ivu-icon-ios-arrow-forward{
                float: left;
                margin-top: 22px;
                font-size: 20px;
                font-weight: normal;
                color: #3F4042;
            }
            .ivu-collapse-content-box{
                padding: 0;
            }
            .ivu-collapse-content{
                padding: 0;
            }
        }
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
    .dataBox{
        .tilehead{
            display: inline-block;
            color: #3F4042;
            width: 95%;
            .rightBox{
                b{
                    font-weight: normal;
                    margin-left: 50px;
                }
                .gray{
                    margin-right: 20px;
                    border-color: #3E3F42;
                    color: #3E3F42;
                }
                .blue{
                    color: #1665D8;
                    border-color: #1665D8;
                }
                .bluebtn{
                    color: #1665D8;
                    background-color: #EAEDF3;
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
        .tigImg{
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
            margin-left: 5px;
            margin-top: -2px;
        }
    }
    .btmbox{
        height: 70px;
        line-height: 70px;
        width: calc(100% - 240px);
        background-color: #fff;
        position: fixed;
        bottom: 0;
        left: 240px;
        text-align: right;
        >span{
            font-size: 18px;
        }
        button{
            background-color: #34AA44;
            border-color: #34AA44;
            color: #fff;
            font-size: 14px;
            margin-left: 40px;
            margin-right: 20px;
            span{
                font-size: 14px;
            }
        }
        .btnsure{
            background-color: rgba(52, 170, 68, .1);
            color: #34AA44;
            border-color: rgba(52, 170, 68, .1);
        }
    }
}
.modalTost{
    .ivu-modal-header{
        font-size: 18px;
        padding: 20px 16px;
        font-weight: 600;
        position: relative;
        .optionbtn{
            position: absolute;
            right:30px;
            top:50%;
            transform: translateY(-50%);
            button{
                margin-right: 20px;
                color: #6B6C6F;
                border:1px solid #6B6C6F;
                &:last-of-type{
                    margin-right: 0;
                    color: #1665D8;
                    border:1px solid #1665D8;
                }
            }
        }
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
    .tigImg{
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        margin-left: 5px;
        margin-top: -2px;
    }
}
.ivu-poptip-popper{
    min-width: auto;
}
</style>