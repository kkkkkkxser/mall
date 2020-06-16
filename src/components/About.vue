<template>
    <div>
       <van-image :src="require(`../assets/${aboutus}`)" />
        <van-image src="http://47.102.204.180/two.jpg" />
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            aboutus:''
        }
    },
    // 获取有关我们的图片
     created(){
    this.getAboutus()
  },
  methods:{
    //   获取有关我们的图片
     getAboutus(){
       axios.get("/mall/aboutus").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.aboutus=res.result;
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

</style>