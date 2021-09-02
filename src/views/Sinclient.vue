<template>
    <div id="Sinclient">
        <div class="serBox">
            <div class="iptBox">
                <Input v-model="serval" suffix="ios-search" placeholder="搜索学员" @on-change='filterData' clearable/>
            </div>
        </div>
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="datalist">
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;cursor:pointer;" @click="lookManger(row)">{{row.chinesename}}</span>
                    </template>
                    <template slot-scope="{row}" slot="typecn">
                        <span v-if="row.typecn" class="typeBtn">
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
                    <template slot-scope="{row}" slot="backstatu">
                        <span :class="'blue或者green'">{{row.backstatu}}</span>
                        <!-- <span class="stubtn blue">无返点</span>
                        <span class="stubtn green">已提交</span> -->
                    </template>
                    <template slot-scope="{row}" slot="payNexttime">
                        <span>{{row.payNexttime}}</span>
                    </template>
                    <template slot-scope="{row}" slot="splitperiod">
                        <span>{{row.splitperiod==1?'一期':row.splitperiod==2?'二期':row.splitperiod==3?'三期':''}}</span>
                    </template>
                    <!-- <template slot-scope="{row}" slot="lookbtn">
                        <span class="yellow" @click="lookMaze(row)">查看Maze</span>
                        <button class="checkbtn" @click="openBack(row)">查看付款信息</button>
                    </template> -->
                </Table>
            </div>
        </div>
        <!-- 查看maze -->
        <Modal
            class="mazeLook"
            v-model="showMaze"
            :closable="false"
            :mask-closable="false"
            width="388"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>查看Maze</span>
                <img class="close" src="../images/close.png" @click="showMaze = false;">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{chinesename}}</span>
                </li>
                <li>
                    <h4 class="labTile">销售姓名</h4>
                    <span class="labCont">{{salesname}}</span>
                </li>
            </ul>
            <h4 class="tileTig">Maze账号</h4>
            <div class="btnBox">
                <Input class="txtBox" v-model="mazeaccount" readonly/>
                <Button class="mazbtn" @click="copyMaze">复制</Button>
            </div>
            <!-- <Button class="suerBtn" @click="copyMaze">复制</Button> -->
            <!-- <p class="tig">点击空白区域取消</p> -->
        </Modal>
        <pay-look v-if="showPay" :showModal='showPay' :dataJoson="curtObj" @getpay="changepay"></pay-look>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import PayLook from '../components/payLook';
import { mapState } from 'vuex';
import { utility } from '../assets/lib/common';

export default {
    props: {

    },
    data() {
        return {
            showMaze:false,
            chinesename:'',
            salesname:'',
            mazeaccount:'',
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
                    title: '合同总额',
                    minWidth:120,
                    sortable: true,
                    tooltip:true,
                    key: 'amount'
                },
                {
                    title: '支付类型',
                    minWidth:120,
                    sortable: true,
                    // tooltip:true,
                    slot: 'splitperiod'
                },
                {
                    title: '已付金额',
                    minWidth:120,
                    // sortable: true,
                    tooltip:true,
                    key: 'paidamount'
                },
                {
                    title: '下次支付',
                    minWidth:120,
                    // sortable: true,
                    // tooltip:true,
                    slot: 'payNexttime'
                },
                {
                    title: '辅助销售',
                    minWidth:120,
                    // sortable: true,
                    tooltip:true,
                    key: 'assistedSales'
                },
                {
                    title: '合同备注',
                    minWidth:180,
                    key: 'comment'
                },
                {
                    title:'返点机构/个人',
                    minWidth:150,
                    key:'actualfrom'
                }
                // {
                //     title: '高中',
                //     minWidth:100,
                //     key: 'highschool'
                // },
                // {
                //     title: '申请年份',
                //     minWidth:120,
                //     sortable: true,
                //     key: 'appyear'
                // },
                // {
                //     title: '签约时间',
                //     minWidth:120,
                //     sortable: true,
                //     key: 'signeddate'
                // },
                // {
                //     title: '经办人',
                //     minWidth:100,
                //     key: 'sales'
                // },
                // {
                //     title: '相关导师',
                //     minWidth:100,
                //     key: 'relatedsales'
                // },
                // {
                //     title: 'Maze账号',
                //     minWidth:120,
                //     key: 'mazeaccount'
                // },
                // {
                //     title:'返点提交状态',
                //     minWidth:140,
                //     sortable: true,
                //     slot:'backstatu'
                // },
                // {
                //     title:' ',
                //     tooltip:true,
                //     minWidth:200,
                //     slot:'lookbtn'
                // }                            
            ],
            oldlist:[],
            datalist:[],
            showPay:false,
            curtObj:{},
            serval:''
        };
    },
    components:{
        PayLook
    },
    computed: {
        // ...mapState(['listInfo'])
    },
    watch: {
        // listInfo:{
        //     handler(now,old){
        //         this.data = now.signedlist;
        //     },
        //     deep:true,
        //     immediate:true
        // }
    },
    created() {

    },
    mounted() {
        this.getData();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        filterData(){
            let timer = null;
            const val = this.serval;
            const arr = this.oldlist;
            const arr1 = [];
            arr.forEach(v=>{
                if(v.chinesename.indexOf(val)!=-1){
                    arr1.push(v);
                };
            });
            this.datalist = [];
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.datalist = arr1;
            },20);
        },
        openBack(data){
            this.showPay = true;
            this.curtObj = data;
        },
        changepay(){
            this.showPay = false;
        },
        getData(){
            this.$https.alldonefinsh({}).then(res=>{
                if(res&&res.status=='success'){
                    const dataArr = res.signedlist;
                    dataArr.forEach(v=>{
                        if(v.signeddate){
                            v.signeddate = utility.framateDate(v.signeddate);
                        };
                    });
                    this.oldlist = dataArr;
                    this.datalist = dataArr;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        lookManger(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id
            });
        },
        lookMaze(data){
            this.showMaze = true;
            this.chinesename = data.chinesename;
            this.salesname = data.sales;
            this.mazeaccount = data.mazeaccount;
        },
        copyMaze(){
            const data = this.mazeaccount;
            let clipboard = new Clipboard('.mazbtn', {
                text: function () {
                    return data
                }
            })
            clipboard.on('success', e => {
                this.$Message.success('复制成功！');
                this.showques = false;
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$Message.error('复制失败！');
                clipboard.destroy()
            })
        }
    }
};
</script>

<style lang="scss">
#Sinclient{
    .serBox{
        height: 60px;
        text-align: right;
        .iptBox{
            position: fixed;
            width: 183px;
            top: 85px;
            right: 38px;
        }
    }
    .dvBox{
        .tableBox{
            background-color: #fff;
            .ivu-table th{
                background-color: #fff;
                font-weight: 400;
                color: #B0B0B0;
            }
            .ivu-table td{
                font-size: 16px;
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
            .stubtn{
                display: inline-block;
                width: 88px;
                height: 32px;
                line-height: 30px;
                font-size: 13px;
                border-radius: 4px;
                text-align: center;
            }
            .blue{
                color:#1665D8;
                border:1px solid #1665D8;
            }
            .green{
                background-color: #F5F6FA;
                border:1px solid #F5F6FA;
                color:#34AA44;
            }
            .yellow{
                display: inline-block;
                border-radius: 4px;
                text-align: center;
                color:#fff;
                font-size: 13px;
                background-color: #F6AB2F;
                width: 88px;
                height: 32px;
                line-height: 30px;
                cursor: pointer;
            }
            .checkbtn{
                vertical-align: middle;
                display: inline-block;
                border-radius: 4px;
                text-align: center;
                height: 32px;
                line-height: 32px;
                cursor: pointer;
                padding: 0 10px;
                font-size: 13px;
                color:#1665D8;
                border:1px solid #1665D8;
                margin-left: 20px;
            }
        }
    }
}
// 模态框
.mazeLook{
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
                color:#333;
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
        color: #A3A3A3;
        font-weight: normal;
    }
    .saleBox{
        margin-top: 5px;
    }
    .suerBtn{
        width: 100px;
        color: #fff;
        border: 1px solid #1665D8;
        background-color: #1665D8;
        display: block;
        margin: 10px auto 0;
    }
    .tig{
        position: absolute;
        bottom: -32px;
        left: 50%;
        color: #fff;
        transform: translateX(-50%);
    }
    .btnBox{
        margin-top: 5px;
        display: flex;
        .txtBox{
            flex: 1;
        }
        button{
            // width: 100px;
            margin-left: 15px;
            border: 1px solid #3E3F42;
        }
    }
}
</style>