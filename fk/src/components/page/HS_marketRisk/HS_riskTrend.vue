<template>
    <div class="container" >
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,i) in todayEventList" :key="i">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div :class="'grid-content grid-con-'+i">
                        <div class="grid-con-default grid-con-icon">{{item.count}}</div>
                        <div class="grid-cont-right">
                            <div class="grid-num">{{item.percent}}</div>
                            <div>{{item.title}}</div>
                        </div>                        
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-row>
              <el-col :span="2">
                <div class="container-text">统计时间</div>
              </el-col>
              <el-col :span="9">
                <el-date-picker
                    v-model="time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp">
                </el-date-picker>
              </el-col>
              <el-col :span="8" >
                <el-button-group >
                    <el-button type="primary" icon="delete" @click="setTime(0,0)">今天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(1,1)">昨天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(7,0)">最近七天</el-button>
                    <el-button type="primary" icon="delete" @click="setTime(30,0)">最近三十天</el-button>
                </el-button-group>
              </el-col>
              <el-col :span="3">
                <el-select v-model="select_cate" placeholder="事件类型" class="handle-select mr10">
                    <template v-for="(val, key, index) in comboBox" >
                       <el-option :key= "index"  :label="val" :value="key">
                       </el-option>
                    </template>
                </el-select> 
              </el-col>
              <el-col :span="2" style="padding-left:10px">
                <el-button type="primary" icon="delete" @click="handleSearch">搜索</el-button>
              </el-col>
            </el-row>
            <el-row class="table">
                <el-col :span="10">
                 风险事件统计
                   <el-tag>{{getMyDate(time[0])}}</el-tag>  
                   -
                   <el-tag>{{getMyDate(time[1])}}</el-tag> 
                   
                </el-col>
                <!-- <el-col :span="2">
                    <el-button >导出数据</el-button>          
                </el-col> -->
                <el-col :span="6" v-if="allEventList.length>0">
                  <el-tag type="success">   {{allEventList[3].title}}:
                    {{allEventList[3].count}}</el-tag>
                </el-col>
                
            </el-row>
            <el-row class="table-data" >
                <el-col :span="16">
                  <el-col :span="24" class="schart">
                    <div >
                      <schart canvasId="pie" width="500" height="400" :data="data2" type="pie" :options="options2"></schart>
                    </div>
                  </el-col>
                </el-col>
                <el-col :span="8" v-if="allEventList.length>0">
                  <el-col :span="24" v-for="(item,i) in allEventList" :key="i">
                    <div >
                      <div :class="'grid-content grid-con-'+i">
                          <el-progress v-if="item.percent !== -1 "   type="circle" :width="80" :percentage="item.percent===-1? 0:item.percent" :color="item.color"></el-progress>
                          <div class="grid-cont-right"  v-if="item.percent !== -1 " >
                              <div class="grid-num">{{item.count}}</div>
                             <div>{{item.title}}</div>
                          </div>                        
                      </div>
                    </div>
                  </el-col>
                </el-col>                
            </el-row>
        </el-row>

    </div>
</template>

<script>
import Schart from "vue-schart";
import {
  httpGetSummary,
  httpGetComboBox,
  httpGetSummaryBydateandType
} from "@/api/http";

export default {
  components: {
    Schart
  },
  data() {
    return {
      todayEventList: [],
      allEventList: [],
      comboBox: [],
      time: [],
      crossTime: [
        this.getMyDate(new Date()),
        this.getMyDate(new Date(new Date().getTime() + 86400000))
      ],
      showTime: [],
      select_cate: "",
      options2: {
        title: "风险事件统计",
        bgColor: "#ddd",
        titleColor: "#000",
        legendColor: "#000"
      },
      data2: []
    };
  },
  watch: {
    time(curVal, oldVal) {
      this.crossTime = [
        this.getMyDate(new Date(curVal[0])),
        this.getMyDate(new Date(curVal[1] + 86400000))
      ];
    }
  },
  methods: {
    setTime(a, b) {
      return (this.time = [
        new Date(
          new Date(new Date().setDate(new Date().getDate() - a)).setHours(
            0,
            0,
            0,
            0
          )
        ).getTime(),
        new Date(
          new Date(new Date().setDate(new Date().getDate() - b)).setHours(
            0,
            0,
            0,
            0
          )
        ).getTime()
      ]);
    },
    //转成2017-01-01
    getMyDate(str) {
      var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + "-" + this.getzf(oMonth) + "-" + this.getzf(oDay); //最后拼接时间
      return oTime;
    },
    //补0操作
    getzf(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    //计算百分比
    toPercent(a, b) {
      return (
        String(
          Number(Number(a) / Number(b) * 100).toFixed(2) === "NaN"
            ? "0.00"
            : Number(Number(a) / Number(b) * 100).toFixed(2)
        ) + "%"
      );
    },
    toPercentT(a, b) {
      let num =
        Number(Number(a) / Number(b) * 100).toFixed(2) === "NaN"
          ? 0
          : Number(Number(a) / Number(b) * 100).toFixed(2);
      return Number(num);
    },
    getSummary() {
      let _this = this;
      httpGetSummary()
        .then(response => {
          let data = response.data;
          _this.todayEventList = [
            {
              title: "今日拒绝事件",
              count: data.affair_refuse,
              percent: _this.toPercent(data.affair_refuse, data.affair_allnume),
              color: "#ff6c5c"
            },
            {
              title: "今日人工审核事件",
              count: data.affair_artif,
              percent: _this.toPercent(data.affair_artif, data.affair_allnume),
              color: "#f8d436"
            },
            {
              title: "今日通过事件",
              count: data.affair_through,
              percent: _this.toPercent(
                data.affair_through,
                data.affair_allnume
              ),
              color: "#a7db65"
            },
            {
              title: "今日事件总数",
              count: data.affair_allnume,
              color: "#7a8c99"
            }
          ];
        })
        .catch();
    },
    //得到下拉框
    getComboBox() {
      let _this = this;
      httpGetComboBox()
        .then(res => {
          let data = res.data;
          _this.comboBox = data;
        })
        .catch();
    },
    //点击搜索
    handleSearch() {
      let _this = this;
      let type = 1;
      this.select_cate ? (type = Number(this.select_cate)) : (type = 1);

      httpGetSummaryBydateandType(...this.crossTime, type)
        .then(res => {
          let data = res.data;

          this.data2 = [
            { name: "直接通过事件", value: data.affair_through },
            { name: "拒绝事件", value: data.affair_refuse },
            { name: "人工审核事件", value: data.affair_artif }
          ];
          _this.allEventList = [
            {
              title: "拒绝事件",
              count: data.affair_refuse,
              percent: _this.toPercentT(
                data.affair_refuse,
                data.affair_allnume
              ),
              color: "#ff6c5c"
            },
            {
              title: "人工审核事件",
              count: data.affair_artif,
              percent: _this.toPercentT(data.affair_artif, data.affair_allnume),
              color: "#f8d436"
            },
            {
              title: "直接通过事件",
              count: data.affair_through,
              percent: _this.toPercentT(
                data.affair_through,
                data.affair_allnume
              ),
              color: "#a7db65"
            },
            {
              title: "事件总数",
              percent: -1,
              count: data.affair_allnume,
              color: "#7a8c99"
            }
          ];
        })
        .catch();
    }
  },
  mounted: function() {
    this.setTime(0, 0);
    this.getSummary();
    this.getComboBox();
    this.handleSearch();
  }
};
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
  font-weight: bold;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.grid-con-default {
  flex: 1;
  text-align: center;
  font-size: 26px;
  line-height: 100px;
  color: #fff;
}
.grid-con-0 .grid-con-icon {
  background: #ff6c5c;
}

.grid-con-0 .grid-num {
  color: #ff6c5c;
}
.grid-con-1 .grid-con-icon {
  background: #f8d436;
}

.grid-con-1 .grid-num {
  color: #f8d436;
}
.grid-con-2 .grid-con-icon {
  background: #a7db65;
}

.grid-con-2 .grid-num {
  color: #a7db65;
}
.grid-con-3 .grid-con-icon {
  background: #7a8c99;
}

.grid-con-3 .grid-num {
  color: #7a8c99;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.container {
  overflow: hidden;
}
.container-text {
  line-height: 32px;
  font-size: 14px;
  color: #7a8c99;
}
.table {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  line-height: 32px;
  font-size: 14px;
  color: #7a8c99;
}
.table-data {
  padding: 20px;
}
.schart {
  width: 600px;
  display: inline-block;
}
</style>

