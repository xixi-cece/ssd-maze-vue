<template>
    <div id="Talking">
        <span class="itemBox" style="min-width:166px;width:auto;">
                <span>日期排序</span>
                <Select v-model="sortSelect" class="selectitem" @on-change='getData'>
                    <option disabled value="">请选择</option>
                    <Option value='正序'>最远</Option>
                    <Option value='反序'>最近</Option>
                </Select>
        </span>
        <div class="serBox">
            <div class="iptBox">
                <Input v-model="serval" suffix="ios-search" placeholder="搜索学员" @on-change='filterData' clearable/>
            </div>
        </div>
        <div v-if='!datalist.length' class="nulldata">暂无数据</div>
        <div v-else class="cardbox" v-for="(v,i) in datalist" :key="i">
            <div class="tophead clearfix">
                <div class="fl ltlabel">
                    <b>联系人：</b>
                    <span>{{v.contactname}}<i class="blue" v-if="v.contactidentity">（{{v.contactidentity}}）</i></span>
                    <b class="lastip">学员：</b>
                    <span>{{v.chinesename}}</span>
                </div>
                <div class="fr">
                    <span class="apyear" v-if="v.appyear">{{v.appyear}}</span>
                    <span class="spanbox" v-if="v.type!='n'">
                        <Icon :custom="v.type=='u'?'iconfont iconmeiguobenke blue':v.type=='g'?'iconfont iconyanjiusheng red':
                        v.type=='t'?'iconfont iconzhuanxue purple':v.type=='p'?'iconfont icondanpianPS orange':v.type=='s'?'iconfont iconqitadanpianPS yellow':
                        v.type=='uk'?'iconfont iconyingguobenke green':v.type=='o'?'iconfont iconqita black':v.type=='c'?'iconfont iconqitaguojia1 lgblue':''" />
                        <span class="fontspan">{{v.type=='u'?'本科':v.type=='g'?'研究生':v.type=='t'?'转学':v.type=='p'?'单篇PS':v.type=='s'?'其他单篇':v.type=='uk'?'英国':v.type=='o'?'其他':'其他国家'}}</span>
                    </span>
                    <svg class="colicon" aria-hidden="true" @click="lookDetail(v)">
                        <use xlink:href="#iconliebiaoriqi_wanghou"></use>
                    </svg>
                    <svg class="colicon lasticon" aria-hidden="true" @click="signmodal(v)">
                        <use xlink:href="#iconfangqiqianyue1"></use>
                    </svg>
                </div>
            </div>
            <div class="btmbox clearfix">
                <div class="fl">
                    <div class="spanitem">
                        <h4 class="tiphead">联系人电话</h4>
                        <p class="tipval" :title="v.phone">{{v.phone}}</p>
                    </div>
                    <div class="spanitem">
                        <h4 class="tiphead">联系人微信</h4>
                        <p class="tipval" :title="v.wechatcontact">{{v.wechatcontact}}</p>
                    </div>
                    <div class="spanitem">
                        <h4 class="tiphead">学员微信</h4>
                        <p class="tipval" :title="v.wechatstudent">{{v.wechatstudent}}</p>
                    </div>
                    <div class="spanitem">
                        <h4 class="tiphead">所在地区（省市）</h4>
                        <p class="tipval" :title="v.highschoolarea">{{v.highschoolarea}}</p>
                    </div>
                    <div class="spanitem">
                        <h4 class="tiphead">高中名称</h4>
                        <p class="tipval" :title="v.highschool">{{v.highschool}}</p>
                    </div>
                    <div class="spanitem">
                        <h4 class="tiphead">分配日期</h4>
                        <p class="tipval" :title="v.highschool">{{v.assignedtime}}</p>
                    </div>
                </div>
                <div class="fr btnbox">
                    <span v-if="v.type=='u'||v.type=='g'||v.type=='t'">
                        <Button @click="sendQues(v)" v-if='!v.surveyaddress'>发送问卷</Button>
                        <Poptip trigger="hover" transfer popper-class="popbox" v-else>
                            <Button :class="['garybtn', v.surveyStatus==1?'stagbtn':'']" v-if='v.surveyStatus==1' @click="lookBook(v)">查看问卷</Button>
                            <Button :class="['garybtn', v.surveyStatus==0?'yellowbtn':'']" v-else>{{v.surveyStatus==0?'问卷填写中':'问卷未填写'}}</Button>
                            <div slot="content" class="queswrap">
                                <Input class="adrIpt" v-model="v.surveyaddress" readonly/>
                                <Button class="copybtn" @click="copysur(v.surveyaddress)">复制</Button>
                            </div>
                        </Poptip>
                    </span>
                    <Button @click="sendcontract(v)" v-if='v.contractStatus==-1'>发送合同</Button>
                    <Button class="greenbtn" @click="lookcontract(v)" v-else>查看合同信息</Button>
                    <Button v-if="v.paymentStatus==-1" :class="v.contractStatus==-1?'disbtn':''" @click="showPaymod(v)" :disabled="v.contractStatus==-1">填写付款</Button>
                    <span style="display:inline-block;" v-else @mouseover="v.showpaybtn=true" @mouseleave="v.showpaybtn=false">
                        <Button class="waitpay" v-if="!v.showpaybtn">付款待确认</Button>
                        <Button class="bluebtn" v-else @click="lookpay(v)">查看付款</Button>
                    </span>
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
                    <span class="labCont">{{selmenteeobj.contactname}}</span>
                </li>
            </ul>
            <h4 class="tileTig">复制问卷地址发送给学员</h4>
            <Input class="txtBox" v-model="surveyaddress" style="width:100%" readonly/>
            <Button class="suerBtn" @click="copyQues">复制问卷</Button>
        </Modal>
        <Contract v-if="showContrat" :showToast='showContrat' :hascontract="contractkey" :isLook="isLook" :menteedata="selmenteeobj" @finsh="hideContract" @changeContract='changeContract'></Contract>
        <Paydetail v-if="showPay" :showPay='showPay' :selId='selId' :menteeName='menteeName' @finsh='hidePay'></Paydetail>
        <Paylook v-if="paydetail" :showModal='paydetail' :dataJoson="selmenteeobj" @getpay="colsepay"></Paylook>
        <Failsign v-if="showfail" :showfail='showfail' :datajson='selmenteeobj' @closemodal='surefail'></Failsign>
        <Cominfo :writeName='showWrite' :dataObj='selmenteeobj' @closewrite='closewrite'></Cominfo>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Clipboard from 'clipboard';
import Contract from '../components/Contract';
import Paydetail from '../components/Paydetail';
import Paylook from '../components/payLook';
import Failsign from '../components/Failsign';
import Cominfo from '../components/Cominfo';

export default {
    components: {
        Contract,
        Paydetail,
        Paylook,
        Failsign,
        Cominfo
    },
    data() {
        return {
            showfail:false,//放弃签约
            showques:false,//问卷显示
            surveyaddress:'',//问卷地址
            showContrat:false,//合同显示
            contractkey:false,//是否发送过合同
            isLook:false,//是否查看合同
            showPay:false,//付款显示
            selId:'',//用户id
            menteeName:'',//学员姓名
            paydetail:false,//付款详情
            selmenteeobj:{},//当前选择的项
            oldlist:[],
            datalist:[],
            showWrite:false,
            serval:'',
            sortSelect:'' //展示顺序
        };
    },
    computed: {
        
    },
    watch: {
        
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
        lookDetail(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id,
                query:{
                    type:'ques'
                }
            });
        },
        lookBook(data){
            window.open(data.surveyaddress);
        },
        signmodal(data){
            console.log(data);
            this.showfail = true;
            this.selmenteeobj = data;
        },
        surefail(data){
            this.showfail = false;
            if(data){
                this.getData();
                this.$bus.$emit('uplist',true);
            };
        },
        closewrite(type){
            this.showWrite = false;
            if(type){
                this.getData();
            };
        },
        sendQues(data){
            this.selmenteeobj = data;
            if(!data.chinesename){
                this.showWrite = true;
                return;
            };
            this.showques = true;
            let params = {
                id:this.selmenteeobj.id,
                newstatus:'survey',
                action:'attributesurvey'
            };
            this.$https.startStatus(params).then(res=>{
                if(res&&res.status=='success'){
                    this.$bus.$emit('uplist',true);
                    this.surveyaddress = res.surveyaddr;
                    this.getData();
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        copyQues(){
            const data = this.surveyaddress;
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
        copysur(data){
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
        sendcontract(data){
            this.selmenteeobj = data;
            if(!data.chinesename){
                this.showWrite = true;
                return;
            };
            this.showContrat = true;
            this.isLook = false;
            this.contractkey = false;
        },
        hideContract(){
            this.showContrat = false;
            this.getData();
        },
        changeContract(){
            this.isLook = false;
        },
        lookcontract(data){
            this.contractkey = true;
            this.showContrat = true;
            this.isLook = true;
            this.selmenteeobj = data;
        },
        showPaymod(data){
            this.showPay = true;
            this.selmenteeobj = data;
            this.selId = data.id;
            this.menteeName = data.chinesename;
        },
        hidePay(data){
            const isSure = data;
            this.showPay = false;
            this.getData();
        },
        lookpay(data){
            this.selmenteeobj = data;
            this.paydetail = true;
        },
        colsepay(){
            this.paydetail = false;
        },
        // ascendingSortByAssignedTime(obj){
        //     obj.sort(function(a,b){
        //          if (a.assignedtime > b.assignedtime) return -1;
        //          if (a.assignedtime < b.assignedtime) return 1;
        //         return 0;
        //     });
        // },
        getData(){
            this.$https.fulldatalist({}).then(res=>{
                if(res&&res.code==200){
                    res.data.forEach(v=>{
                        v.showpaybtn = false;
                        v.uid = v.id;
                    });
                    this.oldlist = res.data;
                    this.datalist = res.data;
                    if(this.sortSelect=='反序'||this.sortSelect==''){
                         this.datalist.sort(function(a,b){
                            if (a.assignedtime > b.assignedtime) return -1;
                            if (a.assignedtime < b.assignedtime) return 1;
                            return 0;
                        });
                    }
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
       
        filterData(){
            let timer = null;
            const val = this.serval;
            const arr = this.oldlist;
            const arr1 = [];
            arr.forEach(v=>{
                if(v.chinesename.indexOf(val)!=-1){
                    arr1.push(v);
                };
            });
            this.datalist = [];
            clearTimeout(timer);
            timer = setTimeout(()=>{
                this.datalist = arr1;
            },20);
        }
    }
};
</script>

<style lang="scss">
#Talking{
    .serBox{
        height: 60px;
        text-align: right;
        .iptBox{
            position: fixed;
            width: 183px;
            top: 85px;
            right: 38px;
        }
    }
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
    .nulldata{
        text-align: center;
    }
    .cardbox{
        margin-bottom: 30px;
        background-color: #fff;        
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        &:last-of-type{
            margin-bottom: 0;
        }
        .blue{
            color: #1665D8;
        }
        .tophead{
            border-bottom: 1px solid #EAEDF3;
            padding: 20px;
            .ltlabel{
                font-size: 18px;
                font-weight: 600;
                i{
                    font-style: normal;
                }
            }
            .lastip{
                margin-left: 50px;
            }
            .apyear{
                display: inline-block;
                vertical-align: middle;
                padding: 2px 10px;
                font-weight: 600;
                border-radius: 3px;
                font-size: 18px;
                color: #1BBBBB;
                border: 1px solid #dcdee2;
                margin-right: 17px;
            }
            .spanbox{
                display: inline-block;
                border: 1px solid #dcdee2;
                border-radius: 4px;
                padding: 3px 10px 3px 5px;
                margin-right: 15px;
                .ivu-icon{
                    font-size: 24px;
                    display: inline-block;
                    vertical-align: middle;
                }
                .fontspan{
                    display: inline-block;
                    vertical-align: middle;
                    font-weight: 500;
                }
                .blue{
                    color: #1665D8;
                }
                .red{
                    color: #E6492D;
                }
                .purple{
                    color: #6758F3;
                }
                .orange{
                    color: #F6AB2F;
                }
                .yellow{
                    color: #FACF55;
                }
                .green{
                    color: #34AA44;
                }
                .black{
                    color: #3E3F42;
                }
                .lgblue{
                    color: #1BBBBB;
                }
            }
            .typebtn{
                display: inline-block;
                vertical-align: middle;
                width: 116px;
                height: 32px;
                margin-right: 17px;
            }
            .colicon{
                display: inline-block;
                vertical-align: middle;
                width: 30px;
                cursor: pointer;
            }
            .lasticon{
                margin-left: 15px;
            }
        }
        .btmbox{
            padding: 20px;
            .spanitem{
                display: inline-block;
                margin-right: 40px;
                vertical-align: middle;
                .tiphead{
                    color: #9EA0A5;
                    font-size: 14px;
                    font-weight: normal;
                    margin-bottom: 5px;
                }
                .tipval{
                    color: #3E3F42;
                    font-size: 16px;
                    min-height: 25px;
                    min-width: 30px;
                    max-width: 120px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .btnbox{
                margin-top: 10px;
                .ivu-btn{
                    color: #F6AB2F;
                    border-color: #F6AB2F;
                    font-size: 13px;
                    margin-right: 10px!important;
                    padding: 0 10px;
                    &:last-of-type{
                        margin-right: 0;
                    }
                }
                .garybtn{
                    background-color: #F5F6FA;
                    border-color: #F5F6FA;
                    color: #3E3F42;
                }
                .disbtn{
                    color: #ccc;
                    border-color: #ccc;
                    background-color: #fff;
                }
                .yellowbtn{
                    color: #F6AB2F;
                }
                .stagbtn{
                    color: #34AA44;
                    border: 1px solid #34AA44;
                    background-color: #fff;
                }
                .greenbtn{
                    color: #34AA44;
                    border-color: #34AA44;
                }
                .waitpay{
                    background-color: #F5F6FA;
                    border-color: #fff;
                }
                .bluebtn{
                    background-color: #F5F6FA;
                    border-color: #fff;
                    color: #1665D8;
                }
            }
        }
    }
}
//查看问卷
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
.popbox{
    .queswrap{
        font-size: 12px;
        .adrIpt{
            width: 160px;
            height: 28px;
            margin-right: 8px;
            .ivu-input{
                height: 100%;
            }
        }
        .copybtn{
            width: 54px;
            height: 28px;
            font-size: 12px;
        }
    }
}
</style>