<template>
    <div>
      <!-- 遮罩层 -->
      <van-button type="primary" icon="home-o" @click="show = true" class="but"/>
    <van-overlay :show="show" @click="show = false">
    <div class="block" />
</van-overlay>
    <!-- 图片 -->
    <van-image class="image" :src="require('./../assets/logo.png')" fit="contain"/>
        <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image width height="170" :src="require('./../assets/slider/slider1.jpg')" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image width height="170" :src="require('./../assets/slider/slider2.jpg')" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image width height="170" :src="require('./../assets/slider/slider3.jpg')" />
      </van-swipe-item>
    </van-swipe>
    </div>
</template>
<script>
export default {
    data(){
      return{
        show:false
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