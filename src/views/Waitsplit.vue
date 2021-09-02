<template>
    <div id="Waitsplit">
        <div class="formBox">
            <div class="tableBox">
                <Table :columns="columns" :data="datalist">
                    <!-- <template slot-scope="{row}" slot="lookbtn">
                        <button class="looktxt" @click="lookManger(row)">查看</button>
                    </template> -->
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
                    <!-- <template slot-scope="{row}" slot="comment">
                        <div class="contBox">
                            <span class="lastconcatval">{{row.comment}}</span>
                        </div>
                    </template> -->
                    <template slot-scope="{row}" slot="sendbtn">
                        <div class="contBox">
                            <button class="greenbtn" @click="sendSales(row)">分配销售</button>
                            <button class="redbtn" @click="delSales(row)">删除</button>
                        </div>
                    </template>
                </Table>
            </div>
        </div>
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
                <span>分配销售</span>
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
                    <h4 class="labTile">需要分配的销售</h4>
                    <Select v-model="slemanger" style="width:100%;">
                        <Option v-for="item in mangerlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                    </Select>
                </li>
            </ul>
            <!-- <h4 class="tileTig">需要分配的销售</h4>
            <div class="saleBox">
                <Select v-model="slemanger" style="width:100%;">
                    <Option v-for="item in mangerlist" :value="item.username" :key="item.chinesename">{{ item.chinesename }}</Option>
                </Select>
            </div> -->
            <Button class="suerBtn" @click="sureSend">确认分配</Button>
            <!-- <p class="tig">点击空白区域取消</p> -->
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'Waitsplit',
    components: {

    },
    data() {
        return {
            showModal:false,
            areamodal:'全部',
            columns:[
                // {
                //     title:' ',
                //     slot:'lookbtn',
                //     minWidth:90,
                // },
                // {
                //     title: '学员姓名',
                //     slot: 'chinesename',
                //     minWidth:120,
                //     sortable: true
                // },
                {
                    title: '联系人姓名',
                    key: 'contactname',
                    tooltip:true,
                    minWidth:130
                },
                // {
                //     title: '申请类型',
                //     minWidth:180,
                //     slot: 'typecn',
                //     sortable: true,
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
                // },
                {
                    title: '手机',
                    minWidth:140,
                    key: 'phone',
                    tooltip:true,
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
                    title: '学校',
                    minWidth:150,
                    tooltip:true,
                    key: 'highschool'
                },
                // {
                //     title: '表面来源',
                //     minWidth:120,
                //     key: 'fromtab'
                // },
                {
                    title: '客户留言',
                    tooltip:true,
                    minWidth:175,
                    key: 'comment'
                },
                {
                    title:' ',
                    minWidth:220,
                    slot:'sendbtn'
                }
            ],
            datalist:[],
            concatid:'',//选择的人的id
            concat:'',//联系人
            menteeName:'',//学员姓名
            slemanger:'',//要转给的销售
            mangerlist:[]
        };
    },
    computed: {

    },
    created() {

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
        sendSales(data){
            this.showModal = true;
            this.concatid = data.id;
            this.menteeName = data.chinesename;
        },
        sureSend(){
            const salepeo = this.slemanger;
            this.showModal = false;
            if(salepeo){
                this.showModal = false;
                this.$https.surereassignsales({
                    id:this.concatid,
                    sales:salepeo
                }).then(res=>{
                    if(res&&res.status=='success'){
                        this.$Message.success('操作成功！');
                        this.$bus.$emit('uplist',true);
                        this.getdatalist();
                    }else{
                        this.$Message.error('操作失败！');
                    };
                });
            }else{
                this.$Message.error('请选择要转给的销售！');
            };
        },
        lookManger(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id
            });
        },
        getdatalist(){
            this.$https.waitsplitlist({}).then(res=>{
                if(res&&res.status=='success'){
                    this.datalist = res.unassignedlist;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getlist(){
            this.$https.getsalesList({}).then(res=>{
                if(res&&res.status=="success"){
                    this.mangerlist = res.saleslist;
                    this.getdatalist();
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        delSales(data){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delsales({
                        id:data.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getdatalist();
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                },
                onCancel:()=>{}
            })
        }
    }
};
</script>

<style lang="scss">
#Waitsplit{
    .formBox{
        .tableBox{
            background-color: #fff;
            .ivu-table th{
                background-color: #fff;
                font-weight: 400;
                color: #B0B0B0;
            }
            .ivu-table td{
                font-size: 14px;
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
                .ivu-icon{
                    font-size: 24px;
                }
            }
            .contBox{
                display: flex;
                // .lastconcatval{
                //     flex: 1;
                //     display: -webkit-box;
                //     text-overflow: ellipsis;
                //     text-overflow: -o-ellipsis-lastline;
                //     overflow: hidden;
                //     -webkit-line-clamp:2;
                //     line-clamp: 2;
                //     -webkit-box-orient:vertical; 
                //     margin-right: 15px;
                //     vertical-align: middle;
                // }
                .greenbtn{
                    padding: 0 10px;
                    line-height: normal;
                    display: inline-block;
                    vertical-align: middle;
                    background-color: #fff;
                    color: #51BD63;
                    border:1px solid #51BD63;
                    border-radius: 4px;
                    height: 30px;
                    cursor: pointer;
                    margin-top: 6px;
                }
                .redbtn{
                    padding: 0 10px;
                    line-height: normal;
                    display: inline-block;
                    vertical-align: middle;
                    background-color: #fff;
                    color: #f00;
                    border:1px solid #f00;
                    border-radius: 4px;
                    height: 30px;
                    cursor: pointer;
                    margin-top: 6px;
                    margin-left: 15px;
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