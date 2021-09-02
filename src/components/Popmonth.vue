<template>
    <div class="Popmonth">
        <Poptip
            trigger="click"
            popper-class="down_mouthpop"
            placement="bottom"
            :transfer="true"
            v-model="showmonth"
        >
            <img src="../images/add.png" class="addIcon">
            <div slot='content'>
                <CheckboxGroup v-model="monthval">
                    <Checkbox v-for="(item,j) in monthlist" :key="j" :label="item.value"></Checkbox>
                </CheckboxGroup>
                <div class="btmbox clearfix">
                    <span class="fl" @click="resizeval">重置</span>
                    <span class="fr" @click="sureserch">确定</span>
                </div>
            </div>
        </Poptip>
    </div>
</template>

<script>
export default {
    name:'Popmonth',
    props:{
        oldmonthval:{
            type:Array,
            default:()=>[]
        },
        oldmonthlist:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            showmonth:false,
            monthval:[],
            monthlist:[]
        };
    },
    components: {

    },
    watch: {
        oldmonthlist:{
            handler(now){
                this.monthlist = now;
            },
            immediate:true,
            deep:true
        }
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
        resizeval(){
            this.monthval = this.oldmonthval;
        },
        sureserch(){
            this.$emit('changemonthval',this.monthval);
            this.showmonth = false;
        }
    }
};
</script>

<style lang='scss'>
.Popmonth{

}
.down_mouthpop{
    box-sizing: border-box;
    font-size: 12px;
    .ivu-poptip-body{
        padding: 0;
    }
    .ivu-input{
        height: 25px;
        font-size: 12px;
    }
    .ivu-input-icon{
        right:15px;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
    }
    .ivu-input-wrapper{
        padding: 0 15px;
    }
    .ivu-checkbox-group{
        padding: 8px 15px;
        max-height: 150px;
        min-height: 100px;
        overflow-y: auto;
        .ivu-checkbox-group-item{
            display: block;
            padding: 2px 0;
            margin-right: 0;
        }
        .ivu-checkbox-wrapper{
            font-size: 12px;
        }
    }
    .ivu-poptip-content{
        width:95px;
    }
    .ivu-poptip-body-content{
        overflow: inherit;
    }
    .btmbox{
        border-top: 1px solid #eee;
        color: #9EA0A5;
        padding: 8px 0;
        .fl{
            margin-left: 15px;
        }
        .fr{
            margin-right: 15px;
        }
        >span{
            cursor: pointer;
        }
    }
}
</style>