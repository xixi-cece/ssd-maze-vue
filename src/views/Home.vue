<template>
  <div id="Home">
    <div class="formBox">
      <ul class="totalBox">
        <li
          class="cItm"
          v-for="(item, j) in numlist"
          :key="j"
          @click="goLink(item)"
        >
          <Icon class="iconPic" :custom="item.icon" />
          <span>{{ item.txt }}</span>
          <b>{{ item.num }}</b>
        </li>
      </ul>
      <ul class="topBox">
        <li class="Item">
          <span class="iconspan">
            <Icon class="iconPic" custom="iconfont icondangyuediqudanshu" />
          </span>
          <span class="txtbox">
            <span class="tile">当月{{ areaName }}签约单数</span>
            <b class="numBox">{{ areaSignedCount }}</b>
          </span>
        </li>
        <li class="Item">
          <span class="iconspan">
            <Icon class="iconPic" custom="iconfont icondangyuequanbudanshu" />
          </span>
          <span class="txtbox">
            <span class="tile">当月全国签约单数</span>
            <b class="numBox">{{ allAreaSignedCount }}</b>
          </span>
        </li>
        <li class="Item">
          <span class="iconspan">
            <Icon class="iconPic" custom="iconfont icondangyuediquqianyuee" />
          </span>
          <span class="txtbox">
            <span class="tile">当月{{ areaName }}签约额</span>
            <b class="numBox">{{ areaSignedAmount }}</b>
          </span>
        </li>
        <li class="Item">
          <span class="iconspan">
            <Icon class="iconPic" custom="iconfont icondangyuequanbuqianyuee" />
          </span>
          <span class="txtbox">
            <span class="tile">当月全国签约额</span>
            <b class="numBox">{{ allAreaSignedAmount }}</b>
          </span>
        </li>
      </ul>
      <div class="echartBox">
        <chart
          class="echartDv"
          :options="optionObj"
          :auto-resize="true"
        ></chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AreaSelect from "../components/AreaSelect";

export default {
  name: "home",
  data() {
    return {
      areaName: "", //当前账号地区
      inputVal: "",
      inputDat: "",
      showGdd: false,
      showArea: false,
      // numlist:[
      //   {
      //     icon:'iconfont icondaichulixinkehu',
      //     path:"/sales/Waitclient",
      //     num:0,
      //     txt:'待处理新客户'
      //   },
      //   {
      //     icon:'iconfont iconzhengzaigouda1',
      //     path:"/sales/Talking",
      //     num:0,
      //     txt:'正在勾搭'
      //   },
      //   {
      //     icon:'iconfont iconyifawenjuan',
      //     path:"/sales/SendQues",
      //     num:0,
      //     txt:'已发问卷'
      //   },
      //   {
      //     icon:'iconfont iconyifahetong1',
      //     path:"/sales/SendBook",
      //     num:0,
      //     txt:'已发合同'
      //   },
      //   {
      //     icon:'iconfont iconfukuanwancheng1',
      //     path:"/sales/Payclient",
      //     num:0,
      //     txt:'付款完成'
      //   }
      // ],
      // list:[
      //   {
      //     name:'当月签单数',
      //     num:'0',
      //     icon:'iconfont icondangyueqianyuedanshu1'
      //   },
      //   {
      //     name:'当月签约率',
      //     num:'0',
      //     icon:'iconfont icondangyueqianyueshuai1'
      //   },
      //   {
      //     name:'当月签约额',
      //     num:'0',
      //     icon:'iconfont icondangyueqianyuee1'
      //   },
      //   {
      //     name:'当月地区签约总额',
      //     num:'0',
      //     icon:'iconfont icondangyuediquqianyuezonge'
      //   }
      // ],
      numlist: [
        {
          icon: "iconfont icondaichulixinkehu",
          path: "/sales/Waitclient",
          num: 0,
          txt: "待处理新客户",
        },
        {
          icon: "iconfont iconzhengzaigouda1",
          path: "/sales/Talking",
          num: 0,
          txt: "正在勾搭",
        },
        {
          icon: "iconfont icondangyueyiqianyue",
          num: 0,
          txt: "当月已签约",
        },
        {
          icon: "iconfont icondangyueqianyuee11",
          num: 0,
          txt: "当月签约额",
        },
        {
          icon: "iconfont icondangyueleijiqianyueshuai",
          num: 0,
          txt: "累计签约率",
        },
      ],
      areaSignedCount: 0,
      allAreaSignedCount: 0,
      areaSignedAmount: 0,
      allAreaSignedAmount: 0,
      optionObj: {}, //图表数据
    };
  },
  computed: {
    // ...mapState(['listInfo'])
  },
  watch: {
    // listInfo:{
    //   handler(now,old){
    //     try{
    //       this.userData = now.recentlist;
    //       const arr = this.list;
    //       arr[1].num = now.newbielist.length;
    //       arr[2].num = now.ongoinglist.length;
    //       arr[3].num = now.rate+'%';
    //       this.list = arr;
    //     }catch(e){console.log(e)}
    //   },
    //   immediate:true,
    //   deep:true
    // }
  },
  methods: {
    goLink(data) {
      if (!data.path) return;
      this.$router.push({
        path: data.path,
        query: {},
      });
    },
    getdatanum() {
      this.$https.datanumbox({}).then((res) => {
        console.log(res);
        if (res && res.code == 200) {
          this.numlist[0].num = res.data.pendingCount;
          this.numlist[1].num = res.data.ongoingCount;
          this.numlist[2].num = res.data.signedCount;
          this.numlist[3].num = res.data.signedAmount;
          this.numlist[4].num = res.data.signedRate;
          this.areaSignedCount = res.data.areaSignedCount;
          this.allAreaSignedCount = res.data.allAreaSignedCount;
          this.areaSignedAmount = res.data.areaSignedAmount;
          this.allAreaSignedAmount = res.data.allAreaSignedAmount;
          const arr = res.data.list;
          let tolarr = [],
            sinarr = [],
            signrote = [];
          arr.forEach((v) => {
            // tolarr.push(v.data.allCount-v.data.signedCount);
            // signrote.push(v.data.signedRate);
            sinarr.push(v.data.signedAmount);
          });
          this.optionObj.series[0].data = sinarr;
          // this.optionObj.series[1].data=tolarr;
          // this.optionObj.series[2].data=sinarr;
        }
      });
    },
  },
  components: {
    AreaSelect,
  },
  mounted() {
    const areatype = sessionStorage.getItem("area");
    let cName = "";
    if (areatype == "bj") {
      cName = "北京";
    } else if (areatype == "sh") {
      cName = "上海";
    } else if (areatype == "hz") {
      cName = "杭州";
    }
    this.areaName = cName;
    this.optionObj = {
      // 标题
      title: {
        text: "成交额（元）",
        left: 80,
        //subtext: "纯属虚构",
        textStyle: {
          color: "#6B6C6F",
          fontSize: 14,
          fontWeight: "normal",
        },
      },
      legend: {
        align: "left",
        // left:'5%',
        itemWidth: 8,
        itemHeight: 8,
        borderRadius: 0,
        data: [
          // {
          //   name:'总单',
          //   textStyle:{
          //     color:'#333',
          //     borderRadius:0
          //   }
          // },
          {
            name: "月成交金额（¥）",
            textStyle: {
              color: "#8C8C8C",
              borderRadius: 0,
            },
          },
        ],
      },
      //控制图例的颜色
      // color:['#F7B74E','#397CDE','#34AA44'],
      color: ["#64B0D5"],
      // 工具提示
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        show: true,
        formatter: function (params, ticket, callback) {
          // console.log(params);
          var showHtm = "";
          var monthval = params[0].axisValue;
          for (var i = 0; i < params.length; i++) {
            var name = params[i].seriesName;
            var value = params[i].value;
            // if(params[i].seriesName=='签约率'){
            //   if(params[0].value+params[1].value>0){
            //     value = Math.round(params[0].value/(params[0].value+params[1].value)*100)+'%'
            //   }else{
            //     value = '0%';
            //   };
            // };
            if (params[i].seriesName == "总单") {
              value = params[0].value + params[1].value;
            }
            showHtm += name + " " + value + "<br/>";
          }
          return monthval + "<br/>" + showHtm;
        },
      },
      //右上角操作提示
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      /*控制图例的位置*/
      // grid: {
      //   top: '0',
      //   left: '0',
      //   right: '0',
      //   bottom: '-11%',
      //   containLabel: true
      // },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          //控制网格线是否显示
          splitLine: {
            show: false,
            //改变轴线颜色
            lineStyle: {
              //使用深浅的间隔色
              color: ["red"],
            },
          },
          // x轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#333",
              fontSize: "12",
            },
          },
          //x轴的颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#000",
              width: 1, //这里是坐标轴的宽度,可以去掉
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          //控制网格线是否显示
          splitLine: {
            show: true,
            //改变轴线颜色
            lineStyle: {
              //使用深浅的间隔色
              color: ["#eee"],
            },
          },
          // y轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#333",
              fontSize: "12",
            },
          },
          //y轴的颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#fff",
              width: 1, //这里是坐标轴的宽度,可以去掉
            },
          },
        },
        // {
        //   type: 'value',
        //   name: '签约率',
        //   //控制网格线是否显示
        //   splitLine: {
        //     show: true,
        //     //改变轴线颜色
        //     lineStyle: {
        //       //使用深浅的间隔色
        //       color: ['#eee']
        //     }
        //   },
        //   // y轴的字体样式
        //   axisLabel: {
        //     show: true,
        //     textStyle: {
        //       color: '#333',
        //       fontSize:'12'
        //     }
        //   },
        //   //y轴的颜色和宽度
        //   axisLine: {
        //     lineStyle:{
        //       color:'#fff',
        //     }
        //   }
        // }
      ],
      series: [
        {
          name: "月成交金额(￥)",
          type: "bar",
          stack: "num", //控制是否堆叠
          barWidth: "50%",
          data: [],
          // markPoint: {
          //     data: [
          //         {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
          //         {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
          //     ]
          // },
          // markLine: {
          //     data: [
          //       {type: 'average', name: '平均值'}
          //     ]
          // }
        },
        // {
        //   name: '总单',
        //   type: 'bar',
        //   barWidth: '50%',
        //   data:[],
        //   stack:'num',//控制是否堆叠
        //   // markPoint: {
        //   //     data: [
        //   //         {type: 'max', name: '最大值'},
        //   //         {type: 'min', name: '最小值'}
        //   //     ]
        //   // },
        //   // markLine: {
        //   //     data: [
        //   //         {type: 'average', name: '平均值'}
        //   //     ]
        //   // }
        // },
        // {
        //   name: '签约率',
        //   type: 'line',
        //   // stack:'num',//控制是否堆叠
        //   data: [],
        //   symbolSize:10
        // }
      ],
    };
    this.getdatanum();
  },
};
</script>

<style lang="scss">
#Home {
  .formBox {
    .totalBox {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      margin-bottom: 30px;
      .cItm {
        flex: 1;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 8px;
        border: 1px solid #eaedf3;
        background-color: #fff;
        margin-right: 37px;
        padding: 16px 40px;
        cursor: pointer;
        i,
        b,
        span {
          display: block;
          text-align: center;
        }
        b {
          font-size: 30px;
          font-weight: normal;
        }
        i {
          font-size: 64px;
          color: #666;
        }
        span {
          font-size: 14px;
          color: #9ea0a5;
          margin: 20px 0 10px;
        }
        &:last-of-type {
          margin-right: 0;
        }
        &:nth-of-type(1) {
          i {
            color: #2871db;
          }
        }
        &:nth-of-type(2) {
          i {
            color: #37ab46;
          }
        }
        &:nth-of-type(3) {
          i {
            color: #695bf3;
          }
        }
        &:nth-of-type(4) {
          i {
            color: #ea644d;
          }
        }
        &:nth-of-type(5) {
          i {
            color: #f6b03b;
          }
        }
      }
    }
    .topBox {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .Item {
        flex: 1;
        background-color: #fff;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
        border-radius: 8px;
        border: 1px solid #eaedf3;
        padding: 20px 20px;
        margin-right: 30px;
        display: flex;
        align-items: center;
        text-align: center;
        white-space: nowrap;
        .iconspan {
          flex: none;
          width: 60px;
        }
        .txtbox {
          text-align: left;
          margin-left: 15px;
        }
        > span {
          flex: 1;
          > .tile {
            font-size: 14px;
            display: block;
            color: #9ea0a5;
            font-weight: 400;
          }
          > .iconPic {
            color: #067794;
            font-size: 64px;
          }
          > .numBox {
            display: inline-block;
            vertical-align: middle;
            width: 50%;
            font-size: 22px;
            color: #313131;
            font-weight: 400;
          }
        }
        &:nth-of-type(1) {
          .iconspan {
            .iconPic {
              color: #f6ab2f;
            }
          }
        }
        &:nth-of-type(2) {
          .iconspan {
            .iconPic {
              color: #34aa44;
            }
          }
        }
        &:nth-of-type(3) {
          .iconspan {
            .iconPic {
              color: #1665d8;
            }
          }
        }
        &:nth-of-type(4) {
          .iconspan {
            .iconPic {
              color: #6758f3;
            }
          }
        }
        // &:nth-of-type(2){
        //   .iconPic{
        //     color: #D70303
        //   }
        // }
        // &:nth-of-type(3){
        //   .iconPic{
        //     color: #00B4FF;
        //   }
        // }
        &:nth-of-type(4) {
          margin-right: 0;
          // .iconPic{
          //   color: #0F9E00;
          // }
        }
      }
    }
    .echartBox {
      padding: 25px 0;
      margin-top: 30px;
      background-color: #fff;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04);
      border-radius: 8px;
      border: 1px solid #eaedf3;
      width: 100%;
      height: 400px;
      > .echartDv {
        width: 100%;
        height: 100%;
      }
    }
    .tableBox {
      background-color: #fff;
      box-shadow: 0px 0px 10px 0px #e1e0e0;
      border-radius: 4px;
      padding: 25px;
      margin-top: 20px;
      .tile {
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 400;
        color: #313131;
      }
      .ivu-table th {
        font-weight: normal;
        color: #b0b0b0;
        background-color: #fff;
      }
      .ivu-table td {
        font-size: 16px;
      }
    }
  }
}
</style>