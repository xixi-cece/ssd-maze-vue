<template>
    <div id="Area_select" ref="areaBox">
        <div class="contain" v-if="showArea">
            <h3 class="tile clearfix">
                <span :class="checkType=='province'?'active':''" @click="checkArea('province')">省份</span>
                <span :class="checkType=='city'?'active':''" @click="checkArea('city')">城市</span>
                <span class="close" @click="closeArea">&times;</span>
            </h3>
            <div class="cityBox" v-if="checkType=='province'">
                <dl class="cityCont" v-for="v in cityData" :key="v.id">
                    <dt class="city_label">{{v.label}}</dt>
                    <dd class="city_cont">
                        <span v-for="item in v.child" :class="item.isActive?'active':''" :key="item.id" @click="selectItem(item)">{{item.name}}</span>
                    </dd>
                </dl>
            </div>
            <div class="city_province" v-if="checkType=='city'">
                <span v-for="itm in provin_city" :key="itm.id" :class="itm.isCheck?'active':''" @click="selectCity(itm)">{{itm.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import areadatas from '../config/areas';

export default {
    name:'AreaSelect',
    props:{
        showArea:{//是否展开菜单
            type:Boolean,
            default:false
        },
        checkItem:''//默认选择的市
    },
    data() {
        return {
            checkProvince:"",//选择的省分数据
            checkType: 'province',//选择项
            cityData:[],//数据源
            provin_city:[]//选中的省份对应城市
        };
    },
    computed: {

    },
    created() {
        this.cityData = areadatas;
    },
    mounted() {
        
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {
        showArea:{
            handler(now,old){
                this.checkType = 'province';
                this.resetData();
            },
            deep:true,
            immediate:true
        },
        checkItem:{
            handler(now,old){
                this.resetData();
            },
            immediate:true,
            deep:true
        }
    },
    methods: {
        //切换省/市
        checkArea(data){
            this.checkType = data;
        },
        //选择省份
        selectItem(data){
            // console.log(data);
            this.provin_city = data.children;
            const arr = this.cityData;
            arr.forEach(v=>{
                const chArr = v.child;
                chArr.forEach(item=>{
                    item.isActive = false;
                });
            });
            data.isActive = true;
            this.checkType = 'city';
            this.checkProvince = data;
        },
        //选择城市
        selectCity(data){
            // console.log(data);
            const arr = this.provin_city;
            arr.forEach(v=>{
                v.isCheck = false;
            });
            data.isCheck = true;
            const provice = this.checkProvince;
            const inputData = provice.name+'/'+data.name;
            this.$emit('setData',{
                id:data.id,
                name:inputData
            });
            this.$emit('close',false);
        },
        closeArea(){
            this.$emit('close',false);
            this.resetData();
        },
        //还原和回显
        resetData(){
            const checkCity = this.checkItem;
            const arr = this.cityData;
            arr.forEach(v=>{
                const cArr = v.child;
                cArr.forEach((item,i,pArr)=>{
                    const IArr = item.children;
                    item.isActive = false;
                    IArr.forEach(itm=>{
                        itm.isCheck = false;
                        if(checkCity==itm.id){
                            itm.isCheck = true;
                            this.checkProvince = pArr[i];
                            this.provin_city = pArr[i].children;
                            pArr[i].isActive = true;
                            //赋值文本框
                            const inputData = pArr[i].name+'/'+itm.name;
                            this.$emit('setData',{
                                id:itm.id,
                                name:inputData
                            });
                        };
                    })
                })
            });
        }
    },
    components: {

    },
};
</script>

<style lang="scss">
#Area_select{
    width: 100%;
    .clearfix::before{
        clear: both;
        display: block;
        width: 0;
        height: 0;
        content: '.';
        visibility: hidden;
    }
    .clearfix::after{
        clear: both;
        display: block;
        width: 0;
        height: 0;
        content: '.';
        visibility: hidden;
    }
    .clearfix::before,.clearfix::after{
        *zoom: 1;
    }
    .contain{
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        border-top: 1px solid #46A4ff;
        padding: 0!important;
        .tile{
            background-color: #f0f0f0;
            font-size: 14px;
            margin: 0;
            font-weight: 400;
            border-bottom: 1px solid #ccc;
            .close{
                float: right;
                cursor: pointer;
                margin-right: -8px;
                margin-top: -2px;
                font-size: 16px;
                border: none;
            }
            >span{
                border-left: 1px solid #ccc;
                border-bottom: 1px solid transparent;
                color: #4D4D4D;
                text-align: center;
                margin-bottom: -1px;
                float: left;
                cursor: pointer;
                padding: 8px 22px;
                &.active{
                    color: #46A4ff;
                    background-color: #fff;
                    border-left: 1px solid #fff;
                }
                &:last-of-type {
                    &.active{
                        border-left: 1px solid #ccc;
                        border-right: 1px solid #ccc;
                    }
                }
            }
        }
        .cityBox{
            background-color: #fff;
            padding: 10px 15px;
            font-size: 13px;
            >.cityCont{
                padding: 3px 0;
                display: flex;
                .city_label{
                    display: inline-block;
                    width: 2.5em;
                    text-align: right;
                    line-height: 2;
                    color: #313131;
                    font-weight: 600;
                    margin-right: 6px;
                }
                .city_cont{
                    display: inline-block;
                    flex: 1;
                    line-height: 2;
                    >span{
                        display: inline-block;
                        padding: 0 10px;
                        white-space: nowrap;
                        cursor: pointer;
                        color: #666;
                        &:hover{
                            color: #46A4ff;
                            background-color: #f1f8ff;
                        }
                        &.active{
                            background-color: #46A4FF;
                            color: #fff;
                            border-radius: 2px;
                        }
                    }
                }
            }
        }
        .city_province{
            background-color: #fff;
            padding: 10px 15px;
            font-size: 13px;
            >span{
                line-height: 2;
                display: inline-block;
                padding: 0 10px;
                white-space: nowrap;
                cursor: pointer;
                color: #666;
                &:hover{
                    color: #46A4ff;
                    background-color: #f1f8ff;
                }
                &.active{
                    background-color: #46A4FF;
                    color: #fff;
                    border-radius: 2px;
                }
            }
        }
    }
}
</style>