<template>
    <div id="Baseinfo">
        <div class="contDv flexBox">
            <div class="lfItem">
                <div class="item">
                    <Collapse class="pantile" simple v-model="panelCard">
                        <Panel name="1">
                            <div>
                                <span class="bigtile">学员信息</span>
                                <span class="fr rtIcon" @click.stop="goEdit">
                                    <img class="editIcon" src="../images/edit.png">
                                </span>
                            </div>
                            <div slot="content">
                                <div class="InfoBox">
                                    <h4 class="labtile">联系信息</h4>
                                    <div slot="content">
                                        <ul class="labBox">
                                            <li>
                                                <h4 class="tip">联系人</h4>
                                                <b class="labval">{{menteeInfo.contactname}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">联系人类型</h4>
                                                <b class="labval">{{menteeInfo.contactidentity}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">电话</h4>
                                                <b class="labval">{{menteeInfo.phone}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">微信号</h4>
                                                <b class="labval">{{menteeInfo.wechatcontact}}</b>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p class="line"></p>
                                <div class="InfoBox">
                                    <h4 class="labtile">申请信息</h4>
                                    <div slot="content">
                                        <ul class="labBox">
                                            <li>
                                                <h4 class="tip">学员姓名</h4>
                                                <b class="labval">{{menteeInfo.chinesename}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">学员微信</h4>
                                                <b class="labval">{{menteeInfo.wechatstudent}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">学员籍贯</h4>
                                                <b class="labval">{{menteeInfo.area}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">申请年份</h4>
                                                <b class="labval">{{menteeInfo.appyear}}</b>
                                            </li>
                                        </ul>
                                        <ul class="labBox">
                                            <li>
                                                <h4 class="tip">所在院校</h4>
                                                <b class="labval">{{menteeInfo.highschool}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">所在地区</h4>
                                                <b class="labval">{{menteeInfo.highschoolarea}}</b>
                                            </li>
                                            <li></li>
                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                                <p class="line"></p>
                                <div class="InfoBox">
                                    <h4 class="labtile">附加信息</h4>
                                    <div slot="content">
                                        <ul class="labBox">
                                            <li style="margin-right:0;">
                                                <h4 class="tip">客户留言</h4>
                                                <span class="labval">{{menteeInfo.comment}}</span>
                                            </li>
                                            <li style="margin-right:0;">
                                                <h4 class="tip">客户特殊要求</h4>
                                                <span class="labval">{{menteeInfo.demand}}</span>
                                            </li>
                                        </ul>
                                        <ul class="labBox">
                                            <li style="margin-right:0;">
                                                <h4 class="tip">联系渠道</h4>
                                                <b class="labval">{{menteeInfo.comefrom}}</b>
                                            </li>
                                            <li style="margin-right:0;">
                                                <h4 class="tip">推荐来源</h4>
                                                <b class="labval">{{menteeInfo.actualfrom}}</b>
                                            </li>
                                        </ul>
                                        <ul class="labBox">
                                            <li style="margin-right:0;">
                                                <h4 class="tip">标签备注</h4>
                                                <b class="labval">{{menteeInfo.tag}}</b>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div class="item" style="margin-top:20px;" v-if="surveyInfo.surveyaddr">
                    <Collapse class="pantile" simple v-model="quescont">
                        <Panel name="1">
                            <div>
                                <span class="bigtile">问卷信息</span>
                            </div>
                            <div class="wjBox" slot="content">
                                <ul class="labBox">
                                    <li>
                                        <h4 class="tip">问卷发放日期</h4>
                                        <b class="labval">{{surveyInfo.create_time}}</b>
                                    </li>
                                    <li>
                                        <h4 class="tip">问卷地址</h4>
                                        <span class="iptBox">
                                            <Input class="txtBox" v-model="surveyInfo.surveyaddr" style="width:100%" readonly/>
                                            <Button class="copybtn" @click="copyData">复制</Button>
                                        </span>
                                    </li>
                                    <li style="margin-left:20px;">
                                        <h4 class="tip">问卷填写状态</h4>
                                        <b class="labval">{{surveyInfo.surveycomplete}}</b>
                                    </li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div class="rtItem">
                <div class="item" v-if="contractInfo.contractamount">
                    <Collapse class="pantile" simple v-model="contrtInfo">
                        <Panel name="1">
                            <div>
                                <span class="bigtile">合同信息</span>
                            </div>
                            <div slot="content">
                                <div class="concatInfo">
                                    <ul class="labBox" style="margin-bottom: 15px;">
                                        <li>
                                            <h4 class="tip">总金额</h4>
                                            <b class="labval">{{contractInfo.contractamount}}</b>
                                        </li>
                                        <li>
                                            <h4 class="tip">收款账户</h4>
                                            <b class="labval">{{contractInfo.paytype}}</b>
                                        </li>
                                        <li>
                                            <h4 class="tip">支付类型</h4>
                                            <b class="labval bluebtn" v-if="contractInfo.splitperiod">{{contractInfo.splitperiod==1?'一期':contractInfo.splitperiod==2?'二期':contractInfo.splitperiod==3?'三期':''}}</b>
                                        </li>
                                    </ul>
                                    <ul class="labBox">
                                        <li style="margin-right:0;">
                                            <h4 class="tip">辅助销售</h4>
                                            <span class="labval">
                                                <span v-for="(itm,j) in contractInfo.assistedSales" :key="j" class="spanitem">
                                                    {{itm.chinesename}}
                                                    <b>{{itm.type=='给力'?'i':itm.type=='非常给力'?'ii':'iii'}}</b>
                                                </span>
                                            </span>
                                        </li>
                                    </ul>
                                    <ul class="labBox">
                                        <li style="margin-right:0;">
                                            <h4 class="tip">备注</h4>
                                            <b class="labval">{{contractInfo.comment}}</b>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div class="item" style="margin-top:20px;" v-if="paymentInfo.length">
                    <Collapse class="pantile" simple v-model="paycont">
                        <Panel name="1">
                            <h3 class="bigtile">
                                <span>支付详情</span>
                                <span class="bluetig" v-if="paymentInfo.length">{{paymentInfo.length==1?'一期':paymentInfo.length==2?'二期':paymentInfo.length==3?'三期':''}}</span>
                            </h3>
                            <div class="contBox payBox" slot="content">
                                <Table :columns="columns" :data="paymentInfo">
                                    <template slot-scope="{row}" slot="paid">
                                        <span :class="row.paid?'greenstu':'orangestu'">{{row.paid?'已支付':'未支付'}}</span>
                                    </template>
                                </Table>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </div>
        <Modal
            v-model="showInfo"
            class="edInfo"
            width="400"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>编辑信息</span>
                    <img class="close" src="../images/close.png" @click="clostModal">
                </div>
            </template>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">联系人</span>
                    <Input v-model="editInfo.contactname" placeholder="请输入" style="width: 100%" />
                </div>
                <div class="col_line">
                    <span class="tigname">联系人类型</span>
                    <Select v-model="editInfo.contactidentity" style="width:100%;">
                        <Option v-for="item in conList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">电话</span>
                    <Input v-model="editInfo.phone" placeholder="请输入" style="width: 100%" />
                </div>
                <div class="col_line">
                    <span class="tigname">微信号</span>
                    <Input v-model="editInfo.wechatcontact" placeholder="请输入" style="width: 100%" />
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">学员姓名<b class="red">*</b></span>
                    <Input v-model="editInfo.chinesename" placeholder="请输入" style="width: 100%" />
                </div>
                <div class="col_line">
                    <span class="tigname">学员微信</span>
                    <Input v-model="editInfo.wechatstudent" placeholder="请输入" style="width: 100%" />
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">学员籍贯</span>
                    <div class="cityBox">
                        <Icon class="arr_down" type="ios-arrow-down" />
                        <Input v-model="editInfo.area" placeholder="学员籍贯" readonly @click.native="showProvevent" style="width: 100%;" />
                        <area-select :checkItem='editInfo.areacode' :showArea="showProvice" @setData="getProvice" @close="closeProvice"></area-select>
                    </div>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">所在地区</span>
                    <div class="cityBox">
                        <Icon class="arr_down" type="ios-arrow-down" />
                        <Input v-model="editInfo.highschoolarea" readonly @click.native="showPlacevent" placeholder="所在地区（省市）" style="width: 100%;" />
                        <area-select :checkItem="editInfo.hschoolareacode" :showArea="showPlace" @setData="getPlace" @close="closePlace"></area-select>
                    </div>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">学员微信</span>
                    <Input v-model="editInfo.wechatstudent" placeholder="请输入" style="width: 100%" />
                </div>
                <div class="col_line">
                    <span class="tigname">申请年份<b class="red">*</b></span>
                    <Select v-model="editInfo.appyear" style="width:100%;">
                        <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">所在院校</span>
                    <!-- <Input v-model="editInfo.highschool" placeholder="请输入" style="width: 100%" /> -->
                    <Select
                        v-model="editInfo.highschool"
                        filterable
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <Option v-for="(option, index) in optionslist" :value="option" :key="index">{{option}}</Option>
                    </Select>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">推荐来源</span>
                    <Input v-model="editInfo.actualfrom" placeholder="请输入" style="width: 100%" />
                </div>
                <div class="col_line">
                    <span class="tigname">联系渠道</span>
                    <Select v-model="editInfo.comefrom" style="width:100%;">
                        <Option v-for="item in comefromList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">客户留言</span>
                    <Input v-model="editInfo.comment" placeholder="请输入" style="width: 100%" />
                </div>
                <div class="col_line">
                    <span class="tigname">客户特殊要求</span>
                    <Input v-model="editInfo.demand" placeholder="请输入" style="width: 100%" />
                </div>
            </div>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">标签备注</span>
                    <Input ref='tagInpt' v-model="editInfo.tag" placeholder="以顿号分隔，如：标化神、拖延狗、活动强等..." style="width: 100%;" />
                </div>
            </div>
            <div class="btnBox">
                <Button class="button" @click="oksure">确定</Button>
                <Button class="button" @click="showInfo=false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import AreaSelect from '../components/AreaSelect';

export default {
    name:'Baseinfo',
    props:{
        id:''
    },
    data() {
        return {
            showPlace:false,
            showProvice:false,
            showInfo:false,
            conList:[
                {
                    value:0,
                    label:'未知'
                },
                {
                    value:1,
                    label:'学员本人'
                },
                {
                    value:2,
                    label:'家长'
                }
            ],
            yearList:[
                {
                    value: 2021,
                    label:'2021年申请'
                },
                {
                    value: 2022,
                    label:'2022年申请'
                },
                {
                    value: 2023,
                    label:'2023年申请'
                },
                {
                    value: 2024,
                    label:'2024年申请'
                }
            ],
            comefromList:[
                {
                    value:1,
                    label:'微信（包含小程序）'
                },
                {
                    value:2,
                    label:'网站填表'
                },
                {
                    value:3,
                    label:'推荐'
                },
                {
                    value:4,
                    label:'线上宣讲会'
                },
                {
                    value:5,
                    label:'线下宣讲会'
                },
                {
                    value:6,
                    label:'其它'
                }
            ],
            panelCard:[1],
            quescont:[1],
            contrtInfo:[1],
            paycont:[1],
            columns:[
                {
                    title: '支付时间',
                    key: 'paydate'
                },
                {
                    title: '应收金额',
                    key: 'dueamount'
                },
                {
                    title: '支付状态',
                    slot: 'paid'
                }
            ],
            loading:false,
            optionslist:[],
            opt:[],
            datalist:[],
            editInfo:{},
            menteeInfo:{},
            surveyInfo:{},
            contractInfo:{},
            paymentInfo:[],
            saleList:[]
        };
    },
    components: {
        AreaSelect
    },
    watch: {
        id:{
            handler(now){
                if(now){
                    this.getperInfo();
                }
            },
            immediate:true,
            deep:true
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.$bus.$on('reloadInfo',res=>{
            this.getperInfo();
        });
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        //验证必填项
        ruleFormate(){
            const type = this.editInfo.type;
            const appyear = this.editInfo.appyear;
            const chinesename = this.editInfo.chinesename;
            // const phone = this.editInfo.phone;
            if(!type||!appyear||/^\s*$/.test(chinesename)){
                return false;
            };
            // if(!/^1\d{10}$/.test(phone)){
            //     return 102;
            // };
            return true;
        },
        oksure(){
            const flag = this.ruleFormate();
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            if(flag == 102){
                this.$Message.error('请输入正确的手机号！');
                return;
            };
            this.showInfo = false;
            const params = {
                id:this.id,
                type:this.editInfo.type,
                contactname:this.editInfo.contactname,
                contactidentity:this.editInfo.contactidentity,
                wechatcontact:this.editInfo.wechatcontact,
                phone:this.editInfo.phone,
                chinesename:this.editInfo.chinesename,
                wechatstudent:this.editInfo.wechatstudent,
                area:this.editInfo.area,
                areacode:this.editInfo.areacode,
                appyear:this.editInfo.appyear,
                highschool:this.editInfo.highschool,
                highschoolarea:this.editInfo.highschoolarea,
                hschoolareacode:this.editInfo.hschoolareacode,
                comefrom:this.editInfo.comefrom,
                comment:this.editInfo.comment,
                demand:this.editInfo.demand,
                actualfrom:this.editInfo.actualfrom,
                tag:this.editInfo.tag,
                salewish:this.editInfo.salewish,
                reason:this.editInfo.reason
            };
            this.$https.editclitInfo(params).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getperInfo();
                    this.$bus.$emit('upltMenu',true);
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        remoteMethod (query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.optionslist;
                    this.opt = list.filter(item => item.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            }else{
                this.opt = [];
            };
        },
        closeProvice(status){
            this.showProvice = status;
        },
        showProvevent(){
            this.showPlace = false;
            this.showProvice = true;
        },
        getProvice(data){
            this.editInfo.area = data.name;
            this.editInfo.areacode = data.id;
        },
        showPlacevent(){
            this.showProvice = false;
            this.showPlace = true;
        },
        getPlace(data){
            this.editInfo.highschoolarea = data.name;
            this.editInfo.hschoolareacode = data.id;
        },
        closePlace(status){
            this.showPlace = status;
        },
        goEdit(){
            this.showInfo = true;
        },
        clostModal(){
            this.showInfo = false;
        },
        copyData(){
            const data = this.surveyInfo.surveyaddr;
            let clipboard = new Clipboard('.copybtn', {
                text: function () {
                    return data
                }
            })
            clipboard.on('success', e => {
                this.$Message.success('复制成功！');
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$Message.error('复制失败！');
                clipboard.destroy()
            })
        },
        getperInfo(){
            this.$https.getclitnfo({
                id:this.id
            }).then(res=>{
                if(res&&res.code==200){
                    this.editInfo = JSON.parse(JSON.stringify(res.data.menteeInfo));
                    this.menteeInfo = res.data.menteeInfo;
                    this.surveyInfo = res.data.surveyInfo;
                    this.contractInfo = res.data.contractInfo;
                    this.paymentInfo = res.data.paymentInfo;
                    if(res.data.menteeInfo.type=='u'){
                        this.gethdata();
                    }else{
                        this.getudata();
                    }
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        gethdata(){
            this.$https.gethighschool({}).then(res=>{
                if(res&&res.code==200){
                    this.optionslist = res.data;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getudata(){
            this.$https.getunderschool({}).then(res=>{
                if(res&&res.code==200){
                    this.optionslist = res.data;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        }
    }
};
</script>

<style lang='scss'>
#Baseinfo{
    // height: calc(100vh - 215px);
    overflow-y: auto;
    .flexBox{
        display: flex;
        .lfItem{
            flex: 1;
            margin-right: 20px;
        }
        .rtItem{
            width: 35%;
        }
        .item{
            border-radius: 5px;
            .ivu-collapse-header{
                height: 50px;
                line-height: 50px;
                padding-left: 0;
                border-bottom: 1px solid #F3F5F8;
            }
            .ivu-collapse{
                border: none;
                .ivu-collapse-item{
                    border-top: none;
                }
            }
            .ivu-icon-ios-arrow-forward{
                float: right;
                vertical-align: middle;color: #1665D8;
                font-weight: normal;
                margin-top: 9px;
                background-color: #F5F6FA;
                width: 28px;
                height: 28px;
                text-align: center;
                line-height: 28px;
                border-radius: 50%;
            }
            .ivu-collapse-content{
                padding: 0;
            }
            .pantile{
                .bigtile{
                    font-size: 18px;
                    font-weight: 600;
                    margin-left: 25px;
                    color: #3E3F42;
                    .bluetig{
                        background-color: #F5F6FA;
                        color:#1665D8;
                        padding: 4px 8px;
                        font-size: 12px;
                        font-weight: normal;
                        margin-left: 10px;
                        border-radius: 4px;
                    }
                }
                .rtIcon{
                    display: inline-block;
                    line-height: normal;
                }
                .editIcon{
                    width: 28px;
                    height: 28px;
                    margin-right: 20px;
                    margin-top: 10px;
                }
            }
            .concatInfo{
                padding: 15px 20px 0;
                background-color: #fff;
            }
            .InfoBox{
                padding: 0 25px;
            }
            .labtile{
                color: #1665D8;
                font-weight: normal;
                font-size: 14px;
                margin-top: 20px;
            }
            .line{
                height: 1px;
                width: 100%;
                background-color: #F3F5F8;
                margin-top: 20px;
            }
            .labBox{
                display: flex;
                flex-flow: wrap;
                margin-top: 15px;
                >li{
                    flex: 1;
                    box-sizing: border-box;
                    .tip{
                        color: #9EA0A5;
                        font-weight: normal;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .labval{
                        font-weight: normal;
                        color: #666;
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
        //问卷
        .wjBox{
            padding: 15px 25px 0;
            .iptBox{
                display: flex;
                .copybtn{
                    display: inline-block;
                    vertical-align: middle;
                    border: 1px solid #ddd;
                    background-color: #fff;
                    padding: 0 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-left: 10px;
                }
            }
        }
        //支付详情列表
        .payBox{
            .ivu-table th{
                background-color: #fff;
                font-size: 14px;
                font-weight: normal;
                color: #9EA0A5;
            }
            .ivu-table td{
                border: none;
                height: 30px;
            }
            .ivu-table:before{
                display: none;
            }
            .ivu-table-body{
                margin-top: 15px;
            }
            .greenstu{
                color:#34AA44;
                background-color: #E3E5ED;
                padding: 5px 8px;
                font-size: 12px;
                border-radius: 4px;
            }
            .orangestu{
                color:#F6AB2F;
                background-color: #E3E5ED;
                padding: 5px 8px;
                font-size: 12px;
                border-radius: 4px;
            }
        }
        //其它
        .optionmenu{
            position: relative;
            width: 100%;
            .selmenu{
                display: inline-block;
                border-radius: 4px;
                overflow: hidden;
                border: 1px solid #E4E6ED;
                margin-right: 20px;
                >span{
                    display: inline-block;
                    width:80px;
                    height:38px;
                    cursor: pointer;
                    background-color: #fff;
                    text-align: center;
                    line-height: 38px;
                    border-right: 1px solid #E4E6ED;
                    &:last-of-type{
                        border: none;
                    }
                    &.active{
                        background-color: #3E3F42;
                        color: #fff;
                    }
                }
                .ivu-select{
                    vertical-align: middle;
                    margin-top: -3px;
                    border-left: 1px solid #E4E6ED;
                }
                .ivu-select-selection{
                    border:none;
                    border-radius: 0;
                    height:38px;
                    .ivu-select-placeholder,.ivu-select-selected-value{
                        height: 38px;
                        line-height: 38px;
                    }
                }
            }
            >button{
                position: absolute;
                right: 0;
                top: 0;
                background-color: #3E3F42;
                border-color: #3E3F42;
                box-shadow: none;
            }
            .menubox{
                position: absolute;
                right: 0;
                top: 0;
                border-radius: 4px;
                background-color: #3E3F42;
                .ivu-btn{
                    background-color: #3E3F42;
                    color: #fff;
                    border: none;
                    border-radius: 0;
                    height: 38px;
                    border-right: 1px solid #fff;
                    &:focus{
                        box-shadow: none;
                    }
                }
                .ivu-icon{
                    color: #fff;
                    width: 24px;
                }
                .ivu-dropdown-rel{
                    border-radius: 4px;
                    overflow: hidden;
                }
                .ivu-select-dropdown{
                    background-color: #3E3F42;
                    left: 0;
                    .ivu-dropdown-item{
                        color: #fff;
                        &:hover{
                            background-color: #6B6C6F;
                        }
                    }
                }
            }
        }
        .cardBox{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
            .carditem{
                flex: 20%;
                border-radius:4px;
                overflow: hidden;
                margin-right: 20px;
                margin-bottom: 20px;
                border: 1px solid #EAEDF3;
                background-color: #fff;
                &:nth-of-type(4n){
                    margin-right: 0;
                }
                .hedbox{
                    border-top: 6px solid #1BBBBB;
                    border-bottom: 1px dashed #E3E5ED;
                    font-weight: normal;
                    position: relative;
                    height: 53px;
                    line-height: 47px;
                    >span{
                        font-size: 22px;
                        margin-left: 24px;
                        color: #1BBBBB;
                    }
                    .stubtn{
                        font-size: 12px;
                        background-color: #fff;
                        color: #1BBBBB;
                        background-color: rgba(27,187,187,.2);
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 56px;
                        height: 28px;
                        text-align: center;
                        line-height: 28px;
                        border-radius: 2px;
                        right: 20px;
                    }
                    .numbtn{
                        position: absolute;
                        top: 50%;
                        right: 20px;
                        transform: translateY(-50%);
                        color: #1BBBBB;
                        font-size:22px;
                    }
                }
                .centerBox{
                    padding: 10px 24px;
                    min-height: 185px;
                    border-bottom: 1px dashed #E3E5ED;
                    >li{
                        &:before{
                            content:'';
                            display: inline-block;
                            background-color: #1BBBBB;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                            vertical-align: middle;
                            margin:-2px 8px 0 0;
                        }
                    }
                }
                .optionBox{
                    position: relative;
                    padding: 0 24px;
                    height: 56px;
                    line-height: 56px;
                    >.timespan{
                        color: #1BBBBB;
                    }
                    .iconBox{
                        position: absolute;
                        right: 20px;
                        color: #3E3F42;
                        top:50%;
                        transform: translateY(-50%);
                        .ivu-icon{
                            cursor: pointer;
                            font-size: 20px;
                            margin-right: 10px;
                            &:last-of-type{
                                margin-right: 0;
                            }
                        }
                    }
                }
                &.cblue{
                    .hedbox{
                        border-top: 6px solid #1BBBBB;
                        >span{
                            color: #1BBBBB;
                        }
                        .stubtn{
                            color: #1BBBBB;
                            background-color: rgba(27,187,187,.2);
                        }
                        .numbtn{
                            color: #1BBBBB;
                        }
                    }
                    .centerBox{
                        >li{
                            &:before{
                                background-color: #1BBBBB;
                            }
                        }
                    }
                    .optionBox{
                        >.timespan{
                            color: #1BBBBB;
                        }
                    }
                }
                &.orange{
                    .hedbox{
                        border-top: 6px solid #F6AB2F;
                        >span{
                            color: #F6AB2F;
                        }
                        .stubtn{
                            color: #F6AB2F;
                            background-color: rgba(246,171,47,.2);
                        }
                        .numbtn{
                            color: #F6AB2F;
                        }
                    }
                    .centerBox{
                        >li{
                            &:before{
                                background-color: #F6AB2F;
                            }
                        }
                    }
                    .optionBox{
                        >.timespan{
                            color: #F6AB2F;
                        }
                    }
                }
                &.green{
                    .hedbox{
                        border-top: 6px solid #34AA44;
                        >span{
                            color: #34AA44;
                        }
                        .stubtn{
                            color: #34AA44;
                            background-color: rgba(52,170,68,.2);
                        }
                        .numbtn{
                            color: #34AA44;
                        }
                    }
                    .centerBox{
                        >li{
                            &:before{
                                background-color: #34AA44;
                            }
                        }
                    }
                    .optionBox{
                        >.timespan{
                            color: #34AA44;
                        }
                    }
                }
                &.blue{
                    .hedbox{
                        border-top: 6px solid #1665D8;
                        >span{
                            color: #1665D8;
                        }
                        .stubtn{
                            color: #1665D8;
                            background-color: rgba(22,101,216,.2);
                        }
                        .numbtn{
                            color: #1665D8;
                        }
                    }
                    .centerBox{
                        >li{
                            &:before{
                                background-color: #1665D8;
                            }
                        }
                    }
                    .optionBox{
                        >.timespan{
                            color: #1665D8;
                        }
                    }
                }
                &.purple{
                    .hedbox{
                        border-top: 6px solid #6758F3;
                        >span{
                            color: #6758F3;
                        }
                        .stubtn{
                            color: #6758F3;
                            background-color: rgba(103,88,243,.2);
                        }
                        .numbtn{
                            color: #6758F3;
                        }
                    }
                    .centerBox{
                        >li{
                            &:before{
                                background-color: #6758F3;
                            }
                        }
                    }
                    .optionBox{
                        >.timespan{
                            color: #6758F3;
                        }
                    }
                }
                &.red{
                    .hedbox{
                        border-top: 6px solid #E6492D;
                        >span{
                            color: #E6492D;
                        }
                        .stubtn{
                            color: #E6492D;
                            background-color: rgba(230,73,45,.2);
                        }
                        .numbtn{
                            color: #E6492D;
                        }
                    }
                    .centerBox{
                        >li{
                            &:before{
                                background-color: #E6492D;
                            }
                        }
                    }
                    .optionBox{
                        >.timespan{
                            color: #E6492D;
                        }
                    }
                }
            }
        }
        .flexCard{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
            .flexItem{
                flex: 30%;
                margin-right: 25px;
                background-color: #fff;
                box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
                border: 1px solid #EAEDF3;
                border-radius:4px;
                &:nth-of-type(3n){
                    margin-right: 0;
                }
                .headtip{
                    line-height: 60px;
                    height: 60px;
                    width: 100%;
                    border-bottom: 1px solid #EAEDF3;
                    font-weight: 600;
                    position: relative;
                    padding: 0 24px 0 0;
                    .tipcolor{
                        width:12px;
                        height:16px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-top: -2px;
                        margin-right: 12px;
                    }
                    >span{
                        font-size: 18px;
                    }
                    >b{
                        font-size: 16px;
                        position: absolute;
                        right: 24px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .blue{
                        background-color: #1665D8;
                    }
                    .green{
                        background-color: #34AA44;
                    }
                    .orange{
                        background-color: #F6AB2F;
                    }
                }
                .contbox{
                    padding: 24px;
                    border-bottom: 1px solid #EAEDF3;
                    height: 240px;
                    overflow-y: auto;
                    .tiptile{
                        font-size: 14px;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }
                    .labox{
                        margin-bottom: 10px;
                        >span{
                            margin-bottom: 10px;
                            display: inline-block;
                            border-radius:3px;
                            padding: 4px 6px;
                            font-size: 13px;
                            border: 1px solid #BCBCBC;
                            margin-right: 8px;
                            &:last-of-type{
                                margin-right: 0;
                            }
                        }
                    }
                    .valbox{
                        font-size:14px;
                        color: #6B6C6F;
                    }
                }
                .optionbox{
                    padding: 0 24px;
                    height: 60px;
                    line-height: 60px;
                    position: relative;
                    .boldtime{
                        font-weight: 600;
                        >b{
                            font-weight: normal;
                        }
                    }
                    .iconbox{
                        position: absolute;
                        right: 24px;
                        top: 50%;
                        transform: translateY(-50%);
                        >span{
                            cursor: pointer;
                            margin-right: 10px;
                            &:last-of-type{
                                margin-right: 0;
                            }
                        }
                        .ivu-icon{
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
}
// 弹窗
.edInfo{
    .red{
        color: #f00;
    }
    .ivu-input{
        color:#3f4042;
    }
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        font-weight: 600;
        border-radius: 4px;
        padding: 21px 16px;
        .tilehead{
            color: #333;
            line-height: 15px;
            .close{
                float: right;
                cursor: pointer;
                margin-top: -4px;
                width: 24px;
                height: 24px;
            }
        }
    }
    .cityBox{
        position: relative;
        .arr_down{
            position: absolute;
            right: 9px;
            top: 9px;
            z-index: 5;
            color: #808695;
        }
        #Area_select{
            position: absolute;
            z-index: 10;
            top: 32px;
            left: 0;
        }
    }
    .row_box{
        display: flex;
        margin-bottom: 20px;
        .col_line{
            flex: 1;
            margin-right: 20px;
            &:last-of-type{
                margin-right: 0;
            }
            .tigname{
                display: block;
                color: #9Ea0a5;
                height: 40px;
                line-height: 40px;
                width: 100%;
            }
            .time{
                color: #515A6E;
                height: 30px;
                line-height: 30px;
                display: block;
            }
        }
    }
    .titletig{
      color: #9Ea0a5;
      font-weight: normal;
      line-height: 35px;
      height: 35px;
    }
    .iptbox{
      height: 120px;
      textarea{
        height: 100%;
      }
    }
    .btnBox{
        display: flex;
        margin-top: 35px;
        margin-bottom: 20px;
        .button{
            flex: 1;
            border :none;
            background-color: #1665D8;
            color: #fff;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>