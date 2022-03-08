<template>
  <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>操作系统指纹 </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/zhiwen1'}">操作系统指纹及相关信息</el-breadcrumb-item>
      <el-breadcrumb-item>操作系统采集</el-breadcrumb-item>
    </el-breadcrumb>
  
      <el-card>
        <el-alert title="扫描步骤中 绿色表示完成此功能扫描 黑色表示未进行此操作" type="info" center show-icon :closable="false"></el-alert>
        <div style="margin-top: 15px;text-align: center">
        当前准备进行信息扫描的操作系统名称：{{this.$store.state.osName}}
      </div>
      <el-steps :active="this.$store.state.activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="系统挂载"></el-step>
        <!-- <!-- <el-step title="依赖库扫描"></el-step> -->
        <el-step title="系统扫描"></el-step> 
        <el-step title="完成"></el-step>
      </el-steps>
<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->

<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="OS名称" prop="os_name"  >
    <!-- <el-input v-model="ruleForm.os_name"></el-input> -->
    <el-select v-model="ruleForm.os_name">
      <el-option  v-for="(item,index) in menuList" :key="index" :value="item.NameZhtw">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="OS架构" prop="os_architecture">
    <el-input v-model="ruleForm.os_architecture"></el-input>
  </el-form-item> 
  
   <el-form-item label="OS版本" prop="os_version">
    <el-input v-model="ruleForm.os_version"></el-input>
  </el-form-item>

  <el-form-item label="OS制造商" prop="os_manufacturer">
    <el-input v-model="ruleForm.os_manufacturer"></el-input>
  </el-form-item>

    <el-form-item label="OS处理器" prop="os_processor">
    <el-input v-model="ruleForm.os_processor"></el-input>
  </el-form-item>

  <el-form-item label="镜像类型" prop="flag">
    <el-select v-model="ruleForm.flag" placeholder="">
      <el-option label="客户端镜像"value="1"></el-option>
      <el-option label="服务器镜像" value="0"></el-option>
    </el-select>
  </el-form-item>
  
  <el-form-item label="服务器类型" prop="ser_type"  >
    <el-select v-model="ruleForm.ser_type" :disabled = "ruleForm.flag === '0'? false : true ">
      <el-option  v-for="(item,index) in menuList_1" :key="index" :value="item">
      </el-option>
    </el-select>
  </el-form-item>

  <el-form-item>
     <el-button type="info"@click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">开始扫描</el-button>
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
   name:'os1',
   store,
    data() {
      return {
            store:this.$store.state,
        ruleForm: {
          os_name: this.$store.state.os_name,
          flag: '',
          os_processor: '',
          os_manufacturer: '',    
          os_version: '',
          os_architecture:'',
          ser_type:''
        },
        // status:1,
        // status1:1,
        // status2:1,
        menuList:  [],
        menuList_1:[],
        // NameZhtw:'haha',
        // activeIndex: '0',
        rules: {
          os_name: [
            { required: true, message: '请输入OS名称', trigger: 'blur' },
          ],
          flag: [
            { required: true, message: '请选择镜像类型', trigger: 'change' }
          ],
        }
      };
    },

  created () {
    this.getMenuList();
    this.getMenuList_1()
  },
  watch:{
    'ruleForm.os_name':{
    handler(a,b){
      this.$store.state.os_name = this.ruleForm.os_name
      this.$store.state.activeIndex='0'
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
        const { data: res } = await this.$http.get('getOsName/')
        this.menuList =  [{ NameZhtw : res.name} ]
        // console.log(this.showFullScreenLoading);
      },
    async getMenuList_1 () {
        const { data: res } = await this.$http.get('getSerType/')
        // this.menuList_1 =  [{ name_1 : res.type}]
        this.menuList_1 = res.type
        //  console.log(res);
      },


      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(2);
                  this.$store.state.activeIndex = '1' 
                  const { data: res } = await this.$http.get('moveOsDisk/', { params:this.ruleForm})
                  // console.log(this.ruleForm.flag);

                  if (res.status!== 200) {
                              return this.$message.error('挂载失败')
                    }else{
                          this.scan();
                              //  this.$store.state.activeIndex = '2'
                              // const { data: res } = await this.$http.get('scanLib')
                              // if(res.status == 200){
                               
                              //   this.$store.state.activeIndex = '4' 
                              //   return this.$message.success('扫描成功') 
                              // }
                    }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm.os_name = ''
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      },

      async scan(){
                    this.$store.state.activeIndex = '2'
                     const { data: res } = await this.$http.get('scanLib',{ params:this.ruleForm.flag})//改动参数 
                      if(res.status == 200){
                                this.$store.state.activeIndex = '4' 
                                return this.$message.success('扫描成功') 
                           }else{
                             return this.$message.error('扫描失败')
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
