<template>
    <div>
        <Modal
            width="508"
            class="Insclassdetail"
            v-model="insdeatalshow"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <div>
                        <span class="miantile">{{currentdata.title}}</span><b class="tigspan">官网</b>
                    </div>
                    <div class="tiledesc">
                        <span class="ratespan"><Rate v-model="currentdata.ratenum" disabled/></span>
                        <span class="tipspan green">{{currentdata.tip}}</span>
                        <span class="tipspan puper">{{currentdata.tip}}</span>
                    </div>
                    <div class="gtest">
                        <span>主办方主办方</span>
                        <span>地点地点地点地点</span>
                    </div>
                    <img class="close" src="../images/close_gary.png" @click="cancelbtn">
                </div>
            </template>
            <div class="insdetailbox" v-if="type==1">
                <h4 class="contdesc">报名要求</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>活动时间</h4>
                        <p>活动时间活动时间</p>
                    </div>
                    <div class="itemflex">
                        <h4>截止日期</h4>
                        <p>截止日期截止日期</p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>活动形式</h4>
                        <p>
                            <span class="bluespan">数理逻辑</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>学科方向</h4>
                        <p>
                            <span class="bluespan">英语能力</span>
                            <span class="bluespan">英语能力</span>
                        </p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>年级要求</h4>
                        <p>
                            <span class="bluespan">9-12</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>年龄要求</h4>
                        <p>
                            <span class="bluespan">16+</span>
                        </p>
                    </div>
                </div>
                <h4 class="contdesc">其他要求</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <h4 class="contdesc">马丽点评</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <h4 class="contdesc">备注</h4>
                <p class="valdesc">{{currentdata.text}}</p>
            </div>
            <div class="insdetailbox" v-if="type==2">
                <h4 class="contdesc">内容介绍</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>夏校时间</h4>
                        <p>活动时间活动时间</p>
                    </div>
                    <div class="itemflex">
                        <h4>申请截止日期</h4>
                        <p>截止日期截止日期</p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>夏校形式</h4>
                        <p>
                            <span class="bluespan">数理逻辑</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>学科方向</h4>
                        <p>
                            <span class="bluespan">英语能力</span>
                            <span class="bluespan">英语能力</span>
                        </p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>年级要求</h4>
                        <p>
                            <span class="bluespan">9-12</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>年龄要求</h4>
                        <p>
                            <span class="bluespan">16+</span>
                        </p>
                    </div>
                </div>
                <h4 class="contdesc">申请要求</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <h4 class="contdesc">马丽 Insights</h4>
                <p class="valdesc">{{currentdata.text}}</p>
            </div>
            <div class="insdetailbox" v-if="type==3">
                <h4 class="contdesc">内容介绍</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>竞赛时间</h4>
                        <p>活动时间活动时间</p>
                    </div>
                    <div class="itemflex">
                        <h4>报名截止日期</h4>
                        <p>截止日期截止日期</p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>竞赛形式</h4>
                        <p>
                            <span class="bluespan">数理逻辑</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>学科方向</h4>
                        <p>
                            <span class="bluespan">英语能力</span>
                            <span class="bluespan">英语能力</span>
                        </p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>奖项级别</h4>
                        <p>
                            <span class="bluespan">奖项级别</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>赛制</h4>
                        <p>
                            <span class="bluespan">赛制</span>
                        </p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>年级要求</h4>
                        <p>
                            <span class="bluespan">9-12</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>年龄要求</h4>
                        <p>
                            <span class="bluespan">16+</span>
                        </p>
                    </div>
                </div>
                <div class="flexbox">
                    <div class="itemflex">
                        <h4>兴趣特长</h4>
                        <p>
                            <span class="bluespan">9-12</span>
                        </p>
                    </div>
                    <div class="itemflex">
                        <h4>所需能力</h4>
                        <p>
                            <span class="bluespan">16+</span>
                        </p>
                    </div>
                </div>
                <h4 class="contdesc">报名要求</h4>
                <p class="valdesc">{{currentdata.text}}</p>
                <h4 class="contdesc">如何准备</h4>
                <p class="valdesc">{{currentdata.text}}</p>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'Insclassdetail',
    props:{
        insdeatalshow:{
            type:Boolean,
            default:false
        },
        selobj:{
            type:Object,
            default:()=>{}
        }
    },
    data() {
        return {
            type:1,//1、课外活动2、夏校3、竞赛
            currentdata:{
                title:'法第三方士大夫水电费',
                ratenum:4,
                tip:'高性价比',
                text:'奥术大师大所梵蒂冈似懂非懂梵蒂冈电饭锅阿发达梵蒂冈电饭锅'
            }
        };
    },
    components: {

    },
    watch: {
        selobj:{
            handler(now){
                this.type = now.type;
                // this.currentdata = JSON.parse(JSON.stringify(now));
            },
            immediate: true,
            deep: true
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
        cancelbtn(){
            this.$emit('closemodal',0);
        }
    }
};
</script>

<style lang='scss'>
.Insclassdetail{
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        border-radius: 4px;
        padding: 21px 16px;
        .tilehead{
            font-weight: normal;
            position: relative;
            >span{
                display: inline-block;
                border-radius: 4px;
                margin-right: 10px;
            }
            .miantile{
                max-width: 350px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: #1665D8;
                vertical-align: middle;
                cursor: pointer;
                margin-right: 15px;
                display: inline-block;
                font-weight: 600;
            }
            .tigspan{
                color: #1665D8;            
                border-radius: 4px;
                border: 1px solid #1665D8;
                padding: 2px 10px;
                vertical-align: middle;
                font-size: 12px;
                font-weight: normal;
            }
            .green{
                color: #1BBBBB;
                background-color: #E8F8F8;
            }
            .puper{
                color: #6759F3;
                background-color: #EFEEFD;
            }
            .tipspan{
                font-size: 12px;
                padding: 5px 10px;
                vertical-align: middle;
            }
            .ratespan{
                background-color: #FEFAEE;
                padding: 2px 5px;
                vertical-align: middle;
                .ivu-rate{
                    font-size: 12px;
                }
                .ivu-rate-star{
                    margin-right: 0px;
                }
                .ivu-rate-star-full:before{
                    color: #FACF55;
                }
            }
            .close{
                position: absolute;
                cursor: pointer;
                width: 24px;
                height: 24px;
                top:0;
                right: 0;
            }
        }
        .tiledesc{
            margin: 20px 0;
            >span{
                margin-right: 10px;
            }
        }
        .gtest{
            >span{
                font-size: 14px;
                color: #9EA0A5;
                margin-right: 10px;
            }
        }
    }
    .insdetailbox{
        padding: 14px;
        max-height: 610px;
        overflow-y: auto;
        .contdesc{
            font-size: 14px;
            color: #6B6C6F;
            margin: 0 0 10px;
        }
        .valdesc{
            color: #6B6C6F;
            margin-bottom: 30px;
        }
        .flexbox{
            margin-bottom: 30px;
            display: flex;
            .itemflex{
                flex: 1;
                >h4{
                    margin-bottom: 8px;
                }
                >p{
                    color: #6B6C6F;
                    .bluespan{
                        padding: 2px 6px;
                        background-color: #F5F6FA;
                        color: #1665D8;
                        border-radius: 2px;
                        font-size: 12px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
    }
}
</style>