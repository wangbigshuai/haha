<template>
  <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用程序指纹 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen2'}">应用程序及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>app应用程序采集</el-breadcrumb-item>
    </el-breadcrumb>
  
      <el-card>
        <el-alert title="扫描步骤中 绿色表示完成此功能扫描 黑色表示未进行此操作" type="info" center show-icon :closable="false"></el-alert>
        <div style="margin-top: 15px;text-align: center">
        当前准备进行信息扫描的app应用名称：{{this.$store.state.osName}}
      </div>
      <el-steps :active="this.activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="正在扫描"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" >
  
  <el-form-item label="app名称" prop="app_name"  >
    <!-- <el-input v-model="ruleForm.os_name"></el-input> -->
    <!-- <el-select v-model="ruleForm.app_name"> -->
      <!-- <el-option  v-for="(item,index) in menuList" :key="index" :value="item.NameZhtw"> -->
            <el-input v-model="ruleForm.app_name" placeholder="后缀请以deb或者rpm结尾"></el-input>
      <!-- </el-option> -->
    <!-- </el-select> -->
  </el-form-item>

   <el-form-item label="app版本" prop="app_version" label-width="80px" >
    <el-input v-model="ruleForm.app_version"></el-input>
  </el-form-item>

  <el-form-item>
      <el-button type="info"@click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">开始扫描</el-button>
    </el-form-item>
  </el-form>
 </el-card>
  </div>
</template>

<script>
import store from "../../store/index"

 export default {
   name:'os1',
   store,
    data() {
      return {
        store:this.$store.state,
        ruleForm: {
          app_name: this.$store.state.app_name,
          app_version: this.$store.state.app_version,
        },
        // status:1,
        // status1:1,
        // status2:1,
        menuList:  [],
        // NameZhtw:'haha',
         activeIndex: this.$store.state.activeIndex_app,
        rules: {
          app_name: [
            { required: true, message: '请输入app名称', trigger: 'blur' },
          ],
          app_version: [
            { required: true, message: '请输入app版本号', trigger: 'blur' }
          ],
        }
      };
    },

  created () {
    this.getMenuList()
  },
  watch:{
    'ruleForm.app_name':{
    handler(a,b){
      this.$store.state.app_name = this.ruleForm.app_name
    
  },
},
  'ruleForm.app_version':{
    handler(a,b){
     this.$store.state.app_version = this.ruleForm.app_version 
     
    }
  },
  'activeIndex':{
    handler(a,b){
      this.$store.state.activeIndex_app = this.activeIndex
    }
  },
    immediate: true,
    deep:true
  },
 
    methods: {
    // next() {
    //     // if (this.activeIndex ++ > 4) this.activeIndex = 4;
    //   },
    //获取操作系统列表名
        async getMenuList () {
        // const { data: res } = await this.$http.get('getAppName')
        // this.menuList =  [{ NameZhtw : res.name} ,{NameZhtw:'hahha'}]
        // console.log(this.$store.state.app_name);
        this.menuList = [{NameZhtw:'hahha'}]
      },

      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
        if (valid) {
                  
                  const { data: res } = await this.$http.get('appScan/', { params:this.ruleForm}) 
                   this.activeIndex = 2
                  if (res.status == 200) {
                            this.activeIndex = 3 
                              return this.$message.success('扫描成功，删除安装包成功')
                    }else if(res.status == 201){
                      this.activeIndex = 3 
                    return this.$message.success('扫描成功，但是删除安装失败')
                    }else if(res.status == 400){
                      this.activeIndex = 0
                      return this.$message.error('安装包格式错误，只能扫描deb或者rpm') 
                    }else if(res.status == 401){
                      this.activeIndex = 0
                       return this.$message.success('扫描过了，不要重复扫描')  
                    }
          } else {
            return this.$message.success('请完成表单数据再进行提交')  ;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.activeIndex = 0
        this.ruleForm.app_name =''
        this.ruleForm.app_version = ''
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      },
    },
  }
</script>

<style Lang="less" scope>
.el-steps {
  margin:15px 0;
}
</style>
