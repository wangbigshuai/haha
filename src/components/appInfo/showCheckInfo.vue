<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息查看 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen2'}">应用程序及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>系统对比展示</el-breadcrumb-item>
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
        <el-col :span="20">
         <!-- App名称：{{this.$route.query.a.app_name}} OS版本号：{{this.$route.query.a.app_version}}  -->
         <strong>App名称</strong>：{{this.$store.state.check.app_name}} 
        </el-col>
      </el-row>
      <el-row>
         <el-col :span="12">
         <!-- 操作系统1名称：{{this.$store.state.selections[0].os_name}} -->
         <strong>操作系统1名称：</strong>{{this.a}}
        </el-col>
             <el-col :span="12">
        <strong>操作系统2名称：</strong>{{this.b}}
        </el-col>
      </el-row> 
    <!-- tab页签区域 -->

    
      <div class="container">
        
      <el-tabs v-model="activeTabsName" @tab-click="handleTabsClick">
      <el-tab-pane label="库对比信息" name="Lib">
    <el-row :gutter="12">
          <el-col :span="8">
        <el-card shadow="always">
       <el-divider content-position="center" id="A">OS1额外缺失库 </el-divider>
     <div>
      <ul>
        <li v-for="(item,index) in this.add">
          {{index+1}}.   {{item}}
        </li>
      </ul>
    </div>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
  <el-divider content-position="center" id="A"> 公共缺失库 </el-divider>
     <div>
      <ul>
        <li v-for="(item,index) in this.com">
          {{index+1}}.   {{item}}
        </li>
      </ul>
    </div> 
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="never">
         <el-divider content-position="center" id="A">OS2额外缺失库 </el-divider>
              <div>
              <ul>
                <li v-for="(item,index) in this.sub">
                  {{index+1}}.   {{item}}
                </li>
              </ul>
            </div>
    </el-card>
  </el-col>
</el-row>
    </el-tab-pane>

      <el-tab-pane label="接口对比信息" name="Int">
    <el-row :gutter="12">
          <el-col :span="8">
        <el-card shadow="always">
       <el-divider content-position="center" id="A">OS1额外缺失接口 </el-divider>
     <div>
      <ul>
        <li v-for="(item,index) in this.add">
          {{index+1}}.   {{item}}
        </li>
      </ul>
    </div>
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="hover">
  <el-divider content-position="center" id="A"> 公共缺失接口 </el-divider>
     <div>
      <ul>
        <li v-for="(item,index) in this.com">
          {{index+1}}.   {{item}}
        </li>
      </ul>
    </div> 
    </el-card>
  </el-col>
  <el-col :span="8">
    <el-card shadow="never">
         <el-divider content-position="center" id="A">OS2额外缺失接口 </el-divider>
              <div>
              <ul>
                <li v-for="(item,index) in this.sub">
                  {{index+1}}.   {{item}}
                </li>
              </ul>
            </div>
    </el-card>
  </el-col>
</el-row>
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
       a:'',
       b:'',

      com: [], 
      add:[],
      sub:[],
    
    }
  },

  created () {
    this.getData('A')
    // console.log(this.$route.query.a);
  },
  methods: {
    async getData (a) {
      // console.log(this.$store.state.app_con);
                if(a=='A'){
                  
                    const { data: res } =  await  this.$http.get('showAppDiffLib/' ,{
                        params:{
                          'os1':this.$store.state.selections[0].os_no,
                          'app':this.$store.state.check.app_no,
                          'os2':this.$store.state.selections[1].os_no,
                        }
                     })
                     console.log(res);  
                    
                    this.a = res.os1;
                    this.b = res.os2;
                  this.com = res.com;
                  this.add = res.add;
                  this.sub = res.sub;
             
                
                } else if(a=='B'){
                          const { data: res } =  await  this.$http.get('showAppDiffInt/' ,{
                        params:{
                          'os1':this.$store.state.selections[0].os_no,
                          'app':this.$store.state.check.app_no,
                          'os2':this.$store.state.selections[1].os_no,
                        }
                     })
                    //  console.log(res);  
                    
                    this.a = res.os1;
                    this.b = res.os2;
                  this.com = res.com;
                  this.add = res.add;
                  this.sub = res.sub;
                
                } 
       
    },

    handleTabsClick(){
      if(this.activeTabsName === 'Int'){
        this.getData('B')
      } else  if(this.activeTabsName ==='Lib'){
        this.getData('A')
      }
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

