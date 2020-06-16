<template>
  <!-- 容器 -->
  <div class="container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="login_pic">
        <img src="./../assets/two.jpg" alt="">
      </div>
      <!-- 用户密码区域 -->
      <div class="other">
        <!-- 表单区域 -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="username" class="loginForm">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="loginForm">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-star-on" type="password"></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮区域 -->
        <el-button type="primary" @click="submitForm" class="button1">提交</el-button>
        <el-button type="info" @click="resetForm" class="button2">重置</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      //  登录账号密码伪数据
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //  登录账号密码表单验证
      loginRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  登录按钮
    submitForm () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        //  假判断，自定义
        console.log("in")
        axios.post("/mall/login",{
            username:this.loginForm.username,
            password:this.loginForm.password
        }).then((response)=>{
            let res=response.data;
            if(res.status=="0"){
                this.$router.push("/back")
                this.$message({
                    duration:1000,
                    message:"登录成功",
                    type:'success'
                })
            }else{
                this.$message.error("密码错误")
            }
        })
      })
    },
    //  重置按钮
    resetForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style scoped>
.container {
  height:722Px;
  background-color:#545C64;
}
.login_box {
  width: 600Px;
  height: 380Px;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5%;
  border:1Px grey solid;
}
.login_pic {
  width: 200Px;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_pic img{
   width: 200Px;
  height: 200Px;
  margin-left:20Px;
  margin-top:-10Px;
}
.other {
  width: 400Px;
  height: 100%;
  float: left;
}
.loginForm {
  width: 300Px;
  margin-top: 70Px;
  margin-left: 30Px;
}
.button1 {
  margin-left: 60Px;
  margin-top: 20Px;
}
.button2 {
  margin-left: 60Px !important;
}
</style>
