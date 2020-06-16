<template>
    <div>
        <p>{{menuList}}</p>
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
            this.$router.push('/product'+image)
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

</style>