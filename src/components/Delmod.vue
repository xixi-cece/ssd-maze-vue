<template>
    <div id="Delmod">
        <Modal
            class="Delmod"
            v-model="delmodal"
            width="388"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>删除工时</span>
                    <img class="close" src="../images/close.png" @click="closeToast">
                </div>
            </template>
            <div class="row_box">
                <div class="col_line">
                    <span class="tigname">监督人</span>
                    <div>{{dataInfo.superVisorName}}</div>
                </div>
                <div class="col_line">
                    <span class="tigname">工作名称</span>
                    <div>{{dataInfo.workType}}</div>
                </div>
                <div class="col_line">
                    <span class="tigname">工作日期</span>
                    <div>{{dataInfo.workDate}}</div>
                </div>
            </div>
            <h4 class="titletig">是否删除该项已提交的工时？</h4>
            <div class="btnBox">
                <Button class="button" @click="oksure">确认</Button>
                <Button class="button" @click="cancelbtn">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'Delmod',
    props: {
        dataObj:{
            type:Object,
            default:()=>{}
        },
        delmodal:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            model5:'',
            msg:'',
            cityList:[
                {
                    value:'1',
                    label:'说是'
                }
            ],
            dataInfo:{}
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
        dataObj:{
            handler(now,old){
                this.dataInfo = now;
            },
            deep:true,
            immediate:true
        }
    },
    methods: {
        oksure(){
            this.$emit('delstatu',1);
        },
        cancelbtn(){
            this.$emit('delstatu',0);
        },
        closeToast(e){
            // const dom = this.$refs.childMask;
            // if(dom){
            //     if(!dom.contains(e.target)){
            //         this.$emit('finsh','noend');
            //     }
            // }
            this.$emit('delstatu',0);
        }
    }
};
</script>

<style lang="scss">
.Delmod{
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        padding: 21px 16px;
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
            .time{
                color: #515A6E;
                height: 30px;
                line-height: 30px;
                display: block;
            }
        }
    }
    .titletig{
      color: #1665D8;
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
        margin-top: 20px;
        display: flex;
        .button{
            flex: 1;
            background-color: #1665D8;
            color: #fff;
            border: none;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>