<template>
    <div id="Wechatinfo">
        <div class="fixbar" @click="showCode">
            <img src="../images/wechat_icon.png">
            <span class="fontLine">微信小程序填报</span>
        </div>
        <div class="codeBox">
            <img src="../images/ewm.png">
            <span>打开微信「扫一扫」</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow:false//是否显示二维码
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
        showCode(){
            this.isShow = true;
        }
    }
};
</script>

<style lang='scss'>
#Wechatinfo{
    position: fixed;
    top: 150px;
    right: 0;
    z-index: 99;
    .fixbar{
        background-color: #fff;
        padding: 15px 0;
        width:30px;
        text-align: center;
        border-radius: 8px 0 0 8px;
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.04);
        cursor:pointer;
        img{
            width: 28px;
            height: 28px;
            display: inline-block;
        }
        .fontLine{
            display: inline-block;;
            font-size: 14px;
            margin-right: 0;
            color:#34AA44;
            writing-mode: vertical-lr;
        }
    }
    .codeBox{
        text-align: center;
        position: fixed;
        padding: 10px 10px;
        top: 150px;
        right: -135px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.04);
        img{
            width: 120px;
            height: 120px;
            display: inline-block;
        }
        span{
            display: block;
            font-size: 12px;
        }
    }
    &:hover{
        .codeBox{
            right: 37px;
            transition: 1s;
        }
    }
}
</style>