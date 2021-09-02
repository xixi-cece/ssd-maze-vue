<template>
    <Modal
        class="repeatToast"
        v-model="showModal"
        :footer-hide="true"
        :closable="false"
        :mask-closable="false"
    >
        <div class="maincont">
            <img class="icon" src="../images/repeat.png">
            <p>你已经提交过信息，请静候我们的导师联系您</p>
            <Button @click="closemodal">确定</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    props:{
        showModal:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{

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

    },
    methods: {
        closemodal(){
            this.$emit('closemodal',false);
        }
    }
}
</script>

<style lang='scss'>
.repeatToast{
    position: relative;
    .ivu-modal{
        width: 240px!important;
    }
    .maincont{
        text-align: center;
        >.icon{
            margin: 0 auto;
            display: block;
        }
        >p{
            
            width: 100%;
            margin: 30px 0;
        }
    }
    .tig{
        position: absolute;
        bottom: -30px;
        left: 50%;
        color: #fff;
        transform: translateX(-50%);
    }
}
</style>