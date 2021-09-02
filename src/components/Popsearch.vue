<template>
    <div class="Popsearch">
        <Poptip 
            trigger="click"
            popper-class="down_pop"
            placement="bottom"
            :transfer="true"
            v-model="showpop"
        >
            <img src="../images/add.png" class="addIcon">
            <div slot='content'>
                <Input icon="ios-search" v-model="searchval" @on-click="serchdata" />
                <CheckboxGroup v-model="gplabval">
                    <Checkbox v-for="(item,j) in gparrlist" :key="j" :label="item.value"></Checkbox>
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
    name:'Popsearch',
    props:{
        oldgpval:{
            type:Array,
            default:()=>[]
        },
        oldgplist:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            showpop:false,
            searchval:'',
            gparrlist:[],
            gplabval:[]
        };
    },
    components: {

    },
    watch: {
        oldgplist:{
            handler(now){
                this.gparrlist = now;
            },
            immediate:true,
            deep:true
        },
        searchval:{
            handler(now){
                if(/^\s*$/g.test(now)){
                    this.gparrlist = this.oldgplist;
                    this.gplabval = this.oldgpval;
                }
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
        serchdata(){
            const arr = this.oldgplist;
            const sval = this.searchval;
            const incheckarr = this.gplabval;
            let newarr = [];
            let checkarr = [];
            arr.forEach(v=>{
                if(v.value.indexOf(sval)!=-1){
                    newarr.push(v);
                };
            });
            newarr.forEach(item=>{
                incheckarr.forEach(jm=>{
                    if(item.value == jm){
                        checkarr.push(item);
                    };
                });
            });
            this.gparrlist = newarr;
            this.gplabval = checkarr;
        },
        resizeval(){
            this.searchval = '';
            this.gplabval = this.oldgpval;
        },
        sureserch(){
            this.$emit('changegpval',this.gplabval);
            this.searchval = '';
            this.showpop = false;
        }
    }
};
</script>

<style lang='scss'>
.Popsearch{
    
}
//下拉弹窗
.down_pop{
    box-sizing: border-box;
    width: 172px;
    font-size: 12px;
    .ivu-poptip-body{
        padding: 15px 0 0;
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
        padding: 0 15px;
        margin: 10px 0;
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