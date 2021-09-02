<template>
    <div>
        <Modal
            class="ClassModal"
            v-model="showClass"
            title="课外活动标题"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <div class="itemLine">
                <span class="tigtile">参加时间：</span>
                <DatePicker type="date" :value="datetime" placeholder="Select date" style="width: 167px;" @on-click="getDate"></DatePicker>
            </div>
            <h3 class="tigtile">参加原因：</h3>
            <Input v-model="reson" type="textarea" placeholder="为什么推荐学生参加这个活动？" style="width: 100%" />
            <div class="footbox">
                <Button @click="cancel">取消</Button>
                <Button type="primary" @click="ok">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'ClassModal',
    props:{
        showClass:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            datetime:'',
            reson:''
        };
    },
    components: {

    },
    watch: {

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
        ok(){
            this.$emit('close',1);
        },
        cancel(){
            this.$emit('close',0);
        },
        getDate(date){
            this.datetime = date;
        }
    }
};
</script>

<style lang='scss'>
.ClassModal{
    .ivu-modal-header{
        padding: 18px 16px;
        .ivu-modal-header-inner{
            font-size: 18px;
            font-weight: 600;
        }
    }
    .tigtile{
        font-size: 14px;
        font-weight: 600;
    }
    .itemLine{
        margin-bottom: 20px;
    }
    textarea{
        margin-top: 10px;
        height: 144px;
        resize: none;
    }
    .footbox{
        text-align: right;
        margin: 20px 0 5px;
        .ivu-btn{
            color: #fff;
            width: 140px;
            height: 38px;
            background-color: #6B6C6F;
        }
        .ivu-btn-primary{
            background-color: #1665D8;
            border-color: #1665D8;
            margin-left: 20px;
        }
    }
}
</style>