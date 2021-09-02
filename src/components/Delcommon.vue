<template>
    <div id="Delmodal">
        <Modal
            width="388"
            class="Delmodal"
            v-model="delmodal"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>确定删除</span>
                    <img class="close" src="../images/close.png" @click="cancelbtn">
                </div>
            </template>
            <div class="imgBox">
                <img src="../images/fail.png">
            </div>
            <img src="" alt="">
            <div class="btnBox">
                <Button class="button" @click="oksure">确定</Button>
                <Button class="button" @click="cancelbtn">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'Delmodal',
    props: {
        delmodal:{
            type:Boolean,
            default:false
        }
    },
    components: {

    },
    data() {
        return {

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
        oksure(){
            this.$emit('delstatu',1);
        },
        cancelbtn(){
            this.$emit('delstatu',0);
        }
    }
};
</script>

<style lang="scss">
.Delmodal{
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        font-weight: 600;
        border-radius: 4px;
        padding: 21px 16px;
        .tilehead{
            color: #333;
            line-height: 15px;
            .close{
                float: right;
                cursor: pointer;
                margin-top: -4px;
                width: 24px;
                height: 24px;
            }
        }
    }
    .imgBox{
        text-align: center;
        img{
            display: inline-block;
            width: 50%;
            margin: 20px 0;
        }   
    }
    .btnBox{
        margin-top: 20px;
        display: flex;
        .button{
            flex: 1;
            background-color: #1665D8;
            color: #fff;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>