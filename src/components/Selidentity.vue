<template>
    <div id="Selidentity">
        <Modal
            class="Selidentity"
            v-model="showIdent"
            :mask-closable="false"
            :closable="false"
            width="328"
            :footer-hide="true"
        >
            <h3 slot="header">
                <span>请选择要登录的身份</span>
                <Icon class="closeIcon" type="md-close" @click="closeMd" />
            </h3>
            <p class="identitem" v-for="(v,i) in identitylist" :key="i" @click="checkItem(v)">{{v.identityCN}}</p>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'Selidentity',
    components: {

    },
    computed: {

    },
    props:{
        showIdent:{
            type:Boolean,
            default:false
        },
        identitylist:{
            type:Array,
            default:()=>[]
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
        checkItem(data){
            this.$emit('closeIdenty',data);
        },
        closeMd(){
            this.$emit('closeIdenty',false);
        }
    }
}
</script>

<style lang='scss'>
.Selidentity{
    .ivu-modal-header{
        padding: 20px 15px;
        h3{
            font-size: 18px;
            .closeIcon{
                float: right;
                font-size: 22px;
                cursor: pointer;
            }
        }
    }
    .ivu-modal-body{
        padding: 0;
        padding-bottom: 10px;
    }
    .identitem{
        padding: 0 16px;
        line-height: 35px;
        cursor: pointer;
        &:hover{
            background-color: #f1f1f1;
        }
    }
}
</style>
