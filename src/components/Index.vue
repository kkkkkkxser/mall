<template>
  <div>
    <!-- 今日推荐介绍 -->
    <div class="text">
      <a>今日推荐</a>
    </div>
    <div class="recommand">
      <ul>
        <li v-for="item in recommandList" :key="item.id">
          <div class="img">
            <van-image :src="require(`./../assets/hand/${item.image}`)" />
          </div>
          <p>{{item.name}}</p>
          <p>{{item.eName}}</p>
          <p>{{item.desc}}</p>
          <van-rate
  v-model="item.value"
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
export default {
  data() {
    return {
      recommandList: [
        {
          image: "hand2.jpg",
          name: "孤儿",
          eName: "orphan",
          desc: "这是亚索",
          value:3
        },
        { image: "hand5.jpg", name: "佐伊", eName: "zuoyi", desc: "这是佐伊",value:4},
        { image: "hand8.jpg", name: "鱼仔", eName: "fishman", desc: "这是鱼人",value:5},
        {
          image: "hand9.jpg",
          name: "大头",
          eName: "bighead",
          desc: "这是德莱文",
          value:3
        }
      ],
    };
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
.recommand p{
 padding-left:20px;
}
.recommand ul {
  display: flex;
  flex-wrap: wrap;
}
.recommand ul li {
  width: 50%;
  margin-left:5;
}
</style>
