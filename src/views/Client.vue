<template>
    <div id="Client">
        <div class="dvBox">
            <div class="formBox">
                <h4 class="labTile mengerType">
                    <span class="label">客户类型<b>*</b></span>
                    <RadioGroup v-model="clientType">
                        <Radio v-for="v in clients" :label="v.type" :key="v.value" border>
                            <Icon :custom="v.icon" :style="'color:'+v.color"></Icon>
                            <span>{{v.label}}</span>
                        </Radio>
                    </RadioGroup>
                </h4>
                <h3 class="tileName">联系信息<p class="splitline"></p></h3>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">联系人姓名<b>*</b></h4>
                        <Input v-model="contName" placeholder="联系人中文名" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">联系人类型<b>*</b></h4>
                        <Select v-model="contype" style="width:100%;">
                            <Option v-for="item in conList" :value="item.label" :key="item.label">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li></li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">电话<b>*</b></h4>
                        <Input v-model="phoneNum" placeholder="请输入有效的手机号" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">微信号</h4>
                        <Input v-model="wechatNum" placeholder="微信号" style="width: 100%;" />
                    </li>
                    <li></li>
                </ul>
                <h3 class="tileName" style="margin-top:50px;">申请信息<p class="splitline"></p></h3>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">学员姓名<b>*</b></h4>
                        <Input v-model="menteeName" placeholder="学员中文名" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">学员微信</h4>
                        <Input v-model="menteeWechart" placeholder="学员微信" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">籍贯（省市）</h4>
                        <div class="cityBox">
                            <Icon class="arr_down" type="ios-arrow-down" />
                            <Input v-model="area" placeholder="请选择省/市" readonly @click.native="showProvevent" style="width: 100%;" />
                            <area-select :checkItem='areacode' :showArea="showProvice" @setData="getProvice" @close="closeProvice"></area-select>
                        </div>
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">申请年份<b>*</b></h4>
                        <Select v-model="yearApplay" style="width:100%;">
                            <Option v-for="item in yearList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li>
                        <h4 class="labTile">高中名称</h4>
                        <Input v-model="highschool" placeholder="高中名称" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">居住地或高中所在地（省市）</h4>
                        <div class="cityBox">
                            <Icon class="arr_down" type="ios-arrow-down" />
                            <Input v-model="highschoolarea" readonly @click.native="showPlacevent" placeholder="居住地或高中所在地（省市）" style="width: 100%;" />
                            <area-select :checkItem="highschoolareacode" :showArea="showPlace" @setData="getPlace" @close="closePlace"></area-select>
                        </div>
                    </li>
                    <!-- <li>
                        <h4 class="labTile">籍贯（省市）</h4>
                        <div class="cityBox">
                            <Icon class="arr_down" type="ios-arrow-down" />
                            <Input v-model="area" placeholder="请选择省/市" readonly @click.native="showProvevent" style="width: 100%;" />
                            <area-select :checkItem='areacode' :showArea="showProvice" @setData="getProvice" @close="closeProvice"></area-select>
                        </div>
                    </li> -->
                </ul>
                <!-- <ul class="labBox">
                    <li>
                        <h4 class="labTile">高中名称</h4>
                        <Input v-model="highschool" placeholder="高中名称" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">居住地或高中所在地（省市）</h4>
                        <div class="cityBox">
                            <Icon class="arr_down" type="ios-arrow-down" />
                            <Input v-model="highschoolarea" readonly @click.native="showPlacevent" placeholder="居住地或高中所在地（省市）" style="width: 100%;" />
                            <area-select :checkItem="highschoolareacode" :showArea="showPlace" @setData="getPlace" @close="closePlace"></area-select>
                        </div>
                    </li>
                </ul> -->
                <h3 class="tileName" style="margin-top:50px;">附加信息<p class="splitline"></p></h3>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">客户留言</h4>
                        <Input v-model="comment" placeholder="如：想周三来面谈" style="width: 100%;" />
                    </li>
                    <li>
                        <h4 class="labTile">联系渠道</h4>
                        <Select v-model="comefrom" style="width:100%;">
                            <Option v-for="item in comefromList" :value="item.label" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </li>
                    <li>
                        <h4 class="labTile">推荐来源</h4>
                        <Input v-model="actualfrom" placeholder="" style="width: 100%;" />
                    </li>
                </ul>
                <ul class="labBox">
                    <li>
                        <h4 class="labTile">客户特殊要求</h4>
                        <Input v-model="demand" placeholder="如：想周三来面谈" style="width: 100%;" />
                    </li>
                    <li style="margin-right:0;">
                        <h4 class="labTile">Tag备注标签</h4>
                        <!-- <Input v-model="tagMsg" placeholder="以逗号分隔，如：标化神，拖延狗，活动强 等.." style="width: 100%;" /> -->
                        <Input ref='tagInpt' @click.native="focuTags" v-if="!showDown" @on-blur="blurTages" v-model="tipRemark" placeholder="以顿号分隔，如：标化神、拖延狗、活动强等..." style="width: 630px!important;" />
                        <p class="tagBox" v-if="showDown" @click="changeShowRad">
                            <span class="taglabel" @click.stop="removeTag(v)" v-for="(v,i) in tipRemarklist" :key="i">
                                <b>{{v}}</b>
                                <Icon type="ios-close" />
                            </span>
                        </p>
                    </li>
                </ul>
                <ul class="labBox" style="margin-top:40px;">
                    <li style="width:300px;">
                        <span>是否希望将此客户分配给自己？</span>
                        <div class="gpBox">
                            <RadioGroup v-model="salewish">
                                <Radio label="1">是</Radio>
                                <Radio label="0">否</Radio>
                            </RadioGroup>
                        </div>
                    </li>
                    <!-- <li v-if="salewish==1">
                        <h4 class="labTile">请阐述自荐理由<b>*</b></h4>
                        <Input v-model="saleswishreason" placeholder="如：tt推荐，过往学生推荐 等..." style="width: 100%;" />
                    </li> -->
                </ul>
                <!-- <ul class="labBox" v-if="salewish==1">
                    <li style="margin-right:0;">
                        <h4 class="labTile">请阐述自荐理由<b>*</b></h4>
                        <Input v-model="saleswishreason" placeholder="如：tt推荐，过往学生推荐 等..." style="width: 100%;" />
                    </li>
                </ul> -->
                <div class="btmBox"><Button type="success" @click="submitData">提交</Button></div>
            </div>
        </div>
        <sucess-modal v-if="showSuccessModal"></sucess-modal>
        <Repeatmod :showModal='showModal' @closemodal='closemodal'></Repeatmod>
    </div>
</template>

<script>
import AreaSelect from '../components/AreaSelect';
import SucessModal from '../components/SucessModal';
import Repeatmod from '../components/Repeatmod';

export default {
    name:'Client',
    components: {
        AreaSelect,
        SucessModal,
        Repeatmod
    },
    data() {
        return {
            showModal:false,
            button4:'',
            clientType:'',//客户类型
            clients:[
                {
                    value:0,
                    icon:'iconfont iconmeiguobenke',
                    type:'u',
                    label:'本科',
                    color:'#1665D8'
                },
                {
                    value:1,
                    icon:'iconfont iconyanjiusheng',
                    label:'研究生',
                    type:'g',
                    color:'#E6492D'
                },
                {
                    value:2,
                    icon:'iconfont iconzhuanxue',
                    type:'t',
                    label:'转学',
                    color:'#6758F3'
                },
                {
                    value:3,
                    icon:'iconfont iconyingguobenke',
                    label:'英国',
                    type:'uk',
                    color:'#34AA44'
                },
                {
                    value:4,
                    icon:'iconfont icondanpianPS',
                    label:'单篇PS',
                    type:'p',
                    color:'#F6AB2F'
                },
                // {
                //     value:5,
                //     icon:'iconfont iconqitadanpianPS',
                //     type:'s',
                //     label:'其它单篇',
                //     color:'#FACF55'
                // },
                // {
                //     value:6,
                //     icon:'iconfont iconqita',
                //     type:'o',
                //     label:'其他',
                //     color:'#3E3F42'
                // },
                // {
                //     value:7,
                //     icon:'iconfont iconqitaguojia1',
                //     type:'c',
                //     label:'其他国家',
                //     color:'#1BBBBB'
                // }
            ],
            contName:'',//联系人名字
            contype:'',//联系人类型
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
            menteeName:'',//学员名字
            wechatNum:'',//微信号
            phoneNum:'',//电话
            menteeWechart:'',//学员微信号
            area:'',//籍贯（省市）
            showProvice: false,//是否显示籍贯选择
            areacode:0,//籍贯id
            highschoolarea:'',//居住地或高中所在地（省市）
            showPlace:false,//是否显示居住地
            highschoolareacode:0,//高中所在的id
            highschool:'',//高中名称
            yearApplay:'',//申请年份
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
            comment:'',//客户留言
            demand:'',//客户特殊要求
            comefrom:'',//联系渠道
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
            actualfrom:'',//推荐来源
            showDown:false,//是否显示标签框
            tipRemark:'',//标签备注
            tipRemarklist:[],//标签列表
            salewish:'0',//是否希望将此用户分配给自己
            saleswishreason:'',//请阐述自荐理由
            showSuccessModal:false//是否显示提示中
        };
    },
    computed: {

    },
    created() {
        
    },
    mounted() {

    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
        closemodal(){
            this.showModal = false;
        },
        getProvice(data){
            this.area = data.name;
            this.areacode = data.id;
        },
        closeProvice(status){
            this.showProvice = status;
        },
        showProvevent(){
            this.showPlace = false;
            this.showProvice = true;
        },
        showPlacevent(){
            this.showProvice = false;
            this.showPlace = true;
        },
        getPlace(data){
            this.highschoolarea = data.name;
            this.highschoolareacode = data.id;
        },
        closePlace(status){
            this.showPlace = status;
        },
        focuTags(){
            this.showDown = false;
        },
        blurTages(){
            const vals = this.tipRemark;
            if(vals){
                this.showDown = true;
                this.tipRemarklist = vals.split('、');
            };
        },
        removeTag(data){
            const list = this.tipRemarklist;
            let index = '';
            list.forEach((v,i)=>{
                if(v==data){
                    index = i
                };
            });
            list.splice(index,1);
            this.tipRemark = list.join(',');
            if(!list.length){
                this.changeShowRad();
            };
        },
        changeShowRad(){
            this.showDown = false;
            setTimeout(()=>{
                const iptDom = this.$refs.tagInpt;
                iptDom.focus();
            },100);
        },
        //验证必填项
        ruleFormate(){
            const clientType = this.clientType;
            const contName = this.contName;
            const contype = this.contype;
            const yearApplay = this.yearApplay;
            const phoneNum = this.phoneNum;
            const menteeName = this.menteeName;
            // const salewish = this.salewish;
            // const wechatNum = this.wechatNum;
            // const areacode = this.areacode;
            // const menteeWechart = this.menteeWechart;
            // const highschool = this.highschool;
            // const highschoolareacode = this.highschoolareacode;
            // if(clientType===''||contName===''||contype===''||wechatNum===''||phoneNum===''||menteeWechart===''||
            //     menteeName===''||areacode===0||yearApplay===''||highschool===''||highschoolareacode===0||salewish===''
            // ){
            //     return false;
            // };
            if(/^\s*$/.test(menteeName)||clientType===''||contName===''||contype===''||phoneNum===''||yearApplay===''){
                return false;
            };
            if(!/^1\d{10}$/.test(phoneNum)){
                return 102;
            };
            // if(salewish==1){
            //     const saleswishreason = this.saleswishreason;
            //     if(saleswishreason == ''){
            //         return false;
            //     };
            // };
            return true;
        },
        submitData(){
            const flag = this.ruleFormate();
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            if(flag == 102){
                this.$Message.error('请输入正确的手机号！');
                return;
            };
            const params = {
                type:this.clientType,
                contactname:this.contName,
                contactidentity:this.contype,
                wechatcontact:this.wechatNum,
                phone:this.phoneNum,
                chinesename:this.menteeName,
                wechatstudent:this.menteeWechart,
                area:this.area,
                areacode:this.areacode,
                appyear:this.yearApplay,
                highschool:this.highschool,
                highschoolarea:this.highschoolarea,
                hschoolareacode:this.highschoolareacode,
                comment:this.comment,
                demand:this.demand,
                comefrom:this.comefrom,
                actualfrom:this.actualfrom,
                tag:this.tipRemark,
                salewish:this.salewish,
                saleswishreason:this.saleswishreason
            };
            this.$https.addMentee(params).then(res=>{
                if(res&&res.code==200){
                    this.$bus.$emit('uplist',true);
                    this.showSuccessModal = true;
                    setTimeout(()=>{
                        this.showSuccessModal = false;
                        this.$router.push({
                            path:'/sales/Waitclient'
                        });
                    },1000)
                }else if(res.code==102){
                    this.showModal = true;//数据重复显示
                }else{
                    this.$Message.error(res.msg);
                };
            });
        }
    }
};
</script>

<style lang="scss">
#Client{
    .dvBox{
        .formBox{
            background-color: #fff;
            padding: 25px;
            border:1px solid #EAEDF3;
            border-radius: 8px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
            .tileName{
                color: #1665D8;
                font-weight: normal;
                font-size: 13px;
                // border-bottom: 1px solid #1665D8;
                height: 32px;
                margin-top: 20px;
                margin-bottom: 20px;
                position: relative;
                .splitline{
                    position: absolute;
                    top: 30%;
                    right: 0;
                    transform: translateY(-50%);
                    height: 1px;
                    background-color: #1665D8;
                    width: calc(100% - 70px);
                }
            }
            .labBox{
                display: flex;
                flex-flow: wrap;
                margin-bottom: 22px;
                >li{
                    // flex: 1;
                    margin-right: 30px;
                    box-sizing: border-box;
                    .gpBox{
                        margin-top: 5px;
                        height: 32px;
                        .ivu-radio-inner:after{
                            top:2px;
                            left: 2px;
                        }
                    }
                    .tagBox{
                        border: 1px solid #dcdee2;
                        height: 32px;
                        line-height: 1.5;
                        padding: 4px 7px;
                        width:100%;
                        font-size: 14px;
                        border-radius: 4px;
                        color: #515a6e;
                        line-height: 1.6;
                        .taglabel{
                            margin-right: 10px;
                            border-radius: 2px;
                            cursor: pointer;
                            background-color:#F5F6FA;
                            padding:2px 0 2px 6px;
                            b{
                                font-weight: normal;
                            }
                            i{
                                font-size:25px;
                                margin-top: -2px;
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
            .cityBox{
                position: relative;
                width: 300px;
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
            .labTile{
                font-weight: 400;
                margin-top: 15px;
                margin-bottom: 12px;
                >.label{
                    width: 85px;
                    display: inline-block;
                }
                b{
                    color: #f00;
                    margin-left: 5px;
                }
                &:first-of-type{
                    margin-top: 0;
                }
                .ivu-radio-inner:after{
                    top: 2.5px;
                }
                .ivu-radio-border{
                    padding: 0 10px 0 5px;
                    .ivu-icon{
                        font-size: 24px!important;
                    }
                }
            }
            .ivu-input-wrapper{
                width: 300px!important;
            }
            .ivu-select{
                width: 300px!important;
            }
            .mengerType{
                display: inline-block;
                .ivu-radio{
                    display: none;
                }
                .ivu-radio-default,.ivu-radio-border{
                    color:#666;
                    margin-right: 24px;
                }
                .ivu-radio-group{
                    .ivu-icon{
                        font-size: 24px;                        
                    }
                    .ivu-radio-wrapper-checked{
                        border-color: transparent;
                        color:#fff;
                        .ivu-icon{
                            color:#fff!important;
                        }
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(1){
                        background-color: #1665D8;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(2){
                        background-color: #E6492D;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(3){
                        background-color: #6758F3;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(4){
                        background-color: #34AA44;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(5){
                        background-color: #F6AB2F;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(6){
                        background-color: #FACF55;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(7){
                        background-color: #3E3F42;
                    }
                    .ivu-radio-wrapper-checked:nth-of-type(8){
                        background-color: #1BBBBB;
                    }
                }
                // .ivu-radio-wrapper-checked{
                //     border-color: #1665D8;
                //     background-color: #1665D8;
                //     color: #fff;
                // }
            }
            .btmBox{
                margin-top: 30px;
                // text-align: center;
                button{
                    background-color: #1665D8;
                    border-color: #1665D8;
                    padding: 0 30px;
                }
            }
        }
    }
}
</style>