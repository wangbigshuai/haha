<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看
      </el-breadcrumb-item>
      <el-breadcrumb-item>操作系统指纹</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入OS名称"  clearable v-model="this.search_osname">
            <el-button slot="append" icon="el-icon-search" @click="searchOsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="success" @click="os_collection ">OS采集
          </el-button>
        </el-col>

      </el-row>
      <div style="margin-top: 15px;">
        已经采集过的操作系统如下：
      </div>
 <el-table ref="table" :data="osList" border stripe>
         <!-- <el-table-column prop="os_no" label="序号" width="70"></el-table-column> -->
           <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="os_name" label="OS名称"></el-table-column>
        <el-table-column prop="os_architecture" label="OS架构"></el-table-column>
        <el-table-column prop="os_version" label="OS版本号"></el-table-column>
        <el-table-column prop="os_manufacturer" label="OS厂商"></el-table-column>
         <el-table-column prop="os_processor" label="OS处理器"></el-table-column>
             <el-table-column prop="os_kernel" label="内核版本"></el-table-column
         <el-table-column prop="os_scan_date" label="日期时间" sortable width="200"></el-table-column>
        <el-table-column label="操作" width="310px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showOsInfo( scope.row)"
            >指纹信息</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="showOsContrast(scope.row)"
            >OS对比</el-button>
            <el-button
              type="info"
              size="mini"
              @click="appCompatible(scope.row)"
            >兼容性</el-button>
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
                @click="removeOsNo(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
       <el-table-column type="expand" width="1">
<!-- 内嵌二级卡片 -->
         <el-card width="100">
<!-- 标记显示  -->
  <div :class="osFlag ? 'class_a' : 'class_b' ">
        <el-row :gutter="20">
        <el-col :span="60">
          <el-input placeholder="请输入OS名称" v-model="search_osname" clearable >
            <el-button slot="append" icon="el-icon-search" @click="getOsList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <div style="margin-top: 15px;">
        可对比查看的操作系统如下（无对比时间表示还未与此系统进行对比）：
         </div>
    <el-table ref="table1" :data="osComparedList"  border stripe >
         <!-- <el-table-column prop="os_no" label="序号" width="70"></el-table-column> -->
            <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="os_name" label="OS名称" ></el-table-column>
         <el-table-column prop="os_version" label="OS版本号" ></el-table-column>
          <el-table-column prop="compare_time" label="对比时间" ></el-table-column>
        <el-table-column label="操作" width="130px">
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
                @click="contrast(scope.row)"
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
                @click="contrast1(scope.row)"
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
                @click="removeOs_1(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
       </div>
    <!-- 选择显示app -->
  <div :class="appFlag ? 'class_a' : 'class_b' ">
        <!-- <el-row :gutter="20">
        <el-col :span="60">
          <el-input placeholder="请输入app名称" v-model="xx" clearable @clear="getOsList">
            <el-button slot="append" icon="el-icon-search" @click="getOsList"></el-button>
          </el-input>
        </el-col>
      </el-row> -->
      <div style="margin-top: 15px; ">
        已经对比分析的app如下：
        <!-- 已经对比过的app信息 -->
         </div>
    <el-table ref="table2" :data="appCompareList"  border stripe >
         <!-- <el-table-column prop="app_no" label="序号" width="70"></el-table-column> -->
            <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="app_name" label="app名称" ></el-table-column>
          <el-table-column prop="scan_date" label="对比时间" ></el-table-column>
             <el-table-column prop="app_version" label="app版本号" ></el-table-column>

               <el-table-column prop="lib" label="库的兼容性" >
               <template slot-scope="scope">
               <span v-if="scope.row.lib === 0">不兼容 </span>
                 <span v-if="scope.row.lib === 1">兼容 </span>
               </template>
          </el-table-column>

             <el-table-column prop='int' label="接口的兼容性" >
               <template slot-scope="scope">
               <span v-if="scope.row.int === 0">不兼容 </span>
                 <span v-if="scope.row.int === 1">兼容 </span>
               </template>
             </el-table-column>
          <el-table-column prop="ko" label="内核模块兼容性" >
                <template slot-scope="scope">
               <span v-if="scope.row.ko === 0">不兼容 </span>
                 <span v-if="scope.row.ko === 1">兼容 </span>
               </template>
         </el-table-column>     
        <el-table-column label="操作" width="130px">
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
                @click="appContrast(scope.row)"
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
                @click="appContrast1(scope.row)"
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
                @click="removeOs_2(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
       </div> 
          </el-card>
      </el-table-column>
      </el-table>
    </el-card> 
  </div>
</template>

<script>
import  store from '../../store'
export default {
  store,
  data () {
    return {

      search_osname:'',//搜索关键字

//表格列表数据
      osList: [], 
      osComparedList:[],
      appCompareList:[],///app  兼容性
      number:0,//全局os_no序号
       index:0,
       row:{}, //os对比分析暂存的数据
      //哨兵 防止点击信息查看 多次调用
      flag:true,
      contrast_flag:0,
      rowdata:{},
      osFlag:true,
      appFlag:true,
      row1:{}
    }
  },

  created () {
    this.getOsList()
  },
  methods: {
    //获取操作系统列表数据     console.log(this.$router.options.routes[2].children[3].name);
   async getOsList () {
       const { data: res } = await this.$http.get('showOsInfo')
       let obj = JSON.parse(res.OsInfo);     
       this.osList = obj
    },
      searchOsList(){
        //需要写分页 或者新接口 
        
      },
    // 查看具体指纹信息
     showOsInfo (row) {
        this.$store.state.showOsInfo_row = row
         this.$router.push({
           path:'osinfo2',
          })
    },

    os_collection(){
      this.$router.push({
       path:'os1'
      })
    },

     async showOsContrast(row){
       this.appFlag = true
       this.osFlag = false
       //存储基础对比系统
         this.row = row
            // if(this.flag){
                const { data: res } = await this.$http.get('showHasCompared/',{
                  params:{
                    'os_no':row.os_no
                  }
                }) 
                console.log(res.os_list);
                // console.log(res);
            this.osComparedList = res.os_list
            //  this.contrast_flag = res.flag
            // console.log("hhh");
      //  }
      
         const $table = this.$refs.table
          //this.osList 是上面 data 中的 list   
          // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
           this.osList.map((item) => {
            if (row.os_no !== item.os_no) {
              $table.toggleRowExpansion(item, false)
            }
          })
          $table.toggleRowExpansion(row)
          //  this.flag = !this.flag;//防止每次点击调用 
    },
    contrast(row2){
      this.$store.state.contrast_row1 = this.row
      this.$store.state.contrast_row2 = row2
           this.$router.push({
           path:'/os2',
          //  query:{
          //      'row1':this.row,
          //      'row2':row2
          //  }
          
          }) 
    },
    async contrast1(row2){
      const { data: res } = await this.$http.get('compareOs',{
                  params:{
                    'os1':this.row.os_no,
                    'os2':row2.os_no
                  }
                }) 
          
               if (res.status == 400) {
                      return this.$message.error('对比信息失败！')
                 }else if (res.status == 200) {
                   row2.flag = 1
                      return this.$message.success('对比成功，可以点击显示查看！')
                    }else{
                      return this.$message.success('已经对比过，请勿重复点击，不再对比') 
              }

    },
   // app兼容性分析
    async  appCompatible(row11){
      this.row1 = row11
      this.osFlag = true
      this.appFlag = false
        // this.row = row
            // if(this.flag){
                const { data: res } = await this.$http.get('showAppByOs/',{
                  params:{
                    'os':row11.os_no
                  }
                }) 
            this.appCompareList = res.info
            //  this.contrast_flag = res.flag
            console.log(res.info);
      //  }

        const $table = this.$refs.table
          //this.osList 是上面 data 中的 list   
          // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
           this.osList.map((item) => {
            if (row11.os_no !== item.os_no) {
              $table.toggleRowExpansion(item, false)
            }
          })
          $table.toggleRowExpansion(row11)
  //  this.flag = !this.flag;//防止每次点击调用 

    },
       //app兼容性对比
    appContrast(row2){
      console.log(row2);
      console.log(this.row1);

      this.$store.state.os_contrast = this.row1
      this.$store.state.app_contrast = row2
           this.$router.push({
           path:'/showAppCompatibleInfo',
          //  query:{
          //      'row1':this.row,
          //      'row2':row2
          //  }
          }) 
    },
    async appContrast1(row2){
      console.log(row2);
      const { data: res } = await this.$http.get('appCompatible/',{
                  params:{
                    'app':row2.app_no,
                    'os':this.row1.os_no
                  }
                }) 
              if (res.status == 200) {
                      row2.flag = 1
                      return this.$message.success('兼容性检测信息成功，可以点击显示查看！')
                    }else{
                      return this.$message.success('已经检测错不能重复检测') 
                    }

    },
  //删除os 
  async removeOsNo(row){
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
      const { data: res } = await this.$http.get('deleteOsInfo/',{
                  params:{
                    'os':row.os_no
                  }
                }) 
              if (res.status == 200) {
                      this.getOsList();
                      return this.$message.success('删除成功')
               }else{
                      return this.$message.error('删除失败') 
              } 
  },

//删除os对比展开的列表
    async removeOs_1(row2){

        const confirmResult = await this.$confirm(
        '此操作将永久删除该操作系统信息, 是否继续?',
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

      const { data: res } = await this.$http.get('deleteOsCompare/',{
                  params:{
                    'os2':row2.os_no,
                    'os1':this.row.os_no //对比分析当前行的数据 
                  }}) 
              if (res.status == 200) {
                row2.flag = 0
                row2.compare_time =''
                // row2.os_version = ''

                      // this.showOsContrast(this.row);
               const { data: res1 } = await this.$http.get('showHasCompared/',{
                  params:{
                    'os_no':this.row.os_no
                  }
                }) 
                // console.log(res);
                this.osComparedList = res1.os_list
                //set不能解决 
                // this.$set(this.osComparedList,row2,res1.os_list);
                // console.log(this.osComparedList);
                      return this.$message.success('删除成功')
               }else{
                      return this.$message.error('删除失败') 
               } 
     },
     //删除兼容性展开列表
    async removeOs_2(row2){
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
                    'app1':row2.app_no,
                    'os1':this.row1.os_no //对比分析当前行的数据 
                  }}) 
              if (res.status == 200) {
                row2.flag = 0
                row2.lib = ''
                row2.int = ''
                row2.scan_date = ''

                      // this.showOsContrast(this.row);
              const { data: res1 } = await this.$http.get('showAppByOs/',{
                  params:{
                    'os':this.row1.os_no
                  }
                }) 
            this.appCompareList = res1.info
            // this.$set(this.appCompareList,row2,res1.info);
            // console.log(this.appCompareList);
            // console.log(res1.info);


                      return this.$message.success('删除成功')
               }else{
                      return this.$message.error('删除失败') 
               } 
     },





  }
}
</script>

<style Lang="less" scoped>
.class_a { 
  display: none;
}
.class_b {
  display: block;
}

</style>

