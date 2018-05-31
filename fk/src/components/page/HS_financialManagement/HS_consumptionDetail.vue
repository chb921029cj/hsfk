<template>
    <div class="container">
        <el-row>
            <el-button type="primary">账户余额:{{moneyNow}}元</el-button>
        </el-row>
        <el-row style="margin-top:20px">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column
                    sortable
                    prop="applyid"
                    label="序号"
                     width="180">
                </el-table-column>
                <el-table-column
                    prop="creditSysuser.username"
                    label="用户名"
                     width="180">
                </el-table-column>
                <el-table-column
                    prop="creditSysuser.companyname"
                    label="公司名称">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="interfaceCallPrice"
                    label="变动金额">
                </el-table-column>
                <el-table-column
                    prop="interfaceCallName"
                    label="描述">
                </el-table-column>
                <el-table-column
                    sortable
                    label="时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>
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
                    :page-sizes="[1, 2, 3, 4]"
                              
                  background
                  layout="sizes,prev, pager, next"
                  :total="2">
                </el-pagination>   
            </el-col>
        </el-row>        
    </div>
</template>

<script>
import { httpGetConsumeDetail, httpGetMoneyNow } from "@/api/http";

export default {
  data() {
    return {
      tableData: [],
      pageSize: 1,
      currentPage: 1,
      allpage: 0,
      moneyNow: 0
    };
  },
  methods: {
    getTableData(npage, pagesize) {
      let _this = this;
      httpGetConsumeDetail(npage, pagesize)
        .then(data => {
          console.log(data);
          _this.allpage = data.data.allpage * data.data.pagesize;
          _this.currentPage = data.npage;
          _this.tableData = data.data.list;
          console.log(_this.allpage);
        })
        .catch();
    },
    GetMoneyNow() {
      httpGetMoneyNow()
        .then(data => {
          this.moneyNow = data.data;
        })
        .catch();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getTableData(val, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
    }
  },
  beforeMount() {
    this.getTableData(this.currentPage, this.pageSize);
    this.GetMoneyNow();
  }
};
</script>

<style>
</style>

