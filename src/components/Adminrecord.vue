<template>
    <div class="Adminrecord">
        <div class="optionmenu" v-if="identity!='mentee'">
            <div class="selmenu">
                <span :class="avtivetab==1?'active':''" @click.stop="changeTab(1)">全部</span>
                <span :class="avtivetab==2?'active':''" @click.stop="changeTab(2)">日常汇报</span>
                <span :class="avtivetab==3?'active':''" @click.stop="changeTab(3)">额外汇报</span>
            </div>
            <Dropdown class="menubox" trigger="click" @on-click="getmenutab">
                <Button icon="ios-add-circle-outline">添加</Button>
                <Icon type="ios-arrow-down"></Icon>
                <DropdownMenu slot="list">
                    <DropdownItem name='1'>语音记录</DropdownItem>
                    <DropdownItem name='2'>群内信息整理</DropdownItem>
                    <DropdownItem name='3'>额外汇报</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="flexCard">
            <div style="text-align: center;width:100%;" v-if="!recodelist.length">暂无数据</div>
            <div class="flexItem" v-for="(v,i) in recodelist" :key="i">
                <h3 class="headtip">
                    <span :class="['tipcolor',v.recordType=='audio_record'?'blue':v.recordType=='groupInfo_record'?'green':v.recordType=='extra_record'?'orange':'']"></span>
                    <span>{{v.recordType=='audio_record'?'语音记录':v.recordType=='groupInfo_record'?'群内信息整理':v.recordType=='extra_record'?'额外汇报':''}}</span>
                    <b>{{v.date}}</b>
                </h3>
                <div class="contbox" v-if="v.recordType=='extra_record'">
                    <h4 class="tiptile">参与人员</h4>
                    <div class="labox">
                        <span v-for="(a,k) in v.participants" :key="k">
                            <Icon
                                :color="a=='行政导师'?'#4CB35C':a=='学员家长'?'#D94C7B':''"
                                :custom="a=='行政导师'?'iconfont iconhangzheng':a=='学员家长'?'iconfont iconxueyuanjiachang':a=='学员'?'iconfont iconxueyuan1':''"
                            />
                            {{a}}
                        </span>
                    </div>
                    <h4 class="tiptile">服务内容</h4>
                    <div class="labox">
                        <span v-for="(b,k) in v.serviceContent" :key="k">
                            <Icon
                                :color="b=='线下见面'?'#1665D8':b=='家长服务'?'#D94C7B':b=='调度服务'?'#F9C268':b=='其他事项'?'#7568F5':b=='学员私聊'?'#4CB35C':''"
                                :custom="b=='线下见面'?'iconfont iconxianxiajianmian':b=='家长服务'?'iconfont iconxueyuanjiachang':b=='调度服务'?'iconfont icontiaodufuwu':b=='其他事项'?'iconfont iconqitashixiang':b=='学员私聊'?'iconfont iconxueyuansiliao':''"
                            />
                            {{b}}
                        </span>
                    </div>
                </div>
                <div class="contbox" v-else>
                    <h4 class="tiptile">参与人员</h4>
                    <div class="labox">
                        <span v-for="(a,k) in v.participants" :key="k">
                            <Icon
                                :color="a=='行政导师'?'#4CB35C':a=='学员家长'?'#D94C7B':''"
                                :custom="a=='行政导师'?'iconfont iconhangzheng':a=='学员家长'?'iconfont iconxueyuanjiachang':a=='学员'?'iconfont iconxueyuan1':''"
                            />
                            {{a}}
                        </span>
                    </div>
                    <h4 class="tiptile">主导人员</h4>
                    <div class="labox">
                        <span v-for="(b,k) in v.leading" :key="k">
                            <Icon
                                :color="b=='线下见面'?'#1665D8':b=='家长服务'?'#D94C7B':b=='调度服务'?'#F9C268':b=='其他事项'?'#7568F5':b=='学员私聊'?'#4CB35C':''"
                                :custom="b=='线下见面'?'iconfont iconxianxiajianmian':b=='家长服务'?'iconfont iconxueyuanjiachang':b=='调度服务'?'iconfont icontiaodufuwu':b=='其他事项'?'iconfont iconqitashixiang':b=='学员私聊'?'iconfont iconxueyuansiliao':''"
                            />
                            {{b}}
                        </span>
                    </div>
                </div>
                <div class="optionbox">
                    <span class="boldtime">服务时长：<b>{{v.serviceMinutes}}</b></span>
                    <span class="iconbox">
                        <span @click="delInfo(v)" v-if="identity!='mentee'"><Icon custom="iconfont iconshanchu1"/>删除</span>
                        <span @click="editCard(v)" v-if="identity!='mentee'"><Icon custom="iconfont iconbianji1"/>编辑</span>
                        <span @click="lookInfo(v)"><Icon custom="iconfont iconchakan"/>查看</span>
                    </span>
                </div>
            </div>
            <div class="flexItem" style="background-color:transparent;border:none;box-shadow:none;" v-for="jtm in (rowline-recodelist.length%rowline)" v-if="recodelist.length%rowline>0"></div>
        </div>
        <Addreport v-if="showreport" :menteename="menteename" :username="username" :showModal="showreport" :curtInfo='curtInfo' :editinfo='isedit' @closereport="getReport"></Addreport>
    </div>
</template>

<script>
import Addreport from '@/components/Addreport';

export default {
    props:{
        username:''
    },
    data() {
        return {
            showreport:false,
            isedit:0,
            avtivetab:1,
            recodelist:[],
            rowline:3,//每行个数
            identity:'',
            curtInfo:{},//当前项
            menteename:'',
            mentusname:'',
            seltype:''
        };
    },
    components: {
        Addreport
    },
    watch: {
        username:{
            handler(now){
                if(now){
                    this.getData();
                }
            },
            immediate:true,
            deep:true
        }
    },
    computed: {

    },
    created() {
        this.identity = sessionStorage.getItem('logintype');
        this.menteename = sessionStorage.getItem('mentame');
        this.mentusname = sessionStorage.getItem('mentusname');
    },
    mounted() {
        this.$bus.$on('reloadInfo',res=>{
            this.getData();
        });
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        getData(){
            this.$https.getadminrecord({
                username:this.username,
                type:this.identity=='mentee'?'daily':this.seltype
            }).then(res=>{
                if(res&&res.code==200){
                    this.recodelist = res.data;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        changeTab(data){
            this.avtivetab = data;
            if(data==1){
                this.seltype = '';
            }else if(data==2){
                this.seltype = 'daily';
            }else if(data==3){
                this.seltype = 'extra';
            };
            this.getData();
        },
        getmenutab(name){
            this.menteename = sessionStorage.getItem('mentame');
            this.mentusname = sessionStorage.getItem('mentusname');
            if(name==1){//语音记录
                this.$router.push({
                    path:'/administration/Voicerecord',
                    query:{
                        type:1,//添加
                        datainfo:JSON.stringify({
                            menteename:this.menteename,
                            mentusname:this.mentusname,
                            participants:[],
                            leading:[],
                            recentEvent:[],
                            futureEvent:[]
                        })
                    }
                })
            }else if(name==2){//群内信息整理
                this.$router.push({
                    path:'/administration/Groupinfo',
                    query:{
                        type:1,//添加
                        datainfo:JSON.stringify({
                            menteename:this.menteename,
                            mentusname:this.mentusname,
                            participants:[],
                            leading:[],
                            recentEvent:[],
                            futureEvent:[]
                        })
                    }
                })
            }else if(name==3){//额外汇报
                this.addreport();
            }
        },
        delInfo(data){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delrecord({
                        id:data.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getData();
                        }else{
                            this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel:()=>{}
            })
        },
        addreport(){
            this.showreport = true;
            this.isedit = 1;
            this.curtInfo = {};
            this.menteename = sessionStorage.getItem('mentame');
            this.mentusname = sessionStorage.getItem('mentusname');
        },
        getReport(type){
            this.showreport = false;
            if(type==1){//确认
                this.getData();
            }
        },
        editCard(data){
            // console.log(data);
            this.menteename = sessionStorage.getItem('mentame');
            this.mentusname = sessionStorage.getItem('mentusname');
            data.menteename = this.menteename;
            data.mentusname = this.mentusname;
            data.username = this.username;
            if(data.recordType=='audio_record'){
                this.$router.push({
                    path:'/administration/Voicerecord',
                    query:{
                        type:2,
                        datainfo:JSON.stringify(data)
                    }
                });
            }else if(data.recordType=='groupInfo_record'){
                this.$router.push({
                    path:'/administration/Groupinfo',
                    query:{
                        type:2,
                        datainfo:JSON.stringify(data)
                    }
                });
            }else if(data.recordType=='extra_record'){
                this.showreport = true;
                this.isedit = 2;
                this.curtInfo = data;
            }
        },
        lookInfo(data){
            this.menteename = sessionStorage.getItem('mentame');
            this.mentusname = sessionStorage.getItem('mentusname');
            data.menteename = this.menteename;
            data.mentusname = this.mentusname;
            data.username = this.username;
            if(data.recordType=='audio_record'){//语音记录
                this.$router.push({
                    path:'/administration/Voicerecord',
                    query:{
                        type:3,
                        datainfo:JSON.stringify(data)
                    }
                });
            }else if(data.recordType=='groupInfo_record'){//群内信息整理
                this.$router.push({
                    path:'/administration/Groupinfo',
                    query:{
                        type:3,
                        datainfo:JSON.stringify(data)
                    }
                });
            }else if(data.recordType=='extra_record'){
                this.showreport = true;
                this.isedit = 0;
                this.curtInfo = data;
            }
        }
    }
};
</script>

<style lang='scss'>
.Adminrecord{
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
        // height: calc(100vh - 285px);
        overflow-y: auto;
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
            margin-bottom: 25px;
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
</style>