<template>
    <div id="Addsch">
        <h3 class="sctile">添加院校</h3>
        <div class="mainbox">
            <div class="flexBox">
                <div class="flexitm">
                    <b>院校名称<i class="redtip">*</i></b>
                    <Input v-model="uvCnName" placeholder="请添加院校的中文" style="width:100%;" />
                </div>
                <div class="flexitm">
                    <b>院校英文名<i class="redtip">*</i></b>
                    <Input v-model="uvEnName" placeholder="请添加院校的英文" style="width:100%;" />
                </div>
            </div>
            <div class="flexBox">
                <div class="flexitm">
                    <b>院校种类<i class="redtip">*</i></b>
                    <Select
                        v-model="typeId"
                        filterable
                        clearable
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <Option v-for="(option, index) in schlist" :value="option.id" :key="index">{{option.value}}</Option>
                    </Select>
                </div>
                <div class="flexitm">
                    <b>院校文件数量<i class="redtip">*</i></b>
                    <Input v-model="fileCount" placeholder="请输入admission page 的链接" style="width:100%;" />
                </div>
            </div>
            <div class="flexBox">
                <div class="flexitm">
                    <b>ED I截止日期</b>
                    <DatePicker type="date" :value="ED1" @on-change="seleDate($event,1)" placeholder="截止日期" style="width:100%;"></DatePicker>
                </div>
                <div class="flexitm">
                    <b>ED II截止日期</b>
                    <DatePicker type="date" :value="ED2" @on-change="seleDate($event,2)" placeholder="截止日期" style="width:100%;"></DatePicker>
                </div>
            </div>
            <div class="flexBox">
                <div class="flexitm">
                    <b>EA I截止日期</b>
                    <DatePicker type="date" :value="EA1" @on-change="seleDate($event,3)" placeholder="截止日期" style="width:100%;"></DatePicker>
                </div>
                <div class="flexitm">
                    <b>EA II截止日期</b>
                    <DatePicker type="date" :value="EA2" @on-change="seleDate($event,4)" placeholder="截止日期" style="width:100%;"></DatePicker>
                </div>
            </div>
            <div class="flexBox">
                <div class="flexitm">
                    <b>REA 截止日期</b>
                    <DatePicker type="date" :value="REA" @on-change="seleDate($event,5)" placeholder="截止日期" style="width:100%;"></DatePicker>
                </div>
                <div class="flexitm">
                    <b>RD 截止日期<i class="redtip">*</i></b>
                    <DatePicker type="date" :value="RD" @on-change="seleDate($event,6)" placeholder="截止日期" style="width:100%;"></DatePicker>
                </div>
            </div>
        </div>
        <div class="btmbox">
            <Button @click="sureData">确定</Button>
            <Button @click="clearData">清空</Button>
        </div>
    </div>
</template>

<script>
export default {
    name:'Addsch',
    data() {
        return {
            loading:false,
            uvCnName:"",
            uvEnName:"",
            typeId:'',
            fileCount:0,
            ED1:'',
            ED2:'',
            EA1:'',
            EA2:'',
            REA:'',
            RD:'',
            schlist:[
                {
                    id:1,
                    value:'第一'
                },
                {
                    id:2,
                    value:'第二'
                },
                {
                    id:3,
                    value:'第三'
                }
            ],
            options:[]
        };
    },
    components: {
        
    },
    watch: {

    },
    computed: {

    },
    mounted() {
        this.getData();
    },
    methods: {
        seleDate(data,type){
            if(type==1){
                this.ED1 = data;
            }else if(type==2){
                this.ED2 = data;
            }else if(type==3){
                this.EA1 = data;
            }else if(type==4){
                this.EA2 = data;
            }else if(type==5){
                this.REA = data;
            }else if(type==6){
                this.RD = data;
            };
        },
        remoteMethod(query){
            if(!/^\s*$/.test(query)){
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const schlist = this.schlist.map(item => {
                        return {
                            id: item.id,
                            value: item.value
                        };
                    });
                    this.options = schlist.filter(item => item.value.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            }else{
                this.options = [];
            };
        },
        isNull(){
            const uvCnName = this.uvCnName;
            const uvEnName = this.uvEnName;
            const typeId = this.typeId;
            const fileCount = this.fileCount;
            const RD = this.RD;
            if(/^\s*$/.test(uvCnName)||/^\s*$/.test(uvEnName)||!typeId||!fileCount||!RD){
                return false;
            };
            return true;
        },
        sureData(){
            const flag = this.isNull();
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            const params = {
                uvCnName:this.uvCnName,
                uvEnName:this.uvEnName,
                typeId:this.typeId,
                fileCount:this.fileCount,
                rounds:[
                    {
                        round:'ED1',
                        deadLine:this.ED1
                    },
                    {
                        round:'ED2',
                        deadLine:this.ED2
                    },
                    {
                        round:'EA1',
                        deadLine:this.EA1
                    },
                    {
                        round:'EA2',
                        deadLine:this.EA2
                    },
                    {
                        round:'REA',
                        deadLine:this.REA
                    },
                    {
                        round:'RD',
                        deadLine:this.RD
                    }
                ]
            };
            // console.log(params);
            this.$https.addschool(params).then(res=>{
                if(res&&res.code == 200){
                    this.$Message.success('添加成功！');
                    this.clearData();
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        clearData(){
            this.uvCnName = '';
            this.uvEnName = '';
            this.typeId = '';
            this.fileCount = 0;
            this.ED1 = '';
            this.ED2 = '';
            this.EA1 = '';
            this.EA2 = '';
            this.REA = '';
            this.RD = '';
        },
        getData(){
            this.$https.getschoolist({}).then(res=>{
                if(res&&res.code==200){
                    const arr = res.data.map(v=>{
                        return {
                            id:v.id,
                            value:v.name
                        }
                    });
                    // console.log(arr)
                    this.schlist = arr;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        }
    }
};
</script>

<style lang='scss'>
#Addsch{
    background-color: #fff;    
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    width: 726px;
    border: 1px solid #EAEDF3;
    .sctile{
        height: 64px;
        line-height: 64px;
        padding: 0 24px;
        border-bottom: 1px solid #EAEDF3;
    }
    .redtip{
        font-style: normal;
        color: #f00;
        margin-left: 5px;
    }
    .mainbox{
        padding: 30px 24px;
        .flexBox{
            display: flex;
            font-size: 14px;
            .flexitm{
                margin-bottom: 20px;
                margin-right: 60px;
                flex: 1;
                &:last-of-type{
                    margin-right: 0;
                }
                >b{
                    margin-bottom: 10px;
                    display: inline-block;
                }
                textarea.ivu-input{
                    height: 150px;
                    resize: none;
                }
                .smtext{
                    textarea{
                        height: 60px;
                    }
                }
                .tigbox{
                    >span{
                        float: left;
                        padding: 4px 10px;
                        background-color: #F5F6FA;
                        border-radius: 4px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                    }
                }
                .addIcon{
                    display: inline-block;
                    width: 28px;
                    cursor: pointer;
                }
                .dbiptbox{
                    display: flex;
                    .ivu-input{
                        flex: 1;
                    }
                    .hline{
                        display: inline-block;
                        vertical-align: middle;
                        margin: 4px 10px 0;
                    }
                }
                .ivu-rate-star-full:before{
                    color: #1665D8;
                }
            }
        }
    }
    .tabBox{
        overflow: hidden;
        .labelbox{
            float: left;
            max-width: 90%;
            .tagspan{
                display: inline-block;
                font-size: 12px;
                font-weight: normal;
                line-height: 30px;
                padding: 2px 4px 2px 12px;
                background-color: #F5F6FA;
                color: #3E3F42;                
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
                border-radius: 4px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .grayspan{
                padding: 2px 12px;
                cursor: pointer;
            }
            .closeIcon{
                cursor: pointer;
                font-weight: normal;
                font-size: 20px;
                vertical-align: middle;
            }
            .blue{
                background-color: rgba(22, 101, 216, .1);
                color: rgba(22, 101, 216, 1);
            }
        }
        .addicon{
            width: 28px;
            display: inline-block;
            vertical-align: middle;
            cursor: pointer;
            margin-top: 4px;
        }
        .labval{
            width: 120px;
            margin-right: 10px;
        }
    }
    .btmbox{
        padding: 0 24px 30px;
        .ivu-btn{
            width: 100px;
            height: 38px;
            background-color: #1665D8;
            color: #fff;
            border-radius: 4px;
            &:last-of-type{
                margin-left: 20px;
                background-color: #6B6C6F;
            }
        }
    }
}
</style>
