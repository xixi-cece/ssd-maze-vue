<template>
    <div id="SendBook">
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="data">
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;cursor:pointer;" @click="goContract(row)">{{row.chinesename}}</span>
                    </template>
                    <template slot-scope="{row}" slot="typecn">
                        <span class="typeBtn">
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
                    <template slot-scope="{row}" slot="btnnext">
                        <Button class="nextbtn bluebtn" @click="openBook(row,1)">查看合同信息</Button>
                        <Button class="nextbtn greenbtn" @click="openBook(row,2)">填写付款</Button>
                    </template>
                </Table>
            </div>
        </div>
        <paydetail v-if="showModal" :selId='selId' :showPay='showModal' :menteeName='menteeName' @finsh='goLink'></paydetail>
        <contract v-if="showContract" :showToast='showContract' :hascontract="contractkey" :isLook="true" :menteedata="selmenteeobj" @finsh="closeContract"></contract>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { utility } from '../assets/lib/common';
import Paydetail from '../components/Paydetail';
import Contract from '../components/Contract';

export default {
    props: {

    },
    data() {
        return {
            contractkey:true,//是否有合同(查看详请用)
            showModal:false,
            showContract:false,
            selmenteeobj:{},//当前选择
            selId:'',//用户id
            menteeName:'',//学员姓名
            columns:[
                // {
                //     title:' ',
                //     slot:'lookbtn',
                //     minWidth:90
                // },
                {
                    title: '学员姓名',
                    minWidth:100,
                    sortable: true,
                    slot: 'chinesename'
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
                            label: '其他单篇',
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
                    title: '合同发送时间',
                    sortable: true,
                    minWidth:120,
                    key: 'createDate'
                },
                {
                    title: '合同编号',
                    minWidth:100,
                    key: 'contractkey'
                },
                {
                    title: ' ',
                    minWidth:250,
                    slot: 'btnnext'
                }
            ],
            data:[
                // {
                //     lookbtn:'',
                //     meteenName:'sdsd',
                //     typecn:'其他单篇',
                //     sendtime:'2019/01/30',
                //     mangernum:'wewerwfwffwf',
                //     btnnext:''
                // }
            ]
        };
    },
    computed: {
        // ...mapState(['listInfo'])
    },
    watch: {
        // listInfo:{
        //     handler(now,old){
        //         this.data = now.signinglist;
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
        openBook(data,type){
            // console.log(data)
            this.selmenteeobj = data;
            this.selId = data.id;
            this.menteeName = data.chinesename;
            if(type==2){
                this.showModal = true;
            }else{
                this.showContract = true;
            }
        },
        closeContract(){
            this.showContract = false;
        },
        getData(){
            this.$https.getsigning({}).then(res=>{
                if(res&&res.status=='success'){
                    const dataArr = res.signinglist;
                    dataArr.forEach(v=>{
                        // v.lookbtn = "";
                        v.btnnext = "";
                        if(v.createDate){
                            v.createDate = utility.framateDate(v.createDate);
                        }
                    });
                    this.data = dataArr;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            });
        },
        goContract(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id,
                query:{
                    type:'contract'
                }
            });
        },
        goLink(data){
            const isSure = data;
            this.showModal = false;
            this.$https.getcontdetail({
                id:this.selmenteeobj.id
            }).then(res=>{
                if(res&&res.code==200){
                    // if(res.data.splitperiodfinished==1){//分期金额是否都填写完（0未结束，1，已结束）
                    //     this.$bus.$emit('uplist');
                    //     if(data == 'end'){
                    //         this.$router.push({
                    //             path:'/sales/Payclient'
                    //         });
                    //     }else{
                    //         this.getData();
                    //     }
                    // }
                    if(isSure){
                        this.$bus.$emit('uplist');
                        this.$router.push({
                            path:'/sales/Payclient'
                        });
                    }
                }
            });
        }
    },
    components: {
        Paydetail,
        Contract
    },
};
</script>

<style lang="scss">
#SendBook{
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
                border:1px solid #ddd;
                .ivu-icon {
                    font-size: 24px;
                }
            }
            .nextbtn{
                padding: 5px 10px;
                line-height: normal;
                display: inline-block;
                vertical-align: middle;
                border:none;
                font-size: 13px;
                background-color: #fff;
                border-radius: 4px;
                cursor: pointer;
            }
            .bluebtn{
                color:#1665D8;
                border: 1px solid #1665D8;
            }
            .greenbtn{
                color:#51BD63;
                border: 1px solid #51BD63;
                margin-left: 30px;
            }
        }
    }
}
// 模态框
.sendBookToast{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #2E2E2E;
        color: #fff;
        font-size: 18px;
        padding: 21px 16px;
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
                font-size: 16px;
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
        font-size: 14px;
    }
    .saleBox{
        margin-top: 5px;
    }
    .suerBtn{
        width: 100%;
        height: 40px;
        margin-top: 2px;
        background-color: #51BD63;
        color: #fff;
        display: block;
        font-size: 18px;
        margin: 0 auto;
        border: 1px solid #51BD63;
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