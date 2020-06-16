<template>
    <div>
        <el-button type="danger">WDNMD</el-button>
        <el-form>
<el-form-item label="图片上传">
  <el-upload
    class="avatar-uploader"
    action="/upload/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</el-form-item>
</el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imageUrl:''
        }
    },
    methods:{
        //方法
handleAvatarSuccess (res, file) {
  console.log("in")
  if (res.status === '0') {
      console.log("5护")
    this.$message.success(res.msg)
    console.log(res)
    this.imageUrl = 'http://47.102.204.180/two.jpg'
    console.log(this.imageUrl)
  } else {
      console.log("44")
    this.$message.error(res.msg)
  }
},
beforeAvatarUpload (file) {
  this.$message.success("wdnmd")
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG) {
    this.$message.error('上传头像图片只能是 JPG 格式!')
  }
  if (!isLt2M) {
    this.$message.error('上传头像图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}
    }
}
</script>
<style scoped>

</style>