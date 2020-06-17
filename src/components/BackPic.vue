<template>
    <div>{{myP}}
      <div>
        <ul>
          <li v-for="(pic,index) in myP" :key="index">
            <img :src="require(`../assets/${pic}`)" alt=""/>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            myP:[]
        }
    },
     // 获取图片库
     created(){
    this.getPic()
  },
  methods:{
    //   获取有关我们的图片
     getPic(){
       axios.get("/getImg").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.myP=res.result;
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