<template>
  <div id="home">
    <nav-bar>
        <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <tab-control v-show="isTabFixed" ref='tabControl2' @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>
    <div class="wrapper">
         <div class="content">
              <div ref=banref>
                   <home-swiper :banners="banners"></home-swiper>
                   <recommend-view :recommends="recommends"></recommend-view>
              </div>
              
              <tab-control ref='tabControl1' @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>
              <goods-list :goods="showGoods"></goods-list>
         </div>
    </div>
    <back-top @btop="btop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import {dbounce} from '@/commonjs/utils'
import NavBar from "components/common/navbar/NavBar"
import HomeSwiper from "./ChildComps/HomeSwiper"
import BackTop from "components/common/backtop/BackTop"
import RecommendView from './ChildComps/RecommendView.vue'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import {getHomeAllData,getHomeGoods} from 'network/home'
import {onMounted,ref,reactive,computed,watchEffect, nextTick,getCurrentInstance,onActivated} from 'vue'
export default {
  components:{
     NavBar,
     RecommendView,
     TabControl,
     GoodsList,
     BackTop,
     HomeSwiper
  },
  name:'Home',
 setup() {
   let banners = ref([])
   let isShowBackTop = ref(false)
   let tabControl1 = ref(null)
   let tabControl2 = ref(null)
   let banref = ref(null)
   let isTabFixed = ref(false);
   //临时变量
    const temid = ref(0)
    const recommends = ref([])
    //商品列表数据模型
    const goods = reactive({
      sales:{page:0,list:[]},
      new:{page:0,list:[]},
      recommend:{page:0,list:[]}
    })
    let currentType = ref('sales')
    const showGoods = computed(()=>{
         return goods[currentType.value].list
    })
    let bs = reactive({});
    onMounted(()=>{
      getHomeAllData().then(res => {
           recommends.value = res.goods.data
           banners.value = res.slides
      })
      getHomeGoods('sales').then(res => {
           goods.sales.list = res.goods.data
      })
      getHomeGoods('recommend').then(res => {
           goods.recommend.list = res.goods.data
      })
      getHomeGoods('new').then(res => {
           goods.new.list = res.goods.data
      })
      //创建betterscroll对象
      bs = new BetterScroll('.wrapper', {
            probeType:3,//只要运动就会触发scroll事件
            click:true, //是否应许点击
            pullUpLoad:true //上拉加载更多
      })
      bs.on('scroll',(position) => {
           isShowBackTop.value = isTabFixed.value = (-position.y - 45) > banref.value.offsetHeight
      })
      //上拉加载数据，触发pullingUp
      bs.on('pullingUp',(position) => {
           const page = goods[currentType.value].page+1
           getHomeGoods(currentType.value,page).then(res => {
             goods[currentType.value].list.push(...res.goods.data);
             goods[currentType.value].page += 1
           })
           //完成上拉加载将数据显示出来
           bs.finishPullUp()
           bs.refresh()
      })
      
      //事件总线监听图片加载完刷新
      //监听item中图片加载完,防抖处理
      const { eventHub } = getCurrentInstance().proxy;
      const refresh1 = dbounce(() => {
        bs.refresh()
      },10)
      eventHub.$on('imagesOver',() => {
         refresh1()
      });
      
    })
    onActivated(() => {
        bs.refresh()
    })
    const tabClick = (index) => {
          temid.value = index;
          let types = ['sales','new','recommend']
          currentType.value = types[index]
          //tabControl2.value.currentType = types[index]
          //this.$refs.tabControl1.currentIndex = index
          tabControl2.value.currentIndex = index
          tabControl1.value.currentIndex = index
          nextTick(() => {
             bs &&  bs.refresh()
          })
    }
    const btop = () => {
        bs.scrollTo(0,0,500)
    }
    //监听任何一个变量有变化
    // watchEffect(() => {
    //    nextTick(() => {
    //      bs &&  bs.refresh()
    //    })
    // })
    //事件总线监听图片加载完刷新
    // const eventHandler = async (bs) => {
    //   console.log("事件接收到了")
    //   bs.refresh()
    // };
    // const { eventHub } = getCurrentInstance().proxy;
    
    // eventHub.$off('imagesOver',eventHandler);
    
 
    return {
      recommends,
      temid,
      tabClick,
      goods,
      showGoods,
      bs,
      isTabFixed,
      banref,
      tabControl1,
      tabControl2,
      isShowBackTop,
      btop,
      banners
    }
 },


}

</script>
<style lang="scss">
.recommend{
  border-bottom: 8px solid #eee;
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 30px;
  font-size:12px;
}
.recommend-item{
  flex:1;
  img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
}
#home{
  height: 100vh;
  position: relative;
}
.wrapper{
  margin-top: 45px;
  position: absolute;
  top: 0px;
  bottom:50px;
  left: 0;
  right: 0;
  overflow: hidden;
  height: calc(100vh - 95px);
}

</style>