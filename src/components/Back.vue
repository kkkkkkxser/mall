<template>
  <div>
    <el-container>
      <!-- 头部 -->
   <el-header height="113Px">
        <!-- 头部图标 -->
        <div class="head">
          <a href="javascript:avoid(0)" class="head-image">
          </a>
        </div>
        <div class="text">
          <a href="javascript:avoid(0)" >后台管理系统</a>
        </div>
        <div class="exit">
          <el-button type="info" style="width:120Px;height:50Px;" @click="toBack">退出</el-button>
        </div>
      </el-header>
  </el-container>
      <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200Px">
      <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" @click="toIndex" height="40Px">
        <template slot="title">
          <i class="el-icon-house"></i>
          <span>首页信息</span>
        </template>
      </el-menu-item>
      <el-menu-item index="2" @click="toUser">
        <i class="el-icon-user"></i>
        <span slot="title">关于我们</span>
      </el-menu-item>
      <el-submenu index="3" @click="toGoods">
        <template  slot="title">
        <i class="el-icon-goods"></i>
        <span>菜单信息</span>
        </template>
                <el-menu-item-group>
          <el-menu-item v-for="(menu,index) in menuList" :key="index">{{menu.title}}
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item index="4" @click="others">
        <i class="el-icon-document"></i>
        <span slot="title">地址信息</span>
      </el-menu-item>
        <el-menu-item index="5" @click="myP">
        <i class="el-icon-document"></i>
        <span slot="title">我的图库</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
  
      <!-- 主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container> 
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
                  // 菜单列表
            menuList:[],
    }
  },
        created(){
    // 获取菜单
    this.getMenu()
  },
  methods:{
    toMenu(){
      this.$router.push(`/back${menu.type}`)
    },
       // 获取菜单
     getMenu(){
       axios.get("/mall/menuList").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.menuList=res.result;
                this.$message({
                    duration:1000,
                    message:"获取成功",
                    type:'success'
                })
          }else{
            this.$message.error("获取失败");
          }
       })
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 去首页
      toIndex(){
        this.$router.push('/backindex')
      },
      // 用户
      toUser(){
        this.$router.push('/backabout')
      },
      // 商品
      toGoods(){
        this.$router.push('/backmenu')
      },
      others(){
        this.$router.push('/backcontact')
      },
      toBack(){
        this.$router.push('/backLogin')
      },
      myP(){
        this.$router.push('/backpic')
      }
  }
}
</script>
<style scoped>
/* 全局清空 */
*{
  margin:0;
  padding:0;
  list-style: none;
}
/* 布局的样式 */
/* 调整头部图标位置 */
.el-header{
  background-color:#090909;
  position: relative;
}
.head {
  position: absolute;
  top:30Px;
  left:50Px;
}
.text{
  margin-left:350Px;
  margin-top:29Px;
}
.text a{
  color:white;
  font-weight: bold;
  font-size:34Px;
}
.exit{
  float:right;
  margin-top:-40Px;
  margin-right:20Px;
}
.head-image{
    display:block;
    width: 297Px;
    height: 39Px;
    z-index: 99;
    background:url(./../assets/logo.png);
    background-position: -2Px -147Px;
}
/* 侧边栏 */
.el-aside{
  background-color:#545C64;
}
.el-menu-item{
  width:200Px !important;
}
</style>