<template>
    <div id="keywordHis">
        <testlist :username='username'></testlist>
    </div>
</template>

<script>
import Testlist from '@/components/Testlist';
import Testcore from '@/components/Testcore';

export default {
    name:'keywordHis',
    data() {
        return {
            username:''
        };
    },
    components: {
        Testlist
    },
    watch: {

    },
    computed: {

    },
    created() {
        this.username = sessionStorage.getItem('username');
    },
    mounted() {

    },
    activated() {//该钩子在进入当前路由时执行

    },
    deactivated (){//该钩子在离开当前路由时执行

    },
    methods: {
        
    }
};
</script>

<style lang='scss'>
#keywordHis{
    .lfItem{
        flex: 1;
        margin-right: 20px;
    }
    .rtItem{
        width: 35%;
    }
    .item{
        border-radius: 5px;
        .ivu-collapse-header{
            height: 50px;
            line-height: 50px;
            padding-left: 0;
            border-bottom: 1px solid #F3F5F8;
        }
        .ivu-collapse{
            border: none;
            .ivu-collapse-item{
                border-top: none;
            }
        }
        .ivu-icon-ios-arrow-forward{
            float: right;
            vertical-align: middle;color: #1665D8;
            font-weight: normal;
            margin-top: 9px;
            background-color: #F5F6FA;
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            border-radius: 50%;
        }
        .ivu-collapse-content{
            padding: 0;
        }
        .pantile{
            .bigtile{
                font-size: 18px;
                font-weight: 600;
                margin-left: 25px;
                color: #3E3F42;
                .bluetig{
                    background-color: #F5F6FA;
                    color:#1665D8;
                    padding: 4px 8px;
                    font-size: 12px;
                    font-weight: normal;
                    margin-left: 10px;
                    border-radius: 4px;
                }
            }
            .rtIcon{
                display: inline-block;
                line-height: normal;
            }
            .editIcon{
                width: 28px;
                height: 28px;
                margin-right: 20px;
                margin-top: 10px;
            }
        }
        .concatInfo{
            padding: 15px 20px 0;
            background-color: #fff;
        }
        .InfoBox{
            padding: 0 25px;
        }
        .labtile{
            color: #1665D8;
            font-weight: normal;
            font-size: 14px;
            margin-top: 20px;
        }
        .line{
            height: 1px;
            width: 100%;
            background-color: #F3F5F8;
            margin-top: 20px;
        }
        .labBox{
            display: flex;
            flex-flow: wrap;
            margin-top: 15px;
            >li{
                flex: 1;
                box-sizing: border-box;
                .tip{
                    color: #9EA0A5;
                    font-weight: normal;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                .labval{
                    font-weight: normal;
                    color: #666;
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
    }
    //问卷
    .wjBox{
        padding: 15px 25px 0;
        .iptBox{
            display: flex;
            .copybtn{
                display: inline-block;
                vertical-align: middle;
                border: 1px solid #ddd;
                background-color: #fff;
                padding: 0 12px;
                border-radius: 4px;
                cursor: pointer;
                margin-left: 10px;
            }
        }
    }
    //支付详情列表
    .payBox{
        .ivu-table th{
            background-color: #fff;
            font-size: 14px;
            font-weight: normal;
            color: #9EA0A5;
        }
        .ivu-table td{
            border: none;
            height: 30px;
        }
        .ivu-table:before{
            display: none;
        }
        .ivu-table-body{
            margin-top: 15px;
        }
        .greenstu{
            color:#34AA44;
            background-color: #E3E5ED;
            padding: 5px 8px;
            font-size: 12px;
            border-radius: 4px;
        }
        .orangestu{
            color:#F6AB2F;
            background-color: #E3E5ED;
            padding: 5px 8px;
            font-size: 12px;
            border-radius: 4px;
        }
    }
    //其它
    .optionmenu{
        position: relative;
        width: 100%;
        .selmenu{
            display: inline-block;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid #E4E6ED;
            margin-right: 20px;
            >span{
                display: inline-block;
                width:80px;
                height:38px;
                cursor: pointer;
                background-color: #fff;
                text-align: center;
                line-height: 38px;
                border-right: 1px solid #E4E6ED;
                &:last-of-type{
                    border: none;
                }
                &.active{
                    background-color: #3E3F42;
                    color: #fff;
                }
            }
            .ivu-select{
                vertical-align: middle;
                margin-top: -3px;
                border-left: 1px solid #E4E6ED;
            }
            .ivu-select-selection{
                border:none;
                border-radius: 0;
                height:38px;
                .ivu-select-placeholder,.ivu-select-selected-value{
                    height: 38px;
                    line-height: 38px;
                }
            }
        }
        >button{
            position: absolute;
            right: 0;
            top: 0;
            background-color: #3E3F42;
            border-color: #3E3F42;
            box-shadow: none;
        }
        .menubox{
            position: absolute;
            right: 0;
            top: 0;
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
    .cardBox{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 20px;
        .carditem{
            flex: 20%;
            border-radius:4px;
            overflow: hidden;
            margin-right: 20px;
            margin-bottom: 20px;
            border: 1px solid #EAEDF3;
            background-color: #fff;
            &:nth-of-type(4n){
                margin-right: 0;
            }
            .hedbox{
                border-top: 6px solid #1BBBBB;
                border-bottom: 1px dashed #E3E5ED;
                font-weight: normal;
                position: relative;
                height: 53px;
                line-height: 47px;
                >span{
                    font-size: 22px;
                    margin-left: 24px;
                    color: #1BBBBB;
                }
                .stubtn{
                    font-size: 12px;
                    background-color: #fff;
                    color: #1BBBBB;
                    background-color: rgba(27,187,187,.2);
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 56px;
                    height: 28px;
                    text-align: center;
                    line-height: 28px;
                    border-radius: 2px;
                    right: 20px;
                }
                .numbtn{
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    color: #1BBBBB;
                    font-size:22px;
                }
            }
            .centerBox{
                padding: 10px 24px;
                min-height: 185px;
                border-bottom: 1px dashed #E3E5ED;
                >li{
                    &:before{
                        content:'';
                        display: inline-block;
                        background-color: #1BBBBB;
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        vertical-align: middle;
                        margin:-2px 8px 0 0;
                    }
                }
            }
            .optionBox{
                position: relative;
                padding: 0 24px;
                height: 56px;
                line-height: 56px;
                >.timespan{
                    color: #1BBBBB;
                }
                .iconBox{
                    position: absolute;
                    right: 20px;
                    color: #3E3F42;
                    top:50%;
                    transform: translateY(-50%);
                    .ivu-icon{
                        cursor: pointer;
                        font-size: 20px;
                        margin-right: 10px;
                        &:last-of-type{
                            margin-right: 0;
                        }
                    }
                }
            }
            &.cblue{
                .hedbox{
                    border-top: 6px solid #1BBBBB;
                    >span{
                        color: #1BBBBB;
                    }
                    .stubtn{
                        color: #1BBBBB;
                        background-color: rgba(27,187,187,.2);
                    }
                    .numbtn{
                        color: #1BBBBB;
                    }
                }
                .centerBox{
                    >li{
                        &:before{
                            background-color: #1BBBBB;
                        }
                    }
                }
                .optionBox{
                    >.timespan{
                        color: #1BBBBB;
                    }
                }
            }
            &.orange{
                .hedbox{
                    border-top: 6px solid #F6AB2F;
                    >span{
                        color: #F6AB2F;
                    }
                    .stubtn{
                        color: #F6AB2F;
                        background-color: rgba(246,171,47,.2);
                    }
                    .numbtn{
                        color: #F6AB2F;
                    }
                }
                .centerBox{
                    >li{
                        &:before{
                            background-color: #F6AB2F;
                        }
                    }
                }
                .optionBox{
                    >.timespan{
                        color: #F6AB2F;
                    }
                }
            }
            &.green{
                .hedbox{
                    border-top: 6px solid #34AA44;
                    >span{
                        color: #34AA44;
                    }
                    .stubtn{
                        color: #34AA44;
                        background-color: rgba(52,170,68,.2);
                    }
                    .numbtn{
                        color: #34AA44;
                    }
                }
                .centerBox{
                    >li{
                        &:before{
                            background-color: #34AA44;
                        }
                    }
                }
                .optionBox{
                    >.timespan{
                        color: #34AA44;
                    }
                }
            }
            &.blue{
                .hedbox{
                    border-top: 6px solid #1665D8;
                    >span{
                        color: #1665D8;
                    }
                    .stubtn{
                        color: #1665D8;
                        background-color: rgba(22,101,216,.2);
                    }
                    .numbtn{
                        color: #1665D8;
                    }
                }
                .centerBox{
                    >li{
                        &:before{
                            background-color: #1665D8;
                        }
                    }
                }
                .optionBox{
                    >.timespan{
                        color: #1665D8;
                    }
                }
            }
            &.purple{
                .hedbox{
                    border-top: 6px solid #6758F3;
                    >span{
                        color: #6758F3;
                    }
                    .stubtn{
                        color: #6758F3;
                        background-color: rgba(103,88,243,.2);
                    }
                    .numbtn{
                        color: #6758F3;
                    }
                }
                .centerBox{
                    >li{
                        &:before{
                            background-color: #6758F3;
                        }
                    }
                }
                .optionBox{
                    >.timespan{
                        color: #6758F3;
                    }
                }
            }
            &.red{
                .hedbox{
                    border-top: 6px solid #E6492D;
                    >span{
                        color: #E6492D;
                    }
                    .stubtn{
                        color: #E6492D;
                        background-color: rgba(230,73,45,.2);
                    }
                    .numbtn{
                        color: #E6492D;
                    }
                }
                .centerBox{
                    >li{
                        &:before{
                            background-color: #E6492D;
                        }
                    }
                }
                .optionBox{
                    >.timespan{
                        color: #E6492D;
                    }
                }
            }
        }
    }
    .flexCard{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
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
                padding: 0 24px 0 0;
                .tipcolor{
                    width:12px;
                    height:16px;
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: -2px;
                    margin-right: 12px;
                }
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
                .blue{
                    background-color: #1665D8;
                }
                .green{
                    background-color: #34AA44;
                }
                .orange{
                    background-color: #F6AB2F;
                }
            }
            .contbox{
                padding: 24px;
                border-bottom: 1px solid #EAEDF3;
                height: 240px;
                overflow-y: auto;
                .tiptile{
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 5px;
                }
                .labox{
                    margin-bottom: 10px;
                    >span{
                        margin-bottom: 10px;
                        display: inline-block;
                        border-radius:3px;
                        padding: 4px 6px;
                        font-size: 13px;
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
                    >span{
                        cursor: pointer;
                        margin-right: 10px;
                        &:last-of-type{
                            margin-right: 0;
                        }
                    }
                    .ivu-icon{
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>
