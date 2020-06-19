<template>
    <div>
                <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>关于我们</el-breadcrumb-item>
   </el-breadcrumb>
   <!-- 搜索 -->
   <div class="search">
          <el-input placeholder="请输入内容" class="input" v-model="search" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchG"></el-button>
          </el-input>
           <el-button type="primary" @click="addG">添加</el-button>
   </div>
   <!-- 用户信息列表 -->
       <el-table
      :data="sliderList"
      border="">
      <el-table-column
        label="当前操作对象"
        width="180">
        轮播图
      </el-table-column>
      <el-table-column
        label="对象图片"
        align="center"
      >
        <template slot-scope="scope">
        <img v-lazy="require(`./../assets/slider/${scope.row.sliderImg}`)" style="width:300Px;height:100Px;" alt="">
        </template>
      </el-table-column>
       <el-table-column
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button type="primary"  @click="getG(scope.row._id)">修改</el-button>
          <el-button type="danger"  @click="deleteG(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  <el-dialog title="添加商品" :visible.sync="addGVisible">
  <el-form :model="add">
     <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="add.slider" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="图片" :label-width="formLabelWidth">
      <el-input v-model="add.sliderImg" autocomplete="off"></el-input>
    </el-form-item>

    <!-- <el-form-item label="商品种类" :label-width="formLabelWidth" >
      <el-select v-model="add.productType" placeholder="请选择商品种类" style="padding-left:20Px; width:280Px" >
        <el-option label="雕塑手办" value="hand"></el-option>
        <el-option label="毛绒玩具" value="doll"></el-option>
        <el-option label="男女服饰" value="clothes"></el-option>
        <el-option label="其他" value="others"></el-option>
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="商品图片" :label-width="formLabelWidth">
      <el-input v-model="add.productImage" autocomplete="off"></el-input>
    </el-form-item>
    <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> -->
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addGVisible = false">取 消</el-button>
    <el-button type="primary" @click="addGs">确 定</el-button>
  </div>
         </el-dialog>
          <!-- 修改框 -->
          <el-dialog title="修改商品信息" :visible.sync="changeVisible">
  <el-form :model="nowG">
     <el-form-item label="名称" :label-width="formLabelWidth">
      <el-input v-model="nowG.slider" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item label="图片" :label-width="formLabelWidth">
      <el-input v-model="nowG.sliderImg" autocomplete="off"></el-input>
     </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="changeVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeGs()">确 定</el-button>
  </div>
         </el-dialog>
    <!-- 确认删除 -->
    <el-dialog
  title="提示"
  :visible.sync="deleteVisible"
  width="30%"
  :before-close="handleClose">
  <span>您确定要删除这个商品吗</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="danger" @click="deleteGs">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
          // 上传图片
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
          // 搜索
          search:'',
            // 数据
            tableData: [],
            sliderList:[],
            // 分页
              page:1,
            pageSize:6,
            total:0,
            //添加
            add:{},
            //当前信息
            nowG:[],
            addGVisible:false,
            changeVisible:false,
            deleteVisible:false,
            formLabelWidth:'120Px'
        }
    },
    mounted(){
      this.getSlider()
    },
    methods:{
      // test(){
      //   axios.get("/mall/test").then(response=>{
      //     let res = response.data;
      //     if(res.status=="0"){
      //       this.$message.success("成功")
      //     }else{
      //       this.$message.error("失败")
      //     }
      //   })
      // },
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
      },
      // 监听上传图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      //  console.log(newSize)
      this.pageSize = newSize
      this.getAllGoods()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.page = newPage
      this.getAllGoods()
    },
    //添加商品
    addG(){
      this.addGVisible=true;
    },
    addGs(){
      axios.post("/mall/addslider",{
        slider:this.add.slider,
        sliderImg:this.add.sliderImg
      }).then(response=>{
        let res = response.data;
        if(res.status=="0"){
          this.$message.success("添加成功");
          this.getSlider()
        }else {
            this.$message.error("添加失败!");
          }
      })
    },
    //修改商品
    changeGs(){

    },
    //删除商品
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    deleteG(_id){
      this.deleteVisible=true;
      console.log(_id)
    },
    deleteGs(_id){

    },
       //获取当前用户
    getG(productId){
      this.changeVisible=true;
    },
    //查找
    searchG(){
    }
    }
}
</script>
<style scoped>
*{
  font-size:15Px;
}
/* 面包屑导航 */
.el-breadcrumb {
  height:50Px;
  line-height:50Px;
  font-size:22Px;
  padding-left:30Px;
}
/* 用户 信息列表 */
.el-table{
    border:1Px grey solid;
    width:90%;
    margin-top:10Px;
    margin-left:20Px;
}
/* 搜索 */
.el-input{
  width:280Px;
  height:40Px;
  margin-left:20Px;
}
</style>