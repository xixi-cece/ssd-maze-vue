<template>
    <div id="Wait">
        <h2 class="topTile clearfix">
            <span class="fl btnspan meName" :title="selmenteeobj.contactname">{{selmenteeobj.contactname}}</span>
            <button class="gary typebutton" v-if="typecn">
                <Icon 
                    :custom="menteetype=='u'?'iconfont iconmeiguobenke'
                    :menteetype=='g'?'iconfont iconyanjiusheng':menteetype=='t'?
                    'iconfont iconzhuanxue':menteetype=='uk'?'iconfont iconyingguobenke':
                    menteetype=='p'?'iconfont icondanpianPS':menteetype=='s'?'iconfont iconqitadanpianPS'
                    :menteetype=='o'?'iconfont iconqita':menteetype=='c'?'iconfont iconqitaguojia1':''"
                    :style="menteetype=='u'?'color:#1665D8':menteetype=='g'?'color:#E6492D'
                    :menteetype=='t'?'color:#6758F3':menteetype=='uk'?'color:#34AA44':
                    menteetype=='p'?'color:#F6AB2F':menteetype=='s'?'color:#FACF55':
                    menteetype=='o'?'color:#3E3F42':menteetype=='c'?'color:#1BBBBB':''"
                ></Icon>
                <span class="btnspan" :title="typecn">{{typecn}}</span>
            </button>
            <div class="stepBox" v-if="menteetype=='u'||menteetype=='g'||menteetype=='t'">
                <Steps :current="currentStep">
                    <Step icon="ios-checkmark-circle">
                        <span class="ponBox" slot="content">
                            <span>处理中</span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':'ios-checkmark-circle'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content">
                            <span>正在勾搭</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==1?'md-radio-button-on':'ios-checkmark-circle'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(1)">
                            <Tooltip v-if='currentStep==1&&currtstatus!="unassigned"' content="发送问卷" :always="true"></Tooltip>
                            <span v-else>{{currentStep==1?'发送问卷':'已发问卷'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==2?'md-radio-button-on':currentStep>2?'ios-checkmark-circle':'md-radio-button-off'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(2)">
                            <Tooltip v-if='currentStep==2&&currtstatus!="unassigned"' content="发送合同" :always="true"></Tooltip>
                            <span v-else>{{currentStep==2?'发送合同':'已发合同'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==3?'md-radio-button-on':currentStep>3?'ios-checkmark-circle':'md-radio-button-off'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(3)">
                            <Tooltip v-if='currentStep==3&&currtstatus!="unassigned"' content="完成付款" :always="true"></Tooltip>
                            <span v-else>{{currentStep==3?'未付款':'完成付款'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==4?'md-radio-button-on':currentStep>4?'ios-checkmark-circle':'md-radio-button-off'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(4)">
                            <Tooltip v-if='currentStep==4&&currtstatus!="unassigned"' content="签约完成" :always="true"></Tooltip>
                            <span>{{currentStep==4?'未完成':'签约完成'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                </Steps>
            </div>
            <div class="stepBox" v-else>
                <Steps :current="currentStep">
                    <Step icon="ios-checkmark-circle">
                        <span class="ponBox" slot="content">
                            <span>处理中</span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':'ios-checkmark-circle'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content">
                            <span>正在勾搭</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==1?'md-radio-button-on':'ios-checkmark-circle'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(2)">
                            <Tooltip v-if='currentStep==1&&currtstatus!="unassigned"' content="发送合同" :always="true"></Tooltip>
                            <span v-else>{{currentStep==1?'发送合同':'已发合同'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==2?'md-radio-button-on':currentStep>2?'ios-checkmark-circle':'md-radio-button-off'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(3)">
                            <Tooltip v-if='currentStep==2&&currtstatus!="unassigned"' content="完成付款" :always="true"></Tooltip>
                            <span v-else>{{currentStep==2?'未付款':'完成付款'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                    <Step :icon="currentStep==-1?'md-radio-button-off':currentStep==3?'md-radio-button-on':currentStep>3?'ios-checkmark-circle':'md-radio-button-off'" :class="[(currtstatus=='unassigned'||!isMe)?'nopointer':'']">
                        <span class="ponBox" slot="content" @click="showModal(4)">
                            <Tooltip v-if='currentStep==3&&currtstatus!="unassigned"' content="签约完成" :always="true"></Tooltip>
                            <span v-else>{{currentStep==3?'未完成':'签约完成'}}</span>
                            <span class="no_click" v-if="currtstatus=='unassigned'||!isMe"></span>
                        </span>
                    </Step>
                </Steps>
            </div>
            <button v-if='currtstatus!="signed"' :class="['fr cachebtn sendbtn',(currtstatus=='unassigned'||!isMe)?'noclick':'']" @click="sendOths" :style="currtstatus=='gone'?'right:26px':''">转给其他销售</button>
            <button v-if='currtstatus!="signed"&&currtstatus!="gone"' :class="['fr cachebtn',(currtstatus=='unassigned'||!isMe)?'noclick':'']" @click="cacheSign">放弃签约</button>
            <button v-if='currtstatus=="signed"' :class="['fr cachebtn greenbtn',(currtstatus=='unassigned'||!isMe)?'noclick':'']" @click="showBack=true">提交返点</button>
            <button v-if='currtstatus=="signed"' :class="['fr cachebtn bulebtn',(currtstatus=='unassigned'||!isMe)?'noclick':'']" @click="lookMaze">查看Maze</button>
        </h2>
        <div class="formBox">
            <div class="item">
                <div class="leftBox" v-if="contratbtn">
                    <Collapse class="pantile" simple v-model="contrtInfo">
                        <Panel name="1">
                            <div>
                                <span class="bigtile">合同信息</span>
                                <img class="editImg" src="../images/edit.png" @click.stop="editContract">
                            </div>
                            <div slot="content">
                                <div class="concatInfo">
                                    <ul class="labBox" style="margin-bottom: 15px;">
                                        <li>
                                            <h4 class="tip">总金额</h4>
                                            <b class="labval">{{totalmoney}}</b>
                                        </li>
                                        <li>
                                            <h4 class="tip">收款账户</h4>
                                            <b class="labval">{{payaccout}}</b>
                                        </li>
                                        <li>
                                            <h4 class="tip">支付类型</h4>
                                            <b class="labval bluebtn" v-if="splitperiod">{{splitperiod==1?'一期':splitperiod==2?'二期':splitperiod==3?'三期':''}}</b>
                                        </li>
                                    </ul>
                                    <ul class="labBox">
                                        <li style="margin-right:0;">
                                            <h4 class="tip">辅助销售</h4>
                                            <span class="labval">
                                                <span v-for="(itm,j) in saleList" :key="j" class="spanitem">
                                                    {{itm.chinesename}}
                                                    <b>{{itm.type=='给力'?'i':itm.type=='非常给力'?'ii':'iii'}}</b>
                                                </span>
                                            </span>
                                        </li>
                                        <li></li>
                                        <li style>
                                            <h4 class="tip">备注</h4>
                                            <b class="labval">{{saytag}}</b>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div class="leftBox" v-if="quesbtn&&(menteetype=='u'||menteetype=='g'||menteetype=='t')">
                    <Collapse class="pantile" simple v-model="quescont">
                        <Panel name="1">
                            <div>
                                <span class="bigtile">问卷信息</span>
                            </div>
                            <div class="wjBox" slot="content">
                                <ul class="labBox">
                                    <li>
                                        <h4 class="tip">问卷发放日期</h4>
                                        <b class="labval">{{quesuredate}}</b>
                                    </li>
                                    <li>
                                        <h4 class="tip">问卷地址</h4>
                                        <span class="iptBox">
                                            <Input class="txtBox" v-model="listadres" style="width:100%" readonly/>
                                            <Button class="copybtn" @click="copyData">复制</Button>
                                        </span>
                                    </li>
                                    <li style="margin-left:20px;">
                                        <h4 class="tip">问卷填写状态</h4>
                                        <b :class="['labval quesfont',surstatus==1?'greenstatu':'']">{{surstatus}}</b>
                                    </li>
                                </ul>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <div class="leftBox">
                    <Collapse class="pantile" simple v-model="panelCard">
                        <Panel name="1">
                            <div>
                                <span class="bigtile">学员信息</span>
                                <span class="fr rtIcon" @click.stop="goEdit" v-if="isMe&&currtstatus!='unassigned'&&currtstatus!='signed'">
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
                                                <b class="labval">{{userName}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">联系人类型</h4>
                                                <b class="labval">{{contactidentity}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">电话</h4>
                                                <b class="labval">{{phone}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">微信号</h4>
                                                <b class="labval">{{wechat}}</b>
                                            </li>
                                        </ul>
                                    </div>
                                    <p class="line"></p>
                                    <h4 class="labtile">申请信息</h4>
                                    <div slot="content">
                                        <ul class="labBox">
                                            <li>
                                                <h4 class="tip">学员姓名</h4>
                                                <b class="labval">{{selmenteeobj.chinesename}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">学员微信</h4>
                                                <b class="labval">{{wechatstudent}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">学员籍贯</h4>
                                                <b class="labval">{{area}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">申请年份</h4>
                                                <b class="labval">{{appyear}}</b>
                                            </li>
                                        </ul>
                                        <ul class="labBox">
                                            <li>
                                                <h4 class="tip">高中名称</h4>
                                                <b class="labval">{{highschool}}</b>
                                            </li>
                                            <li>
                                                <h4 class="tip">所在地区</h4>
                                                <b class="labval">{{highschoolarea}}</b>
                                            </li>
                                            <li>
                                                <!-- <h4 class="tip">申请类型</h4>
                                                <b class="labval">{{typecn}}</b> -->
                                            </li>
                                            <li></li>
                                        </ul>
                                    </div>
                                    <p class="line"></p>
                                    <h4 class="labtile">附加信息</h4>
                                    <div slot="content">
                                        <ul class="labBox">
                                            <li style="margin-right:0;">
                                                <h4 class="tip">客户留言</h4>
                                                <span class="labval">{{comment}}</span>
                                            </li>
                                            <li style="margin-right:0;">
                                                <h4 class="tip">客户特殊要求</h4>
                                                <span class="labval">{{demand}}</span>
                                            </li>
                                        </ul>
                                        <ul class="labBox">
                                            <li style="margin-right:0;">
                                                <h4 class="tip">表面来源</h4>
                                                <b class="labval">{{comefrom}}</b>
                                            </li>
                                            <li style="margin-right:0;">
                                                <h4 class="tip">实际来源</h4>
                                                <b class="labval">{{actualfrom}}</b>
                                            </li>
                                        </ul>
                                        <ul class="labBox">
                                            <li style="margin-right:0;">
                                                <h4 class="tip">标签备注</h4>
                                                <b class="labval">{{tag}}</b>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div class="item">
                <div class="itmCard" v-if="payfinshbtn">
                    <Collapse class="pantile" simple v-model="paycont">
                        <Panel name="1">
                            <h3 class="frtiletig">
                                <span>支付详情</span>
                                <span class="bluetig" v-if="datalist.length">{{datalist.length==1?'一期':datalist.length==2?'二期':datalist.length==3?'三期':''}}</span>
                                <img src="../images/edit.png" class="editImg" @click.stop="editpayInfo">
                            </h3>
                            <div class="contBox payBox" slot="content">
                                <Table :columns="columns" :data="datalist">
                                    <template slot-scope="{row}" slot="paystatu">
                                        <span :class="row.paid?'greenstu':'orangestu'">{{row.paid?'已支付':'未支付'}}</span>
                                    </template>
                                </Table>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <!-- <div class="itmCard" v-if="!payfinshbtn&&currtstatus!='unassigned'&&isMe"> -->
                <div class="itmCard" v-if="currtstatus!='unassigned'&&isMe">
                    <Collapse class="pantile" simple v-model="follUp">
                        <Panel name="1">
                            <h3 class="frtiletig">Follow-up</h3>
                            <div class="contBox" slot="content">
                                <div class="tip">Follow-up信息</div>
                                <textarea v-model="upInfodata" class="contInfo"></textarea>
                                <div class="tip">Follow-Up联系方式</div>
                                <p class="signBox">
                                    <span>
                                        <Select v-model="catmodel" style="width:100%;">
                                            <Option v-for="item in cityList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </span>
                                    <span>
                                        <Button style="width:100%;" type="success" ghost @click="changeState">Follow-Up 更新</Button>
                                    </span>
                                </p>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
                <!-- <div class="btmBox" v-if="!payfinshbtn"> -->
                <div class="btmBox">
                    <div class="rtCard" v-for="(k,index) in fllowsarr" :key="index">
                        <h3>
                            <img src="../images/default.png">
                            <span class="uname">{{k.sales}}</span>
                            <span class="grebtn" v-if="k.followupmethod" :title="k.followupmethod">{{k.followupmethod}}</span>
                        </h3>
                        <div class="textBox">{{k.followupinfo}}</div>
                        <p>
                            {{k.committime}}
                            <img src="../images/del.png" class="delicon" @click="delFlowup(k)" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 模态框 -->
        <Modal
            class="waitBox"
            v-model="showques"
            :closable="false"
            :mask-closable="false"
            width="388"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>发送问卷</span>
                <img class="close" src="../images/close.png" @click="showques = false;">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{selmenteeobj.chinesename}}</span>
                </li>
                <li>
                    <h4 class="labTile">联系人姓名</h4>
                    <span class="labCont">{{userName}}</span>
                </li>
            </ul>
            <h4 class="tileTig">复制问卷地址发送给学员</h4>
            <Input class="txtBox" v-model="surveyaddr" style="width:100%" readonly/>
            <Button class="suerBtn" @click="copyQues">复制问卷</Button>
            <!-- <p class="tig">点击空白区域取消</p> -->
        </Modal>
        <!-- 转给其它销售 -->
        <Modal
            class="waitBox"
            v-model="showSales"
            :closable="false"
            width='388'
            :footer-hide="true"
            :mask-closable="false"
        >
            <h3 slot="header" class="headTile">
                <span>转给其他销售</span>
                <img class="close" src="../images/close.png" @click="showSales=false">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">联系人</h4>
                    <span class="labCont">{{userName}}</span>
                </li>
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{selmenteeobj.chinesename}}</span>
                </li>
            </ul>
            <h4 class="tileTig">需要转给的销售</h4>
            <div class="saleBox">
                <!-- <Select v-model="slemanger" style="width:100%;">
                    <Option v-for="item in mangerlist" :value="item.username" :key="item.chinesename">{{ item.chinesename }}</Option>
                </Select> -->
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
        <!-- 提交返点 -->
        <Modal
            class="waitBox"
            v-model="showBack"
            :closable="false"
            :mask-closable="false"
            width="388"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>提交返点</span>
                <img class="close" src="../images/close.png" @click="showBack = false;">
            </h3>
            <h4 class="tileTig">需要返点的机构</h4>
            <div class="btnBox">
                <Select v-model="backjg" style="width:100%;">
                    <Option v-for="item in jglist" :value="item.label" :key="item.label">{{ item.label }}</Option>
                </Select>
                <Button class="mazbtn blue">确认</Button>
            </div>
        </Modal>
        <!-- 查看maze -->
        <Modal
            class="waitBox"
            v-model="showMaze"
            :closable="false"
            :mask-closable="false"
            width="388"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>查看Maze</span>
                <img class="close" src="../images/close.png" @click="showMaze=false;">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">学员姓名</h4>
                    <span class="labCont">{{selmenteeobj.chinesename}}</span>
                </li>
                <li>
                    <h4 class="labTile">销售姓名</h4>
                    <span class="labCont">{{selmenteeobj.assignedSalesCNName}}</span>
                </li>
            </ul>
            <h4 class="tileTig">Maze账号</h4>
            <div class="btnBox">
                <Input class="txtBox" v-model="mazeaccount" readonly/>
                <Button class="mazbtn" @click="copyMaze">复制</Button>
            </div>
        </Modal>
        <Contract v-if="showContrat" :showToast='showContrat' :hascontract="contractkey" :menteedata="selmenteeobj" @finsh="goPage"></Contract>
        <paydetail v-if="showpayfinsh" :selId='selmenteeobj.id' :showPay='showpayfinsh' :menteeName='selmenteeobj.chinesename' @finsh='goLink'></paydetail>
        <finsh-sign v-if="showInfo" :showToast='showInfo' :dataObj="curtObj" @closefinsh="closeModal"></finsh-sign>
        <Failsign v-if="showfail" :showfail='showfail' :datajson='selmenteeobj' @closemodal='surefail'></Failsign>
        <Cominfo :writeName='showWrite' :dataObj='selmenteeobj' @closewrite='closewrite'></Cominfo>
        <Paylook v-if="paydetail" :showModal='paydetail' :dataJoson="selmenteeobj" @getpay="colsepay"></Paylook>
    </div>
</template>

<script>
import Clipboard from 'clipboard';
import Contract from '../components/Contract';
import Paydetail from '../components/Paydetail';
import FinshSign from '../components/Finshsign';
import Failsign from '../components/Failsign';
import Cominfo from '../components/Cominfo';
import Paylook from '../components/payLook';

export default {
    data() {
        return {
            showfail:false,//是否显示放弃签约
            loading:false,
            options:[],
            /**控制顶部样式 */
            showBack:false,
            selmenteeobj:{},//当前选择学员
            backjg:'',
            jglist:[],
            showInfo:false,
            curtObj:{},
            currentStep:1,
            menteetype:'',//学员类型
            quesbtn:false,
            contratbtn:false,
            payfinshbtn:false,
            showMaze:false,
            mazeaccount:'',
            password:'',
            salesname:'',
            currtstatus:'',//状态
            showPanel:[2,3],
            contrtInfo:[1],
            fkinfo:[1],
            paycont:[1],
            panelCard:[1],
            quescont:[1],
            follUp:[1],
            cityList:[
                {
                    value:'0',
                    label:'微信聊天'
                },
                {
                    value:'1',
                    label:'微信语音'
                },
                {
                    value:'2',
                    label:'电话'
                },
                {
                    value:'3',
                    label:'面谈'
                },
                {
                    value:'4',
                    label:'邮件'
                }
            ],
            catmodel:'',//Follow-Up的联系方式
            upInfodata:'',//Follow-Up信息
            userName:'',//联系人
            contactidentity:'',//身份
            wechat:'',//微信
            phone:'',//电话
            wechatstudent:'',//学员微信
            area:'',//学员籍贯
            typecn:'',//申请类型
            appyear:'',//申请年份
            highschoolarea:'',//所在地区
            highschool:'',//所在高中
            comment:'',//客户留言
            demand:'',//客户特殊要求
            comefrom:'',//表面来源
            actualfrom: '',//实际来源
            tag:'',//标签备注
            fllowsarr:[],
            columns:[
                {
                    title: '支付时间',
                    key: 'duedate',
                    width:120
                },
                {
                    title: '应收金额',
                    key: 'dueamount',
                    width:100
                },
                {
                    title: '支付状态',
                    slot: 'paystatu',
                    width:100
                }
            ],
            showSales:false,
            mangerlist:[],//销售列表
            slemanger:'',
            showques:false,//问卷弹窗
            surveyaddr:'',//问卷地址
            showContrat:false,//合同弹窗
            showpayfinsh:false,//付款完成弹窗
            payaccout:'',//付款账号
            saleList:[],//辅助销售
            saytag:'',//备注
            splitperiodfinished:0,//分期金额是否都填写完（0未结束，1，已结束）
            splitperiod:1,//分期数
            datalist:[
                // {
                //     duedate:2020,
                //     dueamount:30,
                //     paystatu:'已支付'
                // },
                // {
                //     duedate:'',
                //     dueamount:30,
                //     paystatu:'已支付'
                // }
            ],
            paytype:'',//付款类型
            totalmoney:'',//总金额
            paytime:'',//付款时间
            paymoney:'',//付款金额
            listadres:'',
            surstatus:'',
            quesuredate:'',
            isMe:false,//是否是当前账户的学员
            contractkey:false,//是否有合同（用作合同详情）
            showWrite:false,
            paydetail:false
        };
    },
    computed: {

    },
    created() {
        const routerParm = this.$route.params;
        const query = this.$route.query;
        this.selmenteeobj.id = routerParm.id;
        this.getData();
    },
    mounted() {
        this.getlist();
    },
    components: {
        Contract,
        Paydetail,
        FinshSign,
        Failsign,
        Cominfo,
        Paylook
    },
    watch: {
        $route(to,from){
            // console.log(from);
            // console.log(to.params);
            this.selmenteeobj.id = to.params.id;
            this.getData();
        }
    },
    methods: {
        editpayInfo(){
            this.paydetail = true;
        },
        colsepay(){
            this.paydetail = false;
        },
        editContract(){
            this.showContrat = true;
            setTimeout(()=>{
                this.$bus.$emit('editcontract',true);
            },200)
        },
        lookMaze(){
            this.showMaze = true;
            this.$https.newbeeaccount({
                id:this.selmenteeobj.id
            }).then(res=>{
                if(res&&res.status=='success'){
                    this.mazeaccount = res.mazeaccount;
                    this.password = res.password;
                    this.getData();
                }else{
                    this.$Message.error(res.err_msg);
                };
            });
        },
        goEdit(){
            this.$router.push({
                path:'/sales/EditInfo',
                query:{
                    id: this.selmenteeobj.id
                }
            });
        },
        closewrite(type){
            this.showWrite = false;
            if(type){
                this.getData();
            };
        },
        getdetail(){
            this.$https.getcontdetail({
                id:this.selmenteeobj.id
            }).then(res=>{
                if(res&&res.code==200){
                    try{
                        this.splitperiodfinished = res.data.splitperiodfinished;
                        this.payaccout = res.data.paytype;
                        this.totalmoney = res.data.contractamount;
                        this.saytag = res.data.comment;
                        this.splitperiod = res.data.splitperiod;
                        this.salesname = res.data.sales;
                        this.saleList = res.data.othersales;
                        this.selmenteeobj.id = res.data.id;
                        let arr = [];
                        if(res.data.splitperiod==1){
                            arr.push(res.data.period1);
                        }else if(res.data.splitperiod==2){
                            arr.push(res.data.period1);
                            arr.push(res.data.period2);
                        }else if(res.data.splitperiod==3){
                            arr.push(res.data.period1);
                            arr.push(res.data.period2);
                            arr.push(res.data.period3);
                        };
                        this.datalist = arr;
                    }catch(e){}
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getData(){
            this.$https.lookMenteeInfo({
                id:this.selmenteeobj.id
            }).then(res=>{
                // console.log(res);
                if(res&&res.status=='success'){
                    this.$bus.$emit('uplist');
                    this.fllowsarr = res.followups;
                    if(res.contractkey){
                        this.contractkey = true;
                    }else{
                        this.contractkey = false;
                    };
                    this.listadres = res.customer.surveyaddr;
                    if(res.customer.surveycomplete===-1){
                        this.surstatus = '未填写';
                    }else if(res.customer.surveycomplete===0){
                        this.surstatus = '填写中';
                    }else if(res.customer.surveycomplete===1){
                        this.surstatus = '已完成';
                    }else{
                        this.surstatus = '未发放';
                    };
                    this.curtObj = res.customer;
                    this.userName = res.customer.contactname;
                    this.selmenteeobj.id = res.customer.id;
                    this.selmenteeobj.type = res.customer.type;
                    this.selmenteeobj.appyear = res.customer.appyear;
                    this.selmenteeobj.chinesename = res.customer.chinesename;
                    this.selmenteeobj.contactname = res.customer.contactname;
                    this.selmenteeobj.assignedSalesCNName = res.customer.assignedSalesCNName;
                    this.wechatstudent = res.customer.wechatstudent;
                    this.mazeaccount = res.customer.mazeaccount;
                    this.contactidentity = res.customer.contactidentity;
                    this.wechat = res.customer.wechatcontact;
                    this.phone = res.customer.phone;
                    this.area = res.customer.area;
                    this.menteetype = res.customer.type;
                    if(res.customer.type=='u'){
                        this.typecn = "本科";
                    }else if(res.customer.type=='g'){
                        this.typecn = "研究生";
                    }else if(res.customer.type=='t'){
                        this.typecn = "转学";
                    }else if(res.customer.type=='uk'){
                        this.typecn = "英国";
                    }else if(res.customer.type=='p'){
                        this.typecn = "单篇PS";
                    }else if(res.customer.type=='s'){
                        this.typecn = "其它单篇";
                    }else if(res.customer.type=='o'){
                        this.typecn = "其他";
                    }else if(res.customer.type=='c'){
                        this.typecn = "其他国家";
                    };
                    this.appyear = res.customer.appyear;
                    this.highschoolarea = res.customer.highschoolarea;
                    this.highschool = res.customer.highschool;
                    this.comment = res.customer.comment;
                    this.quesuredate = res.customer.surveycreatedtime;
                    this.demand = res.customer.demand;
                    this.comefrom = res.customer.comefrom;
                    this.actualfrom = res.customer.actualfrom;
                    this.tag = res.customer.tag;
                    this.currtstatus = res.customer.status;
                    this.isMe = res.belongstome;//是否为当前账户的学员
                    if(this.menteetype=='u'||this.menteetype=='g'||this.menteetype=='t'){
                        if(res.customer.status=='survey'){//已发问卷
                            this.quesbtn = true;
                            this.contratbtn = false;
                            this.currentStep = 2;
                        }else if(res.customer.status=='signing'){//已发合同
                            this.quesbtn = true;
                            this.contratbtn = true;
                            this.currentStep = 3;
                        }else if(res.customer.status=='done'){//付款完成
                            this.quesbtn = true;
                            this.contratbtn = true;
                            this.payfinshbtn = true;
                            this.currentStep = 4;
                        }else if(res.customer.status=='signed'){
                            this.quesbtn = true;
                            this.contratbtn = true;
                            this.payfinshbtn = true;
                            this.currentStep = 5;
                        };
                    }else{
                        if(res.customer.status=='ongoing'){//已发问卷
                            this.quesbtn = true;
                            this.contratbtn = false;
                            this.currentStep = 1;
                        }else if(res.customer.status=='signing'){//已发合同
                            this.quesbtn = true;
                            this.contratbtn = true;
                            this.currentStep = 2;
                        }else if(res.customer.status=='done'){//付款完成
                            this.quesbtn = true;
                            this.contratbtn = true;
                            this.payfinshbtn = true;
                            this.currentStep = 3;
                        }else if(res.customer.status=='signed'){
                            this.contratbtn = true;
                            this.payfinshbtn = true;
                            this.currentStep = 4;
                        };
                    };
                    if(res.customer.status=='gone'){
                        this.currentStep = -1;
                    };
                    if(res.customer.status=='signing'||res.customer.status=='done'||res.customer.status=='signed'){
                        this.getdetail();
                    };
                }else{
                    this.$Message.error(res.msg);
                }
            });
        },
        changeState(){
            if(!this.catmodel){
                this.$Message.error('请选择联系方式！');
                return;
            };
            if(!this.upInfodata){
                this.$Message.error('请输入联系信息！');
                return;
            };
            this.$https.updateFlowup({
                info:this.upInfodata,
                uid:this.selmenteeobj.id,
                method:this.catmodel,
            }).then(res=>{
                if(res&&res.code===200){
                    this.$Message.success('操作成功！');
                    this.upInfodata = "";
                    this.catmodel = "";
                    this.getData();
                }else{
                    this.$Message.error('操作失败！');
                };
            });
        },
        showModal(type){
            if(!this.isMe){
                return;
            };
            if(!this.selmenteeobj.chinesename){
                this.showWrite = true;
                return;
            };
            // console.log(type)
            //本科、转学、研究生（有问卷）
            if(this.menteetype=='u'||this.menteetype=='g'||this.menteetype=='t'){
                if(this.currtstatus=='ongoing'&&type==1){//正在勾搭
                    if(!this.quesbtn){
                        this.showques = true;
                        this.quesbtn = true;
                        this.upStatus(1);
                    }
                }else if(this.currtstatus=='survey'&&type==2){//已发问卷
                    if(!this.contratbtn){
                        this.showContrat = true;
                    }
                }else if(this.currtstatus=='signing'&&type==3){//已发合同
                    if(!this.payfinshbtn){
                        this.showpayfinsh = true;
                    }
                }else if(this.currtstatus=='done'&&type==4){//付款完成
                    if(!this.splitperiodfinished){
                        this.$Message.error('请等待财务确认后再操作！');
                        return;
                    };
                    this.showInfo = true;
                };
            }else{
                //无问卷
                if(this.currtstatus=='ongoing'&&type==2){//正在勾搭
                    if(!this.contratbtn){
                        this.showContrat = true;
                    }
                }else if(this.currtstatus=='signing'&&type==3){//已发合同
                    if(!this.payfinshbtn){
                        this.showpayfinsh = true;
                    }
                }else if(this.currtstatus=='done'&&type==4){//付款完成
                    if(!this.splitperiodfinished){
                        this.$Message.error('请等待财务确认后再操作！');
                        return;
                    };
                    this.showInfo = true;
                };
            };
        },
        closeModal(data){
            this.showInfo = false;
            if(data){
                this.currentStep = 4;
                this.$bus.$emit('uplist',true);
                this.$router.push({
                    path:'/sales/Sinclient'
                });
            };
        },
        upStatus(type){
            let params = {
                id:this.selmenteeobj.id
            };
            if(type == 1){
                params.newstatus = 'survey';
                params.action = 'attributesurvey';
            };
            this.$https.startStatus(params).then(res=>{
                if(res&&res.status=='success'){
                    this.$bus.$emit('uplist');
                    this.surveyaddr = res.surveyaddr;
                    this.getData();
                    this.currentStep = 2;
                }else{
                    this.$Message.error('操作失败！');
                };
            })
        },
        copyQues(){
            const data = this.surveyaddr;
            let clipboard = new Clipboard('.suerBtn', {
                text: function () {
                    return data
                }
            })
            clipboard.on('success', e => {
                this.$Message.success('复制成功！');
                this.showques = false;
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$Message.error('复制失败！');
                clipboard.destroy()
            })
        },
        goPage(data){
            this.showContrat = false;
            if(data == 'end'){
                this.contratbtn = true;
                this.currentStep = 2;
                this.getdetail();
                this.getData();
            }
        },
        goLink(data){
            this.showpayfinsh = false;
            this.getdetail();
            this.getData();
            if(this.splitperiodfinished==1){
                if(data == 'end'){
                    this.payfinshbtn = true;
                    this.currentStep = 3;
                }
            }
        },
        cacheSign(data){ 
            if(this.currtstatus=='unassigned'||!this.isMe){
                return;
            };
            this.showfail = true;
        },
        surefail(data){
            this.showfail = false;
            console.log(this.selmenteeobj.id)
            // this.$https.failSign({
            //     userId:this.selmenteeobj.id,
            // }).then(res=>{
            //     if(res&&res.code==200){
            //         this.$emit('closemodal',true);
            //         this.$Message.success('操作成功！');
            //     }else{
            //         this.$Message.error(res.msg);
            //     };
            // });
            if(data){
                this.$bus.$emit('uplist',true);
                this.$router.push({
                    path:'/sales/CacheSign'
                });
            };
        },
        copyData(){
            const data = this.listadres;
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
        getlist(){
            this.$https.getsalesList({}).then(res=>{
                if(res&&res.status=="success"){
                    this.mangerlist = res.saleslist;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            })
        },
        sendOths(){
            if(this.currtstatus=='unassigned'||!this.isMe){
                return;
            };
            this.showSales = true;
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
        sureSend(){
            const salepeo = this.slemanger;
            if(salepeo){
                this.showSales = false;
                this.$https.surereassignsales({
                    id:this.selmenteeobj.id,
                    sales:salepeo
                }).then(res=>{
                    if(res&&res.status=='success'){
                        this.$Message.success('操作成功！');
                        this.$bus.$emit('uplist',true);
                        this.$router.push({
                            path:'/sales/Home'
                        });
                    }else{
                        this.$Message.error('操作失败！');
                    };
                });
            }else{
                this.$Message.error('请选择要转给的销售！');
            };
        },
        delFlowup(data){
            this.$https.delFlowup({
                id:data.id,
                uid:data.uid
            }).then(res=>{
                if(res&&res.code===200){
                    this.getData();
                    this.$Message.success('操作成功！');
                }else{
                    this.$Message.error('操作失败！');
                }
            })
        },
        copyMaze(){
            const data = '账号：'+this.mazeaccount+'密码：'+this.password;
            let clipboard = new Clipboard('.mazbtn', {
                text: function () {
                    return data
                }
            })
            clipboard.on('success', e => {
                this.$Message.success('复制成功！');
                this.showques = false;
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$Message.error('复制失败！');
                clipboard.destroy()
            })
        }
    }
};
</script>

<style lang="scss">
#Wait{
    .topTile{
        padding: 20px 25px;
        font-size: 14px;
        min-width: 940px;
        font-weight: 400;
        position: relative;
        .meName{
            font-size:20px;
            vertical-align: middle;
            margin-top: 14px!important;
        }
        .btnspan{
            color: #313131;
            vertical-align: middle;
            margin-top: 18px;
            margin-right: 10px;
            max-width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        b{
            font-weight: 400;
            color: rgba(0,0,0,.5);
        }
        .typebutton{
            float: left;
            padding: 4px 0px 4px 10px;
            border: 1px solid #ddd;
            background-color: #fff;
            border-radius: 4px;
            color: #989898;
            vertical-align: middle;
            margin-top: 11px;
            .ivu-icon {
                font-size: 24px;
                vertical-align: middle;
            }
        }
        .cachebtn{
            padding: 4px 10px;
            border-radius: 4px;
            background-color: #fff;
            color: #3E3F42;
            border: 1px solid #3E3F42;
            position: absolute;
            top: 30px;
            right: 26px;
            cursor: pointer;
        }
        .sendbtn{
            right: 118px;
            color: #1665D8;
            border: 1px solid #1665D8;
        }
        .greenbtn{
            right: 130px;
            color: #34AA44;
            border: 1px solid #34AA44;
        }
        .bulebtn{
            color: #1665D8;
            border: 1px solid #1665D8;
        }
        .stepBox{
            margin-left: 238px;
            margin-right: 33.5%;
            .ivu-steps .ivu-steps-head{
                background-color: transparent;
            }
            .ivu-steps .ivu-steps-tail{
                left: 15%;
                i{
                    width: 90%;
                }
            }
            .ivu-steps-item.ivu-steps-status-wait .ivu-steps-tail>i{
                background: #ccc;
                &::after{
                    background: #ccc;
                }
            }
            .ivu-steps-status-process,.ivu-steps-status-finish{
                .ivu-steps-icon{
                    color: #1665D8;
                }
                .ivu-steps-tail{
                    i{
                        background-color: #1665D8;
                        &::after{
                            background: #1665D8;
                        }
                    }
                }
            }
            .ivu-icon-md-radio-button-on{
                color: #1665D8;
                cursor: pointer;
            }
            .ivu-steps-item{
                overflow: inherit;
            }
            .ivu-steps-horizontal .ivu-steps-content{
                padding-left: 0;
                margin-left: -12px;
            }
            .ponBox{
                position: relative;
                display: inline-block;
                height: 50px;
                line-height: 70px;
                margin-top: -20px;
                .ivu-tooltip-popper{
                    position: absolute;
                    top: 20px!important;
                    left: -10px!important;
                    z-index: 9;
                    .ivu-tooltip-inner{
                        background-color: #1665D8;
                        box-shadow: none;
                        cursor: pointer;
                        font-size: 12px;
                        min-height: inherit;
                        padding: 5px 10px;
                    }
                    .ivu-tooltip-arrow{
                        border-bottom-color:#1665D8;
                    }
                }
            }
            .nopointer{
                position: relative;
                // .ivu-steps-icon{
                //     color:#ccc
                // }
                .ivu-steps-tail>i{
                    &:after{
                        background: #ccc!important;
                    }
                    background: #ccc!important;
                }
                .no_click{
                    position: absolute;
                    top: -8px;
                    left: 0;
                    z-index: 9;
                    width: 50px;
                    height: 50px;
                    background-color: transparent;
                    cursor:no-drop;
                }
            }
        }
        .activeBox{
            float: left;
            margin-left: 100px;
            display: flex;
            box-sizing: border-box;
            li{
                padding: 4px 15px;
                cursor: pointer;
                text-align: center;
                // flex: 1;
                border: 1px solid #ddd;
                background-color: #fff;
                margin-right: 28px;
                color: #333;
                position: relative;
                .arrow_r{
                    position: absolute;
                    right: -24px;
                    top: 4px;
                    color: #333;
                    font-size: 18px;
                }
                &.active{
                    background-color: #31A1C1;
                    color: #fff;
                    border-color: #31A1C1;
                }
            }
        }
        .noclick{
            background-color: #ddd!important;
            color: #333;
            border-color: #ddd;
            &:hover{
                cursor:no-drop;
            }
        }
    }
    .formBox{
        padding: 0 25px 30px;
        display: flex;
        .item{
            .pantile{
                .ivu-collapse-header{
                    height: 50px;
                    line-height: 50px;
                }
                .bigtile{
                    font-size: 18px;
                    font-weight: 600;
                    margin-left: 20px;
                    color: #3E3F42;
                }
                .editImg{
                    float: right;
                    width: 28px;
                    margin-top: 8px;
                    margin: 10px;
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
            .frtiletig{
                font-weight: 600;
                font-size: 18px;
                padding-left: 20px;
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
            .greenstatu{
                background-color: rgba(77,180,91,.2);
                color: #4DB45B!important;
                font-size: 13px!important;
                border-radius: 4px;
                height:32px;
                display: inline-block;
                line-height: 32px;
                padding: 0 15px;
            }
            .quesfont{
                background-color: #F5F6FA;
                font-size: 13px!important;
                border-radius: 4px;
                height:32px;
                display: inline-block;
                line-height: 32px;
                padding: 0 15px;
            }
            .leftBox{
                // background-color: #fff;
                // box-shadow: 0px 0px 10px 0px #e1e0e0;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 15px;
                .line{
                    height: 1px;
                    width: 100%;
                    background-color: #EEEFF0;
                    margin-top: 20px;
                }
                .concatInfo{
                    padding: 15px 20px 0;
                    background-color: #fff;
                }
                .wjBox{
                    padding: 15px 20px 0;
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
            }
            &:first-of-type{
                flex: 1;
                margin-right: 30px;
            }
            &:last-of-type{
                width: 30%;
                .btmBox{
                    // margin-top: 15px;
                }
                .rtCard{
                    padding: 10px 25px;
                    background-color: #fff;
                    box-shadow: 0px 0px 10px 0px #e1e0e0;
                    border-radius: 4px;
                    margin-bottom: 15px;
                    h3{
                        >img{
                            width: 28px;
                            height: 28px;
                            border-radius: 50%;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                        >.uname{
                            font-weight: normal;
                            display: inline-block;
                            width: 50%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            vertical-align: middle;
                        }
                        >.grebtn{
                            border:none;
                            background-color: #F5F6FA;
                            color:#34AA44;
                            font-size: 13px;
                            border-radius: 4px;
                            padding: 3px 10px;
                            float: right;
                            vertical-align: middle;
                            margin-top: 2px;
                            width: 30%;
                            text-align: center;
                            text-overflow: ellipsis;
                            font-weight: 400;
                            overflow: hidden;
                            white-space: nowrap;
                            position: relative;
                            &::after{
                                position: absolute;
                                display: inline-block;
                                content: '';
                                left: 10px;
                                top: 50%;
                                width: 4px;
                                height: 4px;
                                border-radius: 50%;
                                background-color: #34AA44;
                                transform: translateY(-50%);
                            }
                        }
                    }
                    >.textBox{
                        margin: 10px 0;
                        font-size: 13px;
                    }
                    .tileTip{
                        padding: 0;
                        margin-bottom: 15px;
                    }
                    >p{
                        color: #bbb;
                        font-size: 12px;
                        position: relative;
                        .delicon{
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            cursor: pointer;
                        }
                    }
                }
            }
            .tileTip{
                background-color: #fff;
                color: #3E3F42;
                padding: 15px 20px;
                font-weight: normal;
                font-size: 14px;
                border-bottom: 1px solid #EEEFF0;
                .edit{
                    cursor: pointer;
                }
            }
            .rightTip{
                background-color: #fff;
                color: #313131;
                padding-bottom: 0px;
            }
            .ivu-collapse{
                border: none;
                .ivu-collapse-item{
                    border-top: none;
                }
            }
            .ivu-collapse-header{
                border-bottom: 1px solid#EEEFF0;
                padding-left: 0;
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
            .labtile{
                color: #1665D8;
                font-weight: normal;
                font-size: 14px;
                margin-top: 20px;
            }
            .tatuBox{
                display: flex;
                margin-bottom: 20px;
                .itemCol{
                    flex: 1;
                    &:last-of-type{
                        text-align: right;
                    }
                    button{
                        padding: 4px 15px;
                        border: 1px solid #ddd;
                        background-color: #fff;
                        border-radius: 4px;
                        color: #989898;
                    }
                    .gary{
                        background-color: #ECECEC;
                        border: 1px solid #ECECEC;
                    }
                    .green{
                        background-color: #71D110;
                        border: 1px solid #71D110;
                        color: #fff;
                    }
                    .lastbtn{
                        margin-left: 15px;
                    }
                }
            }
            .labBox{
                display: flex;
                flex-flow: wrap;
                >li{
                    flex: 1;
                    box-sizing: border-box;
                    // &:first-of-type{
                    //     margin-right: 30px;
                    // }
                    .tip{
                        color: #9EA0A5;
                        font-weight: normal;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .labval{
                        font-weight: normal;
                        color: #3E3F42;
                        font-size: 16px;
                        .spanitem{
                            display: inline-block;
                            background-color: #F5F6FA;
                            padding: 4px 10px;
                            border-radius: 4px;
                            margin-right: 10px;
                            margin-bottom: 10px;
                            b{
                                margin-left: 10px;
                                font-size: 17px;
                                font-weight: 400;
                                color: #1665D8;
                                vertical-align: middle;
                                cursor: pointer;
                                display: inline-block;
                            }
                            &:last-of-type{
                                margin-right: 0;
                            }
                        }
                    }
                    .gpBox{
                        margin-top: 5px;
                        .ivu-radio-inner:after{
                            top:2.5px;
                            left: 2.5px;
                        }
                    }
                    .bluebtn{
                        color: #1665D8;
                        background-color: #F5F6FA;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                    }
                }
            }
            .InfoBox{
                padding: 0 25px;
                .labBox{
                    display: flex;
                    flex-flow: wrap;
                    margin-top: 15px;
                    >li{
                        flex: 1;
                        box-sizing: border-box;
                        // &:first-of-type{
                        //     margin-right: 30px;
                        // }
                        .tip{
                            color: #9EA0A5;
                            font-weight: normal;
                            font-size: 14px;
                            margin-bottom: 10px;
                        }
                        .labval{
                            font-weight: normal;
                            color: #3E3F42;
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
            .tip{
                margin-bottom: 5px;
            }
            .tipTop{
                margin-top: 20px;
            }
            .line{
                background-color: #EEEFF0;
                height: 1px;
                width: 100%;
            }
            .contInfo{
                width: 100%;
                height: 100px;
                padding: 7px 12px;
                resize: none;
                border:1px solid #dcdee2;
                border-radius: 4px;
            }
            .itmCard{
                box-shadow: 0px 0px 10px 0px #e1e0e0;
                border-radius: 4px;
                margin-bottom: 15px;
                overflow: hidden;
                .tiptile{
                    background-color: #fff;
                    color: #3E3F42;
                    padding: 15px 20px;
                    font-weight: normal;
                    font-size: 14px;
                    border-bottom: 1px solid #EEEFF0;
                    // border-radius: 4px 4px 0 0;
                }
                .contBox{
                    background-color: #fff;
                    padding: 10px 25px;
                    .adrestr{
                        display: inline-block;
                        vertical-align: middle;
                        width: 165px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .detalBox{
                        display: flex;
                        margin-bottom: 5px;
                        .itmlabel{
                            flex: 1;
                            .rttxt{
                                text-align: right;
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
                            .tip{
                                color: #9EA0A5;
                                font-weight: normal;
                                font-size: 13px;
                                margin-bottom: 10px;
                            }
                            .labval{
                                font-weight: normal;
                                color: #3E3F42;
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
                    .tip{
                        margin-bottom: 5px;
                        color: #9EA0A5;
                    }
                    .tipTop{
                        margin-top: 20px;
                    }
                    .line{
                        background-color: #EEEFF0;
                        height: 1px;
                        width: 100%;
                    }
                    .contInfo{
                        width: 100%;
                        height: 100px;
                        padding: 7px 12px;
                        resize: none;
                        border:1px solid #dcdee2;
                        border-radius: 4px;
                    }
                    .signBox{
                        display: flex;
                        margin-top: 10px;
                        >span{
                            // width: 150px;
                            flex: 1;
                            display: inline-block;
                            &:first-of-type{
                                margin-right: 15px;
                            }
                            button{
                                color: #1665D8;
                                border-color: #1665D8;
                                box-shadow: none;
                            }
                        }
                    }
                }
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
                        background-color: #F5F6FA;
                        padding: 5px 8px;
                        font-size: 12px;
                        border-radius: 4px;
                    }
                    .orangestu{
                        color:#F6AB2F;
                        background-color: #F5F6FA;
                        padding: 5px 8px;
                        font-size: 12px;
                        border-radius: 4px;
                    }
                }
            }

        }
    }
}
// 模态框
.waitBox{
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
    .fqBox{
        margin-bottom: 140px!important;
    }
    .fqBox_1{
        margin-bottom: 200px!important;
    }
    .endBox{
        background-color: #ddd;
        padding: 16px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 148px;
        background-color: #ddd;
        >.sjx{
            position: absolute;
            width: 0;
            top: -14px;
            left: 25px;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 15px solid #ddd;
        }
    }
    .endBox_1{
        bottom: 210px;
        
    }
    .threeBox{
        padding: 0 16px 16px;
        bottom: 140px;
        >.sjx{
            display: none;
        }
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
                font-size: 14px;
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
        color: #A3A3A3;
        font-weight: normal;
    }
    .txtBox{
        margin: 10px 0;
    }
    .saleBox{
        margin-top: 5px;
    }
    .suerBtn{
        width: 100px;
        color: #fff;
        border: 1px solid #1665D8;
        background-color: #1665D8;
        display: block;
        margin: 10px auto 0;
    }
    .tig{
        position: absolute;
        bottom: -32px;
        left: 50%;
        color: #fff;
        transform: translateX(-50%);
    }
    .btnBox{
        margin-top: 5px;
        display: flex;
        .txtBox{
            flex: 1;
        }
        button{
            // width: 100px;
            margin-left: 15px;
            margin-top: 10px;
            border: 1px solid #3E3F42;
        }
        .blue{
            background-color: #1665D8;
            color:#fff;
            margin-top: 0;
        }
    }
}
.htDetail{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #2E2E2E;
        color: #fff;
        font-size: 18px;
        padding: 21px 16px;
    }
    .fqBox{
        margin-bottom: 140px!important;
    }
    .fqBox_1{
        margin-bottom: 200px!important;
    }
    .endBox{
        background-color: #ddd;
        padding: 16px;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 148px;
        background-color: #ddd;
        >.sjx{
            position: absolute;
            width: 0;
            top: -14px;
            left: 25px;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 15px solid #ddd;
        }
    }
    .endBox_1{
        bottom: 210px;
        
    }
    .threeBox{
        padding: 0 16px 16px;
        bottom: 140px;
        >.sjx{
            display: none;
        }
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
    }
    .saleBox{
        margin-top: 5px;
    }
    .suerBtn{
        width: 100%;
        margin-top: 2px;
        background-color: #51BD63;
        color: #fff;
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