<template>
    <div class="container">
        <el-row>
            <el-col :span="6">
                <el-button type="primary" @click="handleEdit()">新增用户</el-button>
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
                                 <el-button type="primary" icon="search" @click="handleSearch" >搜索</el-button> 
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
                    sortable
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
                    prop="idcard"
                    width="300"
                    label="身份证">
                </el-table-column>
                <el-table-column
                    prop="phonenume"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    sortable
                    label="时间">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span style="margin-left: 10px">{{ scope.row.applytime |dateServer }}</span>
                    </template> 
                </el-table-column> 
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleReport(scope.$index, scope.row)">查看报告</el-button>
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
                    :page-sizes="[5, 10, 20, 30]"

                  background
                  layout="sizes,prev, pager, next"
                  :total="allpage">
                </el-pagination>   
            </el-col>
        </el-row>   
        <!-- <div>
<div id="wrap" class="wrap">
  <div class="con">
      <h1>萨摩耶犬</h1>
      <ul>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>       <li>
        <h3>发展历史</h3>
        <img class="fr"  width="200">
        萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
      </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr"  width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>
        <li>
          <h3>发展历史</h3>
          <img class="fr" width="200">
          萨摩耶犬是因西伯利亚牧民族萨莫耶德人而得名，原产位于俄罗斯北极地区，起源于17世纪。原始的萨摩耶犬是由如今定居在乌拉尔山以东的极地地区的萨莫耶德游牧部落所培育的。在19世纪末，有毛皮商人将此犬输入美国及欧洲等地。而后该犬传到英国，因其雪白的毛色深得人们喜爱。20世纪初期，北极探险的热潮中，此犬因其天生的特性为探险者提供许多帮助，而获得殊荣。
        </li>

        <li>
          <h3>外形特征</h3>
          直立的耳朵很厚，呈三角形，尖端略圆。两耳分的较开。眼睛颜色深为佳，两眼凹陷，间距大，杏仁形，下眼睑向耳基部倾斜。鼻子颜色有黑色、棕色、肝褐色，鼻的颜色有时随年龄和气候改变。嘴唇多数是黑色，嘴角上翘。牙齿强壮，剪状咬合。背部直，中等长度，肌肉丰满。脚大而长，比较平，似野兔的足，趾稍分开；趾尖呈拱形肉垫厚而硬，趾之间有保护的毛，脚圆形或似猫足。尾巴比较长，自然下垂时可达 跗关节部，尾部被毛长而厚，当犬处于戒备状态时，尾上翘高于背部或位于背部一侧，休息时下垂。
        </li>
        <li>
          <h3>问卷</h3>
          <div class="form">
            <div class="row">名字：<input type="text" placeholder="请留下您的名字"></div>
            <div class="row">性别：<input type="radio" name="radio">先生 <input type="radio" name="radio">女士</div>
            <div class="row">你家有宠物吗: <input type="checkbox">有</div>
            <div class="row">留言：<textarea class="vt" cols="60" rows="10"></textarea></div>
          </div>
        </li>
      </ul>
  </div>
  <button class="btn no-print" @click="pa('#wrap')">点击开始打印</button>
</div>          
          </div>       -->
        <!-- 编辑弹出框 -->        
        <el-dialog  :visible.sync="editVisible" width="78%">
            <el-row>
                    <p class="title">
                        基本信息
                    </p>
            </el-row>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="姓名" >
                    <el-input v-model="form.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" ></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" ref="form" label-position="right" :model="form" label-width="120px">
                <el-form-item label="身份证号">
                    <el-input v-model="form.cardid" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="移动运行商密码">
                    <el-input v-model="form.operatorPassword" ></el-input>
                </el-form-item>                
            </el-form>            
            <el-row>
                    <p class="title">
                        联系人信息
                    </p>                
            </el-row>            
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第一联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="父母" value="shanghai"></el-option>
                 <el-option label="配偶" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form>
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第二联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="兄弟姐妹" value="shanghai"></el-option>
                 <el-option label="子女" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form> 
           <el-form :inline="true" :model="form" label-position="right" label-width="120px" class="demo-form-inline">           
             <el-form-item label="第三联系人关系">
               <el-select v-model="form.region" placeholder="————请选择————">
                 <el-option label="同事" value="shanghai"></el-option>
                 <el-option label="同学" value="beijing"></el-option>
                 <el-option label="朋友" value="beijing"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="姓名">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>             
             <el-form-item label="手机号">
               <el-input v-model="form.user" ></el-input>
             </el-form-item>
           </el-form>
           <el-row style="margin-bottom:30px">
               <el-col :span="8" :offset="8">
                    <el-button type="primary" @click="saveEdit" style="width:100%" >提交</el-button>
               </el-col>
            </el-row>                                  
        </el-dialog>
        <!-- 查勘报告         -->
        <el-dialog  :visible.sync="showVisible" :width="fullscreenWidth"   title="报告详情" :fullscreen="fullscreen" top="30px">
            <el-container   :style="{ height: fullscreenHeight}" style="border: 1px solid #eee">
              <el-header style="font-size: 12px;overflow：hidden;line-height:60px;    background-color:#EEEEEE">
                <el-row >
                  <el-col :span="6">
                    <h1 >贝利风投</h1>
                  </el-col>
                  <el-col :span="1" :offset="15">
                     <div class="btn-fullscreen"  >
                         <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                             <el-button type="info" icon="el-icon-rank" circle @click="changeFullscreen"></el-button>
                         </el-tooltip>
                     </div>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" @click="Print()">打印报告</el-button>
                  </el-col>
                </el-row>
              </el-header>
              <el-main style="pageBreakBefore:always"  id="subOutputRank-print">
                <el-row class="container" style="padding-top:0">
                  <el-row class="report_t">
                    <div class="el-main-info l">
                      <span>报告编号：201805241119371288237</span>
                    </div>
                    <div class="el-main-info r">
                      <span>报告生成时间：2018-05-24 11:19:37</span>
                    </div>

                  </el-row>
                  <el-row >
                    <h1 style="text-align:center">
                      互联网资信报告
                    </h1>
                  </el-row>
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户基本信息</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <table cellpadding="0" cellspacing="0" class="table">
                      <tbody>
                        <tr>
                          <td>
                            <span class="item">姓名</span>
                            <span>张国军</span>
                            <span>男</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">身份证</span>
                            <span>23412421241241</span>
                            <span class="tip_y">不在金融圈</span>
                            <span class="tip_y"></span>
 
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span class="item">手机号</span>
                            <span>1231412412</span>
                            <span class="tip_y"></span>
                            <span class="remarks">用户姓名与运营商提供的姓名[张国军]匹配成功</span>
                            <span class="remarks"></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>                                       
                  </el-card>
                  <!-- 亲属联系人信息 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>亲属联系人信息</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="kinsfolkTableData">
                        <el-table-column prop="relation" label="关系" width="140">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号">
                        </el-table-column>
                        <el-table-column prop="explain" label="说明">
                        </el-table-column>      
                    </el-table>                    
                  </el-card>
                  <!-- 用户信息检测 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户信息检测</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                  <table cellpadding="0" cellspacing="0" class="table">
                      <tbody>
                        <tr >
                          <th width="100" rowspan="9"> 用户信息查询</th>    
                          <td width="220"> 查询过该用户的相关企业数量 </td>
                          <td><span>0</span></td>
                        </tr>
                        <tr>
                          <td> 查询过该用户的相关企业类型 </td>
                          <td> 
			   
                          </td>
                        </tr>
                        <tr>
                          <td> 身份证组合过的其他姓名 </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  身份证组合过其他电话  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码组合过其他姓名  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码组合过其他身份证  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码注册过的相关企业数量  </td>
                          <td>

                          </td>
                        </tr>
                        <tr>
                          <td>  电话号码注册过的相关企业类型  </td>
                          <td>

                          </td>
                        </tr> 
                        <tr>
                          <td>  电话号码出现过的公开网站  </td>
                          <td>

                          </td>
                        </tr>                                                                                                                                                
                      </tbody>
                      <tbody>
                        <tr>
                          <th width="100" rowspan="6">黑名单信息</th>
                          <td>黑中介分数</td>
                          <td>
                            <span>0</span>
                            （分数范围0-100，参考分为10，分数越低关系越紧密）
                          </td>
                        </tr>
                        <tr>
                          <td> 直接联系人中黑名单人  </td>
                          <td>
                            <span>0</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 间接联系人中黑名单人数  </td>
                          <td>
                            <span>0</span>
                            (间接联系人：和被查询号码的直接联系人有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 直接联系人人数  </td>
                          <td>
                            <span>80</span>
                            (直接联系人：和被查询号码有通话记录)
                          </td>
                        </tr>  
                        <tr>
                          <td> 引起黑名单的直接联系人数量  </td>
                          <td>
                            <span>0</span>
                             (直接联系人有和黑名单用户的通讯记录的号码数量)
                          </td>
                        </tr>  
                        <tr>
                          <td> 直接联系人中引起间接黑名单占比  </td>
                          <td>
                              <span>0.00</span>
                              (直接联系人有和黑名单用户的通讯记录的号码数量在直接联系人数量中的百分比)
                          </td>
                        </tr>                                                                                                                         
                      </tbody>
                  </table>
                  </el-card> 
                  <!-- 用户行为检测 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>用户行为检测</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="testTableData">
                        <el-table-column prop="testItem" label="检测项目" width="150">
                        </el-table-column>
                        <el-table-column prop="result" label="结果" width="150">
                        </el-table-column>
                        <el-table-column prop="gist" label="依据">
                        </el-table-column>
                    </el-table>                     
                  </el-card>   
                  <!-- 运营商消费数据               -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>运营商消费数据</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="operatorTableData">
                        <el-table-column prop="testItem" label="运行商" >
                        </el-table-column>
                        <el-table-column prop="result" label="号码" >
                        </el-table-column>
                        <el-table-column prop="gist" label="归属地">
                        </el-table-column>
                        <el-table-column prop="gist" label="月份">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼叫次数">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="主叫次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="主叫时间">
                        </el-table-column>  
                        <el-table-column prop="gist" label="被叫次数">
                        </el-table-column>  
                        <el-table-column prop="gist" label="被叫时间">
                        </el-table-column>  
                        <el-table-column prop="gist" label="短信数量">
                        </el-table-column>
                        <el-table-column prop="gist" label="话费消费">
                        </el-table-column>                                                                                                                                                
                    </el-table>                     
                  </el-card>  
                  <!-- 联系人区域汇总                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>联系人区域汇总 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="linkmanTableData">
                        <el-table-column prop="testItem" label="地区" >
                        </el-table-column>
                        <el-table-column prop="result" label="号码次数" >
                        </el-table-column>
                        <el-table-column prop="gist" label="呼入次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼出次数">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼入时间">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="呼出时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="呼入次数比">
                        </el-table-column>  
                        <el-table-column prop="gist" label="呼出次数比">
                        </el-table-column>  
                        <el-table-column prop="gist" label="呼入时间比">
                        </el-table-column>  
                        <el-table-column prop="gist" label="呼出时间比">
                        </el-table-column>
                    </el-table>                     
                  </el-card> 
                  <!-- 运营商数据分析                   -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>运营商数据分析 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="operatorDataTableData">
                        <el-table-column prop="testItem" label="号码" >
                        </el-table-column>
                        <el-table-column prop="result" label="互联网标识" >
                        </el-table-column>
                        <el-table-column prop="gist" label="需求类型">
                        </el-table-column>
                        <el-table-column prop="gist" label="归属地">
                        </el-table-column>
                        <el-table-column prop="gist" label="通话次数">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="通话时间(分)">
                        </el-table-column>
                        <el-table-column prop="gist" label="主叫次数">
                        </el-table-column>  
                        <el-table-column prop="gist" label="被叫次数">
                        </el-table-column>  
                    </el-table>                     
                  </el-card> 
                  <!-- 联系人信息                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>联系人信息 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="contactTableData">
                        <el-table-column prop="testItem" label="联系人" >
                        </el-table-column>
                        <el-table-column prop="result" label="最早联系时间" >
                        </el-table-column>
                        <el-table-column prop="gist" label="最晚联系时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="联系电话">
                        </el-table-column>
                        <el-table-column prop="gist" label="号码归属地">
                        </el-table-column>                                                
                        <el-table-column prop="gist" label="通话时长">
                        </el-table-column>
                    </el-table>                     
                  </el-card>  
                  <!-- 电商地址信息                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>电商地址信息 </h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="esAddTableData">
                        <el-table-column prop="testItem" label="地址" >
                        </el-table-column>
                        <el-table-column prop="result" label="	总消费金额" >
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人姓名">
                        </el-table-column>
                        <el-table-column prop="gist" label="收货人手机">
                        </el-table-column>
                    </el-table>                     
                  </el-card>  
                  <!-- 电商数据分析                  -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>电商数据分析</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="esDataTableData">
                        <el-table-column prop="testItem" label="月份" >
                        </el-table-column>
                        <el-table-column prop="result" label="消费次数" >
                        </el-table-column>
                        <el-table-column prop="gist" label="消费金额">
                        </el-table-column>
                        <el-table-column prop="gist" label="品类分析">
                        </el-table-column>
                    </el-table>                     
                  </el-card> 
                  <!-- 出行数据分析                 -->
                  <el-card class="el-card">
                    <div  class="clearfix">
                        <div class="panel_title">
                          <h2>出行数据分析</h2>
                          <div class="line"></div>
                        </div>
                    </div>
                    <el-table :data="tripTableData">
                        <el-table-column prop="testItem" label="时间段" >
                        </el-table-column>
                        <el-table-column prop="result" label="出发时间" >
                        </el-table-column>
                        <el-table-column prop="gist" label="回程时间">
                        </el-table-column>
                        <el-table-column prop="gist" label="出发地">
                        </el-table-column>
                        <el-table-column prop="gist" label="目的地">
                        </el-table-column>                        
                    </el-table>                     
                  </el-card>                                                       
                </el-row>
              </el-main>

            </el-container>
        </el-dialog>
    </div>
</template>

<script>
import { httpGetCreditReport } from "@/api/http";
import * as A from "@/components/common/filter/print.js";
export default {
  data() {
    // const item = {
    //   date: "2016-05-02",
    //   name: "王小虎",
    //   address: "上海市普陀区金沙江路 1518 弄"
    // };
    return {
      form: {
        name: "",
        date: "",
        address: ""
      },
      time: "",
      select_word: "",
      editVisible: false,
      showVisible: false,
      fullscreen: false,
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      allpage: 0,
      select_phone: "",
      currentTime1: "",
      currentTime2: "",
      //atableData: Array(20).fill(item),
      userBasicInformation: [], //用户基本信息检测
      fullscreenWidth: "80%",
      fullscreenHeight: "450px",
      kinsfolkTableData: [{ name: "小王" }], //亲属联系人
      testTableData: [{ testItem: "fas" }],
      operatorTableData: [{ testItem: "fas" }], //运营商消费数据
      linkmanTableData: [{ testItem: "fas" }], //联系人区域汇总
      operatorDataTableData: [{ testItem: "fas" }], //运行商数据分析
      contactTableData: [{ testItem: "fas" }], //联系人信息
      esAddTableData: [{ testItem: "fas" }], //电商信息
      esDataTableData: [{ testItem: "fas" }], //电商数据统计
      tripTableData: [{ testItem: "fas" }]
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
    handleEdit() {
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    //查看报告
    handleReport(index, row) {
      this.showVisible = true;
      console.log(index, row);
    },
    changeFullscreen() {
      if (this.fullscreen) {
        this.fullscreen = false;
        this.fullscreenWidth = "80%";
        this.fullscreenHeight = "450px";
      } else {
        this.fullscreen = true;
        this.fullscreenWidth = "100%";
        this.fullscreenHeight = "1050px";
      }
    },
    //得到数据
    getTableData(
      pagesize,
      npage,
      startDate,
      EndDate,
      phonenume,
      interfaceCallType
    ) {
      let _this = this;
      httpGetCreditReport(pagesize, npage, startDate, EndDate, phonenume, 2)
        .then(res => {
          let data = res.data;
          _this.allpage = data.allsize;
          _this.currentPage = data.npage;
          _this.tableData = data.list;
        })
        .catch();
    },
    handleSearch() {
      this.currentPage = 1;
      if (!this.time) {
        this.getTableData(
          this.currentPage,
          this.pageSize,
          "",
          "",
          this.select_phone
        );
      } else {
        this.currentTime1 = this.getMyDate(this.time[0]);
        this.currentTime2 = this.getMyDate(this.time[1]);
        this.getTableData(
          this.currentPage,
          this.pageSize,
          this.currentTime1,
          this.currentTime2,
          this.select_phone
        );
      }
    },
    handleCurrentChange(val) {
      console.log(val);
      this.getTableData(val, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.currentPage, this.pageSize);
      console.log();
    },
    // ssPrint(data) {
    //   //定义打印
    //   console.log(1);
    //   var sPrint = function(dom, options) {
    //     if (!(this instanceof Print)) return new Print(dom, options);

    //     this.options = this.extend(
    //       {
    //         noPrint: ".no-print"
    //       },
    //       options
    //     );

    //     if (typeof dom === "string") {
    //       this.dom = document.querySelector(dom);
    //     } else {
    //       this.dom = dom;
    //     }
    //   };
    //   sPrint.prototype = {
    //     init: function() {
    //       console.log("打印开始");
    //       var content = this.getStyle() + this.getHtml();
    //       this.writeIframe(content);
    //     },
    //     extend: function(obj, obj2) {
    //       for (var k in obj2) {
    //         obj[k] = obj2[k];
    //       }
    //       return obj;
    //     },

    //     getStyle: function() {
    //       var str = "",
    //         styles = document.querySelectorAll("style,link");
    //       for (var i = 0; i < styles.length; i++) {
    //         str += styles[i].outerHTML;
    //       }
    //       str +=
    //         "<style>" +
    //         (this.options.noPrint ? this.options.noPrint : ".no-print") +
    //         "{display:none;}</style>";

    //       return str;
    //     },

    //     getHtml: function() {
    //       var inputs = document.querySelectorAll("input");
    //       var textareas = document.querySelectorAll("textarea");
    //       var selects = document.querySelectorAll("select");

    //       for (var k in inputs) {
    //         if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
    //           if (inputs[k].checked == true) {
    //             inputs[k].setAttribute("checked", "checked");
    //           } else {
    //             inputs[k].removeAttribute("checked");
    //           }
    //         } else if (inputs[k].type == "text") {
    //           inputs[k].setAttribute("value", inputs[k].value);
    //         }
    //       }

    //       for (var k2 in textareas) {
    //         if (textareas[k2].type == "textarea") {
    //           textareas[k2].innerHTML = textareas[k2].value;
    //         }
    //       }

    //       for (var k3 in selects) {
    //         if (selects[k3].type == "select-one") {
    //           var child = selects[k3].children;
    //           for (var i in child) {
    //             if (child[i].tagName == "OPTION") {
    //               if (child[i].selected == true) {
    //                 child[i].setAttribute("selected", "selected");
    //               } else {
    //                 child[i].removeAttribute("selected");
    //               }
    //             }
    //           }
    //         }
    //       }

    //       return this.dom.outerHTML;
    //     },

    //     writeIframe: function(content) {
    //       var w,
    //         doc,
    //         iframe = document.createElement("iframe"),
    //         f = document.body.appendChild(iframe);
    //       iframe.id = "myIframe";
    //       iframe.style =
    //         "position:absolute;width:0;height:0;top:-10px;left:-10px;";

    //       w = f.contentWindow || f.contentDocument;
    //       doc = f.contentDocument || f.contentWindow.document;
    //       doc.open();
    //       doc.write(content);
    //       doc.close();
    //       this.toPrint(w);

    //       setTimeout(function() {
    //         document.body.removeChild(iframe);
    //       }, 100);
    //     },

    //     toPrint: function(frameWindow) {
    //       try {
    //         setTimeout(function() {
    //           frameWindow.focus();
    //           try {
    //             if (!frameWindow.document.execCommand("print", false, null)) {
    //               frameWindow.print();
    //             }
    //           } catch (e) {
    //             frameWindow.print();
    //           }
    //           frameWindow.close();
    //         }, 10);
    //       } catch (err) {
    //         console.log("err", err);
    //       }
    //     }
    //   };
    //   sPrint(data);
    // },
    pa(data) {
      A(data, "312");
    },
    //打印报告
    // sprint() {
    //   document.getElementById("subOutputRank-print").style.pageBreakAfter =
    //     "always";
    //   let subOutputRankPrint = document.getElementById("subOutputRank-print");
    //   let newContent = subOutputRankPrint.innerHTML;
    //   console.log(newContent);
    //   let oldContent = document.body.innerHTML;
    //   console.log(oldContent);
    //   document.body.innerHTML = newContent;

    //   console.log(document.body.offsetHeight);
    //   window.print(newContent);
    //   window.location.reload();
    //   document.body.innerHTML = oldContent;
    //   return false;
    // },
    Print() {
      var printStr =
        "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body >";
      var content = "";

      var str = document.getElementById("subOutputRank-print").innerHTML; //获取需要打印的页面元素 ，page1元素设置样式page-break-after:always，意思是从下一行开始分割。
      content = content + str;
      str = document.getElementById("subOutputRank-print").innerHTML; //获取需要打印的页面元素
      content = content + str;

      printStr = printStr + content + "</body></html>";
      var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需要
      pwin.document.write(printStr);
      pwin.document.close(); //这句很重要，没有就无法实现
      pwin.print();
      window.close();
    }
  },
  mounted: function() {
    this.getTableData(
      this.currentPage,
      this.pageSize,
      this.currentTime1,
      this.currentTime2,
      this.select_phone,
      2
    );
    console.log(A);
  }
};
</script>

<style scoped>
@media print {
  #subOutputRank-print {
    page-break-after: always;
  }
}
.title {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
}
.input-width {
  width: 215px;
}
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.el-main-info {
  color: #999;
}
.l {
  float: left;
}
.r {
  float: right;
}
.report_t {
  overflow: hidden;
  color: #999;
}
.el-card {
  margin-top: 24px;
}
.panel_title {
  margin-bottom: 10px;
  border-radius: 10px;
  position: relative;
  height: 40px;
  text-align: center;
}
.panel_title h2 {
  height: 30px;
  line-height: 30px;
  display: inline-block;
  background: #a584a7;
  color: #fff;
  border-radius: 100px;
  padding: 0;
  margin: 0;
  font-size: 16px;
  position: absolute;
  z-index: 99;
  width: 200px;
  left: 50%;
  margin-left: -100px;
}
.line {
  background: #a584a7;
  height: 4px;
  top: 13px;
  position: absolute;
  width: 100%;
  border-radius: 10px;
}
.table {
  width: 100%;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  border-bottom: none;
}
/* .table tr:hover {
  background:#c0b184 ;
} */
.table tr td {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
}
.table tr th {
  padding: 10px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 14px;
  text-align: left;
  background: #f7f7f9;
}

.table span {
  margin-right: 20px;
  display: inline-block;
}
span.item {
  width: 60px;
  font-weight: bold;
  text-align: right;
}
.tip_y {
  background: #5cb85c;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}
span.remarks {
  display: block;
  padding-left: 85px;
  padding-top: 5px;
  color: #c0b184;
}

.tip {
  background: #ccbfae;
  padding: 2px 10px;
  border-radius: 50px;
  color: #fff;
  font-size: 12px;
}
.wrap {
  margin: 0 auto;
  padding: 20px;
  width: 640px;
  border: 1px solid #ccc;
}
.form .row {
  padding: 10px 0 0;
}
.btn {
  display: block;
  margin: 20px auto;
  padding: 8px 16px;
}
</style>

