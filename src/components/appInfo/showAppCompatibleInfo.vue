<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen2'}">应用程序及相关信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/zhiwen1'}">指纹信息页面</el-breadcrumb-item>
      <el-breadcrumb-item>兼容性分析</el-breadcrumb-item>
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
                  操作系统OS名称:
              </el-col>
              <el-col :span="50">
              <!-- {{this.$route.query.row2.os_name}}  -->
              {{this.$store.state.os_contrast.os_name}}
            </el-col>
              <el-col :span="50">
                  OS版本号:
              </el-col>
              <el-col :span="50">
              {{this.$store.state.os_contrast.os_version}}
            </el-col>
      </el-row>
          <el-row>VS</el-row>
           <el-row class = "cat_opt" :gutter="20">
            <el-col :span="250">
            兼容性分析App名称:
            </el-col>
          <el-col :span="50">
         <!-- {{this.$route.query.row1.app_name}}  -->
           {{this.$store.state.app_contrast.app_name}}
        </el-col> 
             <el-col :span="250">
            App版本号:
            </el-col>
          <el-col :span="50">
         <!-- {{this.$route.query.row1.app_name}}  -->
           {{this.$store.state.app_contrast.app_version}}
        </el-col>  
        </el-row> 
    <!-- tab页签区域 -->
      <div class="container">
      <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
       <el-tab-pane label="不兼容库信息" name="Lib">
       <el-divider content-position="center" id="A">不兼容的库共计 <span style="color:green">{{this.totle1}}</span> 条具体如下</el-divider>
        <el-table ref="table1" :data="this.compatibleLibs" border stripe>
        <!-- <el-table-column type="index" width=" 70px" label="序号" :index='(index)=>{return (index+1) + (this.page1-1)*this.counts1  }' ></el-table-column> -->
        <el-table-column prop="no" label="序号" width="70"></el-table-column>
        <el-table-column prop="path" label="ELF文件缺失的库路径">
          <!-- <template slot-scope="scope">
	            	<el-button  type="text" size="small" @click="queryDepend(scope.row)">{{scope.row.depend_name}}</el-button>
	        	</template> -->
        </el-table-column>
        <el-table-column prop="libs" label="ELF文件缺失的库名称">
             <!-- <template slot-scope="scope">
            <el-button  type="text" size="small" @click="queryDepend(scope.row)">
                 <span v-html="cutout(scope.row.libs)"/>
            </el-button>
          </template> -->
        </el-table-column>
 <el-table-column label="详情" width="130px">
          <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              @click="queryDepend( scope.row)"
            >查看</el-button>
          </template>
 </el-table-column>
        <el-table-column  width="1" type="expand" >
                    <template >
                      <div>
                        <h3>所有依赖路径展示：</h3>
                        <ul>
                          <li v-for="(item,index) in this.numList ">
                            {{index+1}}.  {{item}}
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


       <el-tab-pane label="不兼容接口信息" name="depend_Info">
      <el-divider content-position="center" id="B">不兼容接口信息共计 <span style="color:green">{{this.totle2}}</span>  条具体如下</el-divider>
       <el-table :data="this.compatibleInts" border stripe>
        <!-- <el-table-column type="index" label="序号 "width=" 70px"  :index='(index)=>{return (index+1) + (this.page2-1)*this.counts2  }'></el-table-column> -->
       <el-table-column prop="no" label="序号" width="70"></el-table-column>
        <el-table-column prop="int_name" label="缺失接口名称"></el-table-column>
        <el-table-column prop="lib_path" label="缺失依赖接口的库文件的路径"></el-table-column>  
         <el-table-column prop="elf_path" label="缺失依赖接口的ELF文件的路径"></el-table-column>   
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

       <el-tab-pane label="不兼容内核模块信息" name="kernel_info">
      <el-divider content-position="center" id="C">内核模块不兼容信息共计 <span style="color:green">{{this.totle3}}</span>  条具体如下</el-divider>
       <el-table :data="this.kernel_info" border stripe>
        <!-- <el-table-column type="index" label="序号 "width=" 70px"  :index='(index)=>{return (index+1) + (this.page2-1)*this.counts2  }'></el-table-column> -->
       <el-table-column prop="no" label="序号" width="70"></el-table-column>
        <el-table-column prop="ko_name" label="内核模块名称"></el-table-column>
        <el-table-column prop="sym_name" label="符号名称"></el-table-column> 
         <el-table-column prop="reason" label="不兼容原因"></el-table-column>  
         <!-- <el-table-column prop="reason" label="不兼"></el-table-column>     -->
       </el-table> 
      <el-pagination
        @size-change="handleSizeChange3"
        @current-change="handleCurrentChange3"
        :current-page="this.page3"
        :page-sizes="[100, 400, 500, 1000]"
        :page-size="this.counts3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.totle3"
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
        totle1:0, 
        totle2:0,

        counts3:100,
        page3:1,
        totle3:0,
    
//表格列表数据
      compatibleLibs:[],
      compatibleInts:[],
      kernel_info:[],
      numList:[],

      number:0,//全局os_no序号
       index:0,
       row:{},
    }
  },

  created () {
    this.getData('A')
  },
  methods: {
   async queryDepend(row){
     console.log(row);
                const { data: res } = await this.$http.get('showAppDependList/',{
                  params:{
                    'app_no':this.$store.state.app_contrast.app_no,
                    'os_no':this.$store.state.os_contrast.os_no,
                    'path':row.path,
                    'name':row.libs
                  }
                }) 
              console.log(res.info);

//完成--> 数组格式转换
                var x = " ----> ";
                //  var reg = new RegExp("(" + x + ")", "g");
                  var a = res.info;
                  var ss = [];
                   for(var i in a) {
                        var s="";
                        a[i].forEach(e => {
                                  s = s +e+x;
                             });
                       var s1 = s.substring(0,s.length-6);
                        ss.push(s1);
                   }
   

            this.numList = ss
              // console.log(this.numList);
      
         const $table = this.$refs.table1
          //this.osList 是上面 data 中的 list   
          // 通过比对数据与行里的数据，对展开行进行控制，获取对应值
           this.compatibleLibs.map((item) => {
            if (row.no !== item.no) {
              $table.toggleRowExpansion(item, false)
            }
          })
          $table.toggleRowExpansion(row)
    },

    async getData (a) {
                if(a=='A'){
                    const { data: res } =  await  this.$http.get('showUnCompatibleLibs/' ,{
                        params:{
                          // 'os':this.$route.query.row2.os_no,
                          // 'app':this.$route.query.row1.app_no,
                          'os':this.$store.state.os_contrast.os_no,
                            'app':this.$store.state.app_contrast.app_no, 
                          'page':this.page1,
                          'counts':this.counts1
                        }
                     })
                     console.log(res.info);
                    if (res.status == 201) {
                      return this.$message.success('没有不兼容的库')
                    }
                     if(res.status == 401){
                      return this.$message.success('未对比过，无数据');
                    }
                  this.compatibleLibs = res.info
                  this.totle1 = res.length
                } else if(a=='B'){
                   const { data: res } = await this.$http.get('showUnCompatibleInts/',{
                      params:{
                        'os':this.$store.state.os_contrast.os_no,
                        'app':this.$store.state.app_contrast.app_no, 
                        'page':this.page2,
                        'counts':this.counts2
                      }
                   })
                     if (res.status == 201) {
                      return this.$message.success('没有不兼容的接口')
                    }
                     if(res.status == 401){
                      return this.$message.success('未对比过，无数据');
                    }
                  this.compatibleInts = res.info
                  this.totle2 = res.length  
                }else if(a=='C'){
                   const { data: res } = await this.$http.get('showUnCompatibleKos/',{
                      params:{
                        'os':this.$store.state.os_contrast.os_no,
                        'app':this.$store.state.app_contrast.app_no, 
                        'page':this.page3,
                        'counts':this.counts3
                      }
                   })
                   console.log(res);
                     if (res.status == 201) {
                      return this.$message.success('没有不兼容的接口')
                    }
                     if(res.status == 401){
                      return this.$message.success('未对比过，无数据');
                    }
                  this.kernel_info = res.info
                  this.totle3 = res.length  
                }
    },

    handleTabsClick(){
      if(this.activeTabsName === 'depend_Info'){
        this.getData('B')
      }else if(this.activeTabsName ==='Lib'){
        this.getData('A')
      }if(this.activeTabsName ==='kernel_info'){
        this.getData('C')
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

     cutout (a) {
       var s="";
       for(var i in a) {
         a[i]+=',';
         s+=a[i];
       }
       var s1 = s.substring(0,s.length-1);
       return s1;
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

