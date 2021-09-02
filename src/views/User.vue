<template>
    <div id="User">
        <div class="ltBox clearfix">
            <span class="itemBox" style="min-width:166px;width:auto;">
                <span>身份</span>
                <Select v-model="identity" class="selectitem" @on-change="serachdata">
                    <Option v-for="item in userlist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
            </span>
            <span class="itemBox">
                <span>所属办公室</span>
                <Select v-model="roomplace" class="selectitem" @on-change="serachdata">
                    <Option v-for="item in arealist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
            </span>
            <span class="itemBox">
                <span>年份</span>
                <DatePicker type="year" class="selectitem" :value="selyear" @on-change="seleDate" placeholder="年份"></DatePicker>
            </span>
            <span class="itemBox">
                <span>有效状态</span>
                <Select v-model="effectstatu" class="selectitem" @on-change="serachdata">
                    <Option v-for="item in effectlist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
            </span>
            <span @click="resizedata" class="itemBox" style="text-align:center;display:inline-block;cursor: pointer;background-color: #1665D8;color:#fff;width:90px;">重置</span>
        </div>
        <Input class="serchbox" search v-model="uname" clearable @on-change="serachdata" placeholder="搜索用户姓名"/>
        <div class="tableBox">
            <Button class="addSales" icon="ios-add-circle-outline" @click="addUser">添加用户</Button>
            <Table :columns="columns" :data="data">
                <template slot="chinesename" slot-scope="{row}">
                    <span class="cname" @click.stop="lookuser(row)">{{row.chinesename}}</span>
                </template>
                <!-- <template slot="identity" slot-scope="{row}">
                    <svg class="colicon" aria-hidden="true">
                        <use :xlink:href="row.identity=='specialist'?'#iconzhuanxiangdaoshi':row.identity=='customizedmentor'?'#icongexinghuadaoshi'
                            :row.identity=='partner'?'#iconhehuoren':row.identity=='mentee'?'#iconxueyuan2':row.identity=='intern'?'#iconshixisheng1'
                            :row.identity=='esmentor'?'#iconwenshudaoshi':row.identity=='usmentor'?'#iconmeifangdaoshi':row.identity=='ophead'?'#iconhangzhengzhuguan'
                            :row.identity=='opmentor'?'#iconhangzhengdaoshi':row.identity=='plhead'?'#iconguihuazhuguan':row.identity=='plmentor'?'#iconguihuadaoshi'
                            :(row.identity=='sales'||row.identity=='saleshead'||row.identity=='salesvp')?'#iconxiaoshou1':row.identity=='admin'?'#iconguanliyuan'
                            :row.identity=='finance'?'#iconcaiwu':''"></use>
                    </svg>
                </template> -->
                <template slot="identitystr" slot-scope="{row}">
                    <Tooltip :content="row.identitystr" :transfer="true">
                        <div class="ell idetywid">{{row.identitystr}}</div>
                    </Tooltip>
                </template>
                <!-- <template slot="identityCN" slot-scope="{row}">
                    <div :class="['idedBox', row.identityCN=='规划导师'?'blue':row.identityCN=='文书导师'?'orange':
                    row.identityCN=='行政导师'?'green':row.identityCN=='规划主管'?'blue':row.identityCN=='行政主管'?'green':row.identityCN=='个性化导师'?'purple':
                    (row.identityCN=='专项导师'||row.identityCN=='管理员')?'new':row.identityCN=='美方导师'?'mgree':
                    (row.identityCN=='销售'||row.identityCN=='销售主管'||row.identityCN=='销售合伙人')?'red':
                    (row.identityCN=='学员'||row.identityCN=='财务')?'black':row.identityCN=='实习生'?'pink':
                    row.identityCN=='人力'?'mblue':row.identityCN=='合伙人'?'mpurple':'']">
                        <Icon :custom="(row.identityCN=='专项导师'||row.identityCN=='管理员')?'iconfont iconzhuanxiang':
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
                </template> -->
                <template slot="decode" slot-scope="{row}">
                    <span :class="['btnbg',row.decode?'orange':'gray']">{{row.decode?'已绑定':'未绑定'}}</span>
                </template>
                <template slot="unionId" slot-scope="{row}">
                    <span :class="['btnbg',row.unionId?'green':'gray']">{{row.unionId?'已绑定':'未绑定'}}</span>
                </template>
                <template slot="status" slot-scope="{row}">
                    <div :class="row.status=='active'?'blue':''" @click="showEffect(row)" style="cursor:pointer;">
                        <Icon type="ios-checkmark-circle" />
                        <span class="fontchine">{{row.status}}</span>
                    </div>
                </template>
                <template slot-scope="{row}" slot="opmenu">
                    <Poptip
                        :transfer="true"
                        placement="bottom"
                        v-model="row.showPop"
                        :width='80'
                        popper-class='poptip'
                    >
                        <!-- <Icon class="iconopt" custom="iconfont icongengduo" /> -->
                        <img src="../images/more.png" class="iconopt">
                        <ul slot='content'>
                            <li :class="['litem',itm.check?'gray':'']" v-for="itm in options" @click="closepop(itm,row)" :key="itm.val">{{itm.val}}</li>
                        </ul>
                    </Poptip>
                </template>
            </Table>
            <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
        </div>
        <!-- 模态框 -->
        <Modal
            width="388px"
            class="adduserinfo"
            v-model="showModal"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>{{titlename}}</span>
                <!-- <span class="idtybox purple" v-if='titlename=="用户详情"'>
                    <Icon class="iconopt" custom="iconfont icongexinghua" />
                    <span>{{currentObj.identityCN}}</span>
                </span> -->
                <span class="iconBox">
                    <img class="editicon" v-if='titlename=="用户详情"' @click="changeModal" src="../images/edit.png">
                    <img class="close" src="../images/close.png" @click="showModal = false;">
                </span>
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">中文名</h4>
                    <div v-if='titlename=="用户详情"' class="contval">{{currentObj.chinesename}}</div>
                    <Input v-else v-model="currentObj.chinesename" @on-keyup='changeTxt(currentObj.chinesename)' ref="saleName" placeholder="中文名" style="width: 100%;" />
                </li>
                <li>
                    <h4 class="labTile">角色</h4>
                    <div v-if='titlename=="用户详情"' class="contval">{{currentObj.identitystr}}</div>
                    <Select v-else v-model="currentObj.identity" multiple style="width:100%;">
                        <Option v-for="item in userlist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                </li>
            </ul>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">年份</h4>
                    <div v-if='titlename=="用户详情"' class="contval">{{currentObj.year}}</div>
                    <DatePicker v-else type="year" class="selectitem" :value="String(currentObj.year)" @on-change="changeYear" placeholder="年份"></DatePicker>
                </li>
                <li>
                    <h4 class="labTile">所属办公室</h4>
                    <div v-if='titlename=="用户详情"' class="contval">{{currentObj.areaCN}}</div>
                    <Select v-else v-model="currentObj.area" style="width:100%;">
                        <Option v-for="item in addarealist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                    </Select>
                </li>
            </ul>
            <ul class="labBox">
                <li style="margin-right:0;">
                    <h4 class="labTile">用户名</h4>
                    <div v-if='titlename=="用户详情"' class="contval">{{currentObj.username}}</div>
                    <!-- <Input v-else-if='titlename=="添加用户"' v-model="newusername" ref="saleName" placeholder="用户名" style="width: 100%;" /> -->
                    <!-- <Input v-else v-model="currentObj.username" ref="saleName" placeholder="用户名" style="width: 100%;" /> -->
                    <Input v-else v-model="newusername" disabled ref="saleName" placeholder="用户名" style="width: 100%;" />
                </li>
            </ul>
            <ul class="labBox" style="margin-bottom:33px;">
                <li style="margin-right:0;">
                    <h4 class="labTile">邮箱</h4>
                    <div v-if='titlename=="用户详情"' class="contval">{{currentObj.email}}</div>
                    <Input v-else v-model="currentObj.email" ref="saleName" placeholder="邮箱" style="width: 100%;" />
                </li>
            </ul>
            <ul class="labBox" v-if='titlename!="用户详情"' style="margin-top:10px;">
                <li style="margin-right:0;">
                    <h4 class="labTile">有效状态：</h4>
                </li>
                <li>
                    <div class="contval">
                        <RadioGroup v-model="currentObj.status">
                            <Radio label="active"></Radio>
                            <Radio label="inactive"></Radio>
                        </RadioGroup>
                    </div>
                </li>
            </ul>
            <ul class="labBox" v-if='titlename=="用户详情"'>
                <li style="margin-right:0;">
                    <h4 class="labTile">微信</h4>
                    <div class="contval">{{currentObj.unionId?'已绑定':'未绑定'}}</div>
                </li>
            </ul>
            <ul class="labBox" v-if='titlename=="用户详情"'>
                <li style="margin-right:0;">
                    <h4 class="labTile">藏经阁</h4>
                    <div class="contval">{{currentObj.decode?'已绑定':'未绑定'}}</div>
                </li>
                <li style="margin-right:0;">
                    <h4 class="labTile">有效状态</h4>
                    <div class="contval">{{currentObj.status}}</div>
                </li>
            </ul>
            <div class="btnBox" v-if='titlename!="用户详情"'>
                <Button class="suerBtn" @click="addItem">确认</Button>
                <Button class="suerBtn garybtn" v-if="titlename=='编辑用户'" @click.stop="showModal=false">取消</Button>
            </div>
        </Modal>
        <Modal
            v-model="showpsw"
            width="388px"
            class="adduserinfo"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>重置{{resTile=='密码'?resTile:resTile+'绑定'}}</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="showpsw=false">
                </span>
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">中文名</h4>
                    <div class="contval">{{currentObj.chinesename}}</div>
                </li>
                <li>
                    <h4 class="labTile">用户名</h4>
                    <div class="contval">{{currentObj.username}}</div>
                </li>
            </ul>
            <div class="tip">是否将{{resTile}}重置为默认状态？</div>
            <div class="footBox">
                <Button @click="resizePsw">确认</Button>
                <Button @click="showpsw=false">取消</Button>
            </div>
        </Modal>
        <Modal 
            v-model="showDel"
            width="388px"
            class="adduserinfo"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>温馨提示</span>
                <span class="iconBox">
                    <img class="close" src="../images/close.png" @click="showDel=false">
                </span>
            </h3>
            <div>确定删除吗?</div>
            <div class="footBox">
                <Button @click="sureDel">确认</Button>
                <Button @click="showDel=false">取消</Button>
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
                    <div class="contval">{{currentObj.chinesename}}</div>
                </li>
                <li>
                    <h4 class="labTile">当前状态</h4>
                    <div class="contval">{{currentObj.status}}</div>
                </li>
            </ul>
            <div class="tip" style="color:#333;">是否将当前状态改为：<span style="color: #1665D8;">{{currentObj.status=='active'?'inactive':'active'}}</span></div>
            <div class="footBox">
                <Button @click="sureMod">确认</Button>
                <Button @click="caceMod">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
import pingyin from 'pinyin';

export default {
    name: 'User',
    props: {

    },
    components: {
        
    },
    data() {
        return {
            effectMod:false,
            showpsw:false,
            resTile:'',
            titlename:'添加用户',
            uname:'',
            identity:'',
            userlist:[],
            roomplace:'',
            arealist:[],
            addarealist:[
                {
                    key:'bj',
                    value:'北京'
                },
                {
                    key:'sh',
                    value:'上海'
                },
                {
                    key:'hz',
                    value:'杭州'
                }
            ],
            selyear:'',
            effectstatu:'',
            effectlist:[
                {
                    key:'active',
                    value:'active'
                },
                {
                    key:'inactive',
                    value:'inactive'
                }
            ],
            showModal:false,
            columns:[
                {
                    title: '中文名',
                    slot: 'chinesename',
                    minWidth:120,
                    sortable: true,
                },
                {
                    title: '身份',
                    slot: 'identitystr',
                    align:'left',
                    // slot: 'identityCN',
                    minWidth:160
                },
                {
                    title: '年份',
                    key: 'year',
                    minWidth:80
                },
                {
                    title: '所属办公室',
                    key: 'areaCN',
                    minWidth:120
                },
                {
                    title: '藏经阁绑定',
                    slot: 'decode',
                    minWidth:110
                },
                {
                    title: '微信绑定',
                    slot: 'unionId',
                    minWidth:120
                },
                {
                    title: '有效状态',
                    slot: 'status',
                    minWidth:120
                },
                {
                    title: '邮箱',
                    key: 'email',
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: ' ',
                    slot: 'opmenu',
                    minWidth:80
                }
            ],
            newusername:'',
            totalpage:0,
            pageSize:10,
            currentpage:1,
            data:[],
            olddata:[],//原数据
            options:[
                {
                    val:'编辑用户',
                    check:false
                },
                {
                    val:'重置密码',
                    check:false
                },
                {
                    val:'重置微信',
                    check:false
                },
                {
                    val:'重置藏经阁',
                    check:false
                }
            ],
            showDel:false,
            currentObj:{}//当前项
        };
    },
    computed: {

    },
    mounted() {
        this.getselList();
        setTimeout(()=>{
            this.getData();
        },500)
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
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
        getselList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.userlist = res.data.role;
                    this.arealist = res.data.area;
                    // let arr = [];
                    // res.data.role.forEach(v=>{
                    //     if(v.key!='mentee'){
                    //        arr.push(v);
                    //     };
                    // });
                    // res.data.area.forEach(v=>{
                    //     if(v.key=='all'){
                    //         v.key = '';
                    //     };
                    // });
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        closepop(parm,data){
            data.showPop = false;
            let arr = this.options;
            arr.forEach(v=>{
                v.check = false;
                if(parm.val==v.val){
                    v.check = true;
                };
            });
            this.options = arr;
            this.currentObj = JSON.parse(JSON.stringify(data));
            this.newusername = data.username;
            if(parm.val=='编辑用户'){
                this.showModal = true;
                this.titlename = '编辑用户';
            }else if(parm.val=='删除用户'){
                this.showDel = true;
            }else if(parm.val=='重置密码'){
                this.showpsw = true;
                this.resTile = '密码';
            }else if(parm.val=='重置微信'){
                this.showpsw = true;
                this.resTile = '微信';
            }else if(parm.val=='重置藏经阁'){
                this.showpsw = true;
                this.resTile = '藏经阁';
            };
        },
        showEffect(data){
            this.effectMod = true;
            this.currentObj = data;
        },
        sureMod(){
            this.effectMod = false;
            this.$https.changeStatu({
                status:this.currentObj.status=='active'?'inactive':'active',
                id:this.currentObj.id
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
        changeTxt(data){
            let val = pingyin(data,{
                style:pingyin.STYLE_NORMAL
            });
            this.newusername = val.join(''); 
        },
        isNull(){
            const chinesename = this.currentObj.chinesename;
            const identity = this.currentObj.identity;
            const year = this.currentObj.year;
            const area = this.currentObj.area;
            const username = this.newusername;
            const email = this.currentObj.email;
            const status = this.currentObj.status;
            if(!chinesename||!identity.length||!year||!area||!username||!email||!status){
                return false;
            };
            return true;
        },
        addItem(){
            if(this.titlename=='添加用户'){
                const flag = this.isNull();
                if(!flag){
                    this.$Message.error('请填写完整再提交！');
                    return;
                };
                this.showModal = false;
                const params = {
                    chinesename: this.currentObj.chinesename,
                    identity: this.currentObj.identity,
                    year: this.currentObj.year,
                    area: this.currentObj.area,
                    username: this.newusername,
                    email: this.currentObj.email,
                    status: this.currentObj.status
                };
                this.$https.adduserinfo(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    };
                })
            }else if(this.titlename=='编辑用户'){
                const flag = this.isNull();
                if(!flag){
                    this.$Message.error('请填写完整再提交！');
                    return;
                };
                this.showModal = false;
                const params = {
                    chinesename: this.currentObj.chinesename,
                    identity: this.currentObj.identity,
                    year: this.currentObj.year,
                    area: this.currentObj.area,
                    username: this.currentObj.username,
                    id: this.currentObj.id,
                    email: this.currentObj.email,
                    status: this.currentObj.status
                };
                this.$https.eddituserinfo(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    };
                })
            }
        },
        addUser(){
            this.showModal = true;
            this.titlename = '添加用户';
            this.currentObj = {
                status:'active'
            };
            this.newusername = '';
        },
        lookuser(data){
            this.showModal = true;
            this.titlename = '用户详情';
            this.currentObj = JSON.parse(JSON.stringify(data));
            this.newusername = data.username;
        },
        changeModal(){
            this.titlename = '编辑用户';
        },
        resizePsw(){
            this.showpsw = false;
            const tile = this.resTile;
            let type = '';
            if(tile=='密码'){
                type = 'password'
            }else if(tile=='微信'){
                type = 'wx'
            }else if(tile=='藏经阁'){
                type = 'cjg'
            };
            this.$https.resizeStatu({
                id:this.currentObj.id,
                type:type
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        sureDel(){
            this.showDel = false;
        },
        seleDate(data){
            this.selyear = data;
            this.serachdata();
        },
        changeYear(data){
            this.currentObj.year = data;
        },
        getData(){
            this.$https.getadminList({
                keyword:this.uname,
                page:this.currentpage,
                pageSize:this.pageSize,
                identity:this.identity,
                area:this.roomplace=='all'?'':this.roomplace,
                year:this.selyear,
                status:this.effectstatu
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalpage = res.data.count;
                    res.data.list.forEach(v=>{
                        v.showPop = false;
                        v.areaCN = utility.filterArr(v.area,this.arealist);
                        const arr = [];
                        v.identity.forEach(item=>{
                            const idcn = utility.filterArr(item,this.userlist);
                            arr.push(idcn);
                        });
                        v.identitystr = arr.join(',');
                        // if(v.identity=='mentee'){
                        //     v.identityCN = '学员';
                        // }else{
                        //     v.identityCN = utility.filterArr(v.identity,this.userlist);
                        // };
                        //筛选用
                        // if(v.status=='active'){
                        //     v.statusCN = 'iitive';
                        // };
                    });
                    this.data = res.data.list;
                    this.olddata = res.data.list;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        serachdata(){
            this.currentpage = 1;
            this.pageSize = 10;
            this.getData();
            // const params = {
            //     identity:this.identity?this.identity:'',
            //     area:this.roomplace?this.roomplace:'',
            //     year:this.selyear?this.selyear:'',
            //     status:this.effectstatu?this.effectstatu:''
            // };
            // const arr = this.olddata;
            // if(params.status=='active'){
            //     params.status = '';
            //     params.statusCN = 'iitive';//筛选用
            // };
            // this.data = utility.selectParams(params,arr);
        },
        resizedata(){
            this.identity = "";
            this.roomplace = "";
            this.selyear = "";
            this.effectstatu = "";
            this.uname = "";
            this.serachdata();
        }
    }
};
</script>

<style lang="scss">
#User{
    position: relative;
    .ivu-table td{
        border:0;
    }
    .ltBox{
        .itemBox{
            width: 166px;
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #ddd;
            display: flex;
            float: left;
            margin-right: 20px;
            >span{
                display: inline-block;
                text-align: center;
                flex: 1;
                min-width: 90px;
                color: #9EA0A5;
                border-right: 1px solid #ddd;
            }
            .selectitem{
                flex: 1;
                .ivu-select-selection{
                    border:none;
                    height: 100%;
                    .ivu-select-selected-value,.ivu-select-placeholder{
                        height: 36px;
                        text-align: center;
                        line-height: 36px;
                    }
                }
                .ivu-input{
                    border: none;
                    padding-top: 8px;
                }
                .ivu-input:focus{
                    box-shadow: none;
                }
            }
        }
    }
    .addSales{
        position: absolute;
        right: 15px;
        top: 17px;
        border: 1px solid#1665D8;
        color: #1665D8;
        z-index: 9;
    }
    .serchbox{
        position: absolute;
        right: 15px;
        width: 183px;
        top: 0;
        .ivu-input{
            height: 36px;
            line-height: 36px;
        }
        .ivu-input:hover{
            border-color: #E3E5ED;
        }
    }
    .tableBox{
        .idetywid{
            width: 140px;
        }
        position: relative;
        margin-top: 20px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px #ddd;
        background-color: #fff;
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
            padding: 5px 0px;
        }
        .btnbg{
            background-color: #F5F6FA;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 14px;
        }
        .fontchine{
            margin-left: 4px;
        }
        .iconopt{
            // opacity: .4;
            cursor: pointer;
            width: 22px;
        }
    }
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
.mblue{
    color: #20B6F3;
}
.mpurple{
    color: #C65FDA;
}
.red{
    color: #E6492D;
}
.pink{
    color: #D94C7B;
}
.black{
    color: #3E3F42;
}
.gray{
    background-color: #ddd;
    color: #999;
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
}
.btm_page{
    text-align: center;
    padding: 15px 0;
}
// 模态框
.adduserinfo{
    .ivu-radio-inner{
        left: 1px;
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
        margin-bottom: 23px;
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
}
</style>