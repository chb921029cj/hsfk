<template>
    <div class="container">
        <el-row >
            <el-table  :data="tableData" border style="width: 100%">
                <el-table-column  label="编号">
                    <template slot-scope="scope">
                        <el-row>
                            <span style="margin-left: 10px">编号:{{ scope.row.id }}</span>
                        </el-row>
                        <el-row>
                            <span style="margin-left: 10px">{{ scope.row.executeName}}</span>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column prop="executeNameCn" label="描述"></el-table-column>
                <el-table-column  label="操作">
                   <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleConfiguration(scope.$index, scope.row)">配置</el-button>
                       <el-switch
                        @change="handleUpdateCreditStatus(scope.row)"
                       style="margin-left:20px"
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"                                            
                        active-text="ON"
                        inactive-text="OFF">
                        </el-switch>
                   </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row style="margin-top:20px" v-if="total>0">
            <el-col style="text-align:center">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  :current-page="currentPage"
                  background
                  layout="prev, pager, next"
                  :total="total">
                </el-pagination>   
            </el-col>
        </el-row>
        <!-- 编辑弹出框 --> 
         <el-dialog  
            title="决策配置"
            :visible.sync="editVisible" 
            center
            width="50%">
            <el-row style="margin-bottom:20px">
                <el-col :span="12" :offset="2">
                    风险决策
                </el-col>
                <el-col :span="8">
                    拒绝
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="2">
                    条件
                </el-col>
                <el-col :span="3" style="line-height:32px">
                    {{configUser.executeParaHelp}}
                </el-col>
                <el-col :span="5">
                    <el-input
                    placeholder=""
                    v-model="configUser.executePara">
                    </el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer" >
                <el-button type="primary" @click="handleUpdateCreditPara(configUser.id,configUser.executePara)">确 定</el-button>
            </span>     
         </el-dialog>
    </div>
</template>

<script>
import {
  htppUpdateCreditPara,
  httpUpdateCreditStatus,
  httpGetExecutor
} from "@/api/http";
export default {
  data() {
    return {
      editVisible: false,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      type: 0,
      tableData: [],
      index: 0,
      configUser: {}
    };
  },
  methods: {
    handleConfiguration(index, row) {
      this.index = index;
      this.editVisible = true;
      console.log(row);
      this.configUser = row;
      // httpUpdateCreditStatus(index, row)
      //   .then(() => {})
      //   .catch(() => {
      //     console.log(index, row);
      //   });
    },
    //获得数据
    getTableData(npage, pagesize, type) {
      let _this = this;
      httpGetExecutor(npage, pagesize, type)
        .then(data => {
          console.log(data);
          _this.pageSize = parseInt(data.data.pagesize);
          _this.currentPage = parseInt(data.data.npage);
          _this.total = parseInt(data.data.allpage);
          console.log(_this.total, _this.pageSize, _this.currentPage);
          _this.tableData = data.data.list;
        })
        .catch(() => {
          const data = {
            npage: 3,
            allpage: 2,
            pagesize: 1,
            list: [
              {
                id: 1,
                executeName: "123",
                executePara: 48,
                status: true,
                type: false,
                executeParaHelp: "总个数为： 年龄为：",
                executeNameCn: "这是一段描述"
              }
            ],
            type: 0,
            allsize: 10
          };
          _this.pageSize = data.pagesize;
          _this.currentPage = data.npage;
          _this.total = data.allsize;
          _this.tableData = data.list;
        });
    },
    //当前页显示数据
    handleCurrentChange(val) {
      console.log(val);
      this.getTableData(val , this.pageSize, this.type);
    },
    //更改执行器适度开启
    handleUpdateCreditStatus(row) {
      httpUpdateCreditStatus(row.id, row.status ? 1 : 0)
        .then(data => {
          console.log(data);
        })
        .catch(() => {
          console.log(row.id, row.status);
        });
    },
    //credit 风控配置管理 执行器参数修改
    handleUpdateCreditPara(id, executePara) {
      this.editVisible = false;
      httpUpdateCreditStatus(id, executePara)
        .then(data => {
          console.log(data);
        })
        .catch(() => {
          console.log(id, executePara);
        });
    }
  },
  beforeMount() {
    this.getTableData(this.currentPage, this.pageSize, this.type);
  }
};
</script>

<style>
</style>

