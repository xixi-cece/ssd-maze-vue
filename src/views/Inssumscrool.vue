<template>
    <div class="Inssumscrool">
        <div class="ltItem">
            <div class="optionBox">
                <h3 class="serbox">
                    <Input v-model="serval" placeholder="搜索课外活动" icon='ios-search' clearable />
                    <Button type="primary">搜索</Button>
                </h3>
                <div class="updownbox">
                    <span class="optitem">
                        <Dropdown trigger="click" :transfer="true">
                            <a href="javascript:void(0)">
                                地区
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                    <span class="optitem">
                        <Dropdown trigger="click" :transfer="true">
                            <a href="javascript:void(0)">
                                学科领域
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                    <span class="optitem">
                        <Dropdown trigger="click" :transfer="true">
                            <a href="javascript:void(0)">
                                活动形式
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                    <span class="optitem">
                        <Dropdown trigger="click" :transfer="true">
                            <a href="javascript:void(0)">
                                年级
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                    <span class="optitem">
                        <Dropdown trigger="click" :transfer="true">
                            <a href="javascript:void(0)">
                                年龄
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                    <span class="optitem">
                        <Dropdown trigger="click" :transfer="true">
                            <a href="javascript:void(0)">
                                <Icon custom="iconfont iconshaixuanpaixu"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>推荐指数</DropdownItem>
                                <DropdownItem>录取难度</DropdownItem>
                                <DropdownItem>截止日期</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </span>
                </div>
            </div>
            <div class="listbox">
                <div class="itmcard" v-for="(item,j) in cardlist" :key="j">
                    <div class="headbox">
                        <span class="miantile">{{item.title}}</span>
                        <span class="ratespan"><Rate v-model="item.ratenum" disabled/></span>
                        <span class="tipspan green">{{item.tip}}</span>
                        <span class="tipspan puper">{{item.tip}}</span>
                        <Dropdown trigger="click" :transfer="true" class="addIcon" @on-click="changeItem($event,item)">
                            <a href="javascript:void(0)">
                                <Icon type="ios-more"/>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="1">查看</DropdownItem>
                                <DropdownItem name="2">删除</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <p class="descbox">{{item.desc}}</p>
                    <div class="boxflex">
                        <div class="flexitm">
                            <b>活动时间</b>
                            <span>{{item.activeplace}}</span>
                        </div>
                        <div class="flexitm">
                            <b>截止时间</b>
                            <span>{{item.endtime}}</span>
                        </div>
                    </div>
                    <div class="boxflex">
                        <div class="flexitm">
                            <b>活动形式</b>
                            <span>
                                <span class="bluespan">{{item.tip}}</span>
                                <span class="bluespan">{{item.tip}}</span>
                            </span>
                        </div>
                        <div class="flexitm">
                            <b>官放链接</b>
                            <span><a :href="item.link" target="_blank">{{item.link}}</a></span>
                        </div>
                    </div>
                    <Divider />
                </div>
            </div>
        </div>
        <div class="rtItem">
            <div class="lstcard">
                <h3>被采纳最多的活动</h3>
                <Divider />
                <div class="itemList" v-for="(item,j) in hotlist" :key="j">
                    <b>{{j+1}}</b>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <div class="lstcard">
                <h3>TOP30录取学生中最受欢迎的活动</h3>
                <Divider />
                <div class="itemList" v-for="(item,j) in hotlist" :key="j">
                    <b>{{j+1}}</b>
                    <span>{{item.title}}</span>
                </div>
            </div>
        </div>
        <Insclassdetail :insdeatalshow="showinsdetail" :selobj="curentObj" @closemodal='getModal'></Insclassdetail>
    </div>
</template>

<script>
import Insclassdetail from '@/components/Insclassdetail';

export default {
    name:'Inssumscrool',
    data() {
        return {
            serval:'',
            cardlist:[
                {
                    type:2,
                    title:'课外活动标题标',
                    tip:'高性价比',
                    ratenum:5,
                    desc:'课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详',
                    activeplace:'北京鸟巢',
                    activetype:'线上+线下',
                    endtime:'2020.09.29',
                    link:'http://www.baidu.com'
                },
                {
                    type:2,
                    title:'课外活动标题标',
                    tip:'中性价比',
                    ratenum:4,
                    desc:'课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详',
                    activeplace:'北京鸟巢',
                    activetype:'线上+线下',
                    endtime:'2020.09.29',
                    link:'http://www.baidu.com'
                },
                {
                    type:2,
                    title:'课外活动标题标',
                    tip:'低性价比',
                    ratenum:3,
                    desc:'课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详课外活动详情，课外活动详情，课外活动详情，课外活动详',
                    activeplace:'北京鸟巢',
                    activetype:'线上+线下',
                    endtime:'2020.09.29',
                    link:'http://www.baidu.com'
                }
            ],
            curentObj:{},
            hotlist:[
                {
                    title:'1课外活动标题标题标题标题标题标题标'
                },
                {
                    title:'2课外活动标题标题标题标题标题标题标'
                },
                {
                    title:'3课外活动标题标题标题标题标题标题标'
                },
                {
                    title:'课外活动标题标题标题标题标题标题标'
                },
                {
                    title:'课外活动标题标题标题标题标题标题标'
                }
            ],
            rtcardlist:[
                {
                    title:'',
                    list:[
                        
                    ]
                }
            ],
            showinsdetail:false
        };
    },
    components: {
        Insclassdetail
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
        changeItem(type,data){
            // console.log(data);
            this.curentObj = data;
            if(type==1){//查看
                this.showinsdetail = true;
                
            }else{//删除
                this.$Modal.confirm({
                    title:'温馨提示',
                    content:'确定删除吗',
                    onOk(){

                    },
                    onCancel(){}
                })
            }
        },
        getModal(type){
            this.showinsdetail = false;
        }
    }
};
</script>

<style lang='scss'>
.ivu-dropdown-menu{
    min-width: 60px;
}
.Inssumscrool{
    background-color: #fff;
    padding: 40px 70px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    border: 1px solid #EAEDF3;
    display: flex;
    .ltItem{
        flex:1;
        .optionBox{
            .serbox{
                display: flex;
                .ivu-input{
                    height: 38px;
                    background-color: #F5F6FA;
                    border-color: #F5F6FA;
                }
                .ivu-icon{
                    height: 38px;
                    line-height: 38px;
                    cursor: pointer;
                }
                .ivu-btn{
                    width: 72px;
                    margin-left: 16px;
                    height: 38px;
                    background-color: #1665D8;
                }
            }
            .updownbox{
                display: flex;
                padding: 15px 0;
                .optitem{
                    flex: 1;
                    &:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(5){
                        flex: none;
                        width: 15%;
                    }
                    .ivu-dropdown-rel>a{
                        color: #3E3F42;
                    }
                }
            }
        }
        .listbox{
            margin-top: 50px;
        }
        .itmcard{
            .descbox{
                margin-top: 20px;
                margin-bottom: 20px;
                color: #6B6C6F;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                line-clamp: 2;
                -webkit-line-clamp: 2;
            }
        }
        .headbox{
            position: relative;
            >span{
                display: inline-block;
                border-radius: 4px;
                margin-right: 10px;
            }
            .miantile{
                max-width: 170px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
                color: #1665D8;
                vertical-align: middle;
            }
            .tipspan{
                font-size: 12px;
                padding: 2px 10px;
                vertical-align: middle;
            }
            .green{
                color: #1BBBBB;
                background-color: #E8F8F8;
            }
            .puper{
                color: #6759F3;
                background-color: #EFEEFD;
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
            .addIcon{
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                color: #1665D8;
                cursor: pointer;
                font-size: 18px;
            }
            .tigspan{
                color: #1665D8;            
                border-radius: 4px;
                border: 1px solid #1665D8;
                padding: 2px 10px;
                vertical-align: middle;
                font-size: 12px;
            }
            .boldtile{
                color: #3F4042;
                font-size: 16px;
                font-weight: 600;
            }
        }
        .boxflex{
            display: flex;
            font-size: 12px;
            .flexitm{
                margin-bottom: 10px;
                flex: 1;
                >b{
                    color: #9EA0A5;
                    font-weight: normal;
                    margin-right: 10px;
                }
                >span{
                    color: #6B6C6F;
                }
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
    .rtItem{
        width: 40%;
        padding-top: 80px;
        .lstcard{
            margin-top: 60px;
            margin-left: 124px;
            >h3{
                font-size: 14px;
            }
            .itemList{
                margin-bottom: 10px;
                >b{
                    display: inline-block;
                    padding: 1px 6px;
                    border-radius: 2px;
                    font-size: 12px;
                    background-color: rgba(158, 160, 165, .1);
                    color: #6B6C6F;
                    margin-right: 10px;
                    font-weight: normal;
                    vertical-align: middle;
                }
                >span{
                    width: 230px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: inline-block;
                    vertical-align: middle;
                }
                &:nth-of-type(2){
                    >b{
                        background-color: rgba(230, 74, 45, .1);
                        color: #E64A2D;
                    }
                }
                &:nth-of-type(3){
                    >b{
                        background-color: rgba(53, 170, 69, .1);
                        color: #35AA45;
                    }
                }
                &:nth-of-type(4){
                    >b{
                        background-color: rgba(103, 89, 243, .1);
                        color: #6759F3;
                    }
                }
            }
        }
    }
}
</style>