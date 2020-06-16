<template>
    <div>
        <!-- 标签栏 -->
       <van-tabs>
  <van-tab v-for="(menu,index) in menuList" :title="menu.title" :key="index">
      <!-- 商品栏 -->
    <div class="detail">
        <ul>
            <li v-for="(detail,index) in menu.detailList" :key="index" @click="toDetail(detail.name)">
            <div class="img">
            <a>{{detail.name}}</a>
            <!-- <van-image round fit="cover" :src="require(`./../assets/${detail.image}`)" @click="toDetail(detail.image)" />   -->
            </div>
            </li>
        </ul>
    </div>
  </van-tab>
</van-tabs>
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
        toDetail(image){
            this.$router.push('/product/'+image)
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
     }
    }
}
</script>
<style scoped>
/* 商品栏 */
.detail ul{
    display: flex;
  flex-wrap: wrap;
}
.detail ul li{
    width: 50%;
  margin-left:5;
}
.img{
    width:90px;
    height:90px;
    border:1px grey solid;
    margin:0 auto;
    margin-top:5px;
}
.van-image{
    border:1px grey solid;
}
</style>