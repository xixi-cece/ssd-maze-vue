<template>
    <div id="Extrareport">
        <Tabs :value="activeTab" @on-click='getTab'>
            <div v-if="!datalist.length" style="width:100%;text-align:center;">暂无数据</div>
            <TabPane v-for="(item,j) in datalist" :key="j" :label="tabsTabel(item)" :name="item.startDate" :disabled="item.isgray?true:false">
                <Button class="btnoption" icon="ios-add-circle-outline" @click="addreport">添加额外汇报</Button>
                <div class="flexBox">
                    <div class="flexItem" v-for="(v,i) in item.list" :key="i">
                        <h3 class="headtip">
                            <span>{{v.menteeName}}</span>
                            <b>{{v.date}}</b>
                        </h3>
                        <div class="contbox">
                            <h4 class="tiptile">参与人员：</h4>
                            <div class="labox">
                                <span v-for="(a,k) in v.participants" :key="k">
                                    <Icon
                                        :color="a=='行政导师'?'#4CB35C':a=='学员家长'?'#D94C7B':''"
                                        :custom="a=='行政导师'?'iconfont iconhangzheng':a=='学员家长'?'iconfont iconxueyuanjiachang':a=='学员'?'iconfont iconxueyuan1':''"
                                    />
                                    {{a}}
                                </span>
                            </div>
                            <h4 class="tiptile">服务内容：</h4>
                            <div class="labox">
                                <span v-for="(b,k) in v.serviceContent" :key="k">
                                    <Icon
                                        :color="b=='线下见面'?'#1665D8':b=='家长服务'?'#D94C7B':b=='调度服务'?'#F9C268':b=='其他事项'?'#7568F5':b=='学员私聊'?'#4CB35C':''"
                                        :custom="b=='线下见面'?'iconfont iconxianxiajianmian':b=='家长服务'?'iconfont iconxueyuanjiachang':b=='调度服务'?'iconfont icontiaodufuwu':b=='其他事项'?'iconfont iconqitashixiang':b=='学员私聊'?'iconfont iconxueyuansiliao':''"
                                    />
                                    {{b}}
                                </span>
                            </div>
                            <h4 class="tiptile">详细内容：</h4>
                            <p class="valbox">{{v.details}}</p>
                        </div>
                        <div class="optionbox">
                            <span class="boldtime">服务时长：<b>{{v.serviceMinutes}}</b></span>
                            <span class="iconbox">
                                <Icon custom="iconfont iconbianji1" @click="infoEdit(v)" />
                                <Icon custom="iconfont iconshanchu1" @click="delInfo(v)" />
                            </span>
                        </div>
                    </div>
                    <div class="flexItem" style="background-color:transparent;border:none;box-shadow:none;" v-for="jtm in (rowline-item.list.length%rowline)" v-if="item.list.length%rowline>0"></div>
                </div>
            </TabPane>
        </Tabs>
        <!-- 弹窗 -->
        <Modal
            class="exportbox"
            width="576px"
            :closable='false'
            :mask-closable="false"
            v-model="showreport"
            :footer-hide='true'
        >
            <div slot="header" class="headbox">
                <span class="titlename">{{modname}}</span>
                <span class="btnbox">
                    <Button @click="finshModal">完成</Button>
                    <Button @click="showreport=false">取消</Button>
                </span>
            </div>
            <div class="contbox">
                <div class="rowline">
                    <span class="label">学员姓名：</span>
                    <Select
                        class="selbox"
                        v-model="menteeName"
                        filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <span slot='prefix' class="endIcon">
                            <Icon type="ios-close" @click="clearNull" />
                        </span>
                        <Option v-for="(option, index) in menteeslist" :value="option.username" :key="index">{{option.chineseName}}</Option>
                    </Select>
                </div>
                <div class="rowline">
                    <span class="label">服务日期：</span>
                    <DatePicker type="date" :value="date" @on-change="seleDate" placeholder="服务日期" style="width: 128px;"></DatePicker>
                    <span class="label" style="margin-left:34px;">服务时长：</span>
                    <Input v-model="serviceMinutes" style="width:50px;" />&nbsp;min
                </div>
                <div class="rowline">
                    <span class="label">参与人员：</span>
                    <CheckboxGroup v-model="participants">
                        <Checkbox label="行政导师"></Checkbox>
                        <Checkbox label="学员家长"></Checkbox>
                        <Checkbox label="学员"></Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="rowline">
                    <span class="label">服务内容：</span>
                    <CheckboxGroup v-model="serviceContent">
                        <Checkbox label="线下见面"></Checkbox>
                        <Checkbox label="家长服务"></Checkbox>
                        <Checkbox label="学员私聊"></Checkbox>
                        <Checkbox label="调度服务"></Checkbox>
                        <Checkbox label="其他事项"></Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="rowline">
                    <span class="label">详细内容：</span>
                    <Input v-model="details" style="width:100%;" type="textarea" />
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>

export default {
    name:'Extrareport',
    data() {
        return {
            activeTab:'2020.01.10',
            tabsTabel(data){
                return (h)=>{
                    return h('div', {
                        style:{
                            textAlign:'center'
                        }
                    },[
                        h('div',{
                            style:{
                                display:'flex'
                            },
                        },[
                            h('div',{
                                style:{
                                    flex:1
                                }
                            },[
                                h('div',{},new Date(data.startDate).getFullYear()),
                                h('div',{},new Date(data.startDate).getMonth()+1+'.'+new Date(data.startDate).getDate())
                            ]),
                            h('span',{
                                style:{
                                    marginTop:'20px',
                                    marginLeft:'10px',
                                    marginRight:'10px'
                                }
                            },'-'),
                            h('div',{
                                style:{
                                    flex:1
                                }
                            },[
                                h('div',{},new Date(data.endDate).getFullYear()),
                                h('div',{},new Date(data.endDate).getMonth()+1+'.'+new Date(data.endDate).getDate())
                            ])
                        ])
                    ]);
                }
            },
            datalist:[],
            rowline:3,//每行个数
            showreport:false,
            modname:'额外汇报',
            loading:false,
            menteeslist:[],
            options:[],
            menteeName:'',
            date:'',
            serviceMinutes:'',
            participants:[],
            serviceContent:[],
            details:'',
            curtjson:{}//选中项
        };
    },
    components: {
        
    },
    watch: {

    },
    computed: {

    },
    mounted() {
        this.getstudentlist();
        this.getData();
    },
    methods: {
        getstudentlist(){
            this.$https.getstudes({}).then(res=>{
                if(res&&res.code==200){
                    this.menteeslist = res.data;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        getTab(val){
            this.activeTab = val;
            const arr = this.datalist;
            arr.forEach(v=>{
                if(v.startDate==val){
                    this.curtjson = v;
                }
            });
        },
        getData(sdate){
            this.$https.allextrotlist({
                year:new Date().getFullYear()
            }).then(res=>{
                if(res&&res.code==200){
                    res.data.forEach(item=>{
                        if(new Date(item.startDate).getMonth()>new Date().getMonth()){
                            item.isgray = true;
                        }else if(new Date(item.startDate).getMonth()==new Date().getMonth()){
                            if(new Date(item.startDate).getDate()>new Date().getDate()){
                                item.isgray = true;
                            }else{
                                item.isgray = false;
                            }
                        }else {
                            item.isgray = false;
                        };
                    });
                    if(res.data.length){
                        //选中菜单
                        if(sdate){
                            res.data.forEach(v=>{
                                if(v.startDate==sdate){
                                    this.activeTab = v.startDate;
                                    this.curtjson = v;
                                }
                            })
                        }else{
                            this.activeTab = res.data[0].startDate;
                            this.curtjson = res.data[0];
                        }
                    };
                    this.datalist = res.data;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        seleDate(date){
            this.date = date;
        },
        remoteMethod(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    const list = this.menteeslist.map(item => {
                        return {
                            value: item.username,
                            label: item.chineseName
                        };
                    });
                    this.options = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.options = [];
            }
        },
        clearNull(){
            this.menteeName = '';
        },
        infoEdit(data){
            this.showreport = true;
            this.modname = '编辑额外汇报';
            this.curtjson = data;
        },
        isNull(){
            const menteeName = this.menteeName;
            const date = this.date;
            const serviceMinutes = this.serviceMinutes;
            const participants = this.participants.length;
            const serviceContent = this.serviceContent.length;
            const details = this.details;

            if(!menteeName||!date||!serviceMinutes||!participants||!serviceContent||!details){
                return false;
            };
            return true;
        },
        finshModal(){
            const flag = this.isNull();
            if(!flag){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            const params = {
                menteeName:this.menteeName,
                date:this.date,
                serviceMinutes:this.serviceMinutes,
                participants:this.participants,
                serviceContent:this.serviceContent,
                details:this.details,
                recordType:'extra_record'
            };
            this.showreport = false;
            if(this.modname == '添加额外汇报'){
                this.$https.addexrode(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData(this.activeTab);
                    }else{
                        this.$Message.error('操作失败！');
                    }
                });
            }else{
                parmas.id = this.curtjson.id;
                this.$https.editexrode(params).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData(this.activeTab);
                    }else{
                        this.$Message.error('操作失败！');
                    }
                });
            };
        },
        delInfo(data){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delexrode({
                        id:data.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getData(this.activeTab);
                        }else{
                            this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel:()=>{}
            })
        },
        addreport(){
            this.showreport = true;
            this.modname = '添加额外汇报'
        }
    }
};
</script>

<style lang='scss'>
#Extrareport{
    .ivu-tabs-bar{
        border: none;
    }
    .ivu-tabs-nav-prev,.ivu-tabs-nav-next{
        top: 50%;
        transform: translateY(-50%);
    }
    .ivu-tabs-ink-bar{
        display: none;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
        background-color: #fff;
        color: #3E3F42;
        border-radius: 4px;
    }
    .ivu-tabs-nav-scrollable{
        padding: 0 50px;
    }
    .ivu-tabs-nav-prev,.ivu-tabs-nav-next{
        top: 50%;
        transform: translateY(-50%);
        background-color: #fff;
        padding: 15px 0;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active{
        color: #fff;
        background-color: #1665D8;
    }
    .ivu-tabs-nav .ivu-tabs-tab-disabled{
        background-color: #ddd;
        color: #9EA0A4;
    }
    .btnoption{
        height: 44px;
        box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
        width: 100%;
        font-size: 14px;
    }
    .ivu-btn>.ivu-icon{
        color: #F6AB2F;
        font-size: 16px;
    }
    .flexBox{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 20px;
        .flexItem{
            flex: 30%;
            margin-right: 25px;
            background-color: #fff;
            box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
            border: 1px solid #EAEDF3;
            border-radius:4px;
            &:nth-of-type(3n){
                margin-right: 0;
            }
            .headtip{
                line-height: 60px;
                height: 60px;
                width: 100%;
                border-bottom: 1px solid #EAEDF3;
                font-weight: 600;
                position: relative;
                padding: 0 24px;
                >span{
                    font-size: 18px;
                }
                >b{
                    font-size: 16px;
                    position: absolute;
                    right: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .contbox{
                padding: 24px;
                border-bottom: 1px solid #EAEDF3;
                min-height: 220px;
                max-height: 220px;
                overflow-y: auto;
                .tiptile{
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                .labox{
                    margin-bottom: 20px;
                    >span{
                        display: inline-block;
                        border-radius:3px;
                        font-size: 13px;
                        padding: 4px 6px;
                        border: 1px solid #BCBCBC;
                        margin-right: 8px;
                        &:last-of-type{
                            margin-right: 0;
                        }
                    }
                }
                .valbox{
                    font-size:14px;
                    color: #6B6C6F;
                }
            }
            .optionbox{
                padding: 0 24px;
                height: 60px;
                line-height: 60px;
                position: relative;
                .boldtime{
                    font-weight: 600;
                    >b{
                        font-weight: normal;
                    }
                }
                .iconbox{
                    position: absolute;
                    right: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                    .ivu-icon{
                        font-size: 20px;
                        cursor: pointer;
                        margin-right: 10px;
                        &:last-of-type{
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
.exportbox{
    .ivu-modal-header{
        padding: 14px 0;
    }
    .headbox{
        position: relative;
        font-size: 18px;
        height: 30px;
        line-height: 30px;
        font-weight: 600;
        .titlename{
            &::before{
                content:'';
                display: inline-block;
                width: 12px;
                height: 16px;
                background-color: #F6AB2F;
                margin-right: 10px;
            }
        }
        .btnbox{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right:20px;
            button{
                height: 28px;
                font-size: 14px;
                box-shadow: none;
                &:first-of-type{
                    margin-right: 20px;
                    color: #F6AB2F;
                    border-color: #F6AB2F;
                    &:hover{
                        color: #F6AB2F;
                        border-color: #F6AB2F;
                    }
                }
            }
        }
    }
    .contbox{
        .rowline{
            margin-bottom: 20px;
            &:last-of-type{
                margin-bottom: 0;
            }
            .label{
                color: #3E3F42;
                font-weight: 600;
                width: 75px;
                display: inline-block;
            }
            .ivu-checkbox-group{
                display: inline-block;
                .ivu-checkbox-focus{
                    box-shadow: none;
                }
                .ivu-checkbox-checked .ivu-checkbox-inner{
                    border-color: #F6AB2F;
                    background-color: #F6AB2F;
                }
            }
            textarea{
                height: 120px;
                resize: none;
                margin-top: 10px;
            }
            .selbox{
                width: 100px;
                position: relative;
                .endIcon{
                    position: absolute;
                    top: 5px;
                    right: 2px;
                    z-index: 9;
                    font-size: 22px;
                }
            }
        }
    }
}
</style>