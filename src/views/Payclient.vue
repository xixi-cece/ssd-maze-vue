<template>
    <div id="Payclient">
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="data">
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;cursor:pointer;" @click="gopayDetail(row)">{{row.chinesename}}</span>
                    </template>
                    <template slot-scope="{row}" slot="typecn">
                        <span v-if="row.typecn" class="typeBtn">
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
                    <template slot-scope="{row}" slot="split">
                        <span>{{row.split?'是':'否'}}</span>
                    </template>
                    <template slot-scope="{row}" slot="btntype">
                        <div class="btnBox">
                            <button :class="['btn gray',row.financeConfirm?'gren':'orange']">{{row.financeConfirm?'已确认':'未确认'}}</button>
                            <button class="btn blue" @click="openBack(row)">查看付款信息</button>
                            <button v-if='row.financeConfirm' class="btn green" @click="gopayFinsh(row)">完成签约</button>
                            <button v-else class="btn gray">完成签约</button>
                        </div>
                    </template>
                </Table>
            </div>
        </div>
        <pay-look v-if="showPay" :showModal='showPay' :dataJoson="curtObj" @getpay="changepay"></pay-look>
        <finsh-sign :showToast='showInfo' :dataObj="curtObj" @closefinsh="closeModal"></finsh-sign>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Clipboard from 'clipboard';
import {utility} from '../assets/lib/common';
import FinshSign from '../components/Finshsign';
import PayLook from '../components/payLook';

export default {
    data() {
        return {
            showPay:false,
            showInfo:false,
            curtObj:{},//选择的
            columns:[
                // {
                //     title:' ',
                //     slot:'lookbtn',
                //     minWidth:85
                // },
                {
                    title: '学员姓名',
                    slot: 'chinesename',
                    minWidth: 110,
                    sortable: true
                },
                {
                    title: '申请类型',
                    minWidth:180,
                    slot: 'typecn',
                    sortable: true,
                    filters: [
                        {
                            label: '本科',
                            value: 'u'
                        },
                        {
                            label: '研究生',
                            value: 'g'
                        },
                        {
                            label: '转学',
                            value: 't'
                        },
                        {
                            label: '英国',
                            value: 'uk'
                        },
                        {
                            label: '单篇PS',
                            value: 'p'
                        },
                        {
                            label: '其它单篇',
                            value: 's'
                        },
                        {
                            label: '其他国家',
                            value: 'c'
                        },
                        {
                            label: '其他',
                            value: 'o'
                        }
                    ],
                    // filterMultiple: false,//是否可以多选
                    filterMethod (value, row) {
                        if(value === 'u') {
                            return row.type === 'u';
                        }else if (value === 'g') {
                            return row.type === 'g';
                        }else if (value === 't') {
                            return row.type === 't';
                        }else if (value === 'uk') {
                            return row.type === 'uk';
                        }else if (value === 'p') {
                            return row.type === 'p';
                        }else if (value === 's') {
                            return row.type === 's';
                        }else if (value === 'o') {
                            return row.type === 'o';
                        }
                    }
                },
                {
                    title: '合同总价',
                    minWidth: 92,
                    key: 'amount'
                },
                {
                    title: '是否分期',
                    minWidth: 92,
                    slot: 'split'
                },
                {
                    title: '已收款项',
                    minWidth: 92,
                    key: 'paid'
                },
                // {
                //     title: '下次付款时间',
                //     minWidth: 140,
                //     sortable: true,
                //     key: 'nextduedate'
                // },
                {
                    title: '剩余款项',
                    minWidth: 92,
                    align: 'center',
                    key: 'left'
                },
                {
                    title: ' ',
                    align: 'center',
                    minWidth:360,
                    slot: 'btntype'
                }
            ],
            data:[
                // {
                //     lookbtn:'',
                //     chinesename:'sdsfsfs',
                //     typecn:'其他单篇',
                //     totalbookmoney:'1000元',
                //     isSendtime:'是',
                //     getmoney:'3000元',
                //     nextpaytime:'2020/02/12',
                //     endmoney:'1000元',
                //     btntype:""
                // }
            ]
        };
    },
    components: {
        FinshSign,
        PayLook
    },
    computed: {
        // ...mapState(['listInfo'])
    },
    watch: {
        // listInfo:{
        //     handler(now,old){
        //         this.data = now.donelist;
        //     },
        //     deep:true,
        //     immediate:true
        // }
    },
    mounted() {
        this.getData();
    },
    methods: {
        copyAcout(data){
            // this.modal2 = false;
            let clipboard = new Clipboard('.suerBtn', {
                text: function () {
                    return data
                }
            });
            clipboard.on('success', (e)=>{
                this.$Message.success('复制成功！');
                // 释放内存
                clipboard.destroy();
                e.clearSelection();
            });
            clipboard.on('error', (e)=>{
                this.$Message.error('复制失败！');
                clipboard.destroy();
                e.clearSelection();
            });
        },
        getData(){
            this.$https.getdonepayment({}).then(res=>{
                if(res&&res.status=='success'){
                    const dataArr = res.paymentdonelist;
                    dataArr.forEach(v=>{
                        // if(v.nextduedate){
                        //     v.nextduedate = utility.framateDate(v.nextduedate);
                        // };
                        v.btntype = "";
                    });
                    this.data = dataArr;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            });
        },
        openBack(data){
            this.showPay = true;
            this.curtObj = data;
        },
        changepay(data){
            this.showPay = false;
        },
        gopayFinsh(data){
            this.showInfo = true;
            this.curtObj = data;
        },
        closeModal(data){
            this.showInfo = false;
            if(data){
                this.$router.push({
                    path:'/sales/Sinclient'
                })
            }
        },
        gopayDetail(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id,
                query:{
                    type:'payfinsh'
                }
            });
        }
    }
};
</script>

<style lang="scss">
#Payclient{
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
            .btnBox{
                padding: 5px 0;
                .btn{
                    flex: 1;
                    border: none;
                    display: inline-block;
                    width: 100px;
                    margin-right: 10px;
                    border-radius: 4px;
                    background-color: #fff;
                    font-size: 12px;
                    width: 80px;
                    margin-bottom: 5px;
                    padding: 5px 10px;
                    cursor: pointer;
                    &:first-of-type{
                        min-width: 110px;
                    }
                }
                .green{
                    border: 1px solid #51BD63;
                    color: #51BD63;
                }
                .blue{
                    border: 1px solid #1665D8;
                    color: #1665D8;
                    width: 96px;
                }
                .gray{
                    background-color: #F5F6FA;
                }
                .gren{
                    color: #51BD63;
                }
                .orange{
                    color: #F5BA5A;
                }
            }
        }
    }
}
</style>