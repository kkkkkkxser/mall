<template>
    <div>
        <p>{{contact}}</p>

    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            contact:''
        }
    },
    // 获取联系信息
     created(){
    this.getContact()
  },
  methods:{
    //   获取联系信息
     getContact(){
       axios.get("/mall/contact").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.contact=res.result;
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