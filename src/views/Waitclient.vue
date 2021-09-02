<template>
    <div id="waitClient">
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="data">
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;">{{row.chinesename}}</span>
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
                    <template slot-scope="{row}" slot="cta-button">
                        <div class="lastBox">
                            <span class="btnBox">
                                <button class="btn" @click="goPage(row)">开始勾搭</button>
                                <!-- <button class="btn sendOther" @click="reassign(row)">重新分配</button> -->
                                <button class="btn sendOther" @click="sendManger(row)">转让销售</button>
                            </span>
                        </div>
                    </template>
                </Table>
            </div>
        </div>
        <!-- 模态框 -->
        <Modal
            class="modToast"
            v-model="showModal"
            :closable="false"
            width="388"
            :footer-hide="true"
            :mask-closable="false"
        >
            <h3 slot="header" class="headTile">
                <span>转给其他销售</span>
                <img class="close" src="../images/close.png" @click="showModal=false">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{menteeName}}</span>
                </li>
                <li>
                    <h4 class="labTile">申请类型</h4>
                    <span class="labCont">{{concat}}</span>
                </li>
            </ul>
            <h4 class="tileTig">需要转给的销售</h4>
            <div class="saleBox">
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
            <div class="btmbtnBox">
                <Button class="suerBtn" @click="sureSend">确认</Button>
            </div>
            <!-- <p class="tig">点击空白区域取消</p> -->
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: {

    },
    data() {
        return {
            loading:false,
            showModal:false,
            columns:[
                // {
                //     title: '学员姓名',
                //     slot: 'chinesename',
                //     minWidth:120,
                //     sortable: true
                // },
                {
                    title: '联系人姓名',
                    key: 'contactname',
                    minWidth:160
                },
                {
                    title: '申请类型',
                    minWidth:150,
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
                    title: '手机',
                    minWidth:150,
                    tooltip:true,
                    key: 'phone'
                },
                {
                    title: '微信',
                    minWidth:150,
                    tooltip:true,
                    key: 'wechatcontact'
                },
                {
                    title: '地区',
                    minWidth:150,
                    tooltip:true,
                    key: 'area'
                },
                {
                    title: '所在学校',
                    minWidth:200,
                    sortable: true,
                    key: 'highschool'
                },
                {
                    title: '客户备注',
                    minWidth:220,
                    key: 'comment'
                },
                {
                    title: ' ',
                    minWidth:220,
                    slot: 'cta-button'
                }
            ],
            data:[],
            concatid:'',//选择的人的id
            concat:'',//联系人
            menteeName:'',//学员姓名
            slemanger:'',//要转给的销售
            mangerlist:[],
            options:[]
        };
    },
    computed: {
        // ...mapState(['listInfo'])
    },
    watch: {
        // listInfo:{
        //     handler(now,old){
        //         // this.data = now.newbielist;
        //     },
        //     immediate:true,
        //     deep:true
        // }
    },
    created() {

    },
    mounted() {
        this.getdataList();
        this.getlist();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        sendManger(data){
            this.concatid = data.id;
            this.concat = data.contactname;
            this.menteeName = data.chinesename;
            this.showModal = true;
        },
        sureSend(){
            const salepeo = this.slemanger;
            if(salepeo){
                this.showModal = false;
                this.$https.surereassignsales({
                    id:this.concatid,
                    sales:salepeo
                }).then(res=>{
                    if(res&&res.status=='success'){
                        this.$Message.success('操作成功！');
                        this.getdataList();
                    }else{
                        this.$Message.error(res.msg);
                    };
                });
            }else{
                this.$Message.error('请选择要转给的销售！');
            };
        },
        // goTalk(data){
        //     this.curtjson = data;
        //     if(!data.chinesename){
        //         this.writeName = true;
        //     }else{
        //         this.goPage();
        //     };
        // },
        goPage(data){
            this.$https.startStatus({
                id:data.id,
                newstatus:'ongoing'
            }).then(res=>{
                if(res&&res.status=='success'){
                    this.$bus.$emit('uplist');
                    this.$router.push({
                        path:'/sales/Talking'
                    });
                }else{
                    this.$Message.error('操作失败！');
                };
            });
        },
        getdataList(){
            this.$https.getnewList({}).then(res=>{
                if(res&&res.status=='success'){
                    const arr = res.newbielist;
                    this.data = arr;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        getlist(){
            this.$https.getsalesList({}).then(res=>{
                if(res&&res.status=="success"){
                    this.mangerlist = res.saleslist;
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
        },
        reassign(data){
            this.$https.startStatus({
                id:data.id,
                newstatus:'unassigned'
            }).then(res=>{
                if(res&&res.status=='success'){
                    this.$bus.$emit('uplist');
                    this.$Message.success('操作成功！');
                    this.getdataList();
                }else{
                    this.$Message.error('操作失败！');
                };
            })
        }
    },
    components: {

    },
};
</script>

<style lang="scss">
#waitClient{
    .dvBox{
        .tableBox{
            background-color: #fff;
            .ivu-table th{
                background-color: #fff;
                font-weight: 400;
                color: #B0B0B0;
                // &:nth-last-of-type(2){
                //     color: #1665D8;
                //     .ivu-table-sort i{
                //         color: #1665D8;
                //     }
                // }
            }
            .ivu-table td{
                font-size: 13.5px;
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
            .lastBox{
                display: flex;
            }
            .comment{
                vertical-align: middle;
                flex: 1;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                // text-overflow:-o-ellipsis-lastline;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .btnBox{
                display: inline-block;
                width: 174px;
                vertical-align: middle;
                margin-top: 6px;
            }
            .btn{
                border-radius: 4px;
                border:none;
                font-size: 12px;
                cursor: pointer;
                margin: 0 5px;
                color: #35AA45;
                border:1px solid #35AA45;
                background-color: transparent;
                padding: 6px 5px;
            }
            .sendOther{
                margin-left: 10px;
                color: #1665D8;
                border:1px solid #1665D8;
            }
        }
    }
}
// 模态框
.modToast{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #333;
        font-size: 18px;
        padding: 21px 16px;
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
            margin-bottom: 10px;
            &:first-of-type{
                margin-right: 30px;
            }
            .labTile{
                font-weight: 400;
                font-size: 14px;
                margin-bottom: 5px;
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
        color: #A3A3A3;
        font-weight: normal;
    }
    .saleBox{
        margin-top: 5px;
    }
    .btmbtnBox{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .suerBtn{
            display: block;
            width: 100px;
            background-color: #1665D8;
            color: #fff;
            border: 1px solid #1665D8;
            margin: 0 auto;
        }
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