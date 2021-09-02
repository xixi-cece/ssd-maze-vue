<template>
    <div id="Receivepay">
        <div class="tableBox">
            <Table :columns="columns" :data="datalist">
                <template slot="chinesename" slot-scope="{row}">
                    <span class="cname">{{row.chinesename}}</span>
                </template>
                <template slot="splitperiod" slot-scope="{row}">
                    <span>{{row.splitval}}</span>
                </template>
                <template slot-scope="{row}" slot="financeConfirm">
                    <Icon v-if="row.financeConfirm" class="contstau blue" custom="iconfont iconyifafang" />
                    <Icon v-else class="contstau" @click="changePaid(row)" custom="iconfont iconweifafang" />
                </template>
            </Table>
        </div>
    </div>
</template>

<script>
export default {
    name:'Receivepay',
    data() {
        return {
            columns:[
                {
                    title: '学员姓名',
                    slot: 'chinesename',
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '收款金额',
                    key: 'dueamount',
                    minWidth:100
                },
                {
                    title: '收款账户',
                    key: 'paytype',
                    minWidth:120,
                    sortable: true
                },
                {
                    title: '分期情况',
                    align:'left',
                    slot: 'splitperiod',
                    minWidth:150,
                    sortable: true
                },
                {
                    title: '剩余金额',
                    key: 'left',
                    minWidth:120
                },
                {
                    title: '汇款人',
                    key: 'payer',
                    minWidth:100
                },
                {
                    title: '汇款时间',
                    key: 'paydate',
                    minWidth:130,
                    sortable: true
                },
                {
                    title: '汇款账号',
                    key: 'payaccount',
                    minWidth:180
                },
                {
                    title: '申请提交人',
                    key: 'salesCNName',
                    minWidth:130,
                    sortable: true
                },
                {
                    title: '确认收款',
                    slot: 'financeConfirm',
                    minWidth:120,
                    align:'left',
                    sortable: true
                }
            ],
            datalist:[
                // {
                //     chinesename:'李晓娜',
                //     payaccount:'23232323',
                //     surebtn:1
                // }
            ]
        };
    },
    components: {

    },
    watch: {

    },
    computed: {

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
        getData(){
            this.$https.getmoneyList({}).then(res=>{
                if(res&&res.code==200){
                    res.data.forEach(v=>{//splitval
                        if(v.splitperiod==1){
                            v.splitval = '全款'
                        }else if(v.splitperiod==2){
                            if(v.currentPeriod==1){
                                v.splitval = '二期 | 第一期'
                            }else if(v.currentPeriod==2){
                                v.splitval = '二期 | 第二期'
                            }
                        }else if(v.splitperiod==3){
                            if(v.currentPeriod==1){
                                v.splitval = '三期 | 第一期'
                            }else if(v.currentPeriod==2){
                                v.splitval = '三期 | 第二期'
                            }else if(v.currentPeriod==3){
                                v.splitval = '三期 | 第三期'
                            }
                        }
                    })
                    this.datalist = res.data;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        changePaid(data){
            this.$https.surePaid({
                contractkey:data.contractkey,
                currentPeriod:data.currentPeriod,
                uid:data.uid,
                chinesename:data.chinesename
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('修改成功！');
                    this.getData()
                }else{
                    this.$Message.error(res.msg);
                }
            })
        }
    }
};
</script>

<style lang='scss'>
#Receivepay{
    .ivu-table th{
        background-color: #fff;
        font-weight: 400;
        color: #B0B0B0;
    }
    .ivu-table td{
        font-size: 16px;
    }
    .cname{
        color: #1665D8;
        cursor: pointer;
    }
    .contstau{
        font-size: 24px;
        cursor: pointer;
    }
    .blue{
        color: #1665D8;
    }
}
</style>
