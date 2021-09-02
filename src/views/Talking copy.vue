<template>
    <div id="Talking">
        <div class="dvBox">
            <div class="tableBox">
                <Table :columns="columns" :data="data">
                    <template slot-scope="{row}" slot="chinesename">
                        <span style="cursor:pointer;color:#1665D8;" @click="lookManger(row)">{{row.chinesename}}</span>
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
                    <template slot-scope="{row}" slot="lastfollowup">
                        <div class="contBox">
                            <span class="lastconcatval">{{row.lastfollowup}}</span>
                            <button class="greenbtn" @click="goNext(row)">{{row.type=='u'||row.type=='g'||row.type=='t'?'发送问卷':'发送合同'}}</button>
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
import Contract from '../components/Contract';

export default {
    props: {

    },
    data() {
        return {
            selmenteeobj:{},//当前选择学员
            appyear:'',//申请年份
            showModal:false,
            columns:[
                {
                    title: '学员姓名',
                    slot: 'chinesename',
                    minWidth:110,
                    sortable: true
                },
                {
                    title: '联系人姓名',
                    key: 'contactname',
                    minWidth:130
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
                    //         label: '其他国家',
                    //         value: 'c'
                    //     },
                    //     {
                    //         label: '其他单篇',
                    //         value: 's'
                    //     },
                    //     {
                    //         label: '其他',
                    //         value: 'o'
                    //     }
                    // ],
                    // filterMultiple: false,//是否可以多选
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
                    title: '最后联系时间',
                    minWidth:140,
                    sortable: true,
                    key: 'lastfollowuptime'
                },
                {
                    title: '距上次联系',
                    minWidth:110,
                    key: 'tonow'
                },
                {
                    title: '最后联系方式',
                    minWidth:150,
                    sortable: true,
                    key: 'method'
                },
                {
                    title: '最后联系内容',
                    minWidth:300,
                    slot: 'lastfollowup'
                }
            ],
            data:[
                // {
                //     lookbtn:'',
                //     contactname:'ssds',
                //     chinesename:'ssasa',
                //     typecn:"其他单篇",
                //     lastfollowuptime:'2019/01/24',
                //     tonow:'sssd',
                //     lastconcatype:'asdasd',
                //     lastcontact:'asasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasa'
                // }
            ],
            iptval:''
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
        this.$bus.$emit('uplist');
    },
    mounted() {
        this.getdataList();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        goNext(data){
            const dataparm = data;
            const iptval = this.iptval;
            if(!data.chinesename){
                this.$Modal.confirm({
                    title:'请输入学员姓名！',
                    render: (h,iptval) => {
                        return h('Input',{
                            props:{
                                value: iptval
                            },
                            on:{
                                'on-change':(e)=>{
                                    this.iptval = e.target.value;
                                }
                            }
                        },'');
                    },
                    okText:'确定',
                    cancelText:'取消',
                    onOk:()=>{
                        if(!/^\s*$/g.test(this.iptval)){
                            this.$https.editcustomer({
                                id: dataparm.id,
                                chinesename: this.iptval
                            }).then(res=>{
                                if(res&&res.status=='success'){
                                    this.$Message.success('操作成功！');
                                    this.getdataList();
                                    this.isGoPage(dataparm);
                                }else{
                                    this.$Message.error(res.err_msg);
                                }
                            });
                        };
                    },
                    onCancel:()=>{}
                })
            }else{
                this.isGoPage(dataparm);
            };
        },
        isGoPage(data){
            if(data.type=='u'||data.type=='g'||data.type=='t'){
                const params = {
                    id:data.id,
                    newstatus:'survey',
                    action:'attributesurvey'
                };
                this.$https.startStatus(params).then(res=>{
                    if(res&&res.status=='success'){
                        this.$bus.$emit('uplist');
                        this.$router.push({
                            path:'/sales/SendQues'
                        })
                    }else{
                        this.$Message.error('操作失败！');
                    };
                });
            }else{
                this.showModal = true;
                this.selmenteeobj = data;
            };
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
        lookManger(data){
            this.$router.push({
                path:'/sales/Wait/'+data.id
            });
        },
        getdataList(){
            this.$https.getongoingList({}).then(res=>{
                if(res&&res.status=='success'){
                    const dataArr = res.ongoinglist;
                    dataArr.forEach(v=>{
                        // v.lookbtn = '';
                        if(v.lastfollowuptime){
                            v.lastfollowuptime = utility.framateDate(v.lastfollowuptime);       
                        };
                    });
                    this.data = dataArr;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        }
    },
    components: {
        Contract
    },
};
</script>

<style lang="scss">
.ivu-modal-confirm-head-title{
    margin-left: 0;
    margin-bottom: 15px;
}
.ivu-modal-confirm-head-icon{
    display: none;
}
#Talking{
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
                .lastconcatval{
                    flex: 1;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    -webkit-line-clamp:2;
                    line-clamp: 2;
                    -webkit-box-orient:vertical; 
                    margin-right: 15px;
                    vertical-align: middle;
                }
                .greenbtn{
                    padding: 0 10px;
                    line-height: normal;
                    display: inline-block;
                    vertical-align: middle;
                    color: #35AA45;
                    border:.5px solid #35AA45;
                    background-color: transparent;
                    font-size: 13px;
                    border-radius: 4px;
                    height: 30px;
                    cursor: pointer;
                    margin-top: 6px;
                }
            }
        }
    }
}
</style>