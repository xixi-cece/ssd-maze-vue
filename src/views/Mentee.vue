<template>
    <div id="mentee">
        <div class="ltBox clearfix">
            <span class="itemBox">
                <span>申请类型</span>
                <Select v-model="applaytype" class="selectitem" @on-change="serachdata">
                    <Option v-for="item in applaylist" :value="item.key" :key="item.key">{{ item.value }}</Option>
                </Select>
            </span>
            <span class="itemBox">
                <span>年份</span>
                <DatePicker type="year" :value='yearname' class="selectitem" placeholder="年份" @on-change="seleDate"></DatePicker>
            </span>
            <span @click="resizedata" class="itemBox" style="text-align:center;display:inline-block;cursor: pointer;background-color: #1665D8;color:#fff;width:90px;">重置</span>
        </div>
        <Input class="serchbox" search v-model="sermenteename" clearable @on-change="serachdata" placeholder="搜索学员姓名"/>
        <div class="tableBox">
            <Table :columns="columns" :data="data">
                <template slot="chinesename" slot-scope="{row}">
                    <span class="cname" @click.stop="lookuser(row)">{{row.chinesename}}</span>
                </template>
                <!-- <template slot-scope="{row}" slot="type">
                    <svg class="colicon" aria-hidden="true">
                        <use :xlink:href="row.type=='u'?'#iconmeiguobenke1':row.type=='g'?'#iconyanjiusheng1':row.type=='t'?'#iconzhuanxue1'
                        :row.type=='p'?'#icondanpianPS1':row.type=='s'?'#iconqitadanpianPS1':row.type=='uk'?'#iconyingguobenke1':row.type=='o'?'#iconqita1':''"></use>
                    </svg>
                </template> -->
                <template slot-scope="{row}" slot="type">
                    <span v-if="row.type" class="typeBtn">
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
                        <span>{{row.typeCN}}</span>
                    </span>
                </template>
                <template slot="plmentorCNS" slot-scope="{row}">
                    <!-- <span v-if="row.plmentorCNName">{{row.plmentorCNName+(row.plmentor1CNName?','+row.plmentor1CNName+'':'')}}</span> -->
                    <span>{{row.plmentorCNS}}</span>
                </template>
                <template slot="plheadCNS" slot-scope="{row}">
                    <!-- <span v-if="row.plheadCNName">{{row.plheadCNName+(row.plhead1CNName?','+row.plhead1CNName+'':'')}}</span> -->
                    <span>{{row.plheadCNS}}</span>
                </template>
                <template slot="opmentorCNS" slot-scope="{row}">
                    <!-- <span v-if="row.opmentorCNName">{{row.opmentorCNName+(row.opmentor1CNName?','+row.opmentor1CNName+'':'')}}</span> -->
                    <span>{{row.opmentorCNS}}</span>
                </template>
                <template slot="esmentorCNS" slot-scope="{row}">
                    <!-- <span v-if="row.esmentorCNName">{{row.esmentorCNName+(row.esmentor1CNName?','+row.esmentor1CNName+'':'')}}</span> -->
                    <span>{{row.esmentorCNS}}</span>
                </template>
                <template slot="customizedmentorCNS" slot-scope="{row}">
                    <!-- <span v-if="row.customizedmentorCNName">{{row.customizedmentorCNName+(row.customizedmentor1CNName?','+row.customizedmentor1CNName+'':'')}}</span> -->
                    <span>{{row.customizedmentorCNS}}</span>
                </template>
                <template slot="usmentorCNS" slot-scope="{row}">
                    <!-- <span v-if="row.usmentorCNName">{{row.usmentorCNName+(row.usmentor1CNName?','+row.usmentor1CNName+'':'')}}</span> -->
                    <span>{{row.usmentorCNS}}</span>
                </template>
            </Table>
            <Page class="btm_page" transfer show-elevator show-sizer show-total :total="totalpage" :page-size="pageSize" :current="currentpage" @on-change="getcurtpage" @on-page-size-change="getshowpage" />
        </div>
        <Modal
            width='800'
            v-model="showModal"
            class="maskToast"
            :closable='false'
            :mask-closable='false'
            :footer-hide='true'
        >
            <div slot="header" class="headerTip">
                <span class="tname" style="line-height:35px;">导师分配</span>
                <span class="tname">
                    <span>学员信息</span>
                    <!-- <span class="menteeinfo">
                        <Icon
                            :custom="apptype=='u'?'iconfont iconmeiguobenke'
                            :apptype=='g'?'iconfont iconyanjiusheng':apptype=='t'?
                            'iconfont iconzhuanxue':apptype=='uk'?'iconfont iconyingguobenke':
                            apptype=='p'?'iconfont icondanpianPS':apptype=='s'?'iconfont iconqitadanpianPS'
                            :apptype=='o'?'iconfont iconqita':apptype=='c'?'iconfont iconqitaguojia1':''"
                            :style="apptype=='u'?'color:#1665D8':apptype=='g'?'color:#E6492D'
                            :apptype=='t'?'color:#6758F3':apptype=='uk'?'color:#34AA44':
                            apptype=='p'?'color:#F6AB2F':apptype=='s'?'color:#FACF55':
                            apptype=='o'?'color:#3E3F42':apptype=='c'?'color:#1BBBBB':''"
                        ></Icon>
                        <span>{{apptypeZN}}</span>
                    </span> -->
                    <Select v-model="apptype" placeholder="请选择学员类型" class="mentebtn">
                        <Option value="u">本科</Option>
                        <Option value="g">研究生</Option>
                        <Option value="t">转学</Option>
                        <Option value="uk">英国</Option>
                        <Option value="p">单篇PS</Option>
                        <Option value="s">其他单篇</Option>
                        <Option value="o">其他</Option>
                        <Option value="c">其他国家</Option>
                    </Select>
                </span>
            </div>
            <span class="topttle">学员配对详情</span>
            <div class="line"></div>
            <span class="closetip" @click.stop="showModal=false"><Icon class="close" type="ios-close-circle-outline" /></span>
            <div class="contBox">
                <div class="leftBox">
                    <ul class="labBox">
                        <li>
                            <h4 class="labTile">规划导师</h4>
                            <!-- <Select v-model="mappingInfo.plmentor" style="width:100%;">
                                <Option v-for="item in plmentorlist" :value="item.username" :key="item.username">{{ item.chinesename }}</Option>
                            </Select> -->
                            <!-- <Serchselect :checklist="plmentorarr" :teachlist="plmentorlist" :changeobj="mappingInfo" @checkdata="getplmentor"></Serchselect> -->
                            <Select v-model="mappingInfo.plmentor" placeholder="请输入筛选" filterable multiple @on-change="changeplmentor">
                                <Option v-for="item in plmentorlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                            </Select>
                        </li>
                        <li>
                            <h4 class="labTile">规划主管</h4>
                            <!-- <Select v-model="mappingInfo.plhead" style="width:100%;">
                                <Option v-for="item in plheadlist" :value="item.username" :key="item.username">{{ item.chinesename }}</Option>
                            </Select> -->
                            <!-- <Serchselect :checklist="plheadarr" :teachlist="plheadlist" :changeobj="mappingInfo" @checkdata="getplhead"></Serchselect> -->
                            <Select v-model="mappingInfo.plhead" placeholder="请输入筛选" filterable multiple @on-change="changeplhead">
                                <Option v-for="item in plheadlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                            </Select>
                        </li>
                    </ul>
                    <ul class="labBox">
                        <li>
                            <h4 class="labTile">行政导师</h4>
                            <!-- <Select v-model="mappingInfo.opmentor" style="width:100%;">
                                <Option v-for="item in opmentorlist" :value="item.username" :key="item.username">{{ item.chinesename }}</Option>
                            </Select> -->
                            <!-- <Serchselect :checklist="opmentorarr" :teachlist="opmentorlist" :changeobj="mappingInfo" @checkdata="getopmentor"></Serchselect> -->
                            <Select v-model="mappingInfo.opmentor" placeholder="请输入筛选" filterable multiple @on-change="changeopmentor">
                                <Option v-for="item in opmentorlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                            </Select>
                        </li>
                        <li>
                            <h4 class="labTile">文书导师</h4>
                            <!-- <Select v-model="mappingInfo.esmentor" style="width:100%;">
                                <Option v-for="item in esmentorlist" :value="item.username" :key="item.username">{{ item.chinesename }}</Option>
                            </Select> -->
                            <!-- <Serchselect :checklist="esmentorarr" :teachlist="esmentorlist" :changeobj="mappingInfo" @checkdata="getesmentor"></Serchselect> -->
                            <Select v-model="mappingInfo.esmentor" placeholder="请输入筛选" filterable multiple @on-change="changeesmentor">
                                <Option v-for="item in esmentorlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                            </Select>
                        </li>
                    </ul>
                    <ul class="labBox">
                        <li>
                            <h4 class="labTile">个性化导师</h4>
                            <!-- <Select v-model="mappingInfo.customizedmentor" style="width:100%;">
                                <Option v-for="item in customizedmentorlist" :value="item.username" :key="item.username">{{ item.chinesename }}</Option>
                            </Select> -->
                            <!-- <Serchselect :checklist="customizedmentorarr" :teachlist="customizedmentorlist" :changeobj="mappingInfo" @checkdata="getcustomizedmentor"></Serchselect> -->
                            <Select v-model="mappingInfo.customizedmentor" placeholder="请输入筛选" filterable multiple @on-change="changecustomizedmentor">
                                <Option v-for="item in customizedmentorlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                            </Select>
                        </li>
                        <li>
                            <h4 class="labTile">美方导师</h4>
                            <!-- <Select v-model="mappingInfo.usmentor" style="width:100%;">
                                <Option v-for="item in usmentorlist" :value="item.username" :key="item.username">{{ item.chinesename }}</Option>
                            </Select> -->
                            <!-- <Serchselect :checklist="usmentorarr" :teachlist="usmentorlist" :changeobj="mappingInfo" @checkdata="getusmentor"></Serchselect> -->
                            <Select v-model="mappingInfo.usmentor" placeholder="请输入筛选" filterable multiple @on-change="changeusmentor">
                                <Option v-for="item in usmentorlist" :value="item.id" :key="item.id">{{ item.chinesename }}</Option>
                            </Select>
                        </li>
                    </ul>
                    <Button class="surBtn" @click="sureMesg">确认</Button>
                </div>
                <div class="rightBox">
                    <Tabs value="name1">
                        <TabPane label="申请信息" name="name1">
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">学员姓名</h4>
                                    <div class="contval">{{applyInfo.chinesename}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">学员微信</h4>
                                    <div class="contval">{{applyInfo.wxid}}</div>
                                </li>
                            </ul>
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">籍贯（省市）</h4>
                                    <div class="contval">{{applyInfo.area}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">申请年份</h4>
                                    <div class="contval">{{applyInfo.year}}</div>
                                </li>
                            </ul>
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">高中名称</h4>
                                    <div class="contval">{{applyInfo.highschool}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">所在地区（省市）</h4>
                                    <div class="contval">{{applyInfo.highschoolarea}}</div>
                                </li>
                            </ul>
                        </TabPane>
                        <TabPane label="附加信息" name="name2">
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">表面来源</h4>
                                    <div class="contval">{{extraInfo.comefrom}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">实际来源</h4>
                                    <div class="contval">{{extraInfo.actualfrom}}</div>
                                </li>
                            </ul>
                            <ul class="labBox">
                                <li style="margin-right:0;">
                                    <h4 class="labTile">标签备注</h4>
                                    <div class="contval">{{extraInfo.tag}}</div>
                                </li>
                            </ul>
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">客户留言</h4>
                                    <div class="contval">{{extraInfo.comment}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">客户特殊要求</h4>
                                    <div class="contval">{{extraInfo.demand}}</div>
                                </li>
                            </ul>
                        </TabPane>
                        <TabPane label="联系信息" name="name3">
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">联系人姓名</h4>
                                    <div class="contval">{{contactInfo.contactname}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">联系人类型</h4>
                                    <div class="contval">{{contactInfo.contactidentity}}</div>
                                </li>
                            </ul>
                            <ul class="labBox">
                                <li>
                                    <h4 class="labTile">联系人电话</h4>
                                    <div class="contval">{{contactInfo.phone}}</div>
                                </li>
                                <li>
                                    <h4 class="labTile">联系人微信</h4>
                                    <div class="contval">{{contactInfo.wechatcontact}}</div>
                                </li>
                            </ul>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
import Serchselect from '@/components/Serchselect';
 
export default {
    name: 'mentee',
    components: {
        Serchselect
    },
    data() {
        return {
            applaytype:'',
            yearname:'',
            applaylist:[],
            sermenteename:'',
            columns:[
                {
                    title: '学员姓名',
                    slot: 'chinesename',
                    minWidth:110,
                    sortable: true
                },
                {
                    title: '申请类型',
                    minWidth:180,
                    slot: 'type',
                    // sortable: true,
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
                    //         label: '其他单篇',
                    //         value: 's'
                    //     },
                    //     {
                    //         label: '其他国家',
                    //         value: 'c'
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
                    title: '年份',
                    key: 'year',
                    minWidth:80
                },
                {
                    title: '规划导师',
                    slot: 'plmentorCNS',
                    minWidth:100
                },
                {
                    title: '规划主管',
                    slot: 'plheadCNS',
                    minWidth:100
                },
                {
                    title: '行政导师',
                    slot: 'opmentorCNS',
                    minWidth:100
                },
                {
                    title: '文书导师',
                    slot: 'esmentorCNS',
                    minWidth:100
                },
                {
                    title: '个性化导师',
                    slot: 'customizedmentorCNS',
                    minWidth:110
                },
                {
                    title: '美方导师',
                    slot: 'usmentorCNS',
                    minWidth:120
                }
            ],
            totalpage:0,
            pageSize:10,
            currentpage:1,
            olddata:[],//源数据
            data:[],
            showModal:false,
            // vector:'',
            // vementor:'',
            // tutorteach:'',
            // bokteach:'',
            // persolteach:'',
            // amerteach:'',
            id:'',
            applyInfo:{},//申请信息
            contactInfo:{},//联系信息
            extraInfo:{},//附加信息
            mappingInfo:{},//导师分配信息
            apptype:'',//申请类型
            apptypeZN:'',
            plmentorfrom:[],
            plmentorlist:[],
            plmentorarr:[],
            plheadfrom:[],
            plheadlist:[],
            plheadarr:[],
            opmentorfrom:[],
            opmentorlist:[],
            opmentorarr:[],
            esmentorfrom:[],
            esmentorlist:[],
            esmentorarr:[],
            customizedmentorfrom:[],
            customizedmentorlist:[],
            customizedmentorarr:[],
            usmentorfrom:[],
            usmentorlist:[],
            usmentorarr:[]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getselList();
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
        lookuser(data){
            this.showModal = true;
            this.id = data.id;
            this.getmendetail();
        },
        changeplmentor(data){
            if(data.length>2){
                this.$Message.error('最多选择两项！');
                this.mappingInfo.plmentor = data.slice(0,2);
            };
        },
        changeplhead(data){
            if(data.length>2){
                this.$Message.error('最多选择两项！');
                this.mappingInfo.plhead = data.slice(0,2);
            };
        },
        changeopmentor(data){
            if(data.length>2){
                this.$Message.error('最多选择两项！');
                this.mappingInfo.opmentor = data.slice(0,2);
            };
        },
        changeesmentor(data){
            if(data.length>2){
                this.$Message.error('最多选择两项！');
                this.mappingInfo.esmentor = data.slice(0,2);
            };
        },
        changecustomizedmentor(data){
            if(data.length>2){
                this.$Message.error('最多选择两项！');
                this.mappingInfo.customizedmentor = data.slice(0,2);
            };
        },
        changeusmentor(data){
            if(data.length>2){
                this.$Message.error('最多选择两项！');
                this.mappingInfo.usmentor = data.slice(0,2);
            };
        },
        // getplmentor(data){
        //     this.plmentorfrom = [];
        //     data.forEach((v,i)=>{
        //         // this.plmentorfrom['plmentor'+i] = v.username;
        //         this.plmentorfrom.push(data.id);
        //     });
        // },
        // getplhead(data){
        //     this.plheadfrom = [];
        //     data.forEach((v,i)=>{
        //         // this.plheadfrom['plhead'+i] = v.username;
        //         this.plheadfrom.push(data.id);
        //     });
        // },
        // getopmentor(data){
        //     this.opmentorfrom = [];
        //     data.forEach((v,i)=>{
        //         // this.opmentorfrom['opmentor'+i] = v.username;
        //         this.opmentorfrom.push(data.id);
        //     });
        // },
        // getesmentor(data){
        //     this.esmentorfrom = [];
        //     data.forEach((v,i)=>{
        //         this.esmentorfrom.push(data.id);
        //     });
        // },
        // getcustomizedmentor(data){
        //     this.customizedmentorfrom = [];
        //     data.forEach((v,i)=>{
        //         // this.customizedmentorfrom['customizedmentor'+i] = v.username;
        //         this.customizedmentorfrom.push(data.id);
        //     });
        // },
        // getusmentor(data){
        //     this.usmentorfrom = [];
        //     data.forEach((v,i)=>{
        //         // this.usmentorfrom['usmentor'+i] = v.username;
        //         this.usmentorfrom.push(data.id);
        //     });
        // },
        sureMesg(){
            this.showModal = false;
            const params = {
                menteeId:this.mappingInfo.id,
                plmentor:this.mappingInfo.plmentor,
                plhead:this.mappingInfo.plhead,
                opmentor:this.mappingInfo.opmentor,
                customizedmentor:this.mappingInfo.customizedmentor,
                esmentor:this.mappingInfo.esmentor,
                usmentor:this.mappingInfo.usmentor,
                type:this.apptype
            };
            // console.log(params);
            this.$https.sendmentor(params).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getselList(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.applaylist = res.data.customer;
                    this.getmentorslist();
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getData(){
            this.$https.getmenteelist({
                page:this.currentpage,
                pageSize:this.pageSize,
                keyword:this.sermenteename,
                year:this.yearname,
                applyType:this.applaytype
            }).then(res=>{
                if(res&&res.code==200){
                    this.totalpage = res.data.count;
                    res.data.list.forEach(v=>{
                        v.typeCN = utility.filterArr(v.type,this.applaylist);
                        // v.plmentorCN = utility.filterArr(v.plmentor,this.plmentorlist);
                        // v.plmentor1CN = utility.filterArr(v.plmentor1,this.plmentorlist);
                        // v.plheadCN = utility.filterArr(v.plhead,this.plheadlist);
                        // v.plhead1CN = utility.filterArr(v.plhead1,this.plheadlist);
                        // v.opmentorCN = utility.filterArr(v.opmentor,this.opmentorlist);
                        // v.opmentor1CN = utility.filterArr(v.opmentor1,this.opmentorlist);
                        // v.esmentorCN = utility.filterArr(v.esmentor,this.esmentorlist);
                        // v.esmentor1CN = utility.filterArr(v.esmentor1,this.esmentorlist);
                        // v.customizedmentorCN = utility.filterArr(v.customizedmentor,this.customizedmentorlist);
                        // v.customizedmentor1CN = utility.filterArr(v.customizedmentor1,this.customizedmentorlist);
                        // v.usmentorCN = utility.filterArr(v.usmentor,this.usmentorlist);
                        // v.usmentor1CN = utility.filterArr(v.usmentor1,this.usmentorlist);

                        const arr1 = [];
                        v.plmentor.forEach(item=>{
                            arr1.push(item.chinesename);
                        });
                        v.plmentorCNS = arr1.join(',');
                        const arr2 = [];
                        v.plhead.forEach(item=>{
                            arr2.push(item.chinesename);
                        });
                        v.plheadCNS = arr2.join(',');
                        const arr3 = [];
                        v.opmentor.forEach(item=>{
                            arr3.push(item.chinesename);
                        });
                        v.opmentorCNS = arr3.join(',');
                        const arr4 = [];
                        v.esmentor.forEach(item=>{
                            arr4.push(item.chinesename);
                        });
                        v.esmentorCNS = arr4.join(',');
                        const arr5 = [];
                        v.customizedmentor.forEach(item=>{
                            arr5.push(item.chinesename);
                        });
                        v.customizedmentorCNS = arr5.join(',');
                        const arr6 = [];
                        v.usmentor.forEach(item=>{
                            arr6.push(item.chinesename);
                        });
                        v.usmentorCNS = arr6.join(',');
                    });
                    this.data = res.data.list;
                    this.olddata = res.data.list;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getmendetail(){
            this.$https.getmentedetail({
                id:this.id
            }).then(res=>{
                if(res&&res.code==200){
                    if(res.data.type=='u'){
                        this.apptypeZN = '本科';
                    }else if(res.data.type=='g'){
                        this.apptypeZN = '研究生';
                    }else if(res.data.type=='t'){
                        this.apptypeZN = '转学';
                    }else if(res.data.type=='uk'){
                        this.apptypeZN = '英国';
                    }else if(res.data.type=='p'){
                        this.apptypeZN = '单篇PS';
                    }else if(res.data.type=='s'){
                        this.apptypeZN = '其他单篇';
                    }else if(res.data.type=='o'){
                        this.apptypeZN = '其他';
                    }else if(res.data.type=='c'){
                        this.apptypeZN = '其他国家';
                    };
                    this.apptype = res.data.type;
                    this.contactInfo = res.data.contactInfo;
                    this.applyInfo = res.data.applyInfo;
                    this.extraInfo = res.data.extraInfo;
                    const arr1 = [];
                    res.data.mappingInfo.plmentor.forEach(v=>{
                        arr1.push(v.id);
                    });
                    res.data.mappingInfo.plmentor = arr1;
                    const arr2 = [];
                    res.data.mappingInfo.plhead.forEach(v=>{
                        arr2.push(v.id);
                    });
                    res.data.mappingInfo.plhead = arr2;
                    const arr3 = [];
                    res.data.mappingInfo.opmentor.forEach(v=>{
                        arr3.push(v.id);
                    });
                    res.data.mappingInfo.opmentor = arr3;
                    const arr4 = [];
                    res.data.mappingInfo.esmentor.forEach(v=>{
                        arr4.push(v.id);
                    });
                    res.data.mappingInfo.esmentor = arr4;
                    const arr5 = [];
                    res.data.mappingInfo.customizedmentor.forEach(v=>{
                        arr5.push(v.id);
                    });
                    res.data.mappingInfo.customizedmentor = arr5;
                    const arr6 = [];
                    res.data.mappingInfo.usmentor.forEach(v=>{
                        arr6.push(v.id);
                    });
                    res.data.mappingInfo.usmentor = arr6;
                    this.mappingInfo = JSON.parse(JSON.stringify(res.data.mappingInfo));

                    // this.plmentorarr = res.data.mappingInfo.plmentor;
                    // this.plheadarr = res.data.mappingInfo.plhead;
                    // this.opmentorarr = res.data.mappingInfo.opmentor;
                    // this.esmentorarr = res.data.mappingInfo.esmentor;
                    // this.customizedmentorarr = res.data.mappingInfo.customizedmentor;
                    // this.usmentorarr = res.data.mappingInfo.usmentor;
                    
                    // this.plmentorarr = [];
                    // if(res.data.mappingInfo.plmentor){
                    //     this.plmentorarr.push({
                    //         username:res.data.mappingInfo.plmentor,
                    //         chinesename:res.data.mappingInfo.plmentorCNName
                    //     });
                    // };
                    // if(res.data.mappingInfo.plmentor1){
                    //     this.plmentorarr.push({
                    //         username:res.data.mappingInfo.plmentor1,
                    //         chinesename:res.data.mappingInfo.plmentor1CNName
                    //     });
                    // };
                    // this.getplmentor(this.plmentorarr);
                    // this.plheadarr = [];
                    // if(res.data.mappingInfo.plhead){
                    //     this.plheadarr.push({
                    //         username:res.data.mappingInfo.plhead,
                    //         chinesename:res.data.mappingInfo.plheadCNName
                    //     });
                    // };
                    // if(res.data.mappingInfo.plhead1){
                    //     this.plheadarr.push({
                    //         username:res.data.mappingInfo.plhead1,
                    //         chinesename:res.data.mappingInfo.plhead1CNName
                    //     });
                    // };
                    // this.getplhead(this.plheadarr);
                    // this.opmentorarr = [];
                    // if(res.data.mappingInfo.opmentor){
                    //     this.opmentorarr.push({
                    //         username:res.data.mappingInfo.opmentor,
                    //         chinesename:res.data.mappingInfo.opmentorCNName
                    //     });
                    // };
                    // if(res.data.mappingInfo.opmentor1){
                    //     this.opmentorarr.push({
                    //         username:res.data.mappingInfo.opmentor1,
                    //         chinesename:res.data.mappingInfo.opmentor1CNName
                    //     });
                    // };
                    // this.getopmentor(this.opmentorarr);
                    // this.esmentorarr = [];
                    // if(res.data.mappingInfo.esmentor){
                    //     this.esmentorarr.push({
                    //         username:res.data.mappingInfo.esmentor,
                    //         chinesename:res.data.mappingInfo.esmentorCNName
                    //     });
                    // };
                    // if(res.data.mappingInfo.esmentor1){
                    //     this.esmentorarr.push({
                    //         username:res.data.mappingInfo.esmentor1,
                    //         chinesename:res.data.mappingInfo.esmentor1CNName
                    //     });
                    // };
                    // this.getesmentor(this.esmentorarr);
                    // this.customizedmentorarr = [];
                    // if(res.data.mappingInfo.customizedmentor){
                    //     this.customizedmentorarr.push({
                    //         username:res.data.mappingInfo.customizedmentor,
                    //         chinesename:res.data.mappingInfo.customizedmentorCNName
                    //     });
                    // };
                    // if(res.data.mappingInfo.customizedmentor1){
                    //     this.customizedmentorarr.push({
                    //         username:res.data.mappingInfo.customizedmentor1,
                    //         chinesename:res.data.mappingInfo.customizedmentor1CNName
                    //     });
                    // };
                    // this.getcustomizedmentor(this.customizedmentorarr);
                    // this.usmentorarr = [];
                    // if(res.data.mappingInfo.usmentor){
                    //     this.usmentorarr.push({
                    //         username:res.data.mappingInfo.usmentor,
                    //         chinesename:res.data.mappingInfo.usmentorCNName
                    //     });
                    // };
                    // if(res.data.mappingInfo.usmentor1){
                    //     this.usmentorarr.push({
                    //         username:res.data.mappingInfo.usmentor1,
                    //         chinesename:res.data.mappingInfo.usmentorCNName
                    //     });
                    // };
                    // this.getusmentor(this.usmentorarr);
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getmentorslist(){
            this.$https.getmentors({}).then(res=>{
                if(res&&res.code==200){
                    this.plmentorlist = res.data.plmentor;
                    this.plheadlist = res.data.plhead;
                    this.opmentorlist = res.data.opmentor;
                    this.esmentorlist = res.data.esmentor;
                    this.customizedmentorlist = res.data.customizedmentor;
                    this.usmentorlist = res.data.usmentor;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        seleDate(data){
            this.yearname = data;
            this.serachdata();
        },
        serachdata(){
            // const params = {
            //     type: this.applaytype,
            //     year: this.yearname,
            //     chinesename:this.sermenteename
            // };
            // for(var k in params){
            //     if(!params[k]){
            //         params[k]='';
            //     };
            // };
            // const arrlist = this.olddata;
            // const newArr = utility.selectParams(params,arrlist);
            // this.data = newArr;
            this.currentpage = 1;
            this.pageSize = 10;
            this.getData();
        },
        resizedata(){
            this.applaytype = "";
            this.yearname = "";
            this.sermenteename = "";
            this.serachdata();
        }
    }
};
</script>

<style lang="scss">
#mentee{
    position: relative;
    .ivu-table td{
        border:0;
    }
    .ltBox{
        .itemBox{
            float: left;
            width: 166px;
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #ddd;
            display: flex;
            flex: 1;
            margin-right: 30px;
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
    .serchbox{
        position: absolute;
        right: 15px;
        width: 183px;
        top: 5px;
        .ivu-input:hover{
            border-color: #E3E5ED;
        }
    }
    .tableBox{
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
        .typeBtn{
            color: #939393;
            border-radius: 4px;
            display: inline-block;
            padding: 4px 10px;
            border: 1px solid #ddd;
            .ivu-icon {
                font-size: 24px;
            }
        }
    }
    .btm_page{
        text-align: center;
        padding: 15px 0;
    }
}
// 模态框
.maskToast{
    position: relative;
    .headerTip{
        display: flex;
        .tname{
            flex: 1;
            &:last-of-type{
                padding-left: 60px;
            }
            .menteeinfo{
                border: 1px solid #ddd;
                color: #939393;
                border-radius: 4px;
                display: inline-block;
                padding: 4px 10px;
                margin-left: 20px;
                font-size: 13px;
                .ivu-icon{
                    font-size: 25px;
                    margin-right: 2px;
                    vertical-align: middle;
                }
            }
        }
        .mentebtn{
            width: 100px;
            margin-left: 15px;
        }
    }
    .topttle{
        width: 180px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        border-radius: 4px;
        background-color: #1665D8;
        color: #fff;
        position: absolute;
        top:-34px;
        left: 50%;
        transform: translateX(-50%);
    }
    .line{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 100%;
        background-color: #1665D8;
    }
    .closetip{
        position: absolute;
        bottom: -34px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        padding: 5px;
        background-color: #1665D8;
        border-radius: 50%;
        cursor: pointer;
        .close{
            color: #fff;
            font-size: 24px;
        }
    }
    .contBox{
        display: flex;
        .leftBox{
            flex: 1;
            .surBtn{
                width:100px;
                height:35px;
                background:rgba(22,101,216,1);
                border-radius:4px;
                color: #fff;
                display: block;
                margin: 15px auto 0;
            }
        }
        .rightBox{
            flex: 1;
            padding-left: 30px;
            .ivu-tabs-nav{
                font-size: 13px;
            }
            .ivu-tabs-tabpane{
                padding-left: 18px;
            }
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
                font-size: 12px;
                color: #A3A3A3;
                margin: 5px 0;
            }
            .labCont{
                font-size: 14px;
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
}
</style>