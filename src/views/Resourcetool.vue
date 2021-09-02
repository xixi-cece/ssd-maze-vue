<template>
    <div id="Resourcetool">
        <div class="headBox">
            <Input icon="ios-search" v-model="serchval" placeholder="搜索文章或网站" @on-click="serchData" style="width: auto" />
            <div class="optionbox">
                <Button type="primary" custom-icon="iconfont iconxiazai" @click="openDownload">藏经阁下载</Button>
                <Dropdown v-if="identity=='admin'" class="menubox" trigger="click" @on-click="getmenutab">
                    <Button icon="ios-add-circle-outline">添加</Button>
                    <Icon type="ios-arrow-down"></Icon>
                    <DropdownMenu slot="list">
                        <DropdownItem name='1'>添加推文</DropdownItem>
                        <DropdownItem name='2'>添加网站</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="mainBox">
            <div class="lfbox">
                <h3 class="tilebox">文章</h3>
                <div class="valbox">
                    <div class="cardItem" v-for="(v,i) in booklist" :key="i">
                        <h4 @click="lookDetail(v)" :class="v.status?'':'yellowh'">
                            <span class="tilename">{{v.title}}</span>
                            <span class="yellowtip" v-if="!v.status">（{{!v.status?'未发布':''}}）</span>
                            <span v-if="identity=='admin'" class="editbox">
                                <Icon custom="iconfont iconbianji1" @click.stop="editItem(v)"/>
                                <Icon custom="iconfont iconshanchu1" @click.stop="delItembook(v)"/>
                            </span>
                        </h4>
                        <p>{{v.overview}}</p>
                        <div class="btmbox">
                            <span class="timebox">{{v.createDate}}</span>
                            <span class="authbox">{{v.author}}</span>
                            <span class="labox">
                                <b v-for="(itm,j) in v.tags" :key="j">{{itm}}</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rtbox">
                <h3 class="tilebox">网站</h3>
                <div class="valbox">
                    <div class="webcard" v-for="(item,k) in weblist" :key="k">
                        <div class="weblogo">
                            <img :src="item.avatarUrl">
                        </div>
                        <div class="infobox">
                            <h4 class="tipline">
                                <span class="tilename" @click="openlink(item)">{{item.siteName}}</span>
                                <span v-if="identity=='admin'" class="editbox">
                                    <Icon custom="iconfont iconbianji1" @click.stop="editweb(item)"/>
                                    <Icon custom="iconfont iconshanchu1" @click.stop="delItemweb(item)"/>
                                </span>
                            </h4>
                            <p class="tipline">账号：<span>{{item.account}}</span></p>
                            <p class="tipline">密码：<span>{{item.password}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 弹窗 -->
        <Modal
            class="modalbox"
            v-model="showmodal"
            width="388"
            :mask-closable="false"
            :closable="false"
            :footer-hide="true"
        >
            <template slot="header">
                <div class="tilehead">
                    <span>{{webtitle}}</span>
                    <img class="close" src="../images/close.png" @click="closeToast">
                </div>
            </template>
            <div class="contbox">
                <div class="col_line">
                    <div class="tipline">网站</div>
                    <Input v-model="curtwbdata.siteName" />
                </div>
                <div class="col_line">
                    <div class="tipline">链接</div>
                    <Input v-model="curtwbdata.link" />
                </div>
                <div class="col_line">
                    <div class="tipline">账号</div>
                    <Input v-model="curtwbdata.account" />
                </div>
                <div class="col_line">
                    <div class="tipline">密码</div>
                    <Input v-model="curtwbdata.password" />
                </div>
            </div>
            <div class="btnBox">
                <Button class="button" @click="oksure">确认</Button>
                <Button class="button" @click="cancelbtn">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { utility } from '../assets/lib/common';
import { config } from '../assets/lib/config';

export default {
    name:'Resourcetool',
    data() {
        return {
            showmodal:false,
            serchval:'',
            webtitle:'添加网站',
            curtwbdata:{},
            identity:'',//身份
            booklist:[],
            weblist:[]
        };
    },
    components: {

    },
    watch: {

    },
    computed: {

    },
    created() {
        this.identity = sessionStorage.getItem('logintype');
    },
    mounted() {
        this.getData();
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        serchData(){
            this.getData();
        },
        lookDetail(data){
            this.$router.push({
                path:'/admin/Resourcetooldetail/'+data.id
            })
        },
        isNull(){
            const siteName = this.curtwbdata.siteName;
            const account = this.curtwbdata.account;
            const password = this.curtwbdata.password;
            const link = this.curtwbdata.link;
            if(!siteName||!account||!password||!link){
                return false;
            };
            return true;
        },
        openDownload(){
            const dress = config.http_url.split('/api')[0];
            window.open(dress+'/booklets');
        },
        closeToast(){
            this.showmodal = false;
        },
        oksure(){
            if(this.webtitle == '添加网站'){
                const flag = this.isNull();
                if(!flag){
                    this.$Message.error('请填写完整再提交！');
                    return;
                };
                this.showmodal = false;
                this.$https.addwebcont({
                    siteName:this.curtwbdata.siteName,
                    account:this.curtwbdata.account,
                    password:this.curtwbdata.password,
                    link:this.curtwbdata.link
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    }
                });
            }else{
                this.showmodal = false;
                this.$https.editwebcont({
                    id:this.curtwbdata.id,
                    siteName:this.curtwbdata.siteName,
                    account:this.curtwbdata.account,
                    password:this.curtwbdata.password,
                    link:this.curtwbdata.link
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.getData();
                    }else{
                        this.$Message.error(res.msg);
                    }
                });
            }
        },
        cancelbtn(){
            this.showmodal = false;
        },
        openlink(data){
            if(/^http/.test(data.link)){
                window.open(data.link);
            }else{
                window.open('http://'+data.link);
            }
        },
        getData(){
            this.$https.getresours({
                keyword:this.serchval
            }).then(res=>{
                if(res&&res.code==200){
                    this.booklist = res.data.articles;
                    this.weblist = res.data.websites;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        editweb(data){
            this.curtwbdata = JSON.parse(JSON.stringify(data));
            this.showmodal = true;
            this.webtitle = '编辑网站';
        },
        editItem(data){
            this.$router.push({
                path:'/admin/AddRestool',
                query:{
                    id:data.id,
                    type:2//编辑
                }
            })
        },
        delItembook(data){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delresoure({
                        id:data.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getData();
                        }else{
                            this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel:()=>{

                }
            })
        },
        delItemweb(data){
            this.$Modal.confirm({
                title:'确认删除',
                okText:'确认',
                cancelText:'取消',
                onOk:()=>{
                    this.$https.delwebcont({
                        id:data.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getData();
                        }else{
                            this.$Message.error(res.msg);
                        };
                    })
                },
                onCancel:()=>{

                }
            })
        },
        getmenutab(name){
            if(name==1){//推文
                this.$router.push({
                    path:'/admin/AddRestool',
                    query:{
                        type:1//添加
                    }
                })
            }else if(name==2){//网站
                this.showmodal = true;
                this.webtitle = '添加网站';
                this.curtwbdata = {};
            }
        }
    }
};
</script>

<style lang='scss'>
#Resourcetool{
    .headBox{
        position: relative;
        .ivu-input-wrapper,.ivu-input{
            height: 38px;
            >i{
                line-height: 38px;
            }
        }
        .optionbox{
            position: absolute;
            right: 0;
            top: 0;
            button{
                height: 38px;
                background-color: #1665D8;
                vertical-align: middle;
            }
            .menubox{
                display: inline-block;
                margin-left: 20px;
                vertical-align: middle;
                border-radius: 4px;
                background-color: #3E3F42;
                .ivu-btn{
                    background-color: #3E3F42;
                    color: #fff;
                    border: none;
                    border-radius: 0;
                    height: 38px;
                    border-right: 1px solid #fff;
                    &:focus{
                        box-shadow: none;
                    }
                }
                .ivu-icon{
                    color: #fff;
                    width: 24px;
                }
                .ivu-dropdown-rel{
                    border-radius: 4px;
                    overflow: hidden;
                }
                .ivu-select-dropdown{
                    background-color: #3E3F42;
                    left: 0;
                    .ivu-dropdown-item{
                        color: #fff;
                        &:hover{
                            background-color: #6B6C6F;
                        }
                    }
                }
            }
        }
    }
    .mainBox{
        display: flex;
        margin-top: 25px;
        .tilebox{
            background-color: #fff;
            line-height: 64px;
            height: 64px;
            font-size: 18px;
            font-weight: 600;
            border-bottom: 1px solid #EAEDF3;
            padding: 0 24px;
        }
        .lfbox{
            flex: 70%;
            margin-right: 20px;
            .valbox{
                background-color: #fff;
                border-radius:4px;
                box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
                .cardItem{
                    padding: 30px 24px;
                    border-bottom: 1px solid #EAEDF3;
                    >h4{
                        position: relative;
                        cursor: pointer;
                        font-size:16px;
                        margin-bottom: 20px;
                        &::before{
                            content:'';
                            width:4px;
                            display: inline-block;
                            height: 16px;
                            background-color: #1665D8;
                            vertical-align: middle;
                            margin-right: 10px;
                            margin-top: -2px;
                        }
                        .tilename{
                            display: inline-block;
                            vertical-align: middle;
                            max-width: 360px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .yellowtip{
                            color: #F6AB2F;
                            font-weight: normal;
                            vertical-align: middle;
                            margin-left: 10px;
                        }
                        .editbox{
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                            .ivu-icon{
                                cursor: pointer;
                                font-size: 20px;
                                &:first-of-type{
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                    >.yellowh{
                        &::before{
                            background-color: #F6AB2F;
                        }
                        .ivu-icon{
                            color: #F6AB2F;
                        }
                    }
                    >p{
                        color: #6B6C6F;
                        font-size: 14px;
                        margin-bottom: 20px;
                        display: -webkit-box;
                        overflow: hidden;
                        line-clamp: 2;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                    .btmbox{
                        .timebox,.authbox,.labox{
                            color: #9EA0A5;
                            font-size: 14px;
                            margin-right: 20px;
                            display: inline-block;
                            vertical-align: middle;
                        }
                        .authbox{
                            max-width: 120px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .labox{
                            >b{
                                display: inline-block;
                                padding: 2px 10px;
                                background-color: #F5F6FA;
                                font-size: 12px;
                                color: #1665D8;
                                text-align: center;
                                font-weight: normal;
                                border-radius: 2px;
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
        .rtbox{
            flex: 30%;
            .valbox{
                background-color: #fff;
                border-radius:4px;
                box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
                .webcard{
                    display: flex;
                    padding: 30px 24px;
                    border-bottom: 1px solid #EAEDF3;
                    .weblogo{
                        img{
                            display: inline-block;
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                            margin-right: 24px;
                            vertical-align: middle;
                            margin-top: 22px;
                        }
                    }
                    .infobox{
                        flex: 1;
                        >h4{
                            color: #1665D8;
                            font-size: 16px;
                            cursor: pointer;
                        }
                        p{
                            color: #9EA0A5;
                            font-size: 14px;
                            >span{
                                color: #3E3F42;
                                font-size: 16px;
                            }
                        }
                        .tipline{
                            margin-bottom: 10px;
                            position: relative;
                            .tilename{
                                display: inline-block;
                                vertical-align: middle;
                                max-width: 70%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            .editbox{
                                position: absolute;
                                right: 0;
                                top: 50%;
                                transform: translateY(-50%);
                                .ivu-icon{
                                    cursor: pointer;
                                    color: #313131;
                                    font-size: 20px;
                                    &:first-of-type{
                                        margin-right: 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.modalbox{
    .ivu-modal-header{
        background-color: #fff;
        font-size: 18px;
        padding: 21px 16px;
        .tilehead{
            color: #333;
            font-weight: 600;
            line-height: 15px;
            .close{
                float: right;
                margin-top: -4px;
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
        }
    }
    .ivu-modal-content{
        overflow: hidden;
    }
    .contbox{
        .col_line{
            .tipline{
                margin-bottom: 5px;
                color: #6B6C6F;
            }
            margin-bottom: 20px;
            &:last-of-type{
                margin-bottom: 0;
            }
        }
    }
    .btnBox{
        margin: 30px 0 14px;
        display: flex;
        .button{
            flex: 1;
            background-color: #1665D8;
            color: #fff;
            &:last-of-type{
                margin-left: 20px;
                background-color: #CCCECE;
            }
        }
    }
}
</style>