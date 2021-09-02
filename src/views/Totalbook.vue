<template>
    <div id="Totalbook">
        <div class="areaSelect">
            <RadioGroup v-model="areamodal" type="button" @on-change="changeRadio">
                <Radio v-for="(v,i) in arealist" :key="i" :label="v.key">{{v.value}}</Radio>
            </RadioGroup>
        </div>
        <div class="formBox">
            <ul class="topBox">
                <li class="Item" v-for="(v,i) in list" :key="i">
                <span>
                    <Icon class="iconPic" :custom="v.icon"/>
                </span>
                <span>
                    <span class="tile">{{v.name}}</span>
                    <b class="numBox">{{v.num}}</b>
                </span>
                </li>
            </ul>
            <div class="panlistBox">
                <div class="nulldata" v-if="!datalist.length">暂无数据</div>
                <Collapse>
                    <Panel :name="item.date" v-for="(item,j) in datalist" :key="j">
                        <div class="tilehead clearfix">
                            <span class="fl">{{item.date}}</span>
                            <span class="fr rightBox">
                                <b>总单数：{{item.totalnum}}</b>
                                <b>签约总额：{{item.totalmoney}}</b>
                            </span>
                        </div>
                        <p slot="content">
                            <Table :columns="columns" :data="item.datatables">
                                <template slot-scope="{row}" slot="sales">
                                    <span style="color:#1665D8;">{{row.sales}}</span>
                                </template>
                            </Table>
                        </p>
                    </Panel>
                </Collapse>
            </div>
        </div>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
export default {
    name: 'Totalbook',
    components: {

    },
    data() {
        return {
            areamodal:'all',
            arealist:[],
            list:[
                {
                    name:'累计签约单数',
                    num:'0',
                    icon:'iconfont icondangyueqianyuedanshu1'
                },
                {
                    name:'累计咨询数',
                    num:'0',
                    icon:'iconfont icondangyuezongzixunshu'
                },
                {
                    name:'累计签约率',
                    num:'0',
                    icon:'iconfont icondangyueqianyueshuai1'
                },
                {
                    name:'累计签约总额',
                    num:'0',
                    icon:'iconfont icondangyuediquqianyuezonge'
                }
            ],
            columns:[
                {
                    title:'销售人员',
                    slot:'sales',
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '收到单数',
                    minWidth:120,
                    key: 'customers_c'
                },
                {
                    title: '签约单数',
                    minWidth:120,
                    key: 'signed_c'
                },
                {
                    title: '签约额',
                    minWidth:120,
                    key:'signed_amount',
                },
                // {
                //     title: '签约率',
                //     minWidth:120,
                //     key: 'signed_rate'
                // },
                {
                    title: '所属办公室',
                    minWidth:140,
                    key: 'areaZN'
                }
            ],
            datalist:[
                // {
                //     date:'2020-03-20',
                //     totalnum:'128000',
                //     totalmoney:2350000,
                //     datatables:[
                //         {
                //             sales:'萨达撒',
                //             numbook:2224,
                //             dddd:'2323',
                //             money:23232,
                //             kkk:'50%',
                //             room:'北京'
                //         }
                //     ]
                // },
                // {
                //     date:'2020-03-21',
                //     totalnum:'128000',
                //     totalmoney:2350000,
                //     datatables:[
                //         {
                //             sales:'萨达撒',
                //             typecn:'本科',
                //             type:'u',
                //             dddd:'2323',
                //             money:23232,
                //             kkk:'50%'
                //         }
                //     ]
                // }
            ]
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getArea();
        setTimeout(()=>{
            this.getdatalist();
        },200)
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
        getArea(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.arealist = res.data.area;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getdatalist(){
            this.$https.totalbooklist({
                area:!this.areamodal?"all":this.areamodal
            }).then(res=>{
                if(res&&res.status=='success'){
                    this.list[0].num = res.allSigned;
                    this.list[1].num = res.allCount;
                    this.list[2].num = res.allSignedRate;
                    this.list[3].num = res.allSignedAmount;
                    res.achievement_inmonths.forEach(v=>{
                        v.datatables.forEach(itm=>{
                            itm.areaZN = utility.filterArr(itm.area,this.arealist);
                        })
                    })
                    this.datalist = res.achievement_inmonths;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        changeRadio(val){
            this.areamodal = val;
            this.getdatalist();
        }
    }
};
</script>

<style lang="scss">
#Totalbook{
    position: relative;
    .areaSelect{
        position: fixed;
        top: 18px;
        left: 370px;
        z-index: 9;
        .ivu-radio-wrapper{
            border:none;
            &:before{
                display:none;
            }
            &:after{
                display:none;
            }
        }
        .ivu-radio-wrapper-checked{
            box-shadow: none;
        }
    }
    .formBox{
        .topBox{
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            margin-bottom: 30px;
            .Item{
                flex: 1;
                background-color: #fff;
                border-radius: 4px;
                // box-shadow: 0px 0px 10px 0px #e1e0e0;
                border:1px solid #ddd;
                padding: 20px 20px;
                margin-right: 12px;
                display: flex;
                align-items: center;
                text-align: center;
                white-space: nowrap;
                >span{
                    flex: 1;
                    text-align: left;
                    >.tile{
                        font-size: 14px;
                        display: block;
                        color: #666;
                        font-weight: 400;
                    }
                    >.iconPic{
                        display: inline-block;
                        vertical-align: middle;
                        width: 50%;
                        height: 50%;
                        color: #F6AB2F;
                        font-size: 50px;
                    }
                    >.numBox{
                        display: inline-block;
                        vertical-align: middle;
                        width: 50%;
                        font-size: 22px;
                        color: #313131;
                        font-weight: 400;
                    }
                    &:first-of-type{
                        margin-right: 35px;
                        flex: none;
                    }
                }
                &:nth-of-type(2){
                    .iconPic{
                        color: #1665D8;
                    }
                }
                &:nth-of-type(3){
                    .iconPic{
                        color: #34AA44;
                    }
                }
                &:nth-of-type(4){
                    margin-right: 0;
                    .iconPic{
                        color: #6758F3;
                    }
                }
            }
        }
        .panlistBox{
            .nulldata{
                text-align: center;
            }
            .tilehead{
                display: inline-block;
                color: #3F4042;
                width: 95%;
                margin-top: 20px;
                .rightBox{
                    b{
                        font-weight: normal;
                        margin-left: 50px;
                    }
                }
            }
            .ivu-collapse-header{
                padding: 1px 16px;
                height: inherit;
                line-height: inherit;
                background-color: #FBFBFD;
                border-bottom: 1px solid #EAEDF3;
            }
            .typeBtn{
                background-color: #ECECEC;
                color: #939393;
                border-radius: 4px;
                display: inline-block;
                padding: 4px 10px;
            }
            .ivu-table th{
                background-color: #fff;
                font-weight: 400;
                color: #B0B0B0;
                border-bottom: 1px solid #EAEDF3;
            }
            .ivu-table td{
                font-size: 16px;
            }
            .ivu-collapse{
                background-color: transparent;
                border: 0;
            }
            .ivu-collapse-item{
                margin-bottom: 20px;
                background-color: #fff;
                overflow: hidden;
                border-radius: 4px;
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
                border-top: none;
                .ivu-icon-ios-arrow-forward{
                    float: right;
                    margin-top: 12px;
                    color: #3F4042;
                    margin-top: 24px;
                }
                .ivu-collapse-content-box{
                    padding: 0 10px;
                }
                .ivu-collapse-content{
                    padding: 0;
                }
            }
        }
    }
}
</style>