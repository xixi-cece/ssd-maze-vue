<template>
    <div id="partvorlist">
        <div class="topTions">
            <Input class="serval" v-model="serMent" placeholder="搜索实习生" icon="ios-search" @on-change="serchData" clearable/>
            <Button class="btnOpt" @click="addModal" custom-icon="iconfont iconliebiao_tianjia">添加实习生</Button>
        </div>
        <div class="tableBox">
            <Table :columns="columns" :data="datalist" @on-filter-change="filterData">
                <template slot="chinesename" slot-scope="{row}">
                    <span class="cname">{{row.chinesename}}</span>
                </template>
                <template slot="status" slot-scope="{row}">
                    <div :class="row.status=='active'?'blue':''" @click="showEffect(row)" style="cursor:pointer;">
                        <Icon type="ios-checkmark-circle" />
                        <span class="fontchine">{{row.status}}</span>
                    </div>
                </template>
                <template slot="isMentee" slot-scope="{row}">
                    <span>{{row.isMentee==0?'否':'是'}}</span>
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
        
        <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
        <!-- 重置密码 -->
        <Modal
            v-model="resizepsw"
            width="388px"
            class="adduserinfo"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>重置密码</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="resizepsw=false">
                </span>
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">中文名</h4>
                    <div class="contval">{{curtMentor.chinesename}}</div>
                </li>
                <li>
                    <h4 class="labTile">用户名</h4>
                    <div class="contval">{{curtMentor.username}}</div>
                </li>
            </ul>
            <div class="tip">是否将密码重置为默认状态？</div>
            <div class="footBox">
                <Button @click="resizePsw">确认</Button>
                <Button @click="resizepsw=false">取消</Button>
            </div>
        </Modal>
        <!-- 状态修改 -->
        <Modal
            width="388px"
            class="adduserinfo"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
            v-model="effectMod"
        >
            <h3 slot="header" class="headTile">
                <span>有效状态修改</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="effectMod=false">
                </span>
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">实习生姓名</h4>
                    <div class="contval">{{curtMentor.chinesename}}</div>
                </li>
                <li>
                    <h4 class="labTile">当前状态</h4>
                    <div class="contval">{{curtMentor.status}}</div>
                </li>
            </ul>
            <div class="tip" style="color:#333;">是否将当前状态改为：<span style="color: #1665D8;">{{curtMentor.status=='active'?'inactive':'active'}}</span></div>
            <div class="footBox">
                <Button @click="sureMod">确认</Button>
                <Button @click="caceMod">取消</Button>
            </div>
        </Modal>
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
                    <img class="close" src="../images/close.png" @click="showModal=false">
                </span>
            </h3>
            <div>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">姓名<b class="red">*</b></h4>
                        <Input v-model="curtMentor.chinesename" @on-keyup='changeTxt(curtMentor.chinesename)' placeholder="姓名" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">年份<b class="red">*</b></h4>
                        <DatePicker type="year" :value="String(curtMentor.year)" @on-change='getYear' placeholder="年份" style="width: 100%;"></DatePicker>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">用户名<b class="red">*</b></h4>
                        <Input v-model="curusname" disabled placeholder="用户名" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">电话</h4>
                        <Input v-model="curtMentor.phone" placeholder="电话" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">微信</h4>
                        <Input v-model="curtMentor.wxid" placeholder="微信" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">邮箱</h4>
                        <Input v-model="curtMentor.email" placeholder="邮箱" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">时薪(￥)<b class="red">*</b></h4>
                        <Input v-model="curtMentor.hourlyWage" placeholder="时薪" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">支付方式<b class="red">*</b></h4>
                        <Select v-model="curtMentor.paymentType" style="width:100%;">
                            <Option v-for="item in paylist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                        </Select>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">目标账号<b class="red">*</b></h4>
                        <Input v-model="curtMentor.paymentAccount" placeholder="目标账号" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile oneline">
                            <span class="squar">是否是学员？</span>
                            <RadioGroup class="squar" style="text-align:right;" v-model="curtMentor.isMentee">
                                <Radio :label="1">是</Radio>
                                <Radio :label="0">否</Radio>
                            </RadioGroup>
                        </h4>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile oneline">
                            <span class="squar">有效状态</span>
                            <RadioGroup class="squar" style="text-align:right;" v-model="curtMentor.status">
                                <Radio label="active"></Radio>
                                <Radio label="inactive"></Radio>
                            </RadioGroup>
                        </h4>
                    </li>
                </ul>
                <div class="ftBtn" style="margin:20px 0 10px;">
                    <Button class="bluebtn" @click="sureEdit">确认</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import pingyin from 'pinyin';
import { utility } from '../assets/lib/common';

export default {
    name: 'partvorlist',
    components: {

    },
    data() {
        return {
            serMent:'',
            resizepsw:false,
            effectMod:false,
            showModal:false,
            currentpage:1,
            pageSize:10,
            totalpage:0,
            titlename:'添加实习生',
            columns:[
                {
                    title: '实习生姓名',
                    slot: 'chinesename',
                    minWidth:110
                },
                // {
                //     title: '年份',
                //     key: 'year',
                //     minWidth:100
                // },
                // {
                //     title: '邮箱',
                //     key: 'email',
                //     tooltip:true,
                //     minWidth:120
                // },
                // {
                //     title: '用户名',
                //     key: 'username',
                //     tooltip:true,
                //     minWidth:120
                // },
                {
                    title: '有效状态',
                    slot: 'status',
                    minWidth:100,
                    filters: [
                        {"value":"inactive","label":"inactive"},
                        {"value":"active","label":"active"}
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        return value == row.status;
                    }
                },
                {
                    title: '是否是学员',
                    slot: 'isMentee',
                    align:'left',
                    minWidth:110
                },
                {
                    title: '时薪(￥)',
                    key: 'hourlyWage',
                    minWidth:85
                },
                {
                    title: '支付方式',
                    key: 'paymentTypeCN',
                    minWidth:120,
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
                    tooltip:true,
                    minWidth:120
                },
                {
                    slot: 'option',
                    minWidth:50,
                    align:'right',
                    renderHeader:(h,i)=>{
                        return h('span',{})
                        // return h('Button',{
                        //     style:{
                        //         backgroundColor:'#fff',
                        //         color:'#F6AB2F',
                        //         width:'120px',
                        //         border:'1px solid #F6AB2F'
                        //     },
                        //     props:{
                        //        'customIcon':'iconfont iconliebiao_tianjia'
                        //     },
                        //     on:{
                        //         click:()=>{
                        //             this.addModal();
                        //         }
                        //     }
                        // },'添加实习生',[])
                    }
                }
            ],
            datalist:[],
            options:[
                {
                    val:'编辑实习生',
                    check:false
                },
                {
                    val:'重置密码',
                    check:false
                }
                // ,
                // {
                //     val:'删除实习生',
                //     check:false
                // }
            ],
            paylist:[
                {
                    key:'zfb',
                    value:'支付宝'
                },
                {
                    key:'wx',
                    value:'微信'
                },
                {
                    key:'bandCard',
                    value:'银行卡'
                },
                {
                    key:'QuickPay',
                    value:'QuickPay'
                },
                {
                    key:'Paypal',
                    value:'Paypal'
                }
            ],
            paymentType:'',
            status:'',
            curtMentor:{},
            curusname:''
        };
    },
    computed: {

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
    watch: {

    },
    methods: {
        filterData(data,v,c){
            if(data.slot&&data.slot=='status'){
                this.status = data._filterChecked.length?data._filterChecked[0]:'';
            }else if(data.key&&data.key=='paymentTypeCN'){
                this.paymentType = data._filterChecked.length?data._filterChecked[0]:'';
            };
            this.serchData();
        },
        serchData(){
            this.currentpage = 1;
            this.pageSize = 10;
            this.getData();
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
        closepop(data,row){
            let arr = this.options;
            arr.forEach(v=>{
                v.check = false;
                if(data.val==v.val){
                    v.check = true;
                };
            });
            this.options = arr;
            // console.log(data);
            if(data.val=='编辑实习生'){
                this.showModal = true;
                this.titlename = '编辑实习生';
                this.curtMentor = JSON.parse(JSON.stringify(row));
                this.curusname = this.curtMentor.username;
            }else if(data.val=='重置密码'){
                this.resizepsw = true;
                this.curtMentor = JSON.parse(JSON.stringify(row));
            };
        },
        changeTxt(data){
            let val = pingyin(data,{
                style:pingyin.STYLE_NORMAL
            })
            val = val.join('');
            this.curusname = val;
        },
        resizePsw(){
            this.resizepsw = false;
            this.$https.resizeStatu({
                id:this.curtMentor.userId,
                type:'password'
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        showEffect(data){
            this.effectMod = true;
            this.curtMentor = data;
        },
        getYear(data){
            this.curtMentor.year = data;
        },
        sureMod(){
            this.effectMod = false;
            this.$https.chageEffect({
                identity:'intern',
                status:this.curtMentor.status=='active'?'inactive':'active',
                userId:this.curtMentor.userId
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        caceMod(){
            this.effectMod = false;
        },
        addModal(){
            this.showModal = true;
            this.titlename = '添加实习生';
            this.curtMentor = {
                isMentee:0,
                status:'active'
            },
            this.curusname = '';
        },
        sureEdit(){
            if(this.titlename=='编辑实习生'){
                this.showModal = false;
                this.$https.editInter({
                    userId:this.curtMentor.userId,
                    email:this.curtMentor.email,
                    identity:"intern",
                    chinesename:this.curtMentor.chinesename,
                    year:Number(this.curtMentor.year),
                    hourlyWage:this.curtMentor.hourlyWage,
                    status:this.curtMentor.status,
                    isMentee:this.curtMentor.isMentee,
                    paymentAccount:this.curtMentor.paymentAccount,
                    paymentType:this.curtMentor.paymentType,
                    phone:this.curtMentor.phone,
                    wxid:this.curtMentor.wxid
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
                this.$https.addIntermente({
                    email:this.curtMentor.email,
                    chinesename:this.curtMentor.chinesename,
                    year:Number(this.curtMentor.year),
                    hourlyWage:this.curtMentor.hourlyWage,
                    status:this.curtMentor.status,
                    isMentee:this.curtMentor.isMentee,
                    paymentAccount:this.curtMentor.paymentAccount,
                    paymentType:this.curtMentor.paymentType,
                    phone:this.curtMentor.phone,
                    wxid:this.curtMentor.wxid
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
            // const email = this.curtMentor.email;
            const chinesename = this.curtMentor.chinesename;
            const hourlyWage = this.curtMentor.hourlyWage;
            const status = this.curtMentor.status;
            const year = this.curtMentor.year
            const paymentAccount = this.curtMentor.paymentAccount;
            const paymentType = this.curtMentor.paymentType;
            if(/^\s*$/.test(chinesename)||/^\s*$/.test(hourlyWage)||!status||/^\s*$/.test(year)||/^\s*$/.test(paymentAccount)||!paymentType){
                return false;
            };
            return true;
        },
        getData(){
            this.$https.getInterlist({
                page:this.currentpage,
                pageSize:this.pageSize,
                keyword:this.serMent,
                paymentType:this.paymentType,
                status:this.status
            }).then(res=>{
                if(res&&res.code==200){
                    res.data.list.forEach(v=>{
                        v.paymentTypeCN = utility.filterArr(v.paymentType,this.paylist);
                    });
                    this.totalpage = res.data.count;
                    this.datalist = res.data.list;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        }
    }
};
</script>

<style lang="scss">
#partvorlist{
    .topTions{
        margin-bottom: 20px;
        height: 35px;
        width: 100%;
        position: relative;
        .serval{
            width: 180px;
        }
        .btnOpt{
            font-size: 14px;
            background-color: transparent;
            border-color: #F6AB2F;
            color:#F6AB2F;
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
        }
    }
    .btm_page{
        text-align: center;
        padding: 15px 0;
    }
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
    .pink{
        color: #D94C7B;
    }
}
.red{
    color: #E6492D;
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