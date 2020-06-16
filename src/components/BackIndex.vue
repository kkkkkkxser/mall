<template>
    <div>
        <p>{{recommendList}}</p>
        <p>{{sliderList}}</p>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 今日推荐数据
      recommendList:[],
      //获取轮播图
        sliderList:[]
    };
  },
  created(){
    // 获取今日推荐数据
    this.getRecommend(),
     //获取轮播图
      this.getSlider();
  },
  methods:{
    // 获取今日推荐数据
     getRecommend(){
       axios.get("/mall/recommendList").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.recommendList=res.result;
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
};
</script>
<style scoped>

</style>