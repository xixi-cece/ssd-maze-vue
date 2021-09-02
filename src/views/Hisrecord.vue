<template>
    <div id="Hisrecord">
        <adminrecord :username='username'></adminrecord>
    </div>
</template>

<script>
import Adminrecord from '@/components/Adminrecord';

export default {
    name:'Hisrecord',
    data() {
        return {
            username:''
        };
    },
    components: {
        Adminrecord
    },
    watch: {

    },
    computed: {

    },
    created() {
        this.username = sessionStorage.getItem('username');
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
#Hisrecord{
    
}
</style>
