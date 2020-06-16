<template>
  <div>
    <!-- 今日推荐介绍 -->
    <div class="text">
      <a>今日推荐</a>
    </div>
    <!-- 今日推荐列表 -->
    <div class="recommend">
      <ul>
        <li v-for="(recommend,index) in recommendList" :key="index">
          <div class="img">
            <van-image :src="require(`./../assets/recommend/${recommend.image}`)" />
          </div>
          <p>{{recommend.name}}</p>
          <p>{{recommend.enName}}</p>
          <p>{{recommend.description}}</p>
          <van-rate
  v-model="recommend.stars"
  :size="15"
  color="green"
  void-icon="star"
  void-color="#eee"
  style="padding-left:20px"
  readonly
/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      // 今日推荐数据
      recommendList:[]
    };
  },
  created(){
    // 获取今日推荐数据
    this.getRecommend() 
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
     }
  }
};
</script>

<style scoped>
/* 轮播图 */
.my-swipe .van-swipe-item {
  color: #fff;
}
/* 今日推荐介绍 */
.text {
  color: grey;
  padding-left: 7px;
  line-height: 15px;
}
.recommend p{
 padding-left:20px;
}
.recommend ul {
  display: flex;
  flex-wrap: wrap;
}
.recommend ul li {
  width: 50%;
  margin-left:5;
}
</style>
