<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <van-image width height="170" :src="require('./../assets/slider/slider1.jpg')" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image width height="170" :src="require('./../assets/slider/slider2.jpg')" />
      </van-swipe-item>
      <van-swipe-item>
        <van-image width height="170" :src="require('./../assets/slider/slider3.jpg')" />
      </van-swipe-item>
    </van-swipe>
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
          image: "hand1.jpg",
          name: "hand1",
          eName: "hand1",
          desc: "区别"
        },
        { image: "hand2.jpg", name: "hand1", eName: "hand1", desc: "区别" },
        { image: "hand3.jpg", name: "hand1", eName: "hand1", desc: "区别" },
        {
          image: "hand4.jpg",
          name: "hand1",
          eName: "hand1",
          desc: "区别"
        }
      ]
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
  text-align: center;
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
