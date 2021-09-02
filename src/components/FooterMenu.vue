<template>
    <div id="FooterMenu">
        {{year}} © Stoooges Education 三士渡教育
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            year:''
        };
    },
    computed: {

    },
    created() {
        const date = new Date();
        this.year = date.getFullYear();
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
#FooterMenu{
    background-color: #141414;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    text-align: right;
    color: #818181;
    font-size: 12px;
    z-index: 1;
}
</style>