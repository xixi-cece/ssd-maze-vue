<template>
    <div id="SendQues">
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="data">
                    <!-- <template slot-scope="{row}" slot="lookbtn">
                        <button class="looktxt" @click="lookDetail(row)">查看</button>
                    </template> -->
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;cursor:pointer;" @click="lookDetail(row)">{{row.chinesename}}</span>
                    </template>
                    <template slot-scope="{row}" slot="typecn">
                        <span v-if="row.typecn" class="typeBtn">
                            <Icon 
                                :custom="row.type=='u'?'iconfont iconmeiguobenke'
                                :row.type=='g'?'iconfont iconyanjiusheng':row.type=='t'?
                                'iconfont iconzhuanxue':row.type=='uk'?'iconfont iconyingguobenke':
                                row.type=='p'?'iconfont icondanpianPS':row.type=='s'?'iconfont iconqitadanpianPS'
                                :row.type=='o'?'iconfont iconqita':''"
                                :style="row.type=='u'?'color:#1665D8':row.type=='g'?'color:#E6492D'
                                :row.type=='t'?'color:#6758F3':row.type=='uk'?'color:#34AA44':
                                row.type=='p'?'color:#F6AB2F':row.type=='s'?'color:#FACF55':
                                row.type=='o'?'color:#3E3F42':''"
                            ></Icon>
                            <span>{{row.typecn}}</span>
                        </span>
                    </template>
                    <template slot-scope="{row}" slot="surveyaddr">
                        <div class="contBox">
                            <span class="quesadress">{{row.surveyaddr}}</span>
                            <button class="greenbtn" @click="copyTxt(row.surveyaddr)">复制</button>
                        </div>
                    </template>
                    <template slot-scope="{row}" slot="surveystatus">
                        <div class="quesTatuBox">
                            <span v-if="row.surveyaddr&&row.surveystatus=='已完成'" class="lookval questatus finsh" @click="goQuesDetail(row)">查看问卷</span>
                            <span v-else-if="row.surveyaddr&&row.surveystatus=='未做'" class="lookval questatus graybtn">未填写</span>
                            <span v-else class="lookval questatus greenbtn">填写中</span>
                            <button class="questatus active" @click="openBook(row)" style="cursor:pointer;">发送合同</button>
                        </div>
                    </template>
                </Table>
            </div>
        </div>
        <contract v-if="showModal" :showToast='showModal' :menteedata="selmenteeobj" @finsh="goPage"></contract>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { utility } from '../assets/lib/common';
import Clipboard from 'clipboard';
import Contract from '../components/Contract';

export default {
    props: {

    },
    data() {
        return {
            showModal:false,
            selmenteeobj:{},//当前选择
            columns:[
                // {
                //     title:' ',
                //     slot:'lookbtn',
                //     minWidth:90
                // },
                {
                    title: '学员姓名',
                    slot: 'chinesename',
                    minWidth:110,
                    sortable: true
                },
                {
                    title: '申请类型',
                    minWidth:180,
                    slot: 'typecn',
                    sortable: true,
                    filters: [
                        {
                            label: '本科',
                            value: 'u'
                        },
                        {
                            label: '研究生',
                            value: 'g'
                        },
                        {
                            label: '转学',
                            value: 't'
                        },
                        {
                            label: '英国',
                            value: 'uk'
                        },
                        {
                            label: '单篇PS',
                            value: 'p'
                        },
                        {
                            label: '其他国家',
                            value: 'c'
                        },
                        {
                            label: '其他单篇',
                            value: 's'
                        },
                        {
                            label: '其他',
                            value: 'o'
                        }
                    ],
                    // filterMultiple: false,//是否可以多选
                    filterMethod (value, row) {
                        if(value === 'u') {
                            return row.type === 'u';
                        }else if (value === 'g') {
                            return row.type === 'g';
                        }else if (value === 't') {
                            return row.type === 't';
                        }else if (value === 'uk') {
                            return row.type === 'uk';
                        }else if (value === 'p') {
                            return row.type === 'p';
                        }else if (value === 's') {
                            return row.type === 's';
                        }else if (value === 'o') {
                            return row.type === 'o';
                        }
                    }
                },
                {
                    title: '发放问卷时间',
                    minWidth:140,
                    sortable: true,
                    key: 'surveycreatedtime'
                },
                {
                    title: '问卷地址',
                    minWidth:300,
                    slot: 'surveyaddr'
                },
                {
                    title: '问卷填写状态',
                    minWidth:250,
                    slot: 'surveystatus'
                }
            ],
            data:[
                // {
                //     lookbtn:'',
                //     chinesename:'ssasa',
                //     typecn:"其他单篇",
                //     surveycreatedtime:'2019/01/24',
                //     surveyaddr:'sssdsssdsssdsssdsssdsssdsssdsssdsssdsssdsssdsssd',
                //     surveystatus:'查看问卷'
                // }
            ]
        };
    },
    computed: {
        // ...mapState(['listInfo'])
    },
    watch: {
        // listInfo:{
        //     handler(now,old){
        //         const dataArr = JSON.parse(JSON.stringify(now)).ongoinglist;
        //         dataArr.forEach(v=>{
        //             v.time = utility.framateDate(v.lastfollowuptime);
        //         });
        //         this.data = dataArr;
        //     },
        //     deep:true,
        //     immediate:true
        // }
    },
    created() {

    },
    mounted() {
        this.getData();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        copyTxt(data){
            let clipboard = new Clipboard('.greenbtn', {
                text: function () {
                    return data
                }
            })
            clipboard.on('success', e => {
                this.$Message.success('复制成功！');
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$Message.error('复制失败！');
                clipboard.destroy()
            })
        },
        getData(){
            this.$https.getInsurvey({}).then(res=>{
                if(res&&res.status=='success'){
                    const dataArr = res.insurveylist;
                    dataArr.forEach(v=>{
                        // v.lookbtn = "";
                        if(v.surveycreatedtime){
                            v.surveycreatedtime = utility.framateDate(v.surveycreatedtime);
                        };
                    });
                    this.data = dataArr;
                }else{
                    this.$Message.error('获取信息失败！');
                };
            });
        },
        lookDetail(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id,
                query:{
                    type:'ques'
                }
            });
        },
        goPage(data){
            this.showModal = false;
            this.$bus.$emit('uplist');
            if(data == 'end'){
                this.$router.push({
                    path:'/sales/SendBook'
                });
            };
        },
        goQuesDetail(data){
            if(data.surveystatus=='已完成'){
                if(data.surveyaddr){
                    const paramstr = data.surveyaddr.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1');
                    const arrs = paramstr.split('/');
                    if(arrs[0] == 'Home'){
                        const newaddres = data.surveyaddr.replace('Home','HomeDetail');
                        window.open(newaddres);
                    }else if(arrs[0] == 'Postgraduate'){
                        const newaddres = data.surveyaddr.replace('Home','PostgraduateDetail');
                        window.open(newaddres);
                    }else if(arrs[0] == 'Transfer'){
                        const newaddres = data.surveyaddr.replace('Home','TransferDetail');
                        window.open(newaddres);
                    };
                };
            }else{
                this.$Message.error('问卷未提交，暂时无法查看！');
            };
        },
        openBook(data){
            this.showModal = true;
            this.selmenteeobj = data;
        }
    },
    components: {
        Contract
    }
};
</script>

<style lang="scss">
#SendQues{
    .dvBox{
        .tableBox{
            background-color: #fff;
            .ivu-table th{
                background-color: #fff;
                font-weight: 400;
                color: #B0B0B0;
            }
            .ivu-table td{
                font-size: 16px;
            }
            .looktxt{
                padding: 0 10px;
                line-height: normal;
                display: inline-block;
                vertical-align: middle;
                border:none;
                background-color: #346197;
                color: #fff;
                border-radius: 4px;
                height: 30px;
                cursor: pointer;
            }
            .typeBtn{
                // background-color: #ECECEC;
                color: #939393;
                border-radius: 4px;
                display: inline-block;
                padding: 4px 10px;
                border: 1px solid #ddd;
                .ivu-icon {
                    font-size: 24px;
                }
            }
            .contBox{
                display: flex;
                .quesadress{
                    width: 80%;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 4px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-right: 15px;
                    vertical-align: middle;
                }
                .greenbtn{
                    font-size: 13px;
                    line-height: normal;
                    display: inline-block;
                    vertical-align: middle;
                    border:none;
                    width: 22%;
                    background-color: #fff;
                    color: #999;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    cursor: pointer;
                }
            }
            .quesTatuBox{
                display: flex;
                font-size: 13px;
                .lookval{
                    margin-right: 15px;
                }
                .questatus{
                    border: 1px solid #ddd;
                    color: #666;
                    background-color: #fff;
                    border-radius: 4px;
                    padding: 4px 10px;
                }
                .finsh{
                    border: 1px solid #FFC904;
                    background-color: #FFC904;
                    color: #fff;
                    cursor: pointer;
                }
                .graybtn{
                    background-color: #EAEDF3;
                    border-color: #EAEDF3;
                }
                .greenbtn{
                    background-color: #EAF6EC;
                    border-color: #EAF6EC;
                }
                .active{
                    border: 1px solid #51BD63;
                    background-color: #fff;
                    color: #51BD63;
                }
            }
        }
    }
}
// // 模态框
// .modToast{
//     .ivu-modal-header{
//         border-radius: 4px 4px 0 0;
//         background-color: #2E2E2E;
//         color: #fff;
//     }
//     .fqBox{
//         margin-bottom: 140px!important;
//     }
//     .fqBox_1{
//         margin-bottom: 200px!important;
//     }
//     .endBox{
//         background-color: #ddd;
//         padding: 16px;
//         position: absolute;
//         width: 100%;
//         left: 0;
//         bottom: 148px;
//         background-color: #ddd;
//         >.sjx{
//             position: absolute;
//             width: 0;
//             top: -14px;
//             left: 25px;
//             height: 0;
//             border-left: 10px solid transparent;
//             border-right: 10px solid transparent;
//             border-bottom: 15px solid #ddd;
//         }
//     }
//     .endBox_1{
//         bottom: 210px;
        
//     }
//     .threeBox{
//         padding: 0 16px 16px;
//         bottom: 140px;
//         >.sjx{
//             display: none;
//         }
//     }
//     .labBox{
//         display: flex;
//         flex-flow: wrap;
//         margin-bottom: 15px;
//         >li{
//             flex: 1;
//             box-sizing: border-box;
//             &:first-of-type{
//                 margin-right: 30px;
//             }
//             .labTile{
//                 font-weight: 400;
//                 font-size: 12px;
//                 color: #A3A3A3;
//             }
//             .tiletip{
//                 font-size: 14px;
//                 color:#333;
//                 margin-bottom: 5px;
//             }
//             .labCont{
//                 font-size: 14px;
//                 margin-top: 5px;
//                 display: block;
//             }
//             .gpBox{
//                 margin-top: 5px;
//                 .ivu-radio-inner:after{
//                     top:2.5px;
//                     left: 2.5px;
//                 }
//             }
//         }
//     }
//     .line{
//         background-color: #eee;
//         width: 100%;
//         height: 1px;
//         margin-bottom: 15px;
//     }
//     .tileTig{
//         margin-top: 5px;
//     }
//     .saleBox{
//         margin-top: 5px;
//     }
//     .suerBtn{
//         width: 100%;
//         margin-top: 2px;
//         background-color: #51BD63;
//         color: #fff;
//         border: 1px solid #51BD63;
//     }
//     .tig{
//         position: absolute;
//         bottom: -32px;
//         left: 50%;
//         color: #fff;
//         transform: translateX(-50%);
//     }
// }
</style>