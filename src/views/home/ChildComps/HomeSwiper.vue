<template>
  <div>
      <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banners" :key="index">
             <img v-lazy="item.img_url" alt="">
        </van-swipe-item>
      </van-swipe>
  </div>
</template>

<script>
export default {
  name:'HomeSwiper',
  data () {
    return {
    };
  },
  props:{
     banners:{
         type:Array,
         default() {
             return []
         }
     }
  }

}

</script>
<style lang='scss' scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #ffffff;
  }
 .my-swipe .van-swipe-item img{
     width: 100%;
 } 
</style>