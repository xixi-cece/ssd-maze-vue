<template>
    <div id="Finshsplit">
        <div class="selYear">
            <span>年份</span>
            <Select class="yearbox" v-model="checkyear" @on-change="changeYear">
                <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.value }}</Option>
            </Select>
        </div>
        <div class="formBox">
            <div class="panlistBox">
                <!-- <div class="nulldata" v-if="!datalist.length">暂无数据</div> -->
                <Tabs :value="activeTab" @on-click='getTab' @on-row-click='lookManger'>
                    <TabPane v-for="(item,j) in monthlist" :key="j" :label="item.showData" :name="item.showData" :disabled="item.isgray?true:false">
                        <Table :columns="columns" :data="datalist">
                            <!-- <template slot-scope="{row}" slot="lookbtn">
                                <button class="looktxt" @click="lookManger(row)">查看</button>
                            </template> -->
                            <template slot-scope="{row}" slot="chinesename">
                                <span style="color:#1665D8;cursor:pointer;" @click="lookManger(row)">{{row.chinesename}}</span>
                            </template>
                            <template slot-scope="{row}" slot="contactname">
                                <span style="color:#1665D8;cursor:pointer;" @click="lookManger(row)">{{row.contactname}}</span>
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
                            <template slot-scope="{row}" slot="salesname">
                                <div class="contBox">
                                    <span class="lastconcatval">{{row.salesname}}</span>
                                </div>
                            </template>
                            <template slot-scope="{row}" slot="sales_area">
                                <span>{{row.sales_area=='sh'?'上海':row.sales_area=='bj'?'北京':row.sales_area=='hz'?'杭州':''}}</span>
                            </template>
                            <template slot-scope="{row}" slot="salesbtn">
                                <div class="contBox">
                                    <button class="greenbtn" @click="sendSales(row)">重新分配销售</button>
                                </div>
                            </template>
                        </Table>
                    </TabPane>
                </Tabs>
            </div>
        </div>
        <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="page" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
        <!-- 模态框 -->
        <Modal
            width="388px"
            class="modToast"
            v-model="showModal"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>重新分配销售</span>
                <img class="close" src="../images/close.png" @click="showModal=false">
            </h3>
            <ul class="labBox">
                <!-- <li>
                    <h4 class="labTile">联系人</h4>
                    <span class="labCont">{{concat}}</span>
                </li> -->
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{menteeName}}</span>
                </li>
                <li>
                    <h4 class="labTile">当前销售</h4>
                    <span class="labCont">{{nowsales}}</span>
                </li>
            </ul>
            <h4 class="tileTig">需要转给的销售</h4>
            <div class="saleBox">
                <!-- <Select v-model="slemanger" style="width:100%;">
                    <Option v-for="item in mangerlist" :value="item.username" :key="item.chinesename">{{ item.chinesename }}</Option>
                </Select> -->
                <Select
                    style="width:100%;"
                    v-model="slemanger"
                    filterable
                    remote
                    placeholder="请输入查找"
                    :remote-method="remoteMethod"
                    :loading="loading"
                >
                    <Option v-for="(item, index) in mangerlist" :value="item.id" :key="index">{{item.chinesename}}</Option>
                </Select>
            </div>
            <Button class="suerBtn" @click="sureSend">确认分配</Button>
            <!-- <p class="tig">点击空白区域取消</p> -->
        </Modal>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';

export default {
    name: 'Finshsplit',
    components: {

    },
    data() {
        return {
            loading:false,
            options:[],
            showModal:false,
            activeTab:'',//激活的项
            areamodal:'全部',
            columns:[
                {
                    title: '学员姓名',
                    slot: 'chinesename',
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '联系人姓名',
                    slot: 'contactname',
                    minWidth:130,
                    sortable: true
                },
                {
                    title: '申请类型',
                    minWidth:180,
                    slot: 'typecn',
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
                    //         label: '本科',
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
                    title: '最后联系时间',
                    minWidth:140,
                    sortable: true,
                    key: 'lastfollowuptime'
                },
                {
                    title: '距上次联系',
                    minWidth:140,
                    key: 'tonow'
                },
                {
                    title: '最后联系方式',
                    minWidth:120,
                    key:'lastfollowupmethod',
                },
                {
                    title: '所属办公室',
                    minWidth:140,
                    slot: 'sales_area'
                },
                {
                    title: '销售',
                    minWidth:200,
                    sortable: true,
                    key: 'assignedSalesCNName'
                },
                {
                    title:' ',
                    minWidth:160,
                    slot:'salesbtn'
                }
            ],
            page:1,
            pageSize:10,
            totalpage:0,
            datalist:[],
            concatid:'',//选择的人的id
            concat:'',//联系人
            menteeName:'',//学员姓名
            slemanger:'',//要转给的销售
            mangerlist:[],
            nowsales:'',//现在的销售
            checkyear:new Date().getFullYear(),
            yearList:[],
            curtRateobj:{},
            monthlist:[],
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
        this.getlist();
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
        sendSales(data){
            this.showModal = true;
            this.concatid = data.id;
            this.menteeName = data.chinesename;
            this.nowsales = data.assignedSalesCNName;
        },
        sureSend(){
            if(!this.slemanger){
                this.$Message.error('请选择要分配的销售！');
                return;
            };
            this.showModal = false;
            this.$https.surereassignsales({
                id:this.concatid,
                sales:this.slemanger
            }).then(res=>{
                if(res&&res.status=='success'){
                    this.$Message.success('操作成功！');
                    this.getData();
                    this.$bus.$emit('uplist',true)
                }else{
                    this.$Message.error('操作失败！');
                };
            })
        },
        lookManger(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id
            });
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
            this.$https.assignlist({
                year:this.curtRateobj.year,
                month:this.curtRateobj.month,
                page:this.page,
                pageSize:this.pageSize
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalpage = res.data.count;
                    const arr = res.data.list;
                    arr.forEach(v=>{
                        v.lastfollowuptime = utility.framateDate(v.lastfollowuptime);
                    });
                    this.datalist = arr;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getlist(){
            this.$https.getsalesList({}).then(res=>{
                if(res&&res.status=="success"){
                    this.mangerlist = res.saleslist;
                    this.getYear();
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        remoteMethod(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.mangerlist;
                    this.options = list.filter(item => item.chinesename.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.options = [];
            }
        }
    }
};
</script>

<style lang="scss">
#Finshsplit{
    .selYear{
        position: fixed;
        top: 18px;
        left: 390px;
        z-index: 99;
        .yearbox{
            margin-left: 10px;
            width: 100px;
        }
    }
    .btm_page{
        text-align: center;
        padding: 15px 0;
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
            .contBox{
                display: flex;
                .lastconcatval{
                    flex: 1;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    -webkit-line-clamp:2;
                    line-clamp: 2;
                    -webkit-box-orient:vertical; 
                    margin-right: 15px;
                    vertical-align: middle;
                }
                .greenbtn{
                    padding: 0 8px;
                    line-height: normal;
                    display: inline-block;
                    vertical-align: middle;
                    border:1px solid #1665D8;
                    background-color: #fff;
                    color: #1665D8;
                    border-radius: 4px;
                    height: 30px;
                    cursor: pointer;
                    margin-top: 6px;
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
// 模态框
.modToast{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #3E3F42;
        font-size: 18px;
        padding: 21px 16px;
    }
    .close{
        float: right;
        cursor: pointer;
        margin-top: -4px;
        width: 24px;
        height: 24px;
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
    .saleBox{
        margin-top: 5px;
    }
    .suerBtn{
        display: block;
        width: 100px;
        margin: 20px auto 0;
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
</style>