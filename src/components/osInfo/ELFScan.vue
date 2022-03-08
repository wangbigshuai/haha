<template>
  <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>二进制包 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen1'}">二进制包及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>二进制包采集</el-breadcrumb-item>
    </el-breadcrumb>
  
      <el-card>
        <el-alert title="扫描步骤中 绿色表示完成此功能扫描 黑色表示未进行此操作" type="info" center show-icon :closable="false"></el-alert>
        <div style="margin-top: 15px;text-align: center">
        当前准备进行信息扫描的二进制包名称：{{this.$store.state.osName}}
      </div>
      <el-steps :active="this.$store.state.activeIndex1 - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="二进制解压"></el-step>
        <el-step title="二进制扫描"></el-step> 
        <el-step title="完成"></el-step>
      </el-steps>
<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
  <el-form-item label="光盘名称" prop="os_name"  >
    <!-- <el-input v-model="ruleForm.os_name"></el-input> -->
    <el-input v-model="ruleForm.os_name"></el-input>
  </el-form-item>

  <el-form-item label="系统架构" prop="os_architecture">
    <el-input v-model="ruleForm.os_architecture"></el-input>
  </el-form-item> 
  
   <el-form-item label="系统版本" prop="os_version">
    <el-input v-model="ruleForm.os_version"></el-input>
  </el-form-item>

  <el-form-item label="系统厂商" prop="os_manufacturer">
    <el-input v-model="ruleForm.os_manufacturer"></el-input>
  </el-form-item>

    <el-form-item label="系统处理器" prop="os_processor">
    <el-input v-model="ruleForm.os_processor"></el-input>
  </el-form-item>

  <el-form-item label="安装包类型" prop="type">
    <el-select v-model="ruleForm.type" placeholder="">
      <el-option label="deb" value="1"></el-option>
      <el-option label="rpm" value="0"></el-option>
    </el-select>
  </el-form-item>
  
  <el-form-item label="光盘路径" prop="path"  >
      <el-input v-model="ruleForm.path"></el-input>
  </el-form-item>

  <el-form-item>
     <el-button type="info"@click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">解压</el-button>
      <el-button type="success" :disabled="this.$store.state.status1 == 0 ? true:false" @click="BinaryScan">扫描</el-button>
    <!-- <el-button type="warning" :disabled="this.$store.state.status== 1?true:false" @click="depend">依赖库扫描</el-button>
    <el-button type="success" :disabled="this.$store.state.status1 == 1?true:false" @click="interface">接口扫描</el-button>
           <el-tooltip
              class="item"
              effect="dark"
              content="请在完成接口扫描和依赖库扫描后在执行删除"
              :enterable="false"
              placement="top"
            >
    <el-button type="danger" :disabled="this.$store.state.status2 == 1 ?true:false" @click="deleteos">删除</el-button> </el-tooltip> -->
    </el-form-item>
  </el-form>
 </el-card>
  </div>
</template>

<script>
import store from "../../store/index"

 export default {
   name:'ELF1',
   store,
    data() {
      return {
        store:this.$store.state,
        ruleForm: {
          os_name: '',
          flag: '',
          os_processor: '',
          os_manufacturer: '',    
          os_version: '',
          os_architecture:'',
          path:'',
          type:''
        },
        // status1:0,
        // status1:1,
        // status2:1,
        // menuList:  [],
        // menuList_1:[],
        // NameZhtw:'haha',
        activeIndex: this.$store.state.activeIndex1,
        rules: {
          os_name: [
            { required: true, message: '请输入光盘名称', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          path: [
            { required: true, message: "不能为空", trigger: 'change' }
          ],

        }
      };
    },

//   created () {

//   },
  watch:{
    'ruleForm.os_name':{
    handler(a,b){
      this.$store.state.activeIndex1='0'
  }
},
    immediate: true,
    deep:true
  },
 
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
        if (valid) {
                  this.$store.state.activeIndex1 = '1' 
                  const { data: res } = await this.$http.get('scanBinaryPackage/', { params:this.ruleForm})
                  console.log(this.ruleForm);
                  if (res.status!== 200) {
                              return this.$message.error('解压失败')
                    }else{
                               this.$store.state.activeIndex1 = '2'
                               this.$store.state.status1 = 1
                              return this.$message.success('扫描成功') ;
                    }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm = {}
        this.$store.state.activeIndex1 = '0'
        
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      },

      async BinaryScan(){
                    this.$store.state.activeIndex1 = '3'
                     const { data: res } = await this.$http.get('scanBinaryLib')//改动参数 
                      if(res.status == 200){
                                this.$store.state.activeIndex1 = '4' 
                                return this.$message.success('完成存储') 
                           }else{
                             return this.$message.error('存储失败')
                         }
      }




    //  async  depend(){
    //          const { data: res } = await this.$http.get('dependLib') 
    //           if (res.status == 200) {
    //                this.$store.state.status1 = 0
    //               this.$store.state.activeIndex = '3'
    //               return this.$message.success('  依赖库扫描成功')
    //       }else if(res.status == 400){
    //         return this.$message.error('依赖库扫描失败')
    //       }else{
    //         return this.$message.error('中间换过镜像，最好中止扫描，仔细检查当前镜像是否与解压到/usr/local/unquashfs文件夹的镜像一致')
    //       }
    //   },
  //    async interface(){
  //      const { data: res } = await this.$http.get('scanInt')  
  //      if(res.status == 200){
  //        this.$store.state.status2 = 0
  //        this.$store.state.activeIndex = '5'
  //        return this.$message.success('接口扫描成功') 
  //      }
  //     },
  //  async  deleteos(){
  //       const { data: res } = await this.$http.get('deleteOs')  
  //       if(res.status == 200){
  //         this.ruleForm.os_name = ''
  //          return this.$message.success('删除成功') 
  //      }
  //   }
    },
  }
</script>

<style Lang="less" scope>
.el-steps {
  margin:15px 0;
}

</style>
