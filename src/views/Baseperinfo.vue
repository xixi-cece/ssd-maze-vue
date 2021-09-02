<template>
    <div id="Baseperinfo">
        <baseinfo :id='id'></baseinfo>
    </div>
</template>

<script>
import Baseinfo from '@/components/Baseinfo';

export default {
    name:'Baseperinfo',
    data() {
        return {
            id:''
        };
    },
    components: {
        Baseinfo
    },
    watch: {

    },
    computed: {

    },
    created() {
        this.id = sessionStorage.getItem('menteeId');
    },
    mounted() {

    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {

    }
};
</script>

<style lang='scss'>
#Baseperinfo{
    
}
</style>