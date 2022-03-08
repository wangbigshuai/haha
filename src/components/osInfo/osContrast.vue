<template>
  <div  >


   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>操作系统指纹 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen1'}">操作系统指纹及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>OS对比</el-breadcrumb-item>
    </el-breadcrumb>


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
                  基准操作系统OS名称:
              </el-col>
              <el-col :span="50">
              <!-- {{this.$route.query.row1.os_name}}  -->
              {{this.$store.state.contrast_row1.os_name}}
            </el-col>
                  <el-col :span="50">
                OS版本号:
              </el-col>
              <el-col :span="50">
              <!-- {{this.$route.query.row1.os_name}}  -->
              {{this.$store.state.contrast_row1.os_version}}
            </el-col>
      </el-row>
          <el-row>VS</el-row>
           <el-row class = "cat_opt" :gutter="20">
            <el-col :span="50">
            对比操作系统OS名称:
            </el-col>
          <el-col :span="50">
             {{this.$store.state.contrast_row2.os_name}}
        </el-col>
            <el-col :span="50">
            OS版本号:
            </el-col>
          <el-col :span="50">
             {{this.$store.state.contrast_row2.os_version}}
        </el-col> 
        
        
        </el-row>  
    <!-- tab页签区域 -->
      <div class="container">
      <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
       <el-tab-pane label="相同库" name="common_Lib">
       <el-divider content-position="center" id="A">操作系统提供的相同库文件共计 <span style="color:green">{{this.Lib1.totle1}}</span> 条具体如下</el-divider>
         <el-table :data="this.commonLib" border stripe>
            <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width="70"  :index="this.page_flag === true ?  (index)=>{return (index+1) + (this.Lib1.page1-1)*this.Lib1.counts1 } : index"></el-table-column> -->
        <el-table-column prop="lib_name1" label="库名称"></el-table-column>
        <el-table-column prop="lib_path1" label="库路径-基准OS"></el-table-column>
        <!-- <el-table-column prop="lib_version" label="库路径"></el-table-column> -->
       <!-- <el-table-column prop="lib_name2" label="库路径-对比OS"></el-table-column> -->
        <el-table-column prop="lib_path2" label="库路径-对比OS"></el-table-column> 
       </el-table>
        <el-pagination
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
            :current-page="this.Lib1.page1"
            :page-sizes="[100, 400, 1000, 2000]"
            :page-size="this.Lib1.counts1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.Lib1.totle1"
          ></el-pagination>
        </el-tab-pane>
    </el-tab-pane>
       <el-tab-pane label="增加库" name="add_lib">
      <el-divider content-position="center" id="B">对比的操作系统增加库文件共计 <span style="color:green">{{this.Lib2.totle2}}</span>  条具体如下</el-divider>
       <el-table :data="this.addLib" border stripe>
            <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width="70" :index="(index)=>{return (index+1) + (this.Lib2.page2-1)*this.Lib2.counts2  }"></el-table-column> -->
        <el-table-column prop="lib_name" label="库名称"></el-table-column>
        <el-table-column prop="lib_path" label="库路径"></el-table-column>
       </el-table> 
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="this.Lib2.page2"
        :page-sizes="[100, 400, 8000, 10000]"
        :page-size="this.Lib2.counts2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.Lib2.totle2"
      ></el-pagination>
        </el-tab-pane>

      <el-tab-pane label="减少库" name="sub_lib">
       <el-divider content-position="center" id="C">操作系统比对比系统多的库文件共计 <span style="color:green">{{this.Lib3.totle3}}</span> 条具体如下</el-divider>
     <el-table :data="this.subLib" border stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
           <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index="(index)=>{return (index+1) + (this.Lib3.page3-1)*this.Lib3.counts3 }"></el-table-column> -->
        <el-table-column prop="lib_name" label="库名称"></el-table-column>
        <el-table-column prop="lib_path" label="库路径-基准OS"></el-table-column>
       </el-table> 
       
      <el-pagination
        @size-change="handleSizeChange3"
        @current-change="handleCurrentChange3"
        :current-page="this.Lib3.page3"
        :page-sizes="[100,400, 1000, 8000]"
        :page-size="this.Lib3.counts3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.Lib3.totle3"
      ></el-pagination>
      </el-tab-pane>

  <el-tab-pane label="升级库" name="up_lib">
       <el-divider content-position="center" id="C">两个系统相同库共计 <span style="color:green">{{this.Lib4.totle4}}</span> 条具体如下</el-divider>
       <el-table :data="this.upLib" border stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
           <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index="(index)=>{return (index+1) + (this.Lib4.page4-1)*this.Lib4.counts4 }"></el-table-column> -->
        <el-table-column prop="lib_name1" label="基准库名称"></el-table-column>
        <el-table-column prop="lib_path1" label="基准库路径"></el-table-column>
          <el-table-column prop="lib_name2" label="对比库名称"></el-table-column>
          <el-table-column prop="lib_path2" label="对比库路径"></el-table-column>  
       </el-table>
           <el-pagination
            @size-change="handleSizeChange4"
            @current-change="handleCurrentChange4"
            :current-page="this.Lib4.page4"
            :page-sizes="[100, 400, 1000, 2000]"
            :page-size="this.Lib4.counts4"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.Lib4.totle4"
          ></el-pagination>
  </el-tab-pane>

  <el-tab-pane label="相同接口" name="common_int">
       <el-divider content-position="center" id="C">操作系统提供的相同接口共计 <span style="color:green">{{this.Lib5.totle5}}</span> 条具体如下</el-divider>
       <el-table :data="this.commonInt" border stripe>
        <!-- stripe: 斑马条纹
        border：边框-->
           <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index="(index)=>{return (index+1) + (this.Lib5.page5-1)*this.Lib5.counts5 }"></el-table-column> -->
        <el-table-column prop="int_name1" label="基准接口名"></el-table-column>
        <el-table-column prop="lib_path1" label="基准接口路径"></el-table-column>
        <el-table-column prop="int_name2" label="对比接口名"></el-table-column>
        <el-table-column prop="lib_path2" label="对比接口路径"></el-table-column> 
       </el-table> 
           <el-pagination
            @size-change="handleSizeChange5"
            @current-change="handleCurrentChange5"
            :current-page="this.Lib5.page5"
            :page-sizes="[100, 400, 1000, 2000]"
            :page-size="this.Lib5.counts5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.Lib5.totle5"
          ></el-pagination>
  </el-tab-pane>

    <el-tab-pane label="增加接口" name="add_int">
       <el-divider content-position="center" id="C">对比操作系统提供的增加接口共计 <span style="color:green">{{this.Lib6.totle6}}</span> 条具体如下</el-divider>
     <el-table :data="this.addInt" border stripe>
          <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index="(index)=>{return (index+1) + (this.Lib6.page6-1)*this.Lib6.counts6 }"></el-table-column> -->
        <!-- <el-table-column prop="lib_no" label="序号" width="70"></el-table-column> -->
        <el-table-column prop="int_name1" label="对比操作系统接口名"></el-table-column>
        <el-table-column prop="lib_path1" label="对比操作系统接口路径"></el-table-column>
       </el-table> 
           <el-pagination
            @size-change="handleSizeChange6"
            @current-change="handleCurrentChange6"
            :current-page="this.Lib6.page6"
            :page-sizes="[100, 400, 1000, 2000]"
            :page-size="this.Lib6.counts6"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.Lib6.totle6"
          ></el-pagination>
  </el-tab-pane>

    <el-tab-pane label="减少接口" name="sub_int">
       <el-divider content-position="center" id="C">操作系统提供的减少接口共计 <span style="color:green">{{this.Lib7.totle7}}</span> 条具体如下</el-divider>
      <el-table :data="this.subInt" border stripe>
           <el-table-column prop="no" label="序号" width="70px"></el-table-column> 
        <!-- <el-table-column type="index" label="序号" width=" 70px"  :index="(index)=>{return (index+1) + (this.Lib7.page7-1)*this.Lib7.counts7 }"></el-table-column> -->
        <!-- <el-table-column prop="lib_no" label="序号" width="70"></el-table-column> -->
        <el-table-column prop="int_name1" label="基准操作系统接口名称"></el-table-column>
        <el-table-column prop="lib_path1" label="基准操作系统接口库路径"></el-table-column>
       </el-table> 
           <el-pagination
            @size-change="handleSizeChange7"
            @current-change="handleCurrentChange7"
            :current-page="this.Lib7.page7"
            :page-sizes="[100, 400, 1000, 2000]"
            :page-size="this.Lib7.counts7"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.Lib7.totle7"
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
    
        // params:{
        //                'os1':this.$route.query.row1.os_no,
        //                'os2':this.$route.query.row2.os_no,
        //                'page':1,
        //                'counts':100
        //               },
      //激活标签名称
       activeTabsName: 'common_Lib',
       Lib1:{     
              page1: 1,
              counts1: 100 ,
              totle1:0, 
       },
       Lib2:{     
              page2: 1,
              counts2: 100 ,
              totle2:0, 
       }, 
     Lib3:{     
              page3: 1,
              counts3: 100 ,
              totle3:0, 
       },
     Lib4:{     
              page4: 1,
              counts4: 100 ,
              totle4:0, 
       },
     Lib5:{     
              page5: 1,
              counts5: 100 ,
              totle5:0, 
       },
       Lib6:{     
              page6: 1,
              counts6: 100 ,
              totle6:0, 
       },
       Lib7:{     
              page7: 1,
              counts7: 100 ,
              totle7:0, 
       },
      commonLib:[],
      addLib:[],
      subLib:[],
      upLib:[],
      commonInt:[],
      addInt:[],
      subInt:[],

      page_flag:true
  
    }
  },

  created () {
    this.getData('A')
 
  },

  methods: {
 async getData (a) {
     console.log(this.Lib1.page1);
                if(a=='A'){
                  console.log(this.Lib1.page1+'  '+this.Lib1.counts1);
                    const { data: res } =  await  this.$http.get('showCommonLib/' ,{
                        params:{
                      //  'os1':this.$route.query.row1.os_no,
                      //  'os2':this.$route.query.row2.os_no,
                        'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib1.page1,
                       'counts':this.Lib1.counts1
                      }
                     })
                    //  console.log(res.lib_info);
                    // if (res.status !== 200) {
                    //   return this.$message.error('对比信息失败！')
                    // }
                  // let obj = JSON.parse(res.lib_info);    
                
                this.commonLib = res.lib_info
                  this.Lib1.totle1 = res.length
                    this.paga_flag = true
                } else if(a=='B'){
                   const { data: res } = await this.$http.get('showAddLib/' ,{
                      params:{
                        'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib2.page2,
                       'counts':this.Lib2.counts2
                      }
                   })
                  // if (res.status !== 200) {
                  //   return this.$message.error('对比信息失败')
                  // }
                  this.addLib = res.lib_info
                  this.Lib2.totle2 = res.length  
                } else if(a=='C'){
                  const { data: res } = await this.$http.get('showSubLib/' ,{
                    params:{
                          'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib3.page3,
                       'counts':this.Lib3.counts3
                      }
                  })
                  // if (res.status !== 200) {
                  //   return this.$message.error('对比信息失败')
                  // }
                  this.subLib = res.lib_info
                  this.Lib3.totle3 = res.length  
                  }
                else if(a=='D'){
                  const { data: res } = await this.$http.get('showUpLib/' ,{
                    params:{
                         'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib4.page4,
                       'counts':this.Lib4.counts4
                      }
                  })
                  console.log(res);
                  // if (res.status !== 200) {
                  //   return this.$message.error('对比信息失败')
                  // }
                  this.upLib = res.lib_info
                  this.Lib4.totle4 = res.length  
                }else if(a=='E'){
                  const { data: res } = await this.$http.get('showCommonInt/' ,{
                    params:{
                         'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib5.page5,
                       'counts':this.Lib5.counts5
                      }
                  })
                  // if (res.status !== 200) {
                  //   return this.$message.error('对比信息失败')
                  // }
                 
                  this.commonInt = res.int_info
                  this.Lib5.totle5 = res.length  
                }else if(a=='F'){
                  const { data: res } = await this.$http.get('showAddInt/' ,{
                    params:{
                        'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib6.page6,
                       'counts':this.Lib6.counts6
                      }
                  })
                  // if (res.status !== 200) {
                  //   return this.$message.error('对比信息失败')
                  // }
                      console.log(res);
                  this.addInt = res.int_info
                  this.Lib6.totle6 = res.length  
                }else if(a=='G'){
                  const { data: res } = await this.$http.get('showSubInt/' ,{
                    params:{
                         'os1': this.$store.state.contrast_row1.os_no,
                        'os2': this.$store.state.contrast_row2.os_no,
                       'page':this.Lib7.page7,
                       'counts':this.Lib7.counts7
                      }
                  })
              
                  // if (res.status !== 200) {
                  //   console.log(res.status);
                  //   return this.$message.error('对比信息失败')
                  // }
                  // console.log(res.int_info);
                  this.subInt = res.int_info
                  this.Lib7.totle7 = res.length  
                }
    },



    handleTabsClick(){
      if(this.activeTabsName === 'common_lib'){
        this.getData('A')
      } else if(this.activeTabsName ==='add_lib'){
        this.getData('B')
      }else if(this.activeTabsName ==='sub_lib'){
        this.getData('C')
      }else if(this.activeTabsName ==='up_lib'){
        this.getData('D')
      }else if(this.activeTabsName ==='common_int'){
        this.getData('E')
      }else if(this.activeTabsName ==='add_int'){
        this.getData('F')
      }else if(this.activeTabsName ==='sub_int'){
        this.getData('G')
      }
    },
  
    //监测页面值改变
    handleSizeChange1(newSize) {
      
       this.Lib1.counts1 = newSize
      this.getData('A')
    },
    //监测当前页嘛值
    handleCurrentChange1(newSize) {
     
       this.Lib1.page1 = newSize
      console.log(this.Lib1.page1);
       this.getData('A')
    },

    handleSizeChange2 (newSize) {
      this.Lib2.counts2 = newSize
      this.getData('B')
    },
    handleCurrentChange2 (newSize) {
          this.Lib2.page2 = newSize
       this.getData('B')
    },

      handleSizeChange3 (newSize) {
          this.Lib3.counts3 = newSize
      this.getData('C')
    },
    handleCurrentChange3 (newSize) {
             this.Lib3.page3 = newSize
       this.getData('C')
    },

   handleSizeChange4 (newSize) {
      this.Lib4.counts4 = newSize
      this.getData('D')
    },
    handleCurrentChange4 (newSize) {
             this.Lib4.page4 = newSize
       this.getData('D')
    },
   handleSizeChange5 (newSize) {
        this.Lib5.counts5 = newSize
      this.getData('E')
    },
    handleCurrentChange5 (newSize) {
        this.Lib5.page5 = newSize
       this.getData('E')
    },
   handleSizeChange6 (newSize) {
          this.Lib6.counts6 = newSize
      this.getData('F')
    },
    handleCurrentChange6 (newSize) {
           this.Lib6.page6 = newSize
       this.getData('F')
    },
   handleSizeChange7 (newSize) {
      this.Lib7.counts7 = newSize
      this.getData('G')
    },
    handleCurrentChange7 (newSize) {
        this.Lib7.page7 = newSize
       this.getData('G')
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
  }
}

</script>

<style scope Lang="scss">

 .wraper {
        height: 100vh;
        overflow-x: hidden;
 }
</style>
