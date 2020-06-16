<template>
    <div>
      <!-- 遮罩层 -->
      <van-button type="primary" icon="home-o" @click="show = true" class="but"/>
    <van-overlay :show="show" @click="show = false">
    <div class="block" />
</van-overlay>
    <!-- 图片 -->
    <van-image class="image" :src="require(`../assets/logo.png`)" fit="contain"/>
        <!-- 轮播图 -->
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(slider,index) in sliderList" :key="index">
      <van-image height="170" :src="require(`../assets/slider/${slider.sliderImg}`)" />
    </van-swipe-item>
       </van-swipe>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
      return{
        show:false,
        logo:'',
        sliderList:[],
      }
    },
    mounted(){
      //获取商标
      this.getBrand();
      this.getSlider();
    },
    methods:{
      //获取商标
      getBrand(){
        axios.get("/mall/brand").then(response=>{
          let res = response.data;
          if(res.status=="0"){
            this.logo=res.result;
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
      //获取轮播图
      getSlider(){
        axios.get("/mall/slider").then(response=>{
          let res = response.data;
          if(res.status=="0"){
            this.sliderList=res.result;
                this.$message({
                    duration:1000,
                    message:"获取成功",
                    type:'success'
                })
          }else{
            this.$message.error("获取失败");
            
          }
        })
      }
    }
}
</script>
<style scoped>
/* 遮罩层 */
.but{
  width:10%;
  height:20px;
}
.block {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  /* 商标 */
.image{
  width:90%;
  height:20px;
  float:right;
}
  
</style>