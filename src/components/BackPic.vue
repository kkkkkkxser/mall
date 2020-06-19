<template>
    <div>{{myP}}
    <!-- 图片上传 -->
      <el-upload
  action="/upload/sliderupload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
      <div>
        <ul>
          <li v-for="(pic,index) in myP" :key="index">
            <img :src="require(`../assets/slider/${pic}`)" alt=""/>
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
            myP:[],
            // 图片上传
        dialogImageUrl: '',
        dialogVisible: false
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
     },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  }
}
</script>
<style scoped>
</style>