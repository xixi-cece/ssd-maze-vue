<template>
    <div id="Addsales">
        <div class="formBox">
            <div class="topbox">
                <div class="ltBox">
                    <span class="itemBox">
                        <span>所属办公室</span>
                        <Select v-model="areamodal" class="selectitem" @on-change="serachdata">
                            <Option v-for="v in arealist" :value="v.key" :key="v.key">{{v.value}}</Option>
                        </Select>
                    </span>
                    <span class="itemBox">
                        <span>账户类型</span>
                        <Select v-model="salesType" class="selectitem" @on-change="serachdata">
                            <Option value="all">全部</Option>
                            <Option value="sales">销售</Option>
                            <Option value="saleshead">销售主管</Option>
                        </Select>
                    </span>
                </div>
                <Button class="addSales" icon="ios-add-circle-outline" @click="showModal=true">添加销售</Button>
            </div>
            <div class="tableBox">
                <Table :columns="columns" :data="datalist">
                    <template slot="delbtn" slot-scope="{row}">
                        <button @click="delItem(row)" class="btn">删除</button>
                    </template>
                </Table>
            </div>
        </div>
        <!-- 模态框 -->
        <Modal
            width="388px"
            class="addSalemodal"
            v-model="showModal"
            :closable="false"
            :mask-closable="false"
            :footer-hide="true"
        >
            <h3 slot="header" class="headTile">
                <span>添加销售</span>
                <img class="close" src="../images/close.png" @click="showModal = false;">
            </h3>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">销售姓名</h4>
                    <Input v-model="salesname" ref="saleName" @on-keyup='changeTxt(salesname)' placeholder="销售姓名" style="width: 100%;" />
                </li>
                <li>
                    <h4 class="labTile">用户名</h4>
                    <Input v-model="username" placeholder="用户名" style="width: 100%;" />
                </li>
            </ul>
            <ul class="labBox">
                <li>
                    <h4 class="labTile">所属办公室</h4>
                    <Select v-model="roomplace" style="width:100%;">
                        <Option v-for="item in conList" :value="item.value" :key="item.label">{{ item.label }}</Option>
                    </Select>
                </li>
                <li>
                    <h4 class="labTile">账户类型</h4>
                    <Select v-model="accoutype" style="width:100%;">
                        <Option v-for="item in typelist" :value="item.value" :key="item.label">{{ item.label }}</Option>
                    </Select>
                </li>
            </ul>
            <Button class="suerBtn" @click="addItem">确认添加</Button>
        </Modal>
    </div>
</template>

<script>
import pingyin from 'pinyin';
import { utility } from '../assets/lib/common';

export default {
    name: 'Addsales',
    components: {

    },
    data() {
        return {
            showModal:false,
            areamodal:'all',
            salesType:'all',
            salesname:'',
            roomplace:'',
            conList:[
                {
                    value: 'bj',
                    label:'北京'
                },
                {
                    value: 'sh',
                    label:'上海'
                },
                {
                    value: 'hz',
                    label:'杭州'
                }
            ],
            username:'',
            accoutype:'',
            typelist:[
                {
                    value:'sales',
                    label:'销售'
                },
                {
                    value:'saleshead',
                    label:'销售主管'
                }
            ],
            columns:[
                {
                    title: '销售姓名',
                    key: 'chinesename',
                    minWidth:150,
                    sortable: true,
                },
                {
                    title: '所属办公室',
                    minWidth:160,
                    key: 'areaZN',
                    sortable: true,
                    filters: [
                        {
                            label: '北京',
                            value: 'bj'
                        },
                        {
                            label: '上海',
                            value: 'sh'
                        },
                        {
                            label: '杭州',
                            value: 'hz'
                        }
                    ],
                    filterMultiple: false,//是否可以多选
                    filterMethod (value, row) {
                        if(value === 'bj') {
                            return row.areaZN === '北京';
                        }else if (value === 'sh') {
                            return row.areaZN === '上海';
                        }else if (value === 'hz') {
                            return row.areaZN === '杭州';
                        };
                    }
                },
                {
                    title: '用户名',
                    key: 'username',
                    minWidth:150,
                    sortable: true,
                },
                {
                    title: '账户类型',
                    key: 'identityZN',
                    minWidth:120,
                    sortable: true,
                    filters: [
                        {
                            label: '销售',
                            value: 'sales'
                        },
                        {
                            label: '销售主管',
                            value: 'saleshead'
                        },
                        {
                            label: '销售合伙人',
                            value: 'salesvp'
                        },
                        // {
                        //     label: '专项导师',
                        //     value: 'specialist'
                        // },
                        // {
                        //     label: '个性化导师',
                        //     value: 'customizedmentor'
                        // },
                        // {
                        //     label: '合伙人',
                        //     value: 'partner'
                        // },
                        // {
                        //     label: '学员',
                        //     value: 'mentee'
                        // },
                        // {
                        //     label: '实习生',
                        //     value: 'intern'
                        // },
                        // {
                        //     label: '文书导师',
                        //     value: 'esmentor'
                        // },
                        // {
                        //     label: '管理员',
                        //     value: 'admin'
                        // },
                        // {
                        //     label: '美方导师',
                        //     value: 'usmentor'
                        // },
                        // {
                        //     label: '行政主管',
                        //     value: 'ophead'
                        // },
                        // {
                        //     label: '行政导师',
                        //     value: 'opmentor'
                        // },
                        // {
                        //     label: '规划主管',
                        //     value: 'plhead'
                        // },
                        // {
                        //     label: '规划导师',
                        //     value: 'plmentor'
                        // },
                        // {
                        //     label: '财务',
                        //     value: 'fiance'
                        // }
                    ],
                    filterMultiple: false,//是否可以多选
                    filterMethod (value, row) {
                        if(value === 'sales') {
                            return row.identity === 'sales';
                        }else if (value === 'saleshead') {
                            return row.identity === 'saleshead';
                        }else if (value === 'salesvp') {
                            return row.identity === 'salesvp';
                        };
                    }
                },
                {
                    title:' ',
                    minWidth:90,
                    slot:'delbtn'
                }
            ],
            datalist:[],
            olddata:[],
            arealist:[],
            rolelist:[]
        };
    },
    computed: {

    },
    created() {
        
    },
    mounted() {
        this.getarealist();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    watch: {

    },
    methods: {
        delItem(data){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delaccout({
                        id:data.id,
                        identity:data.identity
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getacoutlist();
                        }else{
                            this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel:()=>{}
            })
        },
        addItem(){
            const salesname = this.salesname;
            const roomplace = this.roomplace;
            const username = this.username;
            const accoutype = this.accoutype;
            if(salesname==''||roomplace==''||username ==''||accoutype==''){
                this.$Message.error('请填写完整！');
                return;
            };
            this.showModal = false;
            this.$https.addaccout({
                username:this.username,
                chinesename:this.salesname,
                identity:this.accoutype,
                area:this.roomplace
            }).then(res=>{
                if(res&&res.code==200){
                    this.$Message.success('操作成功！');
                    this.getacoutlist();
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        getarealist(){
            this.$https.areadata({}).then(res=>{
                if(res&&res.code==200){
                    this.arealist = res.data.area;
                    this.rolelist = res.data.role;
                    this.getacoutlist();
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        getacoutlist(){
            this.$https.getsalesList({}).then(res=>{
                if(res&&res.status=='success'){
                    res.saleslist.forEach(v=>{
                        v.areaZN = utility.filterArr(v.area,this.arealist);
                        v.identityZN = utility.filterArr(v.identity,this.rolelist);
                        if(v.identity=='sales'){
                            v.identitystu = 'xiaosou'
                        }
                    });
                    this.datalist = res.saleslist;
                    this.olddata = res.saleslist;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        serachdata(){
            const params = {
                area:this.areamodal,
                identity:this.salesType
            };
            for(var k in params){
                if(!params[k]){
                    params[k]='';
                };
            };
            if(params.identity=='sales'){
                params.identity = '';
                params.identitystu = 'xiaosou';//筛选用
            };
            if(params.area=='all'){
                params.area = '';
            };
            if(params.identity=='all'){
                params.identity = '';
            };
            const arr = this.olddata;
            const newArr = utility.selectParams(params,arr);
            this.datalist = newArr;
        },
        changeTxt(data){
            let val = pingyin(data,{
                style:pingyin.STYLE_NORMAL
            })
            val = val.join('');
            this.username = val;
        }
    }
};
</script>

<style lang="scss">
#Addsales{
    .formBox{
        position: relative;
        .topbox{
            // background-color: #fff;
            // border-radius: 4px;
            // box-shadow: 0px 0px 10px #ddd;
            // padding: 20px;
            .ltBox{
                display: flex;
                width: 444px;
                .itemBox{
                    width: 190px;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 4px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    display: flex;
                    flex: 1;
                    margin-right: 30px;
                    >span{
                        display: inline-block;
                        text-align: center;
                        flex: 1;
                        color: #9EA0A5;
                        border-right: 1px solid #ddd;
                    }
                    .selectitem{
                        flex: 1;
                        .ivu-select-selection{
                            border:none;
                            height: 100%;
                            .ivu-select-selected-value,.ivu-select-placeholder{
                                height: 36px;
                                text-align: center;
                                line-height: 36px;
                            }
                        }
                    }
                }
            }
            .addSales{
                position: absolute;
                right: 15px;
                top: 5px;
                background-color: #1665D8;
                color: #fff;
            }
            .labBox{
                display: flex;
                flex-flow: wrap;
                margin-bottom: 15px;
                >li{
                    flex: 1;
                    box-sizing: border-box;
                    margin-right: 30px;
                    .gpBox{
                        margin-top: 5px;
                        height: 32px;
                        .ivu-radio-inner:after{
                            top:2.5px;
                            left: 2.5px;
                        }
                    }
                    .tagBox{
                        border: 1px solid #dcdee2;
                        height: 32px;
                        line-height: 1.5;
                        padding: 4px 7px;
                        width:100%;
                        font-size: 14px;
                        border-radius: 4px;
                        color: #515a6e;
                        line-height: 1.6;
                        .taglabel{
                            margin-right: 10px;
                            border-radius: 2px;
                            cursor: pointer;
                            background-color:#ddd;
                            padding:4px 1px 4px 10px;
                            i{
                                font-size:25px;
                                margin-top: -2px;
                                display: inline-block;
                                vertical-align: middle;
                            }
                        }
                    }
                    &:last-of-type{
                        flex: none;
                        width: 90px;
                        margin-right: 0;
                        overflow: hidden;
                        button{
                            border-radius: 4px;
                            border:none;
                            float: right;
                            font-size: 12px;
                            cursor: pointer;
                            color: #fff;
                            vertical-align: middle;
                            margin-top: 26px;
                            background-color: #346298;
                            padding: 6px 15px;
                        }
                    }
                }
            }
            .labTile{
                font-weight: 400;
                margin-top: 15px;
                margin-bottom: 5px;
                >.label{
                    width: 85px;
                    display: inline-block;
                }
                b{
                    color: #f00;
                    margin-left: 5px;
                }
                &:first-of-type{
                    margin-top: 0;
                }
                .ivu-radio-inner:after{
                    top: 2.5px;
                }
            }
        }
        .tableBox{
            margin-top: 20px;
            border-radius: 4px;
            box-shadow: 0px 0px 10px #ddd;
            background-color: #fff;
            .ivu-table th{
                background-color: #fff;
                font-weight: 400;
                color: #B0B0B0;
            }
            .ivu-table td{
                font-size: 16px;
            }
            .comment{
                vertical-align: middle;
                width: 120px;
                margin-right: 10px;
                vertical-align: middle;
            }
            .btn{
                border-radius: 4px;
                border:none;
                float: right;
                font-size: 12px;
                cursor: pointer;
                color: #fff;
                margin: 0 5px;
                background-color: #fff;
                color: #f00;
                border: 1px solid #f00;
                padding: 6px 15px;
            }
        }
    }
}
// 模态框
.addSalemodal{
    .ivu-modal-header{
        border-radius: 4px 4px 0 0;
        background-color: #fff;
        color: #3E3F42;
        font-size: 18px;
        padding: 21px 16px;
    }
    .close{
        float: right;
        cursor: pointer;
        margin-top: -4px;
        width: 24px;
        height: 24px;
    }
    .labBox{
        display: flex;
        flex-flow: wrap;
        >li{
            flex: 1;
            box-sizing: border-box;
            &:first-of-type{
                margin-right: 30px;
            }
            .labTile{
                font-weight: 400;
                font-size: 14px;
                color: #A3A3A3;
                margin: 5px 0;
            }
            .labCont{
                font-size: 16px;
                margin-top: 5px;
                display: block;
            }
            .gpBox{
                margin-top: 5px;
                .ivu-radio-inner:after{
                    top:2.5px;
                    left: 2.5px;
                }
            }
        }
    }
    .tileTig{
        margin-top: 5px;
        font-weight: 400;
        font-size: 14px;
        color: #A3A3A3;
    }
    .saleBox{
        margin-top: 5px;
    }
    .suerBtn{
        display: block;
        width: 100px;
        margin: 20px auto 0;
        background-color: #1665D8;
        color: #fff;
        border: 1px solid #1665D8;
    }
    .tig{
        position: absolute;
        bottom: -32px;
        left: 50%;
        color: #fff;
        transform: translateX(-50%);
    }
}
</style>