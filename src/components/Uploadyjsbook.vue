<template>
    <div id="Uploadyjsbook">
        <div class="topMod">
            <h3 class="aplytile">申请系统基本材料<span class="tip">(把学员资料放心得交给我吧～ 接受PDF文件)</span></h3>
            <div class="topcontbox clearfix">
                <div class="itembox clearfix">
                    <label v-if="!CAfilename" class="cardupload upbtn" for="ca">
                        <img class="upImg" src="../images/addbook.png" alt="上传">
                        <span>简历</span>
                        <input type="file" class="upca" id="ca" ref="caIpt" @change="upLoadCA">
                    </label>
                    <div class="cardupload" v-if="CAfilename">
                        <img class="upImg" v-if="isZip(CAfilename)==1" src="../images/yasuo.png" alt="图片类型">
                        <img class="upImg" v-else-if="isZip(CAfilename)==2" src="../images/word.png" alt="图片类型">
                        <img class="upImg" v-else src="../images/pdf.png" alt="图片类型">
                        <span class="linkfile" :title="CAfilename" @click="openUrl(CAfilepath)">{{CAfilename}}</span>
                        <Icon class="delIcon" @click="delItemCA('ca')" custom="iconfont iconshanchu" />
                    </div>
                </div>
            </div>
        </div>
        <div class="btmcontbox">
            <h3 class="aplytile">院校单独材料<span class="tip">(部分院校会生成两份PDF文件哦～)</span></h3>
            <div class="schlistbox">
                <div class="scItem clearfix" v-for="(v,i) in schlist" :key="i">
                    <span class="schName">
                        <label class="upBox" :for="'upFie_'+v.uId">
                            <input type="file" :id="'upFie_'+v.uId" multiple class="upIpt" @change="upOnlyfile($event,v)">
                            <Icon class="tigIcon upIcon" custom="iconfont iconshangchuan"/>
                        </label>
                        <!-- <span class="upBox" v-else>
                            <Icon class="tigIcon fsIcon" type="ios-checkmark-circle-outline" />
                        </span> -->
                        <span class="inName">{{v.uvEnName}}</span>
                        <!-- <div class="progessbox" v-if="v.fileCount">
                            <span :class="['itmpro',v.fileCount==v.files.length?'green':k<v.files.length?'blue':'']" v-for="(vm,k) in v.fileCount" :key="k"></span>
                        </div> -->
                    </span>
                    <!-- <span class="protig" v-if="v.fileCount">{{v.files.length+'/'+v.fileCount}}</span> -->
                    <span class="rtopticon">
                        <!-- <span v-if="!v.fileCount">无额外材料</span>
                        <span v-if="v.fileCount&&!v.files.length">暂未上传</span> -->
                        <span v-if="!v.files.length">暂未上传</span>
                        <span v-else v-for="(item,j) in v.files" :key="j">
                            <b @click="opweburl(item)">{{item.fileName}}</b>
                            <Icon class="tigIcon" custom="iconfont iconshanchu" @click="delFile(item)" />
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <!-- <div id="pdfprev"></div> -->
    </div>
</template>

<script>
import pdf from 'pdfobject';

export default {
    name:'Uploadyjsbook',
    props:{
        id:''
    },
    data() {
        return {
            schlist:[],
            menteeId:'',
            CAfilename:'',
            CAfilepath:'',
            caId:''
        };
    },
    components: {

    },
    watch:{
        id:{
            handler(now){
                if(now){
                    this.menteeId = now;
                    this.getData();
                    this.getschData();
                }
            },
            immediate:true,
            deep:true
        }
    },
    created() {
        this.menteeId = this.id;
    },
    mounted() {
        this.getData();
        this.getschData();
        this.$bus.$on('reloadInfo',res=>{
            this.getData();
            this.getschData();
        });
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        isZip(data){
            if(data.indexOf('.zip')!=-1){
                return 1;
            }else if(data.indexOf('.doc')!=-1||data.indexOf('.docx')!=-1){
                return 2;
            }else{
                return 0;
            };
        },
        openUrl(url){
            window.open(url);
            // pdf.embed(url,'#pdfprev');
        },
        getschData(){
            this.CAfilename = '';
            this.caId = '';
            this.$https.getschlists({
                menteeId:this.menteeId
            }).then(res=>{
                if(res&&res.code==200){
                    res.data.forEach(v=>{
                        if(v.fileType==5){
                            this.CAfilename = v.fileName;
                            this.CAfilepath = v.filePath;
                            this.caId = v.id;
                        };
                    })
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        upLoadCA(e){
            const file = e.target.files[0];
            const typeId = e.target.id;
            const laststr = file.name.slice(file.name.length-4);
            if(file.type=='application/msword'||file.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||file.type=='application/pdf'||file.type=='application/zip'||laststr.indexOf('doc')!=-1){
                let formdata = new FormData();
                formdata.append('file',file);
                formdata.append('menteeId',this.menteeId);
                if(typeId == 'ca'){
                    formdata.append('fileType',5);
                };
                this.$Spin.show({
                    render: (h) => {
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'ios-loading',
                                    size: 18
                                }
                            }),
                            h('div', '上传中，请稍后...')
                        ])
                    }
                });
                this.$https.upschfile(formdata).then(res=>{
                    this.$Spin.hide();
                    if(typeId == 'ca'){
                        this.$refs.caIpt.value="";
                    };
                    if(res&&res.code==200){
                        this.$Message.success('上传成功！');
                        this.getschData();
                    }else{
                        this.$Message.error(res.msg);
                    };
                });
            }else{
                this.$Message.error('docx、只能上传PDF或ZIP文件！');
                if(typeId == 'ca'){
                    this.$refs.caIpt.value="";
                };
            };
        },
        delItemCA(type){
            let id = "";
            if(type=='ca'){
                id = this.caId;
            };
            this.$Modal.confirm({
                title:'温馨提示',
                content:'确认删除吗',
                onOk:()=>{
                    this.$https.delschlist({
                        id:id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getschData();
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                },
                onCancel(){}
            })
        },
        getData(){
            this.$https.schoozxlist({
                menteeId:this.menteeId
            }).then(res=>{
                if(res&&res.code==200){
                    this.schlist = res.data.all;
                }else{
                    this.$Message.error(res.msg);
                }
            })
        },
        upOnlyfile(e,data){
            const filesList = e.target.files;
            filesList.forEach(v=>{
                let file = v;
                const laststr = file.name.slice(file.name.length-4);
                if(file.type=='application/msword'||file.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||file.type=='application/pdf'||file.type=='application/zip'||laststr.indexOf('doc')!=-1){
                    const formdata = new FormData();
                    formdata.append('file',file);
                    formdata.append('menteeId',this.menteeId);
                    formdata.append('uId',data.uId);
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'ios-loading',
                                        size: 18
                                    }
                                }),
                                h('div', '上传中，请稍后...')
                            ])
                        }
                    });
                    this.$https.upzxfile(formdata).then(res=>{
                        this.$Spin.hide();
                        e.target.value = '';
                        if(res&&res.code==200){
                            this.getData();
                            this.$Message.success('上传成功！');
                        }else{
                            this.$Message.error(res.msg);
                        };
                    });
                }else{
                    this.$Message.error('只能上传docx、PDF或ZIP文件！');
                    e.target.value = '';
                }
            });
        },
        opweburl(data){
            // console.log(data);
            window.open(data.filePath);
        },
        delFile(data){
            this.$Modal.confirm({
                title:'温馨提示',
                content:'确认删除吗',
                onOk:()=>{
                    this.$https.delzxfile({
                        id:data.id
                    }).then(res=>{
                        if(res&&res.code==200){
                            this.$Message.success('操作成功！');
                            this.getData();
                        }else{
                            this.$Message.error(res.msg);
                        }
                    })
                },
                onCancel(){}
            })
        }
    }
};
</script>

<style lang='scss'>
#Uploadyjsbook{
    // height: calc(100vh - 200px);
    // overflow-y: auto;
    .tip{
        color: #999;
        font-size: 13px;
        margin-left: 10px;
        vertical-align: middle;
        font-weight: normal;
    }
    .aplytile{
        height: 64px;
        line-height: 64px;
        font-size: 18px;
        border-bottom: 1px solid #EAEDF3;
        padding-left: 23px;
        color: #3E3F42;
    }
    .topMod{        
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        background-color: #fff;
        margin-bottom: 20px;
        .topcontbox{
            padding: 60px 23px;
            .itembox{
                float: left;
                .cardupload{
                    float: left;
                    overflow: hidden;
                    width: 146px;
                    height: 175px;
                    background-color: #FBFBFD;
                    border-radius: 4px;
                    text-align: center;
                    margin-right: 30px;
                    margin-bottom: 30px;
                    position: relative;
                    >span{
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        display: inline-block;
                        width: 80%;
                    }
                    .upImg{
                        display: block;
                        width: 40px;
                        margin: 50px auto 10px;
                    }
                    .upca{
                        display: none;
                    }
                    .delIcon{
                        position: absolute;
                        width: 100%;
                        height: 38px;
                        line-height: 38px;
                        font-size: 20px;
                        background-color: #F3F3F5;
                        text-align: center;
                        bottom: 0;
                        left: 0;
                        cursor: pointer;
                    }
                    .linkfile{
                        cursor: pointer;
                        &:hover{
                            color: #1665D8;
                            text-decoration: underline;
                        }
                    }
                }
                .upbtn{
                    cursor: pointer;
                }
                &:last-of-type{
                    .cardupload{
                        margin-right: 0;
                    }
                    >label{
                        margin-right: 30px!important;
                    }
                }
            }
        }
    }
    .btmcontbox{
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        border: 1px solid #EAEDF3;
        background-color: #fff;
        .schlistbox{
            overflow-y: auto;
            padding: 30px 60px;
            .scItem{
                position: relative;
                padding: 25px 0 25px;
                font-size: 16px;
                border-bottom: 1px solid #EAEDF3;
                &:first-of-type{
                    padding-top: 0;
                }
                .schName{
                    float: left;
                    position: relative;
                    .upBox{
                        .upIcon{
                            font-size: 16px;
                            cursor: pointer;
                            color: #1665D8;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 15px;
                        }
                        .fsIcon{
                            font-size: 23px;
                            color: #34AA44;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                        .upIpt{
                            display: none;
                        }
                    }
                    .inName{
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .progessbox{
                        margin-top: 18px;
                        padding-left: 33px;
                        display: flex;
                        width: 180px;
                        .itmpro{
                            flex: 1;
                            height: 6px;
                            background-color: #BCBCBC;
                            margin-right: 10px;
                            &:last-of-type{
                                margin-right: 0;
                            }
                        }
                        .blue{
                            background-color: #1665D8;
                        }
                        .green{
                            background-color: #34AA44;
                        }
                    }
                }
                .protig{
                    position: absolute;
                    left: 190px;
                    bottom:20px;
                    font-size: 12px;
                    color: #3F4042;
                }
                .rtopticon{
                    float: right;
                    >span{
                        display: block;
                        margin-bottom: 5px;
                        b{
                            text-decoration: underline;
                            font-weight: normal;
                            margin-right: 20px;
                            cursor: pointer;
                        }
                    }
                }
                .tigIcon{
                    font-size: 22px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>