<template>
    <div>
        <Modal
            class="Testcore"
            width="388px"
            :mask-closable="false"
            :closable="false"
            v-model="showtest"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>{{titlename}}</span>
                    <img class="close" src="../images/close.png" @click="closemodal">
                </div>
            </template>
            <div class="rowbox">
                <ul class="row_box">
                    <li class="col_line">
                        <span class="tigname">考试类别</span>
                        <Select v-model="typecore" style="width:100%" @on-change="chageType">
                            <Option v-for="(v,i) in corelist" :key="i" :value="v.name">{{v.name}}</Option>
                        </Select>
                    </li>
                    <li class="col_line">
                        <span class="tigname">考试时间</span>
                        <DatePicker type="date" :value="testTime" @on-change="seleDate" placeholder="考试时间" style="width: 100%"></DatePicker>
                    </li>
                </ul>
                <ul class="row_box" style="height:45px;line-height:45px;">
                    <li class="col_line">考试参加状态：</li>
                    <li class="col_line">
                        <RadioGroup v-model="status">
                            <Radio label="0">未参加</Radio>
                            <Radio label="1">已参加</Radio>
                        </RadioGroup>
                    </li>
                </ul>
            </div>
            <div class="rowbox" style="border:none;" v-if="typecore=='SAT2'||typecore=='AP'">
                <ul class="row_box">
                    <li class="col_line">
                        <span class="tigname">选择科目类别</span>
                        <Select v-model="mainClass" style="width:100%" @on-change="setchild">
                            <Option v-for="(v,k) in kmtypelist" :key="k" :value="v.name">{{v.name}}</Option>
                        </Select>
                    </li>
                </ul>
                <ul class="row_box">
                    <li class="col_line">
                        <span class="tigname">选择具体科目</span>
                        <Select v-model="subClass" style="width:100%">
                            <Option v-for="(v,m) in kmtypelistchild" :key="m" :value="v.name">{{v.name}}</Option>
                        </Select>
                    </li>
                </ul>
                <ul class="row_box" style="margin:20px 0;">
                    <li class="col_line">
                        <span>考试成绩：</span>
                        <Input v-model="corescore" class="inptval"/> 
                    </li>
                </ul>
            </div>
            <div class="rowbox" v-if="typecore=='SAT'">
                <h3 class="bluetile" style="margin:15px 0;">科目和成绩</h3>
                <ul class="row_box">
                    <li class="col_line">
                        <span class="blackname">Reading</span>
                        <Input v-model="Reading" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Math</span>
                        <Input v-model="Mathcore" class="inptval"/>
                    </li>
                </ul>
                <ul class="row_box" style="margin:15px 0;">
                    <li class="col_line">
                        <span class="blackname">Essay*</span>
                        <RadioGroup v-model="ElectiveStatus">
                            <Radio label="1">选考</Radio>
                            <Radio label="0">不选考</Radio>
                        </RadioGroup>
                        <span style="margin:0 16.5px;">-----</span>
                        <Input v-model="ElectiveScore" class="inptval"/>
                    </li>
                </ul>
            </div>
            <div class="rowbox" v-if="typecore=='ACT'">
                <h3 class="bluetile" style="margin:15px 0;">科目和成绩</h3>
                <ul class="row_box">
                    <li class="col_line">
                        <span class="blackname">English</span>
                        <Input v-model="English" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Maths</span>
                        <Input v-model="Maths" class="inptval"/>
                    </li>
                </ul>
                <ul class="row_box" style="margin:15px 0;">
                    <li class="col_line">
                        <span class="blackname">Reading</span>
                        <Input v-model="Reading" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Science</span>
                        <Input v-model="Science" class="inptval"/>
                    </li>
                </ul>
                <ul class="row_box" style="margin:15px 0;">
                    <li class="col_line">
                        <span class="blackname">Writing*</span>
                        <RadioGroup v-model="ElectiveStatus">
                            <Radio label="1">选考</Radio>
                            <Radio label="0">不选考</Radio>
                        </RadioGroup>
                        <span style="margin:0 16.5px;">-----</span>
                        <Input v-model="ElectiveScore" class="inptval"/>
                    </li>
                </ul>
            </div>
            <div class="rowbox" v-if="typecore=='TOEFL'">
                <h3 class="bluetile" style="margin:15px 0;">科目和成绩</h3>
                <ul class="row_box">
                    <li class="col_line">
                        <span class="blackname">Reading</span>
                        <Input v-model="Reading" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Listening</span>
                        <Input v-model="Listening" class="inptval"/>
                    </li>
                </ul>
                <ul class="row_box" style="margin:15px 0;">
                    <li class="col_line">
                        <span class="blackname">Speaking</span>
                        <Input v-model="Speaking" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Writing</span>
                        <Input v-model="Writing" class="inptval"/>
                    </li>
                </ul>
            </div>
            <div class="rowbox" v-if="typecore=='IELTS'">
                <h3 class="bluetile" style="margin:15px 0;">科目和成绩</h3>
                <ul class="row_box">
                    <li class="col_line">
                        <span class="blackname">Reading</span>
                        <Input v-model="Reading" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Listening</span>
                        <Input v-model="Listening" class="inptval"/>
                    </li>
                </ul>
                <ul class="row_box" style="margin:15px 0;">
                    <li class="col_line">
                        <span class="blackname">Speaking</span>
                        <Input v-model="Speaking" class="inptval"/>
                    </li>
                    <li class="col_line">
                        <span class="blackname">Writing</span>
                        <Input v-model="Writing" class="inptval"/>
                    </li>
                </ul>
            </div>
            <div slot="footer">
                <div class="footbox" v-if="typecore=='SAT2'||typecore=='AP'">
                    <Button @click.stop='surecore'>确认</Button>
                    <Button @click.stop="closemodal">取消</Button>
                </div>
                <div class="finalbox" v-if="typecore=='SAT'||typecore=='ACT'||typecore=='TOEFL'||typecore=='IELTS'">
                    <div class="cjbox">
                        <span>总成绩：<Input v-model="corescore" style="width:80px;"/></span>
                        <Icon type="ios-help-circle-outline" />
                    </div>
                    <div class="footbox">
                        <Button @click.stop='surecore'>确认</Button>
                        <Button @click.stop="closemodal">取消</Button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    props:{
        showtest:{
            type:Boolean,
            default:false
        },
        username:'',
        coretype:'',
        selobjson:{
            type:Object,
            default:()=>{}
        },
        titlename:''
    },
    data() {
        return {
            typecore:'',
            testTime:'',
            status:'0',
            corelist:[
                {
                    name:'SAT'
                },
                {
                    name:'SAT2'
                },
                {
                    name:'AP'
                },
                {
                    name:'ACT'
                },
                {
                    name:'TOEFL'
                },
                {
                    name:'IELTS'
                }
            ],//考试类别
            curtjson:{},//当前选择项
            coredate:'',
            mainClass:'',
            kmtypelist:[],//科目类别
            subClass:'',
            kmtypelistchild:[],//具体科目
            corescore:'',
            ElectiveStatus:'0',
            ElectiveScore:'',
            Reading:'',
            Mathcore:'',
            English:'',
            Maths:'',
            Science:'',
            Listening:'',
            Speaking:'',
            Writing:'',

        };
    },
    components: {

    },
    watch: {
        coretype:{
            handler(now){
                // console.log(now)
                this.typecore = now;
                this.setkmtype(now);
            },
            deep:true,
            immediate:true
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        if(this.selobjson.id){
            this.$https.looktestcore({
                testType:this.selobjson.testType,
                id:this.selobjson.id
            }).then(res=>{
                if(res&&res.code==200){
                    this.typecore = res.data.testType;
                    this.testTime = res.data.testTime;
                    this.status = String(res.data.status);
                    this.corescore = res.data.all;
                    if(this.typecore == 'SAT'){
                        this.Reading = res.data.Reading;
                        this.Mathcore = res.data.Math;
                        this.ElectiveStatus = String(res.data.ElectiveStatus);
                        this.ElectiveScore = res.data.ElectiveScore;
                    }else if(this.typecore == 'SAT2'||this.typecore == 'AP'){
                        this.mainClass = res.data.mainClass;
                        this.subClass = res.data.subClass;
                    }else if(this.typecore == 'ACT'){
                        this.English = res.data.English;
                        this.Maths = res.data.Maths;
                        this.Reading = res.data.Reading;
                        this.Science = res.data.Science;
                        this.ElectiveStatus = String(res.data.ElectiveStatus);
                        this.ElectiveScore = res.data.ElectiveScore;
                    }else if(this.typecore == 'TOEFL'||this.typecore == 'IELTS'){
                        this.Reading = res.data.Reading;
                        this.Listening = res.data.Listening;
                        this.Speaking = res.data.Speaking;
                        this.Writing = res.data.Writing;
                    };
                }else{
                    this.$Message.error(res.msg);
                }
            })
        }
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        chageType(data){
            this.typecore = data;
            this.setkmtype(data);
        },
        setkmtype(data){
            if(data=='SAT2'){
                this.kmtypelist = [
                    {
                        name:'Mathematics'
                    },
                    {
                        name:'Science'
                    },
                    {
                        name:'English'
                    },
                    {
                        name:'History'
                    },
                    {
                        name:'Languages'
                    }
                ]
            }else if(data=='AP'){
                this.kmtypelist = [
                    {
                        name:'Arts'
                    },
                    {
                        name:'English'
                    },
                    {
                        name:'History and Social Sciences'
                    },
                    {
                        name:'Math and Computer Science'
                    },
                    {
                        name:'Sciences'
                    },
                    {
                        name:'World Languages and Cultures'
                    }
                ]
            }
        },
        setchild(data){
            // console.log(data);
            if(data=='Mathematics'){
                this.kmtypelistchild = [
                    {
                        name:'Mathematics:Level1'
                    },
                    {
                        name:'Mathematics:Level2'
                    }
                ]
            }else if(data=='Science'){
                this.kmtypelistchild = [
                    {
                        name:'Biology'
                    },
                    {
                        name:'Chemistry'
                    },
                    {
                        name:'Physics'
                    }
                ]
            }else if(data=='English'){
                this.kmtypelistchild = [
                    {
                        name:'English'
                    }
                ]
            }else if(data=='History'){
                this.kmtypelistchild = [
                    {
                        name:'U.S.'
                    },
                    {
                        name:'World'
                    }
                ]
            }else if(data=='Languages'){
                this.kmtypelistchild = [
                    {
                        name:'Spanish'
                    },
                    {
                        name:'French'
                    },
                    {
                        name:'Chinese'
                    },
                    {
                        name:'Italian'
                    },
                    {
                        name:'German'
                    },
                    {
                        name:'Modern Hebrew'
                    },
                    {
                        name:'Latin'
                    },
                    {
                        name:'Japanese'
                    },
                    {
                        name:'Korean'
                    }
                ]
            }else if(data=='Arts'){
                this.kmtypelistchild = [
                    {
                        name:'2-D Design'
                    },
                    {
                        name:'3-D Design'
                    },
                    {
                        name:'Art History'
                    },
                    {
                        name:'Drawing'
                    },
                    {
                        name:'Music Theory'
                    }
                ]
            }else if(data=='English'){
                this.kmtypelistchild = [
                    {
                        name:'Language and Composition'
                    },
                    {
                        name:'Literature and Composition'
                    },
                    {
                        name:'Art History'
                    },
                    {
                        name:'Drawing'
                    },
                    {
                        name:'Music Theory'
                    }
                ]
            }else if(data=='History and Social Sciences'){
                this.kmtypelistchild = [
                    {
                        name:'Comparative Government and Politics'
                    },
                    {
                        name:'European History'
                    },
                    {
                        name:'Human Geography'
                    },
                    {
                        name:'Macroeconomics'
                    },
                    {
                        name:'Microeconomics'
                    },
                    {
                        name:'Psychology'
                    },
                    {
                        name:'United States Government and Politics'
                    },
                    {
                        name:'United States History'
                    },
                    {
                        name:'World History: Modern'
                    }
                ]
            }else if(data=='Math and Computer Science'){
                this.kmtypelistchild = [
                    {
                        name:'Calculus AB'
                    },
                    {
                        name:'Calculus BC'
                    },
                    {
                        name:'Computer Science A'
                    },
                    {
                        name:'Computer Science Principles'
                    },
                    {
                        name:'Statistics'
                    }
                ]
            }else if(data=='Sciences'){
                this.kmtypelistchild = [
                    {
                        name:'Biology'
                    },
                    {
                        name:'Chemistry'
                    },
                    {
                        name:'Environmental Science'
                    },
                    {
                        name:'Physics1'
                    },
                    {
                        name:'Physics2'
                    },
                    {
                        name:'Physics C: Electricity and Magnetism'
                    },
                    {
                        name:'Physics C: Mechanics'
                    }
                ]
            }else if(data=='World Languages and Cultures'){
                this.kmtypelistchild = [
                    {
                        name:'Chinese'
                    },
                    {
                        name:'French'
                    },
                    {
                        name:'German'
                    },
                    {
                        name:'Italian'
                    },
                    {
                        name:'Japanese'
                    },
                    {
                        name:'Latin'
                    },
                    {
                        name:'Spanish LanC'
                    },
                    {
                        name:'Spanish LitC'
                    }
                ]
            }
        },
        seleDate(date){
            this.testTime = date;
        },
        closemodal(){
            this.$emit('closetest',0);
        },
        isNull(){
            const typecore = this.typecore;
            const testTime = this.testTime;
            // const status = this.status;
            // const corescore = this.corescore;
            // const Reading = this.Reading;
            // const Mathcore = this.Mathcore;
            // const ElectiveStatus = this.ElectiveStatus;
            // const ElectiveScore = this.ElectiveScore;
            // const mainClass = this.mainClass;
            // const subClass = this.subClass;
            // const English = this.English;
            // const Maths = this.Maths;
            // const Science = this.Science;
            // const Listening = this.Listening;
            // const Speaking = this.Speaking;
            // const Writing = this.Writing;

            // if(!typecore||!testTime||!status||!corescore){
            //     return false;
            // };
            // if(this.typecore == 'SAT'){
            //     if(!Reading||!Mathcore||!ElectiveStatus||!ElectiveScore){
            //         return false;
            //     };
            // }else if(this.typecore == 'SAT2'||this.typecore == 'AP'){
            //     if(!mainClass||!subClass){
            //         return false;
            //     };
            // }else if(this.typecore == 'ACT'){
            //     if(!English||!Maths||!Reading||!Science||!ElectiveStatus||!ElectiveScore){
            //         return false;
            //     };
            // }else if(this.typecore == 'TOEFL'||this.typecore == 'IELTS'){
            //     if(!Reading||!Listening||!Speaking||!Writing){
            //         return false;
            //     };
            // };

            if(!typecore||!testTime){
                return false;
            };
            return true;
        },
        surecore(){
            const flag = this.isNull();
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            const params = {};
            params.testType = this.typecore;
            params.testTime = this.testTime;
            params.status = this.status;
            params.all = this.corescore?Number(this.corescore):0;
            params.username = this.username;
            if(this.typecore == 'SAT'){
                params.Reading = this.Reading?Number(this.Reading):0;
                params.Math = this.Mathcore?Number(this.Mathcore):0;
                params.ElectiveStatus = this.ElectiveStatus;
                params.ElectiveScore = this.ElectiveScore?Number(this.ElectiveScore):0;
            }else if(this.typecore == 'SAT2'||this.typecore == 'AP'){
                params.mainClass = this.mainClass;
                params.subClass = this.subClass;
            }else if(this.typecore == 'ACT'){
                params.English = this.English?Number(this.English):0;
                params.Maths = this.Maths?Number(this.Maths):0;
                params.Reading = this.Reading?Number(this.Reading):0;
                params.Science = this.Science?Number(this.Science):0;
                params.ElectiveStatus = this.ElectiveStatus;
                params.ElectiveScore = this.ElectiveScore;
            }else if(this.typecore == 'TOEFL'||this.typecore == 'IELTS'){
                params.Reading = this.Reading?Number(this.Reading):0;
                params.Listening = this.Listening?Number(this.Listening):0;
                params.Speaking = this.Speaking?Number(this.Speaking):0;
                params.Writing = this.Writing?Number(this.Writing):0;
            };
            if(this.titlename=='考试成绩添加'){
                this.$https.addtestcore(params).then(res=>{
                    this.$emit('closetest',1);
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }else{
                params.id = this.selobjson.id;
                this.$https.edittestcore(params).then(res=>{
                    this.$emit('closetest',1);
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }
        }
    }
};
</script>

<style lang='scss'>
.Testcore{
    .ivu-modal-header{
        padding: 20px 16px;
        font-size: 18px;
        font-weight: 600;
        .tilehead{
            color: #333;
            line-height: 15px;
            .close{
                float: right;
                margin-top: -4px;
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
        }
    }
    .ivu-modal-header-inner{
        font-size: 18px;
        font-weight: 600;
    }
    .ivu-modal-close{
        background-color: #F5F6FA;
        border-radius: 50%;
        right: 14px;
        top: 14px;
        .ivu-icon-ios-close{
            color: #1665D8;
        }
    }
    .ivu-modal-body{
        padding: 0;
        padding-top: 16px;
    }
    .ivu-modal-footer{
        border: none;
        padding-bottom: 20px;
    }
    .row_box{
        display: flex;
        .col_line{
            flex: 1;
            margin-right: 20px;
            &:last-of-type{
                margin-right: 0;
            }
            .tigname{
                display: block;
                color: #b5b5b5;
                height: 40px;
                line-height: 40px;
                width: 100%;
            }
            .blackname{
                width: 75px;
                display: inline-block;
            }
            .time{
                color: #515A6E;
                height: 30px;
                line-height: 30px;
                display: block;
            }
            .inptval{
                width: 80px;
                border: 0;
                .ivu-input{
                    background-color: #EAEDF3;
                }
            }
        }
    }
    .rowbox{
        border-bottom: 1px solid #EAEDF3;
        padding: 0 22px;
        .bluetile{
            color: #1665D8;
            font-size: 14px;
            font-weight: normal;
        }
    }
    .finalbox{
        .cjbox{
            height: 45px;
            line-height: 45px;
            position: relative;
            text-align: left;
            margin-bottom: 20px;
            >span{
                color: #1665D8;
                >b{
                    color: #3E3F42;
                    font-weight: normal;
                }
            }
            .ivu-icon{
                position: absolute;
                right: 0;
                top: 15px;
            }
        }
    }
    .footbox{
        display: flex;
        button{
            flex:1;
            height: 38px;
            color: #fff;
            box-shadow: none;
            border-color: transparent;
            font-size: 14px;
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