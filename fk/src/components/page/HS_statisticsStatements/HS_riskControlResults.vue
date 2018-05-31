<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <el-button  icon="el-icon-plus" @click="export2Excel()">导出excel</el-button>
            </el-col>
            <el-col :span="18" >
                <el-row>
                    <el-col :span="12">
                       <el-date-picker
                           v-model="time"
                              type="daterange"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           value-format="timestamp">
                       </el-date-picker>   
                    </el-col>
                    <el-col :span="12" >
                        <el-row>
                            <el-col :span="20">
                                <el-input v-model="select_phone" placeholder="请输入手机号搜索" ></el-input>
                            </el-col>
                            <el-col :span="4">
                                 <el-button type="primary" icon="search" @click="handleSearch">搜索</el-button> 
                            </el-col>    
                        </el-row>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="序号"
                     width="100">
                </el-table-column>
                 <el-table-column
                    prop="realname"
                    label="姓名"
                    width="100">
                 </el-table-column>
                <el-table-column
                    prop="idCard"
                    width="180"
                    label="身份证">
                </el-table-column>
                <el-table-column
                    prop="phonenume"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    label="时间" width="200">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>
                    </template>                      
                </el-table-column> 
                <el-table-column
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag style="margin-left: 10px" :type="scope.row.status ===1?'success':''">{{ scope.row.status ===1?'完成':'进行中' }}</el-tag>
                    </template>   
                </el-table-column>
                <el-table-column
                    label="结果">
                   <template slot-scope="scope">
                        <el-button
                         size="mini"
                         :type="scope.row.result ===1?'success':(scope.row.result ===2?'primary':'danger') "
                         :disabled="scope.row.result ===1"
                         @click="handleShow(scope.$index, scope.row)">{{ scope.row.result ===1?'通过':(scope.row.result ===2?'人工':'拒接') }}</el-button>
                    </template>                      
                </el-table-column>                                                                   
            </el-table>
        </el-row>
        <el-row style="margin-top:20px" v-if="allpage>0">
            <el-col :offset="6">
                <el-pagination
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  :page-size="pageSize"
                  :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"

                  background
                  layout="sizes,prev, pager, next"
                  :total="allpage">
                </el-pagination>   
            </el-col>
        </el-row> 
        <!-- 报告弹窗 -->
        <el-dialog  :visible.sync="showVisiable" width="25%" title="结果详情">
            <el-row>
              <el-col :span="12" :offset="2">
                <el-tag>执行器编号</el-tag>
              </el-col>
              <el-col :span="6">
                  <el-tag type="info">{{getriskpoint.executeName}}</el-tag>
              </el-col>              
              
            

            </el-row>   
            <el-row style="margin-top:20px">
              <el-col :span="12" :offset="2">
                <el-tag>执行器名称</el-tag>
              </el-col>
              <el-col :span="6">
                  <el-tag type="warning">{{getriskpoint.executeNameCn}}</el-tag>
              </el-col>    
            </el-row>       
        </el-dialog>         
    </div>
</template>

<script>
import { httpGetCreditResultByuser, httpGetRiskpoint } from "@/api/http";
export default {
  data() {
    return {
      time: "",
      tableData: [],
      select_phone: "",
      currentPage: 1,
      pageSize: 10,
      allpage: 0,
      currentTime1: "",
      currentTime2: "",
      showVisiable: false,
      getriskpoint: {}
    };
  },
  methods: {
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
    export2Excel() {
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("../../../vendor/Export2Excel");
        const tHeader = [
          "序号",
          "姓名",
          "身份证",
          "手机号",
          "时间",
          "状态",
          "结果"
        ];
        const filterVal = [
          "id",
          "realname",
          "idCard",
          "phonenume",
          "applytime",
          "status",
          "result"
        ];
        let list = JSON.parse(JSON.stringify(this.tableData));

        for (var i = 0; i < list.length; i++) {
          console.log(list[i].status);
          list[i].status = list[i].status === 1 ? "完成" : "进行中";
          list[i].result =
            list[i].result === 1
              ? "通过"
              : list[i].result === 2 ? "人工" : "拒接";
          list[i].applytime = this.getMyDate(list[i].applytime);

          // for(var j in list[i]){
          //     list[i]
          //     console.log(list[i][j])
          // }
        }
        console.log(list);
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "列表excel");
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getCreditResultByuser(npage, pagesize, phoneNume, begain, end) {
      let _this = this;
      httpGetCreditResultByuser(npage, pagesize, phoneNume, begain, end)
        .then(res => {
          let data = res.data;
          _this.allpage = data.allpage * pagesize;
          _this.tableData = data.list;
        })
        .catch();
    },
    handleShow(index, row) {
      this.showVisiable = true;
      let id = row.id;
      let _this = this;
      httpGetRiskpoint(id)
        .then(res => {
          let data = res.data;
          this.getriskpoint = data;
        })
        .catch();
    },
    handleSearch() {
      this.currentPage = 1;
      if (!this.time) {
        this.getCreditResultByuser(
          this.currentPage,
          this.pageSize,
          this.select_phone
        );
      } else {
        this.currentTime1 = this.getMyDate(this.time[0]);
        this.currentTime2 = this.getMyDate(this.time[1]);
        this.getCreditResultByuser(
          this.currentPage,
          this.pageSize,
          this.select_phone,
          this.currentTime1,
          this.currentTime2
        );
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCreditResultByuser(
        val,
        this.pageSize,
        this.select_phone,
        this.currentTime1,
        this.currentTime2
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCreditResultByuser(
        this.currentPage,
        this.pageSize,
        this.select_phone,
        this.currentTime1,
        this.currentTime2
      );
    }
  },
  mounted() {
    this.getCreditResultByuser(this.currentPage, this.pageSize);
  }
};
</script>

<style scoped>
</style>

