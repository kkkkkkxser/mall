<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图信息</el-breadcrumb-item>
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
      <el-table-column prop="slider" label="名字" width="180"></el-table-column>
      <el-table-column prop="sliderImg" label="图片" width>
                  <template slot-scope="scope">
        <img v-lazy="require(`./../assets/slider/${scope.row.sliderImg}`)" style="width:300Px;height:100Px;" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="changeSlider(scope.row.slider)">修改</el-button>
          <el-button type="danger" @click="deleteSlider(scope.row._id)">删除</el-button>
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
              <el-select v-model="add.sliderImg" placeholder="请选择商品种类" style="padding-left:20px; width:280px" >
        <el-option v-for="item in myP" :key="item"  :label="item" :value="item"></el-option>
      </el-select>
      <img v-if="this.add.sliderImg" v-lazy="require(`./../assets/slider/${this.add.sliderImg}`)" style="width:300Px;height:100Px;" alt="">
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
  data() {
    return {
      // 搜索
      search: "",
      // 信息列表
      tableData: [],
      //添加
      add: {},
      addSVisible: false,
      // 修改
      changeVisible: false,
      // 删除
      deleteVisible: false,
      // 当前信息
      now: {},
      formLabelWidth: "120Px",
      // 图片库
      myP:[],
      tmpS:""
    };
  },
  mounted(){
    // 获取轮播图
      this.getSlider();
      // 获取图片库
      this.getPic()
  },
  methods: {
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
    //获取轮播图
      getSlider(){
        axios.get("/mall/slider").then(response=>{
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
    addSlider() {
        this.addSVisible=true;
    },
    addS() {
              axios.post("/mall/addslider",{
        slider:this.add.slider,
        sliderImg:this.add.sliderImg
      }).then(response=>{
        let res = response.data;
        if(res.status=="0"){
          this.$message.success("添加成功");
          this.addSVisible=false;
          this.getSlider()
        }else {
            this.$message.error("添加失败!");
          }
      })
    },
    //获取当前的信息
    getNow(slider){
    axios.get('/mall/nowslider',{params:{slider:slider}}).then((response=>{
      let res=response.data;
        if(res.status=="0"){
          this.now=res.result[0].sliderList[0];
          this.tmpS=res.result[0].sliderList[0].slider;
          this.$message.success("获取成功");
          console.log(this.now)
        }else {
            this.$message.error("获取失败!");
          }
    }))
    },
    // 修改
    changeSlider(slider) {
        this.getNow(slider);
        console.log(this.now)
        this.changeVisible=true;
    },
    changeS() {
      axios.post('/mall/changeslider',{
        slider:this.now.slider,
        sliderImg:this.now.sliderImg,
        nslider:this.tmpS
      }).then((response)=>{
        let res=response.data;
        if(res.status=="0"){
          this.$message.success("修改成功");
          this.changeVisible=false;
          this.getSlider();
        }else {
            this.$message.error("修改失败!");
          }
      })
      // var change = this.now._id;
      // axios.post("/mall/deleteslider",{
      //   sliderId:change
      // }).then(response=>{
      //   let res = response.data;
      //   if(res.status=="0"){
      //   }else {
      //     }
      // });
      // axios.post("/mall/addslider",{
      //   slider:this.now.slider,
      //   sliderImg:this.now.sliderImg
      // }).then(response=>{
      //   let res = response.data;
      //   if(res.status=="0"){
      //     this.$message.success("修改成功");
      //     this.changeVisible=false;
      //     this.getSlider()
      //   }else {
      //       this.$message.error("修改失败!");
      //     }
      // })
    },
    // 删除
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    deleteSlider(_id) {
         axios.post("/mall/deleteslider",{
        sliderId:_id
      }).then(response=>{
        let res = response.data;
        if(res.status=="0"){
          this.$message.success("删除成功");
          this.deleteVisible=false;
          this.getSlider()
        }else {
            this.$message.error("删除失败!");
          }
      })
    },
    deleteS() {}
  }
};
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