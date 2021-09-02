<template>
    <Modal
        class="com_modToast"
        v-model="writeName"
        width="388"
        :footer-hide="true"
        :closable="false"
        :mask-closable="false"
    >
        <h3 slot="header" class="headTile">
            <span>请先完善客户信息</span>
            <img class="close" src="../images/close.png" @click="closemodal">
        </h3>
        <ul class="labBox">
            <li style="margin-right:0;">
                <h4 class="labTile">学员姓名</h4>
                <Input v-model="iptval" placeholder="请输入" />
            </li>
        </ul>
        <ul class="labBox">
            <li style="margin-right:0;">
                <h4 class="labTile">客户类型</h4>
                <Select v-model="mangertype" style="width:100%;">
                    <Option v-for="(item,i) in typelist" :key="i" :value="item.type">{{ item.label }}</Option>
                </Select>
            </li>
        </ul>
        <ul class="labBox">
            <li style="margin-right:0;">
                <h4 class="labTile">申请年份</h4>
                <Select v-model="appyear" style="width:100%;">
                    <Option v-for="(item,i) in yearList" :key="i" :value="item.value">{{ item.label }}</Option>
                </Select>
            </li>
        </ul>
        <div class="btmbtnBox">
            <Button class="suerBtn" @click="sureWrite">确认</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    props: {
        writeName:{
            type:Boolean,
            default:false
        },
        dataObj:{
            type:Object,
            default:()=>{}
        }
    },
    data(){
        return{
            iptval:'',
            mangertype:'',
            typelist:[
                {
                    type:'u',
                    label:'本科'
                },
                {
                    type:'g',
                    label:'研究生'
                },
                {
                    type:'t',
                    label:'转学'
                },
                {
                    type:'uk',
                    label:'英国'
                },
                {
                    type:'p',
                    label:'单篇PS'
                },
            ],
            appyear:'',
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
            ]
        }
    },
    watch: {
        writeName:{
            handler(now){
                if(now){
                    this.iptval = '';
                    this.mangertype = '';
                    this.appyear = '';
                }
            },
            immediate:true
        }
    },
    methods: {
        sureWrite(){
            if(/^\s*$/g.test(this.iptval)||!this.mangertype||!this.appyear){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            this.$https.editcustomer({
                id: this.dataObj.id,
                chinesename: this.iptval,
                appyear:this.appyear,
                type:this.mangertype
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.$emit('closewrite',true);
                }else if(res.code==200){
                    this.$Message.error('你已经提交过信息，请静候我们的导师联系您')
                    this.$emit('closewrite',false);
                }else{
                    this.$Message.error(res.msg);
                    this.$emit('closewrite',false);
                };
            });
        },
        closemodal(){
            this.$emit('closewrite',false);
        }
    }
}
</script>

<style lang='scss'>
// 模态框
.com_modToast{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #333;
        font-size: 18px;
        padding: 21px 16px;
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
        >li{
            flex: 1;
            box-sizing: border-box;
            margin-bottom: 10px;
            &:first-of-type{
                margin-right: 30px;
            }
            .labTile{
                font-weight: 400;
                font-size: 14px;
                margin-bottom: 5px;
                color: #A3A3A3;
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
        color: #A3A3A3;
        font-weight: normal;
    }
    .saleBox{
        margin-top: 5px;
    }
    .btmbtnBox{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        .suerBtn{
            display: block;
            width: 100px;
            background-color: #1665D8;
            color: #fff;
            border: 1px solid #1665D8;
            margin: 0 auto;
        }
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