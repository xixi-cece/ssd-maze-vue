<template>
    <div id="Checkyjschool">
        <div class="lfItem">
            <Tabs value="sch_child1" name="sch_main">
                <TabPane :label="tabsTabel(1,uslist.length)" name="sch_child1" tab="sch_main">
                    <div class="schbox">
                        <div class="itembox purple" v-for="(v,i) in uslist" :key="i">
                            <div class="headbox">
                                <span class="maintile">{{v.uvEnName}}</span>
                                <!-- <span class="labitm" v-if="v.leftDay<=0">已截止</span> -->
                                <!-- <span class="labitm" v-else>离申请截止还有<b>{{v.leftDay}}</b>天</span> -->
                            </div>
                            <div class="btmoption">
                                <span class="playbox">
                                    <span>项目全称</span>
                                    <!-- <b v-for="(itm,i) in v.major" :key="i">{{itm.majorCN}}</b> -->
                                    <b>{{v.projectName}}</b>
                                </span>
                            </div>
                            <div class="iconBox">
                                <Icon class="editIcon" type="ios-create-outline" @click="editItem(v)" />
                                <Icon class="delicon" custom="iconfont iconshanchu" @click="delscItem(v)" />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(2,uklist.length)" name="sch_child2" tab="sch_main">
                    <div class="schbox">
                        <div class="itembox purple" v-for="(v,i) in uklist" :key="i">
                            <div class="headbox">
                                <span class="maintile">{{v.uvEnName}}</span>
                                <!-- <span class="labitm" v-if="v.leftDay<=0">已截止</span>
                                <span class="labitm" v-else>离申请截止还有<b>{{v.leftDay}}</b>天</span> -->
                            </div>
                            <div class="btmoption">
                                <span class="playbox">
                                    <span>项目全称</span>
                                    <!-- <b v-for="(itm,i) in v.major" :key="i">{{itm.majorCN}}</b> -->
                                    <b>{{v.projectName}}</b>
                                </span>
                            </div>
                            <div class="iconBox">
                                <Icon class="editIcon" type="ios-create-outline" @click="editItem(v)" />
                                <Icon class="delicon" custom="iconfont iconshanchu" @click="delscItem(v)" />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(3,cdlist.length)" name="sch_child3" tab="sch_main">
                    <div class="schbox">
                        <div class="itembox purple" v-for="(v,i) in cdlist" :key="i">
                            <div class="headbox">
                                <span class="maintile">{{v.uvEnName}}</span>
                                <!-- <span class="labitm" v-if="v.leftDay<=0">已截止</span>
                                <span class="labitm" v-else>离申请截止还有<b>{{v.leftDay}}</b>天</span> -->
                            </div>
                            <div class="btmoption">
                                <span class="playbox">
                                    <span>项目全称</span>
                                    <!-- <b v-for="(itm,i) in v.major" :key="i">{{itm.majorCN}}</b> -->
                                    <b>{{v.projectName}}</b>
                                </span>
                            </div>
                            <div class="iconBox">
                                <Icon class="editIcon" type="ios-create-outline" @click="editItem(v)" />
                                <Icon class="delicon" custom="iconfont iconshanchu" @click="delscItem(v)" />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(4,asialist.length)" name="sch_child4" tab="sch_main">
                    <div class="schbox">
                        <div class="itembox purple" v-for="(v,i) in asialist" :key="i">
                            <div class="headbox">
                                <span class="maintile">{{v.uvEnName}}</span>
                                <!-- <span class="labitm" v-if="v.leftDay<=0">已截止</span>
                                <span class="labitm" v-else>离申请截止还有<b>{{v.leftDay}}</b>天</span> -->
                            </div>
                            <div class="btmoption">
                                <span class="playbox">
                                    <span>项目全称</span>
                                    <!-- <b v-for="(itm,i) in v.major" :key="i">{{itm.majorCN}}</b> -->
                                    <b>{{v.projectName}}</b>
                                </span>
                            </div>
                            <div class="iconBox">
                                <Icon class="editIcon" type="ios-create-outline" @click="editItem(v)" />
                                <Icon class="delicon" custom="iconfont iconshanchu" @click="delscItem(v)" />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(5,auslist.length)" name="sch_child5" tab="sch_main">
                    <div class="schbox">
                        <div class="itembox purple" v-for="(v,i) in auslist" :key="i">
                            <div class="headbox">
                                <span class="maintile">{{v.uvEnName}}</span>
                                <!-- <span class="labitm" v-if="v.leftDay<=0">已截止</span>
                                <span class="labitm" v-else>离申请截止还有<b>{{v.leftDay}}</b>天</span> -->
                            </div>
                            <div class="btmoption">
                                <span class="playbox">
                                    <span>项目全称</span>
                                    <!-- <b v-for="(itm,i) in v.major" :key="i">{{itm.majorCN}}</b> -->
                                    <b>{{v.projectName}}</b>
                                </span>
                            </div>
                            <div class="iconBox">
                                <Icon class="editIcon" type="ios-create-outline" @click="editItem(v)" />
                                <Icon class="delicon" custom="iconfont iconshanchu" @click="delscItem(v)" />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane :label="tabsTabel(6,otherslist.length)" name="sch_child6" tab="sch_main">
                    <div class="schbox">
                        <div class="itembox purple" v-for="(v,i) in otherslist" :key="i">
                            <div class="headbox">
                                <span class="maintile">{{v.uvEnName}}</span>
                                <!-- <span class="labitm" v-if="v.leftDay<=0">已截止</span>
                                <span class="labitm" v-else>离申请截止还有<b>{{v.leftDay}}</b>天</span> -->
                            </div>
                            <div class="btmoption">
                                <span class="playbox">
                                    <span>项目全称</span>
                                    <!-- <b v-for="(itm,i) in v.major" :key="i">{{itm.majorCN}}</b> -->
                                    <b>{{v.projectName}}</b>
                                </span>
                            </div>
                            <div class="iconBox">
                                <Icon class="editIcon" type="ios-create-outline" @click="editItem(v)" />
                                <Icon class="delicon" custom="iconfont iconshanchu" @click="delscItem(v)" />
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
        <div class="rtItem">
            <!-- <Input class="serbox" v-model="serchsch" icon="ios-search" placeholder="查找院校" @on-click="serchdata" style="width: 100%;" @on-change="cleardata" /> -->
            <Input class="serbox" v-model="serchsch" icon="ios-search" placeholder="查找院校" @click.native="clearNull" style="width: 100%;" @on-change="cleardata" />
            <div class="fastser">
                <span class="serlabel">速度查找：<b @click="clearNull">清空</b></span>
                <span class="serdetail clearfix">
                    <b v-for="(v,i) in jslist" :class="v.ischeck?'active':''" :key="i" @click="checkItm(v)">{{v.tag}}</b>
                </span>
            </div>
            <div class="listBox">
                <div class="scitem" v-for="(itm,j) in wordlist" :key="j">
                    <Icon class="addIcon" type="ios-add-circle-outline" @click="showAddmodal(itm)" />
                    <span class="ellspan" :title="itm.uvEnName">{{itm.uvEnName}}</span>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <Modal
            class="scModal"
            v-model="modschol"
            width="388"
            :closable="false"
            :mask-closable="false"
        >
            <div slot="header">
                <span :title="addmodtile" class="ell headtile">{{addmodtile}}</span>
                <img src="../images/close.png" class="closeIcon" alt="关闭" @click="closeModal">
            </div>
            <div class="contbox">
                <h3 class="protile">申请方向</h3>
                <Select
                    v-model="chtagId"
                    filterable
                    multiple
                    remote
                    :remote-method="remoteMethod"
                    :loading="loading"
                    style="width:100%"
                >
                    <Option v-for="(item,j) in schtaglist" :value="item.id" :key="j">{{ item.majorEN+' - '+item.majorCN }}</Option>
                </Select>
            </div>
            <div class="contbox" style="margin-top:15px;">
                <h3 class="protile">项目全称</h3>
                <Input v-model="projectName" placeholder="请输入学员申请具体 program 全称~" clearable style="width: 100%;"/>
            </div>
            <div slot="footer">
                <Button @click="sureschMod">确认</Button>
                <Button @click="closeModal">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name:'Checkyjschool',
    props:{
        id:''
    },
    data() {
        return {
            projectName:'',
            menteeId:'',
            tagId:'',
            tabsTabel(data,len){
                return (h)=>{
                    return h('span',{
                        style:{
                            
                        }
                    },[
                        h('span',{},data==1?'美国':data==2?'英国':data==3?'加拿大':data==4?'亚洲':data==5?'澳洲':'小众院校'),
                        h('span',{
                            style:{
                                color:'#1665D8',
                                marginLeft:'5px'
                            }
                        },len?'('+len+')':'')
                    ])
                }
            },
            uslist:[],
            uklist:[],
            cdlist:[],
            asialist:[],
            auslist:[],
            otherslist:[],
            serchsch:'',
            jslist:[],
            wordlist:[],
            oldwordlist:[],
            modschol:false,
            addmodtile:'',
            loading:false,
            isedit:false,//是否是编辑
            selschool:{},//选择的学校
            chtagId:[],//选择的专业
            schtaglist:[],
            seloption:[]
        };
    },
    components: {

    },
    watch: {
        id:{
            handler(now){
                if(now){
                    this.menteeId = now;
                    this.getData();
                    this.getTags();
                    this.getschoollist();
                }
            },
            immediate:true,
            deep:true
        }
    },
    computed: {

    },
    created() {
        this.menteeId = this.id;
    },
    mounted() {
        this.getData();
        this.getTags();
        this.getschoollist();
        this.getprolist();
        this.$bus.$on('reloadInfo',res=>{
            this.getData();
            this.getTags();
            this.getschoollist();
            this.getprolist();
        });
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        remoteMethod(query){
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.seloption = this.schtaglist.filter(item => item.majorCN.toLowerCase().indexOf(query.toLowerCase()) > -1);
                }, 200);
            } else {
                this.seloption = [];
            };
        },
        getData(){
            this.$https.schoozxlist({
                menteeId: this.menteeId
            }).then(res=>{
                if(res&&res.code==200){
                    this.uslist = res.data.us;
                    this.uklist = res.data.uk;
                    this.cdlist = res.data.cd;
                    this.asialist = res.data.asia;
                    this.auslist = res.data.aus;
                    this.otherslist = res.data.others;
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        getprolist(){
            this.$https.prosslist({}).then(res=>{
                if(res&&res.code==200){
                    this.schtaglist = res.data;
                    this.chtagId = [];
                }else{
                    this.$Message.error(res.msg);
                }
            });
        },
        getTags(){
            this.$https.schtags({}).then(res=>{
                if(res&&res.code==200){
                    res.data.forEach(v=>{
                        v.ischeck = false;
                    });
                    this.jslist = res.data;
                }else{
                    this.$Message.error(res.msg);
                };
            });
        },
        getschoollist(){
            this.$https.serschlist({
                tagIds:this.tagId
            }).then(res=>{
                if(res&&res.code==200){
                    res.data.forEach(v=>{
                        if(v.uvEnName){
                            v.serdata = v.uvEnName.toUpperCase();
                        };
                    });
                    this.oldwordlist = res.data;
                    this.wordlist = res.data;
                }else{
                    this.$Message.error(res.msg);
                };
            })
        },
        delscItem(data){
            const _this = this;
            _this.$Modal.confirm({
                title:'温馨提示',
                content:'确认删除',
                onOk(){
                    _this.$https.delproess({
                        menteeId:_this.menteeId,
                        uId:data.uId
                    }).then(res=>{
                        if(res&&res.code==200){
                            _this.$Message.success('操作成功！');
                            _this.$bus.$emit('reloadInfo',true);
                            _this.getData();
                        }else{
                            _this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel(){}
            })
        },
        serchdata(){
            let val = this.serchsch;
            if(!val){
                return;
            };
            val = val.toUpperCase();
            const arr = this.oldwordlist;
            let newArr = [];
            arr.forEach(v=>{
                if(v.serdata.indexOf(val)!=-1){
                    newArr.push(v);
                };
            });
            this.wordlist = newArr;
        },
        cleardata(){
            const val = this.serchsch;
            if(!val){
                this.wordlist = this.oldwordlist;
            }else{
                this.serchdata();
            };
        },
        clearNull(){
            const arr = this.jslist;
            arr.forEach(v=>{
                v.ischeck = false;
            });
            this.jslist = arr;
            this.serchsch = "";
            this.tagId = "";
            this.getschoollist();
        },
        checkItm(data){
            const arr = this.jslist;
            arr.forEach(v=>{
                v.ischeck = false;
                if(v.id==data.id){
                    v.ischeck = true;
                    this.tagId = v.id;
                };
            });
            this.jslist = arr;
            this.getschoollist();
        },
        editItem(data){
            this.isedit = true;
            this.selschool = data;
            this.addmodtile = data.uvEnName;
            this.projectName = data.projectName;
            this.modschol = true;
            const arr = data.major;
            const arr1 = [];
            arr.forEach(v=>{
                arr1.push(v.id);
            });
            this.chtagId = arr1;
        },
        showAddmodal(data){
            this.isedit = false;
            this.chtagId = [];
            this.projectName = '';
            this.selschool = data;
            this.addmodtile = data.uvEnName;
            this.modschol = true;
        },
        closeModal(){
            this.modschol = false;
        },
        sureschMod(){
            if(!this.chtagId.length||/^\s*$/.test(this.projectName)){
                this.$Message.error('请填写完整再提交！');
                return;
            };
            this.modschol = false;
            if(this.isedit){
                this.$https.editproess({
                    major:this.chtagId,
                    uId:this.selschool.uId,
                    menteeId:this.menteeId,
                    projectName:this.projectName
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$bus.$emit('reloadInfo',true);
                        this.chtagId = [];
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    };
                })
            }else{
                this.$https.sureproess({
                    uId:this.selschool.id,
                    major:this.chtagId,
                    menteeId:this.menteeId,
                    projectName:this.projectName
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$bus.$emit('reloadInfo',true);
                        this.chtagId = [];
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    };
                });
            }
        }
    }
};
</script>

<style lang='scss'>
#Checkyjschool{
    display: flex;
    .lfItem{
        flex: 1;
        margin-right: 20px;
        .schbox{
            // height: calc(100vh - 315px);
            overflow-y: auto;
            .itembox{
                position: relative;
                background-color: #fff;                
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
                border-radius: 4px;
                overflow: hidden;
                border: 1px solid #EAEDF3;
                padding: 24px;
                margin-bottom: 20px;
                color: #6B6C6F;
                .headbox{
                    margin-bottom: 20px;
                    max-width: 96%;
                    .maintile{
                        font-size: 20px;
                        font-weight: 600;
                        color: #3F4042;
                        margin-right: 30px;
                    }.labitm{
                        font-size: 14px;
                        b{
                            color: #F6AB2F;
                            margin: 0 5px;
                            font-size: 15px;
                        }
                    }
                }
                .btmoption{
                    b{
                        font-weight: normal;
                        vertical-align: middle;
                        font-size: 14px;
                    }
                    .icontig{
                        margin-right: 10px;
                    }
                    .playbox{
                        margin-right: 30px;
                        span{
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 20px;
                        }
                        b{
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                    }
                }
                .iconBox{
                    position: absolute;
                    height: 100%;
                    width: 46px;
                    top: 0;
                    right: 0;
                    z-index: 5;
                    background-color:rgba(227, 229, 237, .2);
                    box-sizing: border-box;
                }
                .editIcon{
                    position: absolute;
                    cursor: pointer;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 20px;
                }
                .delicon{
                    position: absolute;
                    cursor: pointer;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 20px;
                }
            }
            .green{
                border-left: 6px solid #1BBBBB;
            }
            .purple{
                border-left: 6px solid #6759F3;
            }
            .yegreen{
                border-left: 6px solid #99CB00;
            }
        }
    }
    .rtItem{
        width: 26%;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        padding: 30px 24px 0;
        background-color: #fff;
        .serbox{
            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
            border-radius: 4px;
            input{
                height: 38px;
                background-color: #F5F6FA;
                border:0;
            }
            .ivu-input-icon{
                height: 38px;
                line-height: 38px;
                cursor: pointer;
            }
        }
        .fastser{
            margin: 20px 0;
            .serlabel{
                font-size: 14px;
                width: 100%;
                color: #3F4042;
                display: inline-block;
                vertical-align: middle;
                margin-bottom: 20px;
                >b{
                    font-weight: normal;
                    color: #999;
                    float: right;
                    cursor: pointer;
                }
            }
            .serdetail{
                display: inline-block;
                vertical-align: middle;
                b{
                    float: left;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    color: #1665D8;
                    background-color: rgba(22, 101, 216, 0.1);
                    border-radius: 4px;
                    font-size: 14px;
                    font-weight: normal;
                    padding: 2px 10px;
                    border: 1px solid #1665D8;
                    cursor: pointer;
                    &:last-of-type{
                        margin-right: 0;
                    }
                }
                .active{
                    color: #fff;
                    background-color: #1665D8;
                }
            }
        }
        .listBox{
            // max-height: calc(100vh - 450px);
            max-height: calc(100vh - 200px);
            overflow-y: auto;
            .scitem{
                border-bottom: 1px solid #EAEDF3;
                padding: 15px 0;
                font-size: 14px;
                color: #3F4042;
                .addIcon{
                    color: #1665D8;
                    font-size: 14px;
                    font-weight: 600;
                    margin-right: 10px;
                    cursor: pointer;
                    vertical-align: middle;
                }
                .ellspan{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: inline-block;
                    vertical-align: middle;
                    width: 88%;
                }
            }
        }
    }
}
.scModal{
    .ivu-modal-header{
        height: 64px;
        line-height: 64px;
        padding: 0 25px;
        font-size: 18px;
        font-weight: 600;
        position: relative;
        .closeIcon{
            width: 28px;
            height: 28px;
            position: absolute;
            right: 20px;
            top: 50%;
            cursor: pointer;
            transform: translateY(-50%);
        }
        .headtile{
            max-width: 85%;
            display: block;
        }
    }
    .ivu-modal-body{
        padding: 20px 25px;
        .contbox{
            .protile{
                font-weight: 600;
                margin-bottom: 15px;
            }
            .ivu-checkbox-group-item,.ivu-radio-group-item{
                display: block;
                padding: 10px 0;
                .ivu-checkbox-inner{
                    margin-right: 8px;
                }
            }
        }
        .elldv{
            display: inline-block;
            max-width: 315px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
        }
    }
    .ivu-modal-footer{
        padding:0 25px 20px;
        border-top: none;
        >div{
            display: flex;
        }
        button{
            background-color: #6B6C6F;
            color: #fff;
            height: 38px;
            line-height: 38px;
            flex: 1;
            &:first-of-type{
                margin-right: 20px;
                background-color: #1665D8;
            }
        }
    }
}
</style>
