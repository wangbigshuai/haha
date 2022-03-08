<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看
      </el-breadcrumb-item>
      <el-breadcrumb-item>应用系统指纹</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="40">
        <el-col :span="6">
          <el-input placeholder="请输入OS名称"  clearable >
            <el-button slot="append" icon="el-icon-search" @click="getAppList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="app_collection ">app采集</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 15px;">
        已经采集过的app信息如下：
      </div>
 <el-table ref="table" :data="appList" border stripe>
         <!-- <el-table-column prop="app_no" label="序号" width="70"></el-table-column> -->
           <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="app_name" label="APP名称"></el-table-column>
        <el-table-column prop="app_version" label="APP版本号"></el-table-column>
         <el-table-column prop="scan_date" label="扫描时间" sortable width="200"></el-table-column>
        <el-table-column label="操作" width="260px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showAppInfo( scope.row)"
            >应用信息</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="showAppContrast(scope.row)"
            >兼容性对比</el-button>
            <!-- <el-button
              type="warning"
              size="mini"
              @click="aaa(scope.row.id)"
            >xxx</el-button> -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="removeAppNo(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
       <el-table-column type="expand" width="1">
<!-- 内嵌二级卡片 -->
         <el-card width="100">

        <el-row :gutter="40">
        <el-col :span="9">
          <el-input placeholder="请输入OS名称" v-model="search_appname" clearable >
            <el-button slot="append" icon="el-icon-search" @click="getAppList"></el-button>
          </el-input>
        </el-col>
            <el-col :span="10">
          
          <el-button type="success" plain @click="check_contrast ">系统对比</el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 15px;">
        可对比查看的操作系统如下（无对比时间表示还未与此系统进行对比）：
         </div>
    <el-table ref="table1" :data="appComparedList"  @select="select" @select-all="selectAll"  border stripe >
      <el-table-column type="selection"   width="40"> </el-table-column>
         <el-table-column prop="os_no" label="序号" width="70"></el-table-column>
        <el-table-column prop="os_name" label="OS名称" ></el-table-column>
          <el-table-column prop="scan_date" label="对比时间" ></el-table-column>
            <el-table-column prop="os_version" label="OS版本号" ></el-table-column>
             <el-table-column prop='int' label="接口的兼容性" >
               <template slot-scope="scope">
               <span v-if="scope.row.int === 0">不兼容 </span>
                 <span v-if="scope.row.int === 1">兼容 </span>
               </template>
             </el-table-column>
          <el-table-column prop="lib" label="库的兼容性" >
               <template slot-scope="scope">
               <span v-if="scope.row.lib === 0">不兼容 </span>
                 <span v-if="scope.row.lib === 1">兼容 </span>
               </template>
          </el-table-column>

             <el-table-column prop="ko" label="内核模块的兼容性" >
               <template slot-scope="scope">
               <span v-if="scope.row.ko === 0">不兼容 </span>
                 <span v-if="scope.row.ko === 1">兼容 </span>
               </template>
          </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
             <el-tooltip
              class="item"
              effect="dark"
              content="显示分析"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-thumb"
                size="mini"
                circle
               :disabled="scope.row.flag === 1 ? false:true" 
                @click="showAppCompatibleInfo(scope.row)"
              ></el-button></el-tooltip>
                <el-tooltip
              class="item"
              effect="dark"
              content="对比"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="info"
                icon="el-icon-s-promotion"
                size="mini"
                circle
                @click="appCompatible(scope.row)"
              ></el-button>
                </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              :enterable="false"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="removeO(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
   </el-card>
      </el-table-column>
      </el-table>
    </el-card> 
  </div>
</template>

<script>
import  store  from '../../store'
export default {
  store,
  data () {
    return {
  search_appname:'',
//表格列表数据
      appList: [], 
      appComparedList:[],
      number:0,//全局os_no序号
       index:0,
       row:{},
      //哨兵 防止点击信息查看 多次调用
      flag:true,
      contrast_flag:0,
      rowdata:{},
      selections:[]
    }
  },

  created () {
    this.getAppList()
  },
  methods: {
   async getAppList () {
       const { data: res } = await this.$http.get('showAppInfo/')
       this.appList = res.app_info
    },
//展示app信息
     showAppInfo (row) {
       this.$store.state.showAppInfo_row = row
         this.$router.push({
           path:'showAppInfo',
            //  query:{
            //    'id':row.app_no,
            //    'a':row
            //    }
          })
    },

    app_collection(){
      this.$router.push({
       path:'/appCollection'
      })
    },

     async showAppContrast(row1){
       //存储基础对比系统
         this.row = row1
         this.$store.state.check = row1;
        //  console.log("a"+this.row1);
            // if(this.flag){
                const { data: res } = await this.$http.get('showHasComparedApp/',{
                  params:{
                    'app':row1.app_no
                  }
                }) 
            this.appComparedList = res.info
            //  this.contrast_flag = res.flag
              // console.log(row1);
      //  }
      
         const $table = this.$refs.table
          //this.osList 是上面 data 中的 list   
          // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
           this.appList.map((item) => {
            if (row1.app_no !== item.app_no) {
              $table.toggleRowExpansion(item, false)
            }
          })
          $table.toggleRowExpansion(row1)
          // this.flag = !this.flag;//防止每次点击调用 
    },
    //app兼容性对比
    showAppCompatibleInfo(row2){
      // console.log(row2);
      // console.log(this.row);

      this.$store.state.os_contrast = row2
      this.$store.state.app_contrast = this.row
           this.$router.push({
           path:'/showAppCompatibleInfo',
          //  query:{
          //      'row1':this.row,
          //      'row2':row2
          //  }
          }) 
    },
    async appCompatible(row2){
      console.log(row2);
      const { data: res } = await this.$http.get('appCompatible/',{
                  params:{
                    'app':this.row.app_no,
                    'os':row2.os_no
                  }
                }) 
              if (res.status == 200) {
                      row2.flag = 1
                      return this.$message.success('兼容性检测信息成功，可以点击显示查看！')
                    }else{
                      return this.$message.success('已经检测错不能重复检测') 
                    }

    },
    //删除app
      async removeAppNo(row){
                const confirmResult = await this.$confirm(
        '此操作将永久删除该条记录信息, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
           const { data: res } = await this.$http.get('deleteAppInfo/',{
                  params:{
                    'app':row.app_no
                  }
                }) 
              if (res.status == 200) {
                      this.getAppList();
                      return this.$message.success('删除成功')
                     
                    }else{
                      return this.$message.error('删除失败') 
                    } 
          },

    async removeO(row){ 
              const confirmResult = await this.$confirm(
        '此操作将永久删除该条记录信息, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
           const { data: res } = await this.$http.get('deleteAppCompare/',{
                  params:{
                    'os1':row.os_no,
                    'app1':this.row.app_no
                  }
                }) 
              if (res.status == 200) {
                console.log(row);
                  row.flag = 0;
                  row.int = ''
                  row.lib = ''
                  row.os_version = ''
                  row.scan_date = ''
               const { data: res } = await this.$http.get('showHasComparedApp/',{
                  params:{
                    'app':this.row.app_no
                  }
                }) 
                      this.appComparedList = res.info
                      console.log(res.info);
                      console.log(this.appComparedList);
                      return this.$message.success('删除成功')
                    }else{
                      return this.$message.error('删除失败') 
                    } 
          },

          //选择多选框
          select(selection,row) {
            // console.log('触发',selection); //selection 对象数组 
            if(selection.length > 2) {
              let del_row = selection.shift();
              this.$refs.table1.toggleRowSelection(del_row,false);
            }
            // console.log(this.row); //row.app_no 
            if(selection.length == 2) {
              this.selections = selection;
               this.$store.state.selections   = this.selections ;
            console.log(selection[0].os_no,selection[1].os_no,this.row.app_no);
            }
          },
          selectAll(selection) {
           
            if(selection.length>2){
              selection.length = 2;
              this.selections = selection;
              this.$store.state.selections   = this.selections ;
            }
          },

         check_contrast() {
           if(this.selections.length <2){
             return this.$message.error("请选择后在点击");
           }
           
           if(this.selections[0].scan_date == "" ||  this.selections[1].scan_date == "")
           return this.$message.error("请选择有对比时间的两个操作系统");
           if(this.selections.length != 2) {
             return this.$message.error("请选择两个操作系统在进行对比！");
           }



           this.$router.push({
           path:'/showCheckInfo/',
          }) 
                 
            // console.log(this.selections);
         

          }



  }
}
</script>

<style Lang="less" scoped>


</style>

