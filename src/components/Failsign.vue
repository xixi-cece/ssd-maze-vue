<template>
    <div>
        <Modal
            class="failSign"
            v-model="showfail"
            :closable="false"
            :mask-closable="false"
            width="388"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>放弃签约</span>
                <img class="close" src="../images/close.png" @click="closemod">
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
            <ul class="labBox">
                <li>
                    <h4 class="labTile">放弃类型</h4>
                    <div class="labCont">
                        <Select v-model="failtype" style="width:100%">
                            <Option v-for="(item,i) in signlist" :value="item" :key="i">{{ item }}</Option>
                        </Select>
                    </div>
                </li>
            </ul>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">放弃原因</h4>
                    <Input class="txtBox" type="textarea" v-model="failresea" style="width:100%"/>
                </li>
            </ul>
            <Button class="suerBtn" @click="sureFail">确认放弃</Button>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'',
    props:{
        showfail:{
            type:Boolean,
            default:false
        },
        datajson:{
            type:Object,
            default:()=>{}
        }
    },
    components: {

    },
    computed: {

    },
    data(){
        return{
            selmenteeobj:{},
            failtype:'',
            signlist:['消失','选择其他中介','不签','撞单','其他'],
            failresea:''
        }
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
        datajson:{
            handler(now){
                // console.log(now)
                this.selmenteeobj = now;
            },
            deep:true,
            immediate:true
        }
    },
    methods: {
        closemod(){
            this.$emit('closemodal',false)
        },
        sureFail(){
            if(!this.failtype||/^\s*$/.test(this.failresea)){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            this.$https.failSign({
                userId:this.selmenteeobj.id,
                goneType:this.failtype,
                goneReason:this.failresea
            }).then(res=>{
                if(res&&res.code==200){
                    this.$emit('closemodal',true);
                    this.$Message.success('操作成功！');
                }else{
                    this.$Message.error(res.msg);
                };
            });
        }
    }
}
</script>

<style lang='scss'>
.failSign{
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
</style>