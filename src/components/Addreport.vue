<template>
    <div>
        <Modal
            v-model="showModal"
            width="567"
            class="Addreport"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span class="tip">额外汇报</span>
                    <span class="rightbtn" v-if="isedit">
                        <Button class="finbtn" @click="sureBtn">完成</Button>
                        <Button class="canbtn" @click="cancelbtn">取消</Button>
                    </span>
                    <span class="rightbtn" v-else>
                        <Button class="editbtn" @click="showmodlete" custom-icon="iconfont iconshanchu1">删除</Button>
                        <Button class="editbtn" @click="isedit=2" custom-icon="iconfont iconbianji1">编辑</Button>
                        <Button class="editbtn" @click="cancelbtn" icon="ios-close-circle-outline">关闭</Button>
                    </span>
                </div>
            </template>
            <div class="contbox">
                <div class="rowline">
                    <span class="label">学员姓名：</span>
                    <span>{{menteename}}</span>
                </div>
                <div class="rowline">
                    <span class="label">服务日期：</span>
                    <DatePicker type="date" v-if="isedit" :value="BaseInfo.date" @on-change="seleDate" placeholder="服务日期" style="width: 128px;"></DatePicker>
                    <span v-else>{{BaseInfo.date}}</span>
                    <span class="label" style="margin-left:34px;">服务时长：</span>
                    <span v-if="isedit"><Input v-model="BaseInfo.serviceMinutes" style="width:50px;" />&nbsp;min</span>
                    <span v-else>{{BaseInfo.serviceMinutes}}&nbsp;min</span>
                </div>
                <div class="rowline">
                    <span class="label">参与人员：</span>
                    <CheckboxGroup v-if="isedit" v-model="BaseInfo.participants">
                        <Checkbox label="行政导师"></Checkbox>
                        <Checkbox label="学员家长"></Checkbox>
                        <Checkbox label="学员"></Checkbox>
                    </CheckboxGroup>
                    <span v-else class="memberbox">
                        <span v-for="(v,i) in BaseInfo.participants" :key="i">
                            <Icon
                                :color="v=='行政导师'?'#4CB35C':v=='规划导师'?'#3E80DF':v=='文书导师'?'#F6AE36':v=='个性化导师'?'#6A5BF3':v=='专项导师'?'#A1CF1A':v=='学员家长'?'#D94C7B':''" 
                                :custom="v=='行政导师'?'iconfont iconhangzheng':v=='规划导师'?'iconfont iconguihua':v=='文书导师'?'iconfont iconwenshu':v=='个性化导师'?'iconfont icongexinghua':v=='专项导师'?'iconfont iconzhuanxiang':v=='学员家长'?'iconfont iconxueyuanjiachang':''"
                            />
                            <b>{{v}}</b>
                        </span>
                    </span>
                </div>
                <div class="rowline">
                    <span class="label">服务内容：</span>
                    <CheckboxGroup v-if="isedit" v-model="BaseInfo.serviceContent">
                        <Checkbox label="线下见面"></Checkbox>
                        <Checkbox label="家长服务"></Checkbox>
                        <Checkbox label="学员私聊"></Checkbox>
                        <Checkbox label="调度服务"></Checkbox>
                        <Checkbox label="其他事项"></Checkbox>
                    </CheckboxGroup>
                    <span v-else class="memberbox">
                        <span v-for="(v,i) in BaseInfo.serviceContent" :key="i">
                            <Icon
                                :color="v=='线下见面'?'#1665D8':v=='家长服务'?'#E6492D':v=='学员私聊'?'#34AA44':v=='调度服务'?'#F6AB2F':v=='其他事项'?'#6758F3':''" 
                                :custom="v=='线下见面'?'iconfont iconxianxiajianmian':v=='家长服务'?'iconfont iconxueyuanjiachang':v=='学员私聊'?'iconfont iconxueyuansiliao':v=='调度服务'?'iconfont icontiaodufuwu':v=='其他事项'?'iconfont iconqitashixiang':''"
                            />
                            <b>{{v}}</b>
                        </span>
                    </span>
                </div>
                <div class="rowline">
                    <span v-if="isedit" class="label">详细内容：</span>
                    <span v-else class="label" style="color:#F6AB2F;">详细内容：</span>
                    <Input v-if="isedit" v-model="BaseInfo.details" style="width:100%;" type="textarea" />
                    <p v-else style="margin-top:10px;">{{BaseInfo.details}}</p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    name:'Addreport',
    props:{
        showModal:{
            type:Boolean,
            default:false
        },
        username:'',
        menteename:'',
        editinfo:'',//0查看1添加2编辑
        curtInfo:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            isedit:1,
            BaseInfo:{}
        };
    },
    components: {
        
    },
    watch: {
        editinfo:{
            handler(now){
                this.isedit = now;
            },
            immediate:true,
            deep:true
        },
        curtInfo:{
            handler(now){
                this.BaseInfo = JSON.parse(JSON.stringify(now));
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
        
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        cancelbtn(){
            this.$emit('closereport',0);
        },
        sureBtn(){
            if(this.isedit==2){//编辑
                this.$https.editrecord({
                    menteeName:this.username,
                    id:this.BaseInfo.id,
                    date:this.BaseInfo.date,
                    serviceMinutes:this.BaseInfo.serviceMinutes,
                    participants:this.BaseInfo.participants,
                    serviceContent:this.BaseInfo.serviceContent,
                    details:this.BaseInfo.details
                }).then(res=>{
                    this.$emit('closereport',1);
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }else{
                this.$https.addrecord({
                    menteeName:this.username,
                    recordType:'extra_record',
                    date:this.BaseInfo.date,
                    serviceMinutes:this.BaseInfo.serviceMinutes,
                    participants:this.BaseInfo.participants,
                    serviceContent:this.BaseInfo.serviceContent,
                    details:this.BaseInfo.details
                }).then(res=>{
                    this.$emit('closereport',1);
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                    }else{
                        this.$Message.error(res.msg);
                    }
                });
            }
        },
        seleDate(date){
            this.BaseInfo.date = date;
        },
        showmodlete(){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delrecord({
                        id:this.BaseInfo.id
                    }).then(res=>{
                        this.$emit('closereport',1);
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                },
                onCancel:()=>{}
            })
        }
    }
};
</script>

<style lang='scss'>
.Addreport{
    .ivu-modal-header{
        padding: 20px 0;
    }
    .tilehead{
        position: relative;
        font-size: 18px;
        font-weight: 600;
        .tip{
            &:before{
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
                margin-top: -2px;
                content: "";
                width: 12px;
                height: 16px;
                background-color: #F6AB2F;
            }
        }
        .rightbtn{
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            .finbtn{
                color: #F6AB2F;
                border-color: #F6AB2F;
                margin: 15px;
            }
            .canbtn{
                color: #6B6C6F;
            }
            .editbtn{
                border:none;
                padding: 0;
                .ivu-icon{
                    margin: 0;
                    font-size: 20px;
                    vertical-align: middle;
                    display: inline-block;
                    margin-top: -2px;
                }
                margin-right: 15px;
                &:last-of-type{
                    margin-right: 0;
                }
            }
        }
    }
    .contbox{
        .rowline{
            margin-bottom: 20px;
            &:last-of-type{
                margin-bottom: 0;
            }
            .label{
                color: #3E3F42;
                font-weight: 600;
                width: 75px;
                display: inline-block;
            }
            .ivu-checkbox-group{
                display: inline-block;
                .ivu-checkbox-focus{
                    box-shadow: none;
                }
                .ivu-checkbox-checked .ivu-checkbox-inner{
                    border-color: #F6AB2F;
                    background-color: #F6AB2F;
                }
            }
            textarea{
                height: 120px;
                resize: none;
                margin-top: 10px;
            }
            .memberbox{
                >span{
                    display: inline-block;
                    padding: 4px 10px;
                    border: 1px solid #EAEDF3;
                    margin-right: 8px;
                    border-radius: 4px;
                    &:last-of-type{
                        margin-right: 0;
                    }
                    >.ivu-icon{
                        font-size: 20px;
                        margin-right: 5px;
                    }
                    >b{
                        font-weight: normal;
                    }
                }
            }
        }
    }
}
</style>
