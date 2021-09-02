<template>
    <div id="partworklist">
        <!-- <Button class="btnOpt" @click="addModal" custom-icon="iconfont iconliebiao_tianjia">添加合作方</Button> -->
        <div class="tableBox">
            <Table :columns="columns" :data="datalist">
                <template slot="partnerName" slot-scope="{row}">
                    <span class="cname">{{row.partnerName}}</span>
                </template>
                <template slot="option" slot-scope="{row}">
                    <Poptip
                        :transfer="true"
                        placement="bottom"
                        :width='80'
                        popper-class='poptip'
                    >
                        <Icon class="iconopt" custom="iconfont icongengduo" />
                        <ul slot='content'>
                            <li :class="['litem',itm.check?'gray':'']" v-for="itm in options" @click.stop="closepop(itm,row)" :key="itm.val">{{itm.val}}</li>
                        </ul>
                    </Poptip>
                </template>
            </Table>
        </div>
        <Modal
            v-model="showModal"
            class="adduserinfo"
            width="388px"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>{{titlename}}</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="showModal = false;">
                </span>
            </h3>
            <div>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">合作机构名称</h4>
                        <Input v-model="curtPartner.partnerName" placeholder="姓名" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">所在城市</h4>
                        <Input v-model="curtPartner.partnerCity" placeholder="所在城市" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">机构类别</h4>
                        <Select v-model="curtPartner.partnerType" style="width:100%;">
                            <Option v-for="item in jglist" :value="item.value" :key="item.key">{{ item.value }}</Option>
                        </Select>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">返点比例</h4>
                        <Input v-model="curtPartner.rebateProportion" placeholder="返点比例" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">支付方式</h4>
                        <Select v-model="curtPartner.paymentType" style="width:100%;">
                            <Option v-for="item in paylist" :value="item.label" :key="item.label">{{ item.label }}</Option>
                        </Select>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">目标账号</h4>
                        <Input v-model="curtPartner.paymentAccount" placeholder="目标账号" style="width: 100%;" />
                    </li>
                </ul>
                <div class="ftBtn">
                    <Button class="bluebtn" @click="sureEdit">确认</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'partworklist',
    components: {

    },
    data() {
        return {
            showModal:false,
            titlename:'添加合作方',
            chinesename:'',
            vector:'',
            columns:[
                {
                    title: '机构名称',
                    slot: 'partnerName',
                    minWidth:130,
                    sortable: true
                },
                {
                    title: '机构类别',
                    key: 'partnerType',
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '所在城市',
                    key: 'partnerCity',
                    minWidth:180,
                    sortable: true
                },
                {
                    title: '返点比例',
                    key: 'rebateProportion',
                    minWidth:120
                },
                {
                    title: '支付方式',
                    key: 'paymentType',
                    minWidth:150,
                    sortable: true
                },
                {
                    title: '目标账号',
                    key: 'paymentAccount',
                    minWidth:180
                },
                {
                    slot: 'option',
                    minWidth:150,
                    align:'right',
                    renderHeader:(h,i)=>{
                        return h('Button',{
                            style:{
                                backgroundColor:'#fff',
                                color:'#34AA44',
                                width:'120px',
                                border:'1px solid #34AA44'
                            },
                            props:{
                               'customIcon':'iconfont iconliebiao_tianjia'
                            },
                            on:{
                                click:()=>{
                                    this.addModal();
                                }
                            }
                        },'添加合作方',[])
                    }
                }
            ],
            datalist:[],
            options:[
                {
                    val:'编辑合作方',
                    check:false
                }
                // ,
                // {
                //     val:'删除合作方',
                //     check:false
                // }
            ],
            paylist:[
                {
                    label:'银行卡'
                },
                {
                    label:'支付宝'
                },
                {
                    label:'微信'
                }
            ],
            jglist:[
                // {
                //     label:'考试培训'
                // },
                // {
                //     label:'科研项目'
                // },
                // {
                //     label:'技能培训'
                // },
                // {
                //     label:'竞赛辅导'
                // },
                // {
                //     label:'课外活动'
                // },
                // {
                //     label:'艺术辅导'
                // },
                // {
                //     label:'申请辅导'
                // },
                // {
                //     label:'商业渠道'
                // }
            ],
            curtPartner:{}
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getmapList();
        this.getData();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
        closepop(data,row){
            let arr = this.options;
            arr.forEach(v=>{
                v.check = false;
                if(data.val==v.val){
                    v.check = true;
                };
            });
            this.options = arr;
            if(data.val=='编辑合作方'){
                this.showModal = true;
                this.titlename = '编辑合作方';
                this.curtPartner = JSON.parse(JSON.stringify(row));
            }else if(data.val=='删除合作方'){
                
            };
        },
        addModal(){
            this.showModal = true;
            this.titlename = '添加合作方';
            this.curtPartner={};
        },
        sureEdit(){
            if(this.titlename=='编辑合作方'){
                this.showModal = false;
                this.$https.editfriend({
                    partnerCity:this.curtPartner.partnerCity,
                    partnerName:this.curtPartner.partnerName,
                    partnerType:this.curtPartner.partnerType,
                    rebateProportion:this.curtPartner.rebateProportion,
                    paymentAccount:this.curtPartner.paymentAccount,
                    paymentType:this.curtPartner.paymentType
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }else{
                const flag = this.isNull();
                if(!flag){
                    this.$Message.error('请填写完整再提交！');
                    return;
                };
                this.showModal = false;
                this.$https.addfriend({
                    partnerCity:this.curtPartner.partnerCity,
                    partnerName:this.curtPartner.partnerName,
                    partnerType:this.curtPartner.partnerType,
                    rebateProportion:this.curtPartner.rebateProportion,
                    paymentAccount:this.curtPartner.paymentAccount,
                    paymentType:this.curtPartner.paymentType
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        isNull(){
            const partnerCity = this.curtPartner.partnerCity;
            const partnerName = this.curtPartner.partnerName;
            const partnerType = this.curtPartner.partnerType;
            const rebateProportion = this.curtPartner.rebateProportion;
            const paymentAccount = this.curtPartner.paymentAccount;
            const paymentType = this.curtPartner.paymentType;
            if(!partnerCity||!partnerName||!partnerType||!rebateProportion||!paymentAccount||!paymentType){
                return false;
            };
            return true;
        },
        getmapList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.jglist = res.data.partner;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getData(){
            this.$https.friendList({}).then(res=>{
                if(res&&res.code==200){
                    this.datalist = res.data;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        }
    }
};
</script>

<style lang="scss">
.btnOpt{
    position: fixed;
    top: 18px;
    right: 15%;
    z-index: 12;
    font-size: 14px;
    background-color: #34AA44;
    color:#fff;
    &:hover{
        background-color: #34AA44;
        color:#fff;
        border-color: #34AA44;
    }
}
#partworklist{
    .ivu-table th{
        background-color: #fff;
        font-weight: 400;
        color: #B0B0B0;
    }
    .ivu-table td{
        font-size: 16px;
    }
    .cname{
        color: #1665D8;
        cursor: pointer;
    }
    .idedBox{
        border: 1px solid #BCBCBC;
        border-radius: 4px;
        text-align: center;
        padding: 4px 10px;
    }
    .fontchine{
        margin-left: 4px;
    }
    .iconopt{
        opacity: .4;
        cursor: pointer;
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
.poptip{
    min-width: 90px;
    text-align: center;
    z-index: 9!important;
    .ivu-poptip-body{
        padding: 10px 0;
    }
    .litem{
        padding: 4px 0;
        cursor: pointer;
    }
    .gray{
        background-color: #ddd;
    }
}
// 模态框
.adduserinfo{
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
            &:first-of-type{
                margin-right: 30px;
            }
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
        margin-top: 20px;
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