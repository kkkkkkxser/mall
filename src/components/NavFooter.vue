<template>
    <div>
        <!-- 底部导航 -->
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
  <van-tabbar-item icon="home-o" @click="toIndex">首页</van-tabbar-item>
  <van-tabbar-item icon="friends-o" @click="toAbout">关于我们</van-tabbar-item>
  <van-tabbar-item icon="orders-o" @click="toMenu">菜单</van-tabbar-item>
  <van-tabbar-item icon="phone-o" @click="toContact">联系我们</van-tabbar-item>
</van-tabbar>
<!-- 维权栏 -->
<div class="right">
    <div class="two">
        <van-image  :src="require('./../assets/two.jpg')" />
    </div>
</div>
<!-- 底部 空白区域 -->
<div style="height:50px;"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            active:0
        }
    },
    methods:{
        toIndex(){
            this.$router.push('/index')
        },
        toAbout(){
            this.$router.push('/about')
        },
        toMenu(){
            this.$router.push('/menu')
        },
        toContact(){
            this.$router.push('/contact')
        }
    }
}
</script>
<style scoped>
/* 底部维权栏 */
.right{
    height:80px;
    background-color:#444444;
    position: relative;
}
.two{
    width:40px;
    height:40px;
    left:45%;
    top:20%;
    position: absolute;
}
</style>