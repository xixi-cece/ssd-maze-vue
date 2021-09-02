<template>
    <div id="CacheSign">
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="data">
                    <!-- <template slot="lookbtn">
                        <button class="looktxt" @click="lookManger">查看</button>
                    </template> -->
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="color:#1665D8;cursor:pointer;" @click="lookManger(row)">{{row.chinesename}}</span>
                    </template>
                    <template slot-scope="{row}" slot="typecn">
                        <span v-if="row.typecn" class="typeBtn">
                            <Icon 
                                :custom="row.type=='u'?'iconfont iconmeiguobenke'
                                :row.type=='g'?'iconfont iconyanjiusheng':row.type=='t'?
                                'iconfont iconzhuanxue':row.type=='uk'?'iconfont iconyingguobenke':
                                row.type=='p'?'iconfont icondanpianPS':row.type=='s'?'iconfont iconqitadanpianPS'
                                :row.type=='o'?'iconfont iconqita':row.type=='c'?'iconfont iconqitaguojia1':''"
                                :style="row.type=='u'?'color:#1665D8':row.type=='g'?'color:#E6492D'
                                :row.type=='t'?'color:#6758F3':row.type=='uk'?'color:#34AA44':
                                row.type=='p'?'color:#F6AB2F':row.type=='s'?'color:#FACF55':
                                row.type=='o'?'color:#3E3F42':row.type=='c'?'color:#1BBBBB':''"
                            ></Icon>
                            <span>{{row.typecn}}</span>
                        </span>
                    </template>
                    <template slot-scope="{row}" slot="rebtn">
                        <span class="blubtn" @click="chengeStatu(row)">重新勾搭</span>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { utility } from '../assets/lib/common';

export default {
    props: {

    },
    data() {
        return {
            columns:[
                {
                    title: '联系人姓名',
                    key: 'contactname',
                    minWidth:125,
                    sortable: true
                },
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
                    // filters: [
                    //     {
                    //         label: '本科',
                    //         value: 'u'
                    //     },
                    //     {
                    //         label: '研究生',
                    //         value: 'g'
                    //     },
                    //     {
                    //         label: '转学',
                    //         value: 't'
                    //     },
                    //     {
                    //         label: '英国',
                    //         value: 'uk'
                    //     },
                    //     {
                    //         label: '单篇PS',
                    //         value: 'p'
                    //     },
                    //     {
                    //         label: '其他单篇',
                    //         value: 's'
                    //     },
                    //     {
                    //         label: '其他国家',
                    //         value: 'c'
                    //     },
                    //     {
                    //         label: '其他',
                    //         value: 'o'
                    //     }
                    // ],
                    // // filterMultiple: false,//是否可以多选
                    // filterMethod (value, row) {
                    //     if(value === 'u') {
                    //         return row.type === 'u';
                    //     }else if (value === 'g') {
                    //         return row.type === 'g';
                    //     }else if (value === 't') {
                    //         return row.type === 't';
                    //     }else if (value === 'uk') {
                    //         return row.type === 'uk';
                    //     }else if (value === 'p') {
                    //         return row.type === 'p';
                    //     }else if (value === 's') {
                    //         return row.type === 's';
                    //     }else if (value === 'o') {
                    //         return row.type === 'o';
                    //     }
                    // }
                },
                {
                    title: '申请年份',
                    minWidth:120,
                    sortable: true,
                    key: 'appyear'
                },
                {
                    title: '联系渠道',
                    minWidth:120,
                    sortable: true,
                    tooltip:true,
                    key: 'comefrom'
                },
                {
                    title: '放弃类型',
                    minWidth:120,
                    sortable: true,
                    tooltip:true,
                    key: 'goneType'
                },
                {
                    title: '放弃原因',
                    minWidth:200,
                    // sortable: true,
                    tooltip:true,
                    key: 'goneReason'
                },
                // {
                //     title: '最后联系时间',
                //     minWidth:140,
                //     sortable: true,
                //     key: 'lastfollowuptime'
                // },
                // {
                //     title: '距上次联系',
                //     minWidth:110,
                //     key: 'prevconcat'
                // },
                // {
                //     title: '最后联系方式',
                //     minWidth:140,
                //     sortable: true,
                //     key: 'followupmethod'
                // },
                // {
                //     title: '最后联系内容',
                //     minWidth:180,
                //     key: 'lastfollowupinfo'
                // },
                {
                    title:' ',
                    minWidth:100,
                    slot:'rebtn'
                }
            ],
            data:[]
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
        goNext(){
            this.$router.push({
                path:'/sales/SendQues'
            })
        },
        lookManger(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id
            });
        },
        getData(){
            this.$https.failgivenup({}).then(res=>{
                if(res&&res.status=='success'){
                    const dataArr = res.givenuplist;
                    dataArr.forEach(v=>{
                        if(v.lastfollowuptime){
                            v.lastfollowuptime = utility.framateDate(v.lastfollowuptime);
                        };
                    });
                    this.data = dataArr;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            });
        },
        chengeStatu(data){
            this.$https.restConcat({
                id:data.id
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getData();
                    this.$bus.$emit('uplist',true);
                }else{
                    this.$Message.error('操作失败！');
                };
            })
        }
    },
    components: {

    },
};
</script>

<style lang="scss">
#CacheSign{
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
            .blubtn{
                display: inline-block;
                text-align: center;
                width:80px;
                height:32px;
                line-height: 30px;
                font-size: 13px;
                cursor: pointer;
                border-radius:4px;
                color: #1665D8;
                border:1px solid #1665D8;
            }
        }
    }
}
</style>