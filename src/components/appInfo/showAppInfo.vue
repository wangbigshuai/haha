<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen2'}">应用程序及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>应用信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <div class="wraper">
               <template>
            <el-backtop target=".wraper">
                <div
                    style="{
                        height: 100%;
                        width: 100%;
                        background-color: #f2f5f6;
                        box-shadow: 0 0 6px rgba(0,0,0, .12);
                        text-align: center;
                        line-height: 40px;
                        color: #1989fa;
                    }"
                    >
                    UP
                </div>
            </el-backtop>
          </template>
     
      <!-- 提示区域 -->
      <!-- <el-alert title="哈哈哈哈" type="success" show-icon :closable="false"></el-alert> -->
      <el-row class = "cat_opt" :gutter="20">
        <el-col :span="50">
         <!-- App名称：{{this.$route.query.a.app_name}} OS版本号：{{this.$route.query.a.app_version}}  -->
         App名称：{{this.$store.state.showAppInfo_row.app_name}} OS版本号：{{this.$store.state.showAppInfo_row.app_version}}
        </el-col>
      </el-row> 
    <!-- tab页签区域 -->
      <div class="container">
      <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
       <el-tab-pane label="ELF信息" name="Lib">

        <el-row :gutter="20">
        <el-col :span="60">
          <el-input placeholder="ELF文件类型" v-model="elf_type1" clearable  @clear="getData('A')">
            <el-button slot="append" icon="el-icon-search" @click="getData('A')"></el-button>
          </el-input>
        </el-col>
      </el-row>

       <el-divider content-position="center" id="A">应用程序的EFL文件共计 <span style="color:green">{{this.totle1}}</span> 条具体如下</el-divider>
        <el-table  :data="this.appELF" border stripe>
        <!-- <el-table-column type="index" width=" 70px" label="序号" :index='(index)=>{return (index+1) + (this.page1-1)*this.counts1  }' ></el-table-column> -->
        <el-table-column prop="no" label="序号" width="70"></el-table-column>
        <el-table-column prop="elf_name" label="ELF文件名"></el-table-column>
        <el-table-column prop="elf_path" label="ELF文件路径"></el-table-column>
        <el-table-column prop="elf_type" label="ELF文件类型" width="70px"></el-table-column>
       </el-table> 
        <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        :current-page="this.page1"
        :page-sizes="[50, 400, 500, 1000]"
        :page-size="this.counts1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totle1"
      ></el-pagination>
    </el-tab-pane>
       <el-tab-pane label="ELF依赖库" name="depend_Info">
      <el-divider content-position="center" id="B">ELF文件依赖库共计 <span style="color:green">{{this.totle2}}</span>  条具体如下</el-divider>
       <el-table :data="this.depend_Info" border stripe>
        <!-- <el-table-column type="index" label="序号 "width=" 70px"  :index='(index)=>{return (index+1) + (this.page2-1)*this.counts2  }'></el-table-column> -->
       <el-table-column prop="no" label="序号" width="70"></el-table-column>
        <el-table-column prop="lib_name" label="依赖库名称"></el-table-column>
        <el-table-column prop="elf_path" label="ELF文件路径"></el-table-column>  
       </el-table> 
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="this.page2"
        :page-sizes="[100, 400, 500, 1000]"
        :page-size="this.counts2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totle2"
      ></el-pagination>
        </el-tab-pane>

      <el-tab-pane label="ELF文件接口" name="interface">
       <el-divider content-position="center" id="C">ELF文件提供的接口共计 <span style="color:green">{{this.totle3}}</span> 条具体如下</el-divider>
       <el-table :data="this.appInt" border stripe>
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index='(index)=>{return (index+1) + (this.page3-1)*this.counts3  }'></el-table-column> -->
           <el-table-column prop="no" label="序号" width="70"></el-table-column>
        <el-table-column prop="int_name" label="接口名"></el-table-column>
        <el-table-column prop="elf_path" label="ELF文件路径"></el-table-column>
         <!-- <el-table-column prop="elf_type" label="ELF文件类型"></el-table-column> -->
       </el-table> 
       
      <el-pagination
        @size-change="handleSizeChange3"
        @current-change="handleCurrentChange3"
        :current-page="this.page3"
        :page-sizes="[500,800, 1000, 2000]"
        :page-size="this.counts3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totle3"
      ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="ELF依赖接口" name="depend_int">
       <el-divider content-position="center" id="C">appELF文件的依赖接口共计 <span style="color:green">{{this.totle4}}</span> 条具体如下</el-divider>
       <el-table :data="this.depend_int" border stripe>
        <el-table-column prop="no" label="序号" width="80px"></el-table-column>
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index='(index)=>{return (index+1) + (this.page4-1)*this.counts4  }'></el-table-column> -->
        <el-table-column prop="int_name" label="接口名"></el-table-column>
        <el-table-column prop="elf_path" label="ELF文件路径"></el-table-column>
       </el-table> 
       
      <el-pagination
        @size-change="handleSizeChange4"
        @current-change="handleCurrentChange4"
        :current-page="this.page4"
        :page-sizes="[500,800, 1000, 2000]"
        :page-size="this.counts4"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totle4"
      ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="内核模块信息" name="kernel_info">
       <el-divider content-position="center" id="D">内核模块信息共计 <span style="color:green">{{this.totle5}}</span> 条具体如下</el-divider>
       <el-table ref="table1" :data="this.kernel_info" border stripe>
        <el-table-column prop="no" label="序号" width="80px"></el-table-column>
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index='(index)=>{return (index+1) + (this.page4-1)*this.counts4  }'></el-table-column> -->
        <el-table-column prop="ko_name" label="内核模块名">
           <template slot-scope="scope">
	            	<el-button  type="text" size="small" @click="queryInfo(scope.row)">{{scope.row.ko_name}}</el-button>
	        	</template>
        </el-table-column>
         <el-table-column prop="ko_version" label="内核模块版本"></el-table-column>
        <el-table-column prop="ko_path" label="内核模块路径"></el-table-column>
        <el-table-column  width="1" type="expand" >
  <template >
    <div>
      <h3>调用的内核符号名：</h3>
      <ul>
        <li v-for="(item,index) in this.numList ">
          {{index+1}}.   {{item}}
        </li>
      </ul>
    </div>
  </template>
</el-table-column>
    </el-table> 

      <el-pagination
        @size-change="handleSizeChange5"
        @current-change="handleCurrentChange5"
        :current-page="this.page5"
        :page-sizes="[500,800, 1000, 2000]"
        :page-size="this.counts5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totle5"
      ></el-pagination>
      </el-tab-pane>


      </el-tabs>

       </div>
      </div>
    </el-card> 
    </div>
</template>

<script>
export default {
  data () {
    return {
      //激活标签名称
       activeTabsName: 'Lib',
        page1: 1,//第一个分页 当前的页数
        counts1:  50 ,//第一个分页 当前显示多少条数据 
        page2: 1,
        counts2: 100 ,
        page3: 1,
        counts3: 500 ,

         page4: 1,
        counts4: 500 ,

        page5: 1,
        counts5: 500 ,
//总条数 
        totle3:0,
        totle1:0, 
        totle2:0,
        totle4:0,
        totle5:0,
//表格列表数据
      osList: [], 
      appELF:[],
      depend_Info:[],
      appInt:[],
      depend_int:[],
      kernel_info:[],
      numList:[],

      number:0,//全局os_no序号
       index:0,
       row:{},

       elf_type1:''
    }
  },

  created () {
    this.getData('A')
    // console.log(this.$route.query.a);
  },
  methods: {
         async queryInfo(row){
                const { data: res } = await this.$http.get('showAppKoSym/',{
                  params:{
                    'app_no':this.$store.state.showAppInfo_row.app_no,
                    'ko_path':row.ko_path
                  }
                }) 
              console.log(res);
            this.numList = res.sym
              console.log(this.numList);
      
         const $table = this.$refs.table1
          //this.osList 是上面 data 中的 list   
          // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
           this.kernel_info.map((item) => {
            if (row.no !== item.no) {
              $table.toggleRowExpansion(item, false)
            }
          })
          $table.toggleRowExpansion(row)
    },
    async getData (a) {
                if(a=='A'){
                    const { data: res } =  await  this.$http.get('showAppELF/' ,{
                        params:{
                          'flag':this.elf_type1,
                          'app_no':this.$store.state.showAppInfo_row.app_no,
                          'page':this.page1,
                          'counts':this.counts1
                        }
                     })
                     console.log(this.elf_type1);
                    // if (res.status !== 200) {
                    //   return this.$message.error('显示失败，数组越界')
                    // }
                  this.appELF = res.ELF_Info
                  this.totle1 = res.length
                } else if(a=='B'){
                   const { data: res } = await this.$http.get('showAppDependLib/' ,{
                      params:{
                        'app_no':this.$store.state.showAppInfo_row.app_no,
                        'page':this.page2,
                        'counts':this.counts2
                      }
                   })
                  // if (res.status !== 200) {
                  //   return this.$message.error('显示失败，数组越界！')
                  // }
                  this.depend_Info = res.depend_Info
                  this.totle2 = res.length  
                } else if(a=='C'){
                  const { data: res } = await this.$http.get('showAppInt/' ,{
                    params:{
                      'app_no':this.$store.state.showAppInfo_row.app_no,
                      'page':this.page3,
                      'counts':this.counts3
                    }
                  })
                  // if (res.status !== 200) {
                  //   return this.$message.error('显示失败，数组越界！')
                  // }
                  this.appInt = res.intInfo
                  this.totle3 = res.length  
                }else  if(a=='D'){
                  const { data: res } = await this.$http.get('showAppDependInt/' ,{
                    params:{
                      'app_no':this.$store.state.showAppInfo_row.app_no,
                      'page':this.page4,
                      'counts':this.counts4
                    }
                  })
                  this.depend_int= res.intInfo
                  this.totle4 = res.length  
                }else  if(a=='E'){
                  const { data: res } = await this.$http.get('showAppKo/' ,{
                    params:{
                      'app_no':this.$store.state.showAppInfo_row.app_no,
                      'page':this.page5,
                      'counts':this.counts5
                    }
                  })
                  console.log(res);
                  this.kernel_info= res.Ko_Info
                  this.totle5 = res.length  
                }
    },

    handleTabsClick(){
      if(this.activeTabsName === 'depend_Info'){
        this.getData('B')
      } else if(this.activeTabsName ==='interface'){
        this.getData('C')
      }else if(this.activeTabsName ==='depend_int'){
        this.getData('D')
      }else if(this.activeTabsName ==='Lib'){
        this.getData('A')
      }else if(this.activeTabsName ==='kernel_info'){
        this.getData('E')
      }
    },
  
    //监测页面值改变
    handleSizeChange1(newSize) {
       this.counts1 = newSize
      this.getData('A')
    },
    //监测当前页嘛值
    handleCurrentChange1(newSize) {
     
       this.page1 = newSize
      console.log(this.counts1);
       this.getData('A')
    },

    handleSizeChange2 (newSize) {
    this.counts2 = newSize
      this.getData('B')
    },
    handleCurrentChange2 (newSize) {
         this.page2 = newSize
       this.getData('B')
    },

      handleSizeChange3 (newSize) {
      this.counts3 = newSize
      this.getData('C')
    },
    handleCurrentChange3 (newSize) {
          this.page3 = newSize
       this.getData('C')
    },

       handleSizeChange4 (newSize) {
      this.counts4 = newSize
      this.getData('D')
    },
    handleCurrentChange4 (newSize) {
          this.page4 = newSize
       this.getData('D')
    },
           handleSizeChange5 (newSize) {
      this.counts5 = newSize
      this.getData('E')
    },
    handleCurrentChange5 (newSize) {
          this.page5 = newSize
       this.getData('E')
    },
  }
}
</script>
<style Lang="less" scoped>
.cat_opt {
  margin: 15px 0px;
}
 .wraper {
        height: 100vh;
        overflow-x: hidden;
 }

</style>

