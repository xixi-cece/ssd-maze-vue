<template>
    <div id="mask_load">
        <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>正在加载中...</div>
        </Spin>
    </div>
</template>

<script>
export default {
    name:''
}
</script>

<style lang='scss'>
#mask_load{
    .ivu-spin-fix{
        z-index: 99;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-spin{
        color: #fff;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
}
</style>