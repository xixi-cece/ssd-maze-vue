<template>
    <div id="AddRestool">
        <div class="wrapbox">
            <h3 class="headtip"><Icon type="ios-arrow-back" @click="goBack" />{{tilename}}</h3>
            <div class="contBox">
                <Input class="tileipt" v-model="title" clearable placeholder="请填写标题"/>
                <Input class="textareaval" type="textarea" v-model="overview" placeholder="请输入简介"/>
                <span class="timebox">{{createTime}}</span>
                <div ref="editorElem" class="editorbox" style="text-align:left;"></div>
                <div class="itemrow">
                    <span class="tiplab">受众</span>
                    <span class="labelbox">
                        <b v-for="(v,i) in audiences" :class="v.ischeck?'blue':''" :key="i" @click="addadus(v)">{{v.tag}}</b>
                    </span>
                </div>
                <div class="itemrow">
                    <span class="tiplab">标签</span>
                    <span class="labelbox" v-if="tags.length">
                        <b v-for="(item,j) in tags" :class="item.ischeck?'blue':''" @click="addtag(item)" :key="j">{{item.tag}}</b>
                    </span>
                    <Input v-if="showadd" class="labval" v-model="labelval" @on-blur='hideIpt' />
                    <img v-else src="../images/add.png" @click="showadd=true" class="addicon">
                </div>
                <div class="footbtn">
                    <Button @click="publish">发布</Button>
                    <Button @click="savedata">保存</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../assets/lib/config';
import E from 'wangeditor';

export default {
    data() {
        return {
            id:'',
            tilename:'添加文章',
            title:'',
            overview:'',
            createTime:'',
            editor:null,
            text:'',
            audsid:[],
            audiences:[],
            tagid:[],
            tags:[],
            showadd:false,
            labelval:''
        };
    },
    components: {

    },
    watch: {

    },
    computed: {

    },
    created() {
        this.createTime = new Date().getFullYear()+'.'+(new Date().getMonth()+1)+'.'+new Date().getDate()+' '+new Date().getHours()+":"+new Date().getMinutes();
        const params = this.$route.query;
        if(params.type==2){
            this.id=params.id;
            this.tilename = '编辑文章'
        }else{
            this.tilename = '添加文章'
        }
    },
    mounted() {
        this.initeditor();
        this.getlist();
        if(this.id){
            setTimeout(()=>{
                this.getData();
            },200)
        };
    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        goBack(){
            this.$router.push({
                path:'/admin/rescoretool'
            });
        },
        getlist(){
            this.$https.getTags({}).then(res=>{
                if(res&&res.code==200){
                    res.data.audiences.forEach(v=>{
                        v.ischeck = false;
                        this.audsid.forEach(itm=>{
                            if(itm==v.id){
                                v.ischeck = true;
                            }
                        })
                    });
                    res.data.tags.forEach(v=>{
                        v.ischeck = false;
                        this.tagid.forEach(itm=>{
                            if(itm==v.id){
                                v.ischeck = true;
                            }
                        });
                    });
                    this.audiences = res.data.audiences;
                    this.tags = res.data.tags;
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        addtag(data){
            const arr = this.tags;
            arr.forEach(v=>{
                if(v.id==data.id){
                    v.ischeck = !v.ischeck;
                };
            });
            this.tags = arr;
        },
        addadus(data){
            const arr = this.audiences;
            arr.forEach(v=>{
                if(v.id==data.id){
                    v.ischeck = !v.ischeck;
                };
            });
            this.audiences = arr;
        },
        getData(){
            this.$https.lookrescore({
                id:this.id
            }).then(res=>{
                if(res&&res.code==200){
                    this.title = res.data.title;
                    this.overview = res.data.overview;
                    this.createTime = res.data.createTime;
                    this.editor.txt.html(res.data.text);
                    const arr1 = this.audiences;
                    const arr2 = this.tags;
                    arr1.forEach(v=>{
                        res.data.audiences.forEach(item=>{
                            if(v.tag==item){
                                v.ischeck = true;
                            };
                        });
                    });
                    arr2.forEach(v=>{
                        res.data.tags.forEach(item=>{
                            if(v.tag==item){
                                v.ischeck = true;
                            };
                        });
                    });
                }else{
                    this.$Message.error('获取信息失败！');
                }
            })
        },
        //保存选择的id
        checkId(){
            const arr1 = this.audiences;
            let audsid = [];
            arr1.forEach(v=>{
                if(v.ischeck){
                    audsid.push(v.id);
                };
            });
            this.audsid = audsid;
            const arr2 = this.tags;
            let tagid = [];
            arr2.forEach(v=>{
                if(v.ischeck){
                    tagid.push(v.id);
                };
            });
            this.tagid = tagid;
        },
        publish(){
            this.checkId();
            if(this.tilename=='编辑文章'){
                this.$https.editrescore({
                    id:this.id,
                    title:this.title,
                    overview:this.overview,
                    text:this.text,
                    audiences:this.audsid,
                    tags:this.tagid,
                    status:1
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$router.go(-1);
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }else{
                this.$https.addrescore({
                    title:this.title,
                    overview:this.overview,
                    text:this.text,
                    audiences:this.audsid,
                    tags:this.tagid,
                    status:1
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$router.go(-1);
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        savedata(){
            this.checkId();
            if(this.tilename=='编辑文章'){
                this.$https.editrescore({
                    id:this.id,
                    title:this.title,
                    overview:this.overview,
                    text:this.text,
                    audiences:this.audsid,
                    tags:this.tagid,
                    status:0
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$router.go(-1);
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }else{
                this.$https.addrescore({
                    title:this.title,
                    overview:this.overview,
                    text:this.text,
                    audiences:this.audsid,
                    tags:this.tagid,
                    status:0
                }).then(res=>{
                    if(res&&res.code==200){
                        this.$Message.success('操作成功！');
                        this.$router.go(-1);
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            }
        },
        hideIpt(){
            this.checkId();
            if(this.labelval){
                this.showadd = false;
                this.$https.addTags({
                    type:'tag',
                    tag:this.labelval
                }).then(res=>{
                    if(res&&res.code==200){
                        this.labelval = '';
                        this.getlist();
                    }else{
                        this.$Message.error(res.msg);
                    }
                })
            };
        },
        initeditor(html){
            const _this = this;
            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容
            this.editor.customConfig.onchange = html => {
                this.text = html;
            };
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'image', // 插入图片
                // 'emoticon', // 表情
                // 'table', // 表格
                // 'code', // 插入代码
                // 'undo', // 撤销
                // 'redo' // 重复
            ];
            this.editor.customConfig.uploadImgParams={
                'type':'article'
            };
            this.editor.customConfig.uploadImgHeaders = {
                'token': sessionStorage.getItem('token')
            };
            this.editor.customConfig.uploadImgServer = config.http_url+'/upload_photo';
            this.editor.customConfig.showLinkImg = false;//隐藏网络图片
            this.editor.customConfig.uploadFileName = 'file';
            this.editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                    // }
                },
                success: function (xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    // console.log(result)
                    _this.editor.txt.append('<img style="max-width:100%;" src="'+result.data[0]+'"/>');
                    _this.text = _this.editor.txt.editor.$textElem[0].innerHTML;
                    // console.log(_this.text);
                },
                fail: function (xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error: function (xhr, editor) {
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout: function (xhr, editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function (insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    // console.log(result)
                    var url = result.data[0]
                    //insertImg(url)
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };
            this.editor.create(); // 创建富文本实例
        }
    }
};
</script>

<style lang='scss'>
#AddRestool{
    .wrapbox{
        box-shadow:0px 1px 3px 0px rgba(0,0,0,0.04);
        border-radius:4px;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #EAEDF3;
        .headtip {
            height: 64px;
            line-height: 64px;
            font-size:18px;
            padding-left: 25px;
            border-bottom: 1px solid #EAEDF3;
            .ivu-icon{
                font-size: 22px;
                vertical-align: middle;
                margin-right: 10px;
                cursor: pointer;
            }
        }
        .contBox {
            position: relative;
            padding: 30px 116px;
            .timebox{
                position: absolute;
                right: 120px;
                top: 275px;
                color: #9EA0A5;
            }
            .tileipt{
                input,.ivu-input-icon{
                    height: 50px;
                    line-height: 50px;
                }
            }
            .textareaval{
                margin-top: 20px;
                textarea{
                    height: 150px;
                    resize: none;
                }
            }
            .editorbox{
                margin-top: 20px;
                .w-e-toolbar{
                    border: 0!important;
                    background-color: #fff!important;
                    padding: 0;
                    .w-e-menu{
                        padding: 5px 0;
                        margin-right: 15px;
                        i{
                            color: #6B6C6F;
                            &:hover{
                                color: #1665D8;
                            }
                        }
                    }
                }
                .w-e-text-container{
                    border: 1px solid #E3E5ED!important;
                    height: 512px!important;
                    box-shadow:0px 1px 2px 0px rgba(102,113,123,0.21);
                    border-radius:4px;
                }
                .w-e-text{
                    overflow-y: auto!important;
                }
            }
            .itemrow{
                margin-top: 20px;
                overflow: hidden;
                .tiplab{
                    float: left;
                    font-size: 16px;
                    width: 50px;
                    line-height: 30px;
                }
                .labelbox{
                    float: left;
                    max-width: 90%;
                    b{
                        cursor: pointer;
                        display: inline-block;
                        font-size: 12px;
                        font-weight: normal;
                        line-height: 30px;
                        padding: 2px 12px;
                        color: #1665D8;
                        border:1px solid #D1E1F7;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        border-radius: 2px;
                    }
                    .blue{
                        background-color: #ECF2FC;
                        border:1px solid #ECF2FC;
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
            .footbtn{
                margin-top: 20px;
                button{
                    width: 100px;
                    height: 38px;
                    margin-right: 20px;
                    color: #fff;
                    &:first-of-type{
                        background-color: #1665D8;
                    }
                    &:last-of-type{
                        background-color: #6B6C6F;
                    }
                }
            }
        }
    }
}
</style>
