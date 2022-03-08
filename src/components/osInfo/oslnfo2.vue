<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen1'}">操作系统指纹及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>指纹信息</el-breadcrumb-item>
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

      <el-row class = "cat_opt" :gutter="20">
        <el-col :span="50">
         OS名称：{{this.$store.state.showOsInfo_row.os_name}} OS架构：{{this.$store.state.showOsInfo_row.os_architecture}} OS版本号：{{this.$store.state.showOsInfo_row.os_version}} OS厂商：{{this.$store.state.showOsInfo_row.os_manufacturer}} OS处理器:{{this.$store.state.showOsInfo_row.os_processor}}
        </el-col>
      </el-row> 
    <!-- tab页签区域 -->
      <div class="container">
      <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
       <el-tab-pane label="库信息" name="Lib">
       <el-divider content-position="center" id="A">操作系统提供的库文件共计 <span style="color:green">{{this.totle1}}</span> 条具体如下</el-divider>
        <el-table     ref="table1" :data="this.osLib" border stripe  	>
        <!-- <el-table-column type="index" width=" 70px" label="序号" :index='(index)=>{return (index+1) + (this.page1-1)*this.counts1  }' ></el-table-column> -->
        <el-table-column prop="no" label="序号" width=" 70px" ></el-table-column>
        <el-table-column prop="lib_name" label="库名称"></el-table-column>
        <el-table-column prop="lib_path" label="库路径"></el-table-column>
        <el-table-column prop="lib_version" label="库版本号" width="70px"></el-table-column>
         <el-table-column  label="依赖库数目" width="100px"  align="center" header-align="center"  >
            <template slot-scope="scope">
	            	<el-button  type="text" size="small" @click="queryNum(scope.row)">{{scope.row.depend_counts}}</el-button>
	        	</template>
      </el-table-column>


        <!-- <el-table-column  label="依赖库">
         <template slot-scope="scope">
               <span v-html="cutout(scope.row.dependlib_name)"/>
          </template>
        </el-table-column>
        <el-table-column  label="依赖库路径">
           <template slot-scope="scope">
               <span v-html="cutout(scope.row.dependlib_path)"/>
          </template>
          </el-table-column>   -->
<el-table-column  width="1" type="expand" >
  <template >
    <div>
      <h3>具体依赖库数据路径信息</h3>
      <ul>
        <li v-for="(item,index) in this.numList ">
          {{index+1}}.   {{item}}
        </li>
      </ul>
    </div>

  </template>
</el-table-column>

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


       <el-tab-pane label="缺失的依赖库" name="missLib" >
      <el-divider content-position="center" id="B">操作系统缺失的依赖库文件共计 <span style="color:green">{{this.totle2}}</span>  条具体如下</el-divider>
       <el-table :data="this.missLib" border stripe>
        <!-- <el-table-column type="index" label="序号 "width=" 70px"  :index='(index)=>{return (index+1) + (this.page2-1)*this.counts2  }'></el-table-column> -->
          <el-table-column prop="no" label="序号" width=" 70px" ></el-table-column>
           <el-table-column prop="dependlib_name" label="库名称"></el-table-column>
        <el-table-column prop="lib_name" label="解析库"></el-table-column>
    
        <el-table-column prop="lib_path" label="解析库路径"></el-table-column>  
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

      <el-tab-pane label="接口信息" name="interface">
       <el-divider content-position="center" id="C">操作系统提供的接口共计 <span style="color:green">{{this.totle3}}</span> 条具体如下</el-divider>
       <el-table :data="this.osInt" border stripe>
            <el-table-column prop="no" label="序号" width=" 70px" ></el-table-column>
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index='(index)=>{return (index+1) + (this.page3-1)*this.counts3  }'></el-table-column> -->
        <el-table-column prop="int_name" label="接口名"></el-table-column>
        <el-table-column prop="lib_name" label="解析库名称"></el-table-column>
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

      <el-tab-pane label="内核符号信息" name="kernel">
       <el-divider content-position="center" id="D">操作系统提供的内核符号信息共计 <span style="color:green">{{this.totle4}}</span> 条具体如下</el-divider>
       <el-table :data="this.kernel" border stripe>
            <el-table-column prop="id" label="序号" width="300px"></el-table-column>
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index='(index)=>{return (index+1) + (this.page3-1)*this.counts3  }'></el-table-column> -->
        <el-table-column prop="sym_name" label="符号名"></el-table-column>
        <!-- <el-table-column prop="sym_type" label="符号类型"></el-table-column> -->
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


      </el-tabs>

       </div>
      </div>
    </el-card> 
    </div>
</template>

<script>
import store from "../../store/index"
export default {
  store,
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

        page4:1,
        counts4:500,



//总条数 
        totle4:0,
        totle3:0,
        totle1:0, 
        totle2:0,
//表格列表数据
      osList: [], 
      osLib:[],
      missLib:[],
      osInt:[],
      kernel:[],

      numList:[],   
      flag:true,
      number:0,//全局os_no序号
       index:0,
       row:{},

    }
  },

  created () {
    this.getData('A')
    // console.log(this.start);
    // console.log(this.$route.query.a);
  },
  methods: {
    async getData (a) {
                if(a=='A'){
                    const { data: res } =  await  this.$http.get('showOsLib/' ,{
                        params:{
                          'os_no':this.$store.state.showOsInfo_row.os_no,
                          'page':this.page1,
                          'counts':this.counts1
                        }
                     })
                    // if (res.status !== 200) {
                    //   return this.$message.error('')
                    // }
                  // let obj = JSON.parse(res.lib_info);    
                  this.osLib = res.lib_info
                  this.totle1 = res.length
                } else if(a=='B'){
                   const { data: res } = await this.$http.get('showMissDependLib/' ,{
                      params:{
                         'os_no':this.$store.state.showOsInfo_row.os_no,
                        'page':this.page2,
                        'counts':this.counts2
                      }
                   })
                  // if (res.status !== 200) {
                  //   return this.$message.error('获取序号为'+this.number+'信息失败！')
                  // }
                  this.missLib = res.lib_info
                  this.totle2 = res.length  
                  // console.log(res);
                } else if(a=='C'){
                  const { data: res } = await this.$http.get('showOsInt/' ,{
                    params:{
                    'os_no':this.$store.state.showOsInfo_row.os_no,
                      'page':this.page3,
                      'counts':this.counts3
                    }
                  })
                  // if (res.status !== 200) {
                  //   return this.$message.error('获取序号为'+this.number+'信息失败！')
                  // }
                  this.osInt = res.lib_info
                  this.totle3 = res.length  
                } if(a=='D'){
                  const { data: res } = await this.$http.get('showKerSym/' ,{
                    params:{
                    'os_no':this.$store.state.showOsInfo_row.os_no,
                      'page':this.page4,
                      'counts':this.counts4
                    }
                  })
                  console.log(res);
                  this.kernel = res.sym_info
                  this.totle4 = res.length  
                }
    },

    handleTabsClick(){
      if(this.activeTabsName === 'missLib'){
        this.getData('B')
      } else if(this.activeTabsName ==='interface'){
        this.getData('C')
      }else if(this.activeTabsName === "Lib"){
        this.getData('A')
      }else{
        this.getData('D')
      }
    },
  
    //监测页面值改变
    handleSizeChange1(newSize) {
       this.counts1 = newSize
      this.getData('A')
    },
    //监测当前页
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
    // 根据 [,]  处理数据换行
     cutout (a) {
       var s="";
       for(var i in a) {
         a[i]+='<br>';
         s+=a[i];
       }
       return s;
       //根据{,}换行
      // return a.replace(/\,/g, '</br>')
    },
     async queryNum(row){
            // if(this.flag){
              // console.log(row);
                const { data: res } = await this.$http.get('showDependLib/',{
                  params:{
                    'os':this.$store.state.showOsInfo_row.os_no,
                    'path':row.lib_path
                  }
                }) 
              
            this.numList = res.info
              console.log(this.numList);
      //  }
      
         const $table = this.$refs.table1
          //this.osList 是上面 data 中的 list   
          // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
           this.osLib.map((item) => {
            if (row.no !== item.no) {
              $table.toggleRowExpansion(item, false)
            }
          })
          $table.toggleRowExpansion(row)
          //  this.flag = !this.flag;//防止每次点击调用 
    }


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

