<template>
    <div id="partmorlist">
        <div class="topTions">
            <Input class="serval" v-model="serMent" placeholder="搜索导师" icon="ios-search" @on-change="serchData" clearable/>
            <Button class="btnOpt" @click="addModal" custom-icon="iconfont iconliebiao_tianjia">添加导师</Button>
        </div>
        <div class="tableBox">
            <Table :columns="columns" :data="datalist" @on-filter-change="filterData">
                <template slot="chinesename" slot-scope="{row}">
                    <!-- <span class="cname" @click.stop="lookuser(row)">{{row.chinesename}}</span> -->
                    <span class="cname">{{row.chinesename}}</span>
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
                <template slot="undergraduateSchool" slot-scope="{row}">
                    <Tooltip :content="row.graduateSchool?row.graduateSchool:row.undergraduateSchool" :transfer="true">
                        <div class="ell">{{row.graduateSchool?row.graduateSchool:row.undergraduateSchool}}</div>
                    </Tooltip>
                </template>
                <template slot="status" slot-scope="{row}">
                    <div :class="row.status=='active'?'blue':''" @click="showEffect(row)" style="cursor:pointer;">
                        <Icon type="ios-checkmark-circle" />
                        <span class="fontchine">{{row.status}}</span>
                    </div>
                </template>
                <template slot="option" slot-scope="{row}">
                    <Poptip
                        :transfer="true"
                        placement="bottom"
                        :width='80'
                        v-model="row.showTip"
                        popper-class='poptip'
                    >
                        <!-- <Icon class="iconopt" custom="iconfont icongengduo" /> -->
                        <img src="../images/more.png" class="iconopt">
                        <ul slot='content'>
                            <li :class="['litem',itm.check?'gray':'']" v-for="itm in options" @click.stop="closepop(itm,row)" :key="itm.val">{{itm.val}}</li>
                        </ul>
                    </Poptip>
                </template>
            </Table>
        </div>
        <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
        <Modal
            v-model="showModal"
            class="adduserinfo"
            :closable="false"
            width="388"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>{{titlename}}</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="showModal=false">
                </span>
            </h3>
            <!-- <div v-if='titlename=="兼职导师工资详情"'>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">姓名</h4>
                        <div class="contval">{{curentMentor.chinesename}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">角色</h4>
                        <div class="contval">{{curentMentor.identity}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">日期</h4>
                        <div class="contval">{{curentMentor.identity}}</div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">时薪($)</h4>
                        <div class="contval">{{chinesename}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">当月工时</h4>
                        <div class="contval">{{vector}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">当月打分</h4>
                        <div class="contval">{{vector}}</div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">当月工资($)</h4>
                        <div class="contval">{{chinesename}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">支付方式</h4>
                        <div class="contval">{{vector}}</div>
                    </li>
                    <li>
                        <h4 class="labTile">目标账户</h4>
                        <div class="contval">{{vector}}</div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">明细列表</h4>
                        <div class="contval">{{chinesename}}</div>
                    </li>
                </ul>
            </div> -->
            <div v-if="titlename!='兼职导师工资详情'">
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">姓名<b class="red">*</b></h4>
                        <Input v-model="curentMentor.chinesename" @on-keyup='changeTxt(curentMentor.chinesename)' placeholder="姓名" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">角色<b class="red">*</b></h4>
                        <Select v-model="curentMentor.identity" style="width:100%;">
                            <Option v-for="item in userlist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                        </Select>
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
                        <Input v-model="curentMentor.phone" placeholder="电话" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">微信</h4>
                        <Input v-model="curentMentor.wxid" placeholder="微信" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">邮箱</h4>
                        <Input v-model="curentMentor.email" placeholder="邮箱" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">本科学校<b class="red">*</b></h4>
                        <Input v-model="curentMentor.undergraduateSchool" placeholder="本科学校" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">研究生学校</h4>
                        <Input v-model="curentMentor.graduateSchool" placeholder="研究生学校" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">时薪($)<b class="red">*</b></h4>
                        <Input v-model="curentMentor.hourlyWage" placeholder="时薪" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">支付方式<b class="red">*</b></h4>
                        <Select v-model="curentMentor.paymentType" style="width:100%;">
                            <Option v-for="item in paylist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                        </Select>
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile">目标账号<b class="red">*</b></h4>
                        <Input v-model="curentMentor.paymentAccount" placeholder="目标账号" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li style="margin-right:0;">
                        <h4 class="labTile oneline">
                            <span class="squar">有效状态</span>
                            <RadioGroup class="squar" style="text-align:right;" v-model="curentMentor.status">
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
                    <div class="contval">{{curentMentor.chinesename}}</div>
                </li>
                <li>
                    <h4 class="labTile">用户名</h4>
                    <div class="contval">{{curentMentor.username}}</div>
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
            class="adduserinfo statuchange"
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
                    <h4 class="labTile">导师姓名</h4>
                    <div class="contval">{{curentMentor.chinesename}}</div>
                </li>
                <li>
                    <h4 class="labTile">当前状态</h4>
                    <div class="contval">{{curentMentor.status}}</div>
                </li>
            </ul>
            <div class="tip" style="color:#333;">是否将当前状态改为：<span style="color: #1665D8;">{{curentMentor.status=='active'?'inactive':'active'}}</span></div>
            <div class="footBox">
                <Button @click="sureMod">确认</Button>
                <Button @click="caceMod">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import pingyin from 'pinyin';
import { utility } from '../assets/lib/common';

export default {
    name: 'partmorlist',
    components: {

    },
    data() {
        return {
            showModal:false,
            resizepsw:false,
            effectMod:false,
            titlename:'兼职导师工资详情',
            serMent:'',
            paylist:[],
            options:[
                {
                    val:'编辑导师',
                    check:false
                },
                {
                    val:'重置密码',
                    check:false
                }
                // ,
                // {
                //     val:'删除导师',
                //     check:false
                // }
            ],
            userlist:[],
            columns:[
                {
                    title: '导师姓名',
                    slot: 'chinesename',
                    minWidth:100,
                    tooltip:true
                },
                {
                    title: '身份',
                    // slot: 'identity',
                    slot: 'identityCN',
                    align:'left',
                    minWidth:140,
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
                // {
                //     title: '邮箱',
                //     key: 'email',
                //     tooltip:true,
                //     minWidth:120
                // },
                {
                    title: '有效状态',
                    slot: 'status',
                    minWidth:120,
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
                    title: '在读院校',
                    slot: 'undergraduateSchool',
                    width:300
                },
                // {
                //     title: '研究生学校',
                //     key: 'graduateSchool',
                //     minWidth:180
                // },
                {
                    title: '时薪($)',
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
                    minWidth:120,
                    tooltip:true
                },
                {
                    slot: 'option',
                    width:50,
                    align:'right',
                    renderHeader:(h,i)=>{
                        return h('span',{})
                        // return h('Button',{
                        //     style:{
                        //         backgroundColor:'#fff',
                        //         color:'#1665D8',
                        //         width:'104px',
                        //         border:'1px solid #1665D8'
                        //     },
                        //     props:{
                        //        'customIcon':'iconfont iconliebiao_tianjia'
                        //     },
                        //     on:{
                        //         click:()=>{
                        //             this.addModal();
                        //         }
                        //     }
                        // },'添加导师',[])
                    }
                }
            ],
            totalpage:0,
            pageSize:10,
            currentpage:1,
            identity:'',
            paymentType:'',
            status:'',
            datalist:[],
            curentMentor:{},//选择的项
            curusname:''
        };
    },
    computed: {

    },
    created() {

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
        filterData(data,v,c){
            if(data.slot&&data.slot=='identityCN'){
                this.identity = data._filterChecked.length?data._filterChecked[0]:'';
            }else if(data.slot&&data.slot=='status'){
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
            row.showTip = false;
            let arr = this.options;
            arr.forEach(v=>{
                v.check = false;
                if(data.val==v.val){
                    v.check = true;
                };
            });
            this.options = arr;
            if(data.val=='编辑导师'){
                this.showModal = true;
                this.titlename = '编辑导师';
                this.curentMentor = JSON.parse(JSON.stringify(row));
                this.curusname = row.username;
            }else if(data.val=='重置密码'){
                this.resizepsw = true;
                this.curentMentor = JSON.parse(JSON.stringify(row));
            };
        },
        resizePsw(){
            this.resizepsw = false;
            this.$https.resizeStatu({
                id:this.curentMentor.userId,
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
        changeTxt(data){
            let val = pingyin(data,{
                style:pingyin.STYLE_NORMAL
            })
            val = val.join('');
            this.curusname = val;
        },
        // lookuser(data){
        //     this.showModal = true;
        //     this.titlename = '兼职导师工资详情';
        //     this.$https.lookmentordetail({
        //         username:data.username
        //     }).then(res=>{
        //         if(res&&res.code==200){
        //             this.curentMentor = res.data;
        //         }else{
        //             this.$Message.error(res.msg);
        //         }
        //     })
        // },
        sureEdit(){
            if(this.titlename=='编辑导师'){
                this.showModal = false;
                this.$https.editmenInfo({
                    userId:this.curentMentor.userId,
                    identity:this.curentMentor.identity,
                    email:this.curentMentor.email,
                    chinesename:this.curentMentor.chinesename,
                    hourlyWage:this.curentMentor.hourlyWage,
                    status:this.curentMentor.status,
                    undergraduateSchool:this.curentMentor.undergraduateSchool,
                    paymentAccount:this.curentMentor.paymentAccount,
                    paymentType:this.curentMentor.paymentType,
                    graduateSchool:this.curentMentor.graduateSchool,
                    phone:this.curentMentor.phone,
                    wxid:this.curentMentor.wxid
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
                this.$https.addmenInfo({
                    identity:this.curentMentor.identity,
                    email:this.curentMentor.email,
                    chinesename:this.curentMentor.chinesename,
                    hourlyWage:this.curentMentor.hourlyWage,
                    status:this.curentMentor.status,
                    undergraduateSchool:this.curentMentor.undergraduateSchool,
                    paymentAccount:this.curentMentor.paymentAccount,
                    paymentType:this.curentMentor.paymentType,
                    graduateSchool:this.curentMentor.graduateSchool,
                    phone:this.curentMentor.phone,
                    wxid:this.curentMentor.wxid
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            };
        },
        addModal(){
            this.showModal = true;
            this.titlename = '添加兼职导师';
            this.curentMentor = {
                status:'active'
            };
            this.curusname = '';
        },
        isNull(){
            const identity = this.curentMentor.identity;
            const chinesename = this.curentMentor.chinesename;
            const hourlyWage = this.curentMentor.hourlyWage;
            const status = this.curentMentor.status;
            const undergraduateSchool = this.curentMentor.undergraduateSchool
            const paymentAccount = this.curentMentor.paymentAccount;
            const paymentType = this.curentMentor.paymentType;
            // const email = this.curentMentor.email;
            // const graduateSchool = this.curentMentor.graduateSchool;
            if(!identity||/^\s*$/.test(chinesename)||/^\s*$/.test(hourlyWage)||!status||/^\s*$/.test(undergraduateSchool)||/^\s*$/.test(paymentAccount)||!paymentType){
                return false;
            };
            return true;
        },
        showEffect(data){
            this.effectMod = true;
            this.curentMentor = data;
        },
        sureMod(){
            this.effectMod = false;
            this.$https.chageEffect({
                identity:this.curentMentor.identity,
                status:this.curentMentor.status=='active'?'inactive':'active',
                userId:this.curentMentor.userId
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
        getList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.paylist = res.data.paytype;
                    let arr = [];
                    res.data.role.forEach(v=>{
                        if(v.key=='specialist'||v.key=='customizedmentor'){
                            arr.push(v);
                        };
                    });
                    this.userlist = arr;
                    this.getData();
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getData(){
            this.$https.getjzmentor({
                identity:this.identity,
                paymentType:this.paymentType,
                status:this.status,
                keyword:this.serMent,
                page:this.currentpage,
                pageSize:this.pageSize
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalpage = res.data.count;
                    res.data.list.forEach(v=>{
                        v.showTip = false;
                        v.identityCN = utility.filterArr(v.identity,this.userlist);
                        v.paymentTypeCN = utility.filterArr(v.paymentType,this.paylist);
                    })
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
.btm_page{
    text-align: center;
    padding: 15px 0;
}
#partmorlist{
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
            border-color: #1665D8;
            color:#1665D8;
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
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
    .cname{
        color: #1665D8;
    }
    .idedBox{
        // border: 1px solid #BCBCBC;
        // text-align: left;
        border-radius: 4px;
        padding: 4px 0;
    }
    .fontchine{
        margin-left: 4px;
    }
    .idIcon{
        font-size: 18px;
    }
    .iconopt{
        // opacity: .4;
        cursor: pointer;
        width: 22px;
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
.statuchange{
    .labTile{
        margin:0!important;
    }
}
.adduserinfo{
    .red{
        color: #f00;
    }
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #3E3F42;
        font-size: 18px;
        padding: 21px 16px;
        .headTile{
            font-size: 18px;
        }
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
        margin-bottom: 22px;
        >li{
            flex: 1;
            box-sizing: border-box;
            &:first-of-type{
                margin-right: 30px;
            }
            .labTile{
                font-weight: 400;
                font-size: 14px;
                color: #9DA0A4;
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
            margin-top: 20px;
            margin-bottom: 10px;
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