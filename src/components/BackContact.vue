<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>地址信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <div class="search">
      <el-input placeholder="请输入内容" class="input" v-model="search" clearable>
        <el-button slot="append" icon="el-icon-search" @click="searchS"></el-button>
      </el-input>
      <el-button type="primary" @click="addSlider">添加</el-button>
    </div>
    <!-- 信息列表 -->
    <el-table :data="tableData">
      <el-table-column prop="companyName" label="名字" width></el-table-column>
      <el-table-column prop="companyAddress" label="地址" width></el-table-column>
      <el-table-column prop="phone" label="电话" width></el-table-column>
      <el-table-column prop="email" label="邮箱" width></el-table-column>
      <el-table-column prop="Instagram" label="Ins" width></el-table-column>
      <el-table-column prop="Facebook" label="Facebook" width></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click="changeSlider(scope.row._id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加 -->
    <el-dialog title="添加轮播图" :visible.sync="addSVisible">
      <el-form :model="add">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="add.slider" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="add.sliderImg" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSVisible = false">取 消</el-button>
        <el-button type="primary" @click="addS">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改框 -->
    <el-dialog title="修改商品信息" :visible.sync="changeVisible">
      <el-form :model="now">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="now.slider" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-input v-model="now.sliderImg" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeS()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 确认删除 -->
    <el-dialog title="提示" :visible.sync="deleteVisible" width="30%" :before-close="handleClose">
      <span>您确定要删除这个商品吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="danger" @click="deleteS">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            contact:'',
             // 搜索
      search: "",
      // 信息列表
      tableData: [],
      //添加
      add: [],
      addSVisible: false,
      // 修改
      changeVisible: false,
      // 删除
      deleteVisible: false,
      // 当前信息
      now: [],
      formLabelWidth: "120Px"
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
            this.tableData=res.result;
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
     // 搜索
    searchS() {},
    // 添加
    addSlider() {},
    addS() {},
    // 修改
    changeSlider() {},
    changeS() {},
    // 删除
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteSlider() {},
    deleteS() {}
  }
}
</script>
<style scoped>
* {
  font-size: 15Px;
}
/* 面包屑导航 */
.el-breadcrumb {
  height: 50Px;
  line-height: 50Px;
  font-size: 22Px;
  padding-left: 30Px;
}
/* 用户 信息列表 */
.el-table {
  border: 1Px grey solid;
  width: 90%;
  margin-top: 10Px;
  margin-left: 20Px;
}
/* 搜索 */
.el-input {
  width: 280Px;
  height: 40Px;
  margin-left: 20Px;
}
</style>