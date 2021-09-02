<template>
    <div class="Serchselect">
        <div class="sec_box" @click.stop="showorHide">
            <span v-for="(v,i) in list" :key="i">{{v}}</span>
            <Icon class="arrowdown" type="ios-arrow-down" />
        </div>
        <div class="sel_data" v-if="showList">
            <Input icon="ios-search" v-model="cname" @on-change="serchboxval" placeholder="搜索导师" style="width: auto" />
            <div class="data_box">
                <div class="scrolbox">
                    <div class="itembox" v-for="(item,j) in changelist" :key="j">
                        <Checkbox v-model="item.ischeck">{{item.chinesename}}</Checkbox>
                    </div>
                </div>
                <div v-if="!changelist.length" style="padding: 8px;color: #ccc;">没有数据</div>
                <div class="dvbox" v-if="changelist.length">
                    <Button type="primary" @click="sureSelect">确定</Button>
                    <Button @click="resetSel">取消</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Serchselect',
    props:{
        checklist:{
            type:Array,
            default:()=>[]
        },
        changeobj:{
            type:Object,
            default:()=>{}
        },
        teachlist:{
            type:Array,
            default:()=>[]
        }
    },
    data() {
        return {
            showList:false,
            list:[],
            cname:'',
            changelist:[]
        };
    },
    components: {

    },
    watch: {
        teachlist:{
            handler(now){
                this.changelist = this.teachlist;
            },
            deep:true
        },
        checklist:{
            handler(now){
                this.list = now;
            }
        }
    },
    computed: {
    },
    created() {
        
    },
    mounted() {
        this.changelist = this.teachlist;
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        showorHide(){
            this.showList = !this.showList;
            this.initlist();
        },
        initlist(){
            const arr = this.list;
            const datateach = this.changelist;
            this.changelist.forEach(jm=>{
                jm.ischeck = false;
            });
            datateach.forEach(v=>{
                arr.forEach(itm=>{
                    if(v.username==itm.username){
                        v.ischeck = true;
                    };
                });
            });
            this.changelist = datateach;
        },
        serchboxval(){
            const olddata = this.teachlist;
            const val = this.cname;
            if(!/^\s*$/.test(val)){
                let arr = [];
                olddata.forEach(v=>{
                    if(v.chinesename.indexOf(val)!=-1)
                    arr.push(v)
                })
                this.changelist = arr;
            }else{
                this.changelist = olddata;
            };
        },
        sureSelect(){
            const arr = this.changelist;
            let newArr = [];
            let listName = [];
            arr.forEach(v=>{
                if(v.ischeck){
                    newArr.push(v);
                    listName.push(v.chinesename);
                };
            });
            if(newArr.length>2){
                this.$Message.error('最多只能选择两项，请重新选择');
                return;
            };
            this.showList = false;
            this.cname = "";
            this.list = listName;
            this.$emit('checkdata',newArr);
        },
        resetSel(){
            this.showList = false;
            const arr = this.changelist = this.teachlist;
            arr.forEach(v=>{
                v.ischeck = false;
            });
            this.cname = "";
            this.initlist();
        }
    }
};
</script>

<style lang='scss'>
.Serchselect{
    position: relative;
    .sec_box{
        cursor: pointer;
        height: 32px;
        border: 1px solid #E2E4EC;
        border-radius: 4px;
        position: relative;
        padding-left: 4px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 169px;
        .arrowdown{
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%);
        }
        span{
            display: inline-block;
            margin-top: 2px;
            background-color: #F5F6FA;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            color: #3F4042;
            margin-right: 5px;
            &:last-of-type{
                margin-right: 0;
            }
        }
    }
    .sel_data{
        background-color: #fff;
        position: absolute;
        left: 0;
        top: 32px;
        z-index: 9;
        .data_box{
            box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.06);
            border-radius: 4px;
            border: 1px solid #E2E4EC;
            .scrolbox{
                overflow-y: auto;
                max-height: 98px;
            }
            .itembox{
                padding: 5px 6px 0;
                .ivu-checkbox-wrapper{
                    width: 100%;
                    overflow: hidden;
                    padding: 4px 0;
                    margin-right: 0;
                    .ivu-checkbox{
                        float: right;
                        margin-top: 2px;
                    }
                }
                &:hover{
                    background: rgba(0, 0, 0, 0.04);
                }
            }
            .dvbox{
                display: flex;
                padding: 10px;
                .ivu-btn{
                    flex: 1;
                }
                .ivu-btn-primary{
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>