<template>
    <div id="partmoney">
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <Tabs :value="activeTab" @on-click='getTab'>
            <TabPane v-for="(item,j) in monthlist" :key="j" :label="item.showData" :name="item.showData" :disabled="item.isgray?true:false">
                <div class="curmoney">
                    <Input v-model="serMentor" placeholder="搜索导师" icon="ios-search" class="serIpt" clearable @on-change="serchData"/>
                    <span style="margin-right:20px;">当月总工资($)：<span class="blue">{{totalObj.monthlyTotalWagesUSD}}</span></span>
                    <span>当月总工资(￥)：<span class="blue">{{totalObj.exchangeRate?totalObj.monthlyTotalWagesCNY:'-'}}</span></span>
                    <Button class="etbtn" v-if="!totalObj.exchangeRate" @click="addRate">填写汇率</Button>
                    <Input v-else class="iptval" v-model="totalObj.exchangeRate" @on-blur="blurRate(totalObj.exchangeRate)" />
                    <Button class="allbtn" @click="sendAll(item)">一键已发</Button>
                </div>
                <div class="tableBox">
                    <Table :columns="columns" :data="datalist" @on-filter-change="filterData">
                        <template slot-scope="{row}" slot="chinesename">
                            <span style="color:#1665D8;cursor:pointer;" @click="lookMentor(row)">{{row.chinesename}}</span>
                        </template>
                        <!-- <template slot="identity" slot-scope="{row}">
                            <svg class="colicon" aria-hidden="true">
                                <use :xlink:href="row.identity=='specialist'?'#iconzhuanxiangdaoshi':row.identity=='customizedmentor'?'#icongexinghuadaoshi'
                                    :row.identity=='partner'?'#iconhehuoren':row.identity=='mentee'?'#iconxueyuan2':row.identity=='intern'?'#iconshixisheng1'
                                    :row.identity=='esmentor'?'#iconwenshudaoshi':row.identity=='usmentor'?'#iconmeifangdaoshi':row.identity=='ophead'?'#iconhangzhengzhuguan'
                                    :row.identity=='opmentor'?'#iconhangzhengdaoshi':row.identity=='plhead'?'#iconguihuazhuguan':row.identity=='plmentor'?'#iconguihuadaoshi'
                                    :(row.identity=='sales'||row.identity=='saleshead'||row.identity=='salesvp')?'#iconxiaoshou1':row.identity=='admin'?'#'
                                    :row.identity=='fiance'?'#':''"></use>
                            </svg>
                        </template> -->
                        <template slot="identityCN" slot-scope="{row}">
                            <div :class="['idedBox', row.identityCN=='规划导师'?'blue':row.identityCN=='文书导师'?'orange':
                                row.identityCN=='行政导师'?'green':row.identityCN=='规划主管'?'blue':row.identityCN=='行政主管'?'green':row.identityCN=='个性化导师'?'purple':
                                (row.identityCN=='专项导师'||row.identityCN=='管理员')?'new':row.identityCN=='美方导师'?'mgree':
                                (row.identityCN=='销售'||row.identityCN=='销售主管'||row.identityCN=='销售合伙人')?'red':
                                (row.identityCN=='学员'||row.identityCN=='财务')?'black':row.identityCN=='实习生'?'pink':
                                row.identityCN=='人力'?'mblue':row.identityCN=='合伙人'?'mpurple':'']">
                                <Icon class="idIcon" :custom="(row.identityCN=='专项导师'||row.identityCN=='管理员')?'iconfont iconzhuanxiang':
                                    row.identityCN=='规划导师'?'iconfont iconguihua':row.identityCN=='文书导师'?'iconfont iconwenshu':
                                    row.identityCN=='行政导师'?'iconfont iconhangzheng':row.identityCN=='规划主管'?'iconfont iconguihua':
                                    row.identityCN=='行政主管'?'iconfont iconhangzheng':row.identityCN=='个性化导师'?'iconfont icongexinghua':
                                    row.identityCN=='美方导师'?'iconfont iconmeifang':(row.identityCN=='销售'||row.identityCN=='销售主管'||row.identityCN=='销售合伙人')?'iconfont iconxiaoshou':
                                    (row.identityCN=='学员'||row.identityCN=='财务')?'iconfont iconxueyuan':
                                    row.identityCN=='实习生'?'iconfont iconshixisheng':row.identityCN=='人力'?'iconfont iconrenli-lan':
                                    row.identityCN=='合伙人'?'iconfont iconhehuoren-zi':''"
                                />
                                <span class="fontchine">{{row.identityCN}}</span>
                            </div>
                        </template>
                        <!-- <template slot="identityCN" slot-scope="{row}">
                            <div class="idedBox purple">
                                <Icon custom="iconfont icongexinghua" />
                                <span class="fontchine">{{row.identityCN}}</span>
                            </div>
                        </template> -->
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
            v-model="showModal"
            class="p_moneyinfo"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
            width="560"
        >
            <h3 slot="header" class="headTile">
                <span>兼职导师工资明细</span>
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
                        <h4 class="labTile">时薪($)</h4>
                        <div class="contval">{{selMentor.hourlyWage}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">当月工资($)</h4>
                        <div class="contval">{{selMentor.monthlyWageUSD}}</div>
                    </li>
                </ul>
                <!-- <ul class="labBox">
                    <li>
                        <h4 class="labTile">时薪($)</h4>
                        <div class="contval">{{selMentor.hourlyWage}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">当月工时</h4>
                        <div class="contval">{{selMentor.monthlyWorkHours}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">当月打分</h4>
                        <div class="contval">{{selMentor.monthlyScore}}</div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">当月工资($)</h4>
                        <div class="contval">{{selMentor.monthlyWageRMB}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">支付方式</h4>
                        <div class="contval">{{selMentor.paymentTypeCN}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">目标账户</h4>
                        <div class="contval">{{selMentor.paymentAccount}}</div>
                    </li>
                </ul> -->
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile" style="margin:30px 0 20px;">工作详情</h4>
                        <div class="workdetail">
                            <div v-for="(item,i) in selMentor.list" :key="i" class="detailBox">
                                <span class="tipspan">{{item.createDate}}</span>
                                <span class="namespan ell">{{item.menteeName}}</span>
                                <span class="midcont ell" :title="item.workContent">{{item.workContent}}</span>
                                <span class="moneyspan ell">${{item.wageUSD}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Modal>
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
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';

export default {
    name: 'partmoney',
    components: {
        
    },
    data() {
        return {
            showRate:false,
            checkyear:new Date().getFullYear(),
            yearList:[],//年份列表
            curtRateobj:{},
            totalObj:{},
            rateVal:'',
            activeTab:'',//激活的项
            columns:[
                {
                    title: '导师姓名',
                    slot: 'chinesename',
                    minWidth:100,
                    align:'left',
                    tooltip:true
                },
                {
                    title: '身份',
                    // slot: 'identity',
                    slot: 'identityCN',
                    minWidth:140,
                    align:'left',
                    filters: [
                        {"value":"specialist","label":"专项导师"},
                        {"value":"customizedmentor","label":"个性化导师"},
                        // {"value":"hr","label":"人力"},
                        // {"value":"partner","label":"合伙人"},
                        // {"value":"mentee","label":"学员"},
                        // {"value":"intern","label":"实习生"},
                        // {"value":"esmentor","label":"文书导师"},
                        // {"value":"admin","label":"管理员"},
                        // {"value":"usmentor","label":"美方导师"},
                        // {"value":"ophead","label":"行政主管"},
                        // {"value":"opmentor","label":"行政导师"},
                        // {"value":"plhead","label":"规划主管"},
                        // {"value":"plmentor","label":"规划导师"},
                        // {"value":"finance","label":"财务"},
                        // {"value":"sales","label":"销售"},
                        // {"value":"saleshead","label":"销售主管"},
                        // {"value":"salesvp","label":"销售合伙人"}
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        return value == row.identity;
                    }
                },
                {
                    title: '时薪($)',
                    key: 'hourlyWage',
                    align:'left',
                    minWidth:100
                },
                {
                    title: '当月工时',
                    key: 'monthlyWorkHours',
                    align:'left',
                    minWidth:120,
                    sortable: true,
                    tooltip:true
                },
                {
                    title: '当月打分',
                    key: 'monthlyScore',
                    align:'left',
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '当月工资($)',
                    key: 'monthlyWageUSD',
                    align:'left',
                    tooltip:true,
                    minWidth:130,
                    sortable: true
                },
                {
                    title: '当月工资(￥)',
                    key: 'monthlyWageCNY',
                    align:'left',
                    minWidth:140,
                    tooltip:true,
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
                    minWidth:180,
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
            serMentor:'',
            monthlist:[],
            currentpage:1,
            pageSize:10,
            totalpage:0,
            identity:'',
            paymentType:'',
            paid:'',
            datalist:[],
            showModal:false,
            identitylist:[],//身份列表
            selMentor:{},//选择的项
            paylist:[]//支付方式
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
            if(data.slot&&data.slot=='identityCN'){
                this.identity = data._filterChecked.length?data._filterChecked[0]:'';
            }else if(data.slot&&data.slot=='paid'){
                this.paid = data._filterChecked.length?data._filterChecked[0]:'';
            }else if(data.key&&data.key=='paymentTypeCN'){
                this.paymentType = data._filterChecked.length?data._filterChecked[0]:'';
            };
            this.serchData();
        },
        getList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.identitylist = res.data.role;
                    this.paylist = res.data.paytype;
                    this.$nextTick(()=>{
                        this.getYear();
                    });
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        serchData(){
            this.currentpage = 1;
            this.pageSize = 10;
            this.getData();
        },
        getData(){
            this.$https.getfanmoney({
                year:this.curtRateobj.year,
                month:this.curtRateobj.month,
                pageSize:this.pageSize,
                page:this.currentpage,
                keyword:this.serMentor,
                identity:this.identity,
                paymentType:this.paymentType,
                paid:this.paid
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalObj = res.data;
                    const arr = res.data.list;
                    arr.forEach(v=>{
                        const mintime = v.monthlyWorkHours;
                        v.monthlyWorkHours = mintime%60>0?(Math.floor(mintime/60)+'小时'+mintime%60+'分钟'):Math.floor(mintime/60)+'小时';
                        v.identityCN = utility.filterArr(v.identity,this.identitylist);
                        v.paymentTypeCN = utility.filterArr(v.paymentType,this.paylist);
                        if(!v.monthlyWageCNY){
                            v.monthlyWageCNY='-';
                        };
                    });
                    this.totalpage = res.data.count;
                    this.datalist = res.data.list;
                }else{
                    this.$Message.error(res.msg);
                }
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
        lookMentor(data){
            this.showModal = true;
            this.$https.lookmentordetail({
                userId:data.userId,
                year:data.year,
                month:data.month,
                page:1,
                pageSize:200
            }).then(res=>{
                if(res&&res.code==200){
                    res.data.identityCN = utility.filterArr(res.data.identity,this.identitylist);
                    res.data.paymentTypeCN = utility.filterArr(res.data.paymentType,this.paylist);
                    res.data.list.forEach(v=>{
                        v.createDate = utility.framateDate(v.createDate)
                    });
                    this.selMentor = res.data;
                }else{
                    this.$Message.error(res.msg);
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
            this.$https.changePaid({
                paid:data.paid?0:1,
                userId:data.userId,
                month:data.month,
                year:data.year
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('修改成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        sendAll(data){
            this.$https.changePaid({
                paid:1,
                month:data.month,
                year:data.year
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('修改成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        addRate(){
            this.showRate = true;
        },
        blurRate(data){
            if(data){
                this.$https.setRotate({
                    exchangeRate:Number(data),
                    year:this.curtRateobj.year,
                    month:this.curtRateobj.month,
                    role:'mentor'
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    };
                });
            }
        },
        ok(type){
            if(type==1){
                if(this.rateVal){
                    this.$https.setRotate({
                        exchangeRate:Number(this.rateVal),
                        year:this.curtRateobj.year,
                        month:this.curtRateobj.month,
                        role:'mentor'
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.rateVal = '';
                            this.getData();
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
#partmoney{
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
        color:#3E3F42;
        text-align: center;
        background-color: #fff;
        padding: 15px 30px;
        border-bottom: 1px solid #E8EAEC;
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
    .btm_page{
        text-align: center;
        padding: 15px 0;
    }
    .contstau{
        font-size: 24px;
        cursor: pointer;
    }
    .idedBox{
        // border: 1px solid #BCBCBC;
        // text-align: center;
        border-radius: 4px;
        padding: 4px 0;
    }
    .fontchine{
        margin-left: 4px;
    }
    .idIcon{
        font-size: 18px;
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
.p_moneyinfo{
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
            .namespan{
                width: 80px;   
            }
            .midcont{
                width: 240px;
                margin-right: 30px;
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