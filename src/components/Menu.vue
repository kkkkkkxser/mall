<template>
    <div>
        <!-- 标签栏 -->
       <van-tabs>
  <van-tab v-for="(tab,index) in tabList" :title="tab.title" :key="index">
      <!-- 商品栏 -->
    <div class="detail">
        <ul>
            <li v-for="(detail,index) in tab.detailList" :key="index">
            <div class="img">
            <van-image round fit="cover" :src="require(`./../assets/hand/${detail.image}`)" @click="toDetail(detail.image)" />  
            </div>
            </li>
        </ul>
    </div>
  </van-tab>
</van-tabs>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // 整个数据
            tabList:[
                {title:"奶茶",detailList:[{
                    image:"hand1.jpg"
                },{
                    image:"hand2.jpg"
                },{
                    image:"hand3.jpg"
                },{
                    image:"hand4.jpg"
                }]},
                {title:"便当",detailList:[{
                    image:"hand2.jpg"
                },{
                    image:"hand5.jpg"
                },{
                    image:"hand8.jpg"
                },{
                    image:"hand7.jpg"
                },{
                    image:"hand4.jpg"
                }]},
                {title:"甜点",detailList:[{
                    image:"hand1.jpg"
                },{
                    image:"hand3.jpg"
                },{
                    image:"hand5.jpg"
                },{
                    image:"hand7.jpg"
                },{
                    image:"hand9.jpg"
                },{
                    image:"hand6.jpg"
                }]},
                {title:"零食",detailList:[{
                    image:"hand2.jpg"
                },{
                    image:"hand3.jpg"
                },{
                    image:"hand5.jpg"
                },{
                    image:"hand6.jpg"
                },{
                    image:"hand7.jpg"
                },{
                    image:"hand9.jpg"
                },{
                    image:"hand1.jpg"
                }]},
                {title:"日货",detailList:[{
                    image:"hand1.jpg"
                },{
                    image:"hand2.jpg"
                },{
                    image:"hand5.jpg"
                },{
                    image:"hand6.jpg"
                },{
                    image:"hand7.jpg"
                },{
                    image:"hand8.jpg"
                },{
                    image:"hand9.jpg"
                }]},
                {title:"网站制作",detailList:[{
                    image:"hand1.jpg"
                },{
                    image:"hand2.jpg"
                },{
                    image:"hand3.jpg"
                },{
                    image:"hand5.jpg"
                },{
                    image:"hand6.jpg"
                },{
                    image:"hand7.jpg"
                },{
                    image:"hand9.jpg"
                }]}
            ]
        }
    },
    methods:{
        toDetail(image){
            this.$router.push('/product'+image)
        }
    }
}
</script>
<style scoped>
/* 商品栏 */
.detail ul{
    display: flex;
  flex-wrap: wrap;
}
.detail ul li{
    width: 50%;
  margin-left:5;
}
.img{
    width:90px;
    height:90px;
    border:1px grey solid;
    margin:0 auto;
    margin-top:5px;
}
.van-image{
    border:1px grey solid;
}
</style>