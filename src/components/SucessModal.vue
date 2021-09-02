<template>
    <div id="SucessModal">
        <div class="modal">
            <img src="../images/success.png">
            <h2>添加成功！</h2>
            <p>页面跳转中...</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        
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

    },
    components: {

    },
};
</script>

<style lang="scss">
#SucessModal{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 19;
    background-color: rgba(0,0,0,.5);
    .modal{
        background-color: #fff;
        padding: 20px;
        color: #666;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-65%);
        text-align: center;
        border-radius: 5px;
        >img{
            width: 150px;
        }
        >h2{
            text-align: center;
            width: 100%;
            font-weight: normal;
            font-size: 16px;
            margin: 10px 0;
        }
        >p{
            font-size: 13px;
        }
    }
}
</style>