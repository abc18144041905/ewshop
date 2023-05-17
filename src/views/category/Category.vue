<template>
  <div>
      <nav-bar>
        <template v-slot:default>商品分类</template>
    </nav-bar>
    <div id="mainbox">
         <div class="ordertab">
             <van-tabs v-model="active" @click="tabClick">
              <van-tab title="销量排序"></van-tab>
              <van-tab title="价格排序"></van-tab>
              <van-tab title="评论排序"></van-tab>
            </van-tabs>
         </div>
         
        <van-sidebar class="leftmenu" v-model="activeKey">
              <van-collapse v-model="activeName" accordion>
                    <van-collapse-item v-for="item in categories" :key="item.id" :title="item.name" :name="item.name">
                        <van-sidebar-item v-for="sub in item.children" :key="sub.id" :title="sub.name" @click="getGoods(sub.id)" />
                    </van-collapse-item>
              </van-collapse>
        </van-sidebar>
       
         <div class="goodslist">
            <div class="content">
                 <div class="list-cart" v-for="item in showGoods" @click="itemClick(item.id)"
                    :key="item">
                     <div class="list-cart-img"><img v-lazy="item.cover_url" @load="imageload" alt=""></div>
                     <div class="list-cart-article">
                           <h6>{{item.title}}</h6>
                           <p>{{item.updated_at}}</p>
                           <h5><small>¥</small>{{item.price}}</h5>
                     </div>
                 </div>
                 
            </div>
         </div>
    </div>
    <back-top @btop="btop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import NavBar from "components/common/navbar/NavBar"
import BackTop from "components/common/backtop/BackTop"
import {ref,reactive,onMounted,computed,watchEffect, nextTick,onActivated} from "vue"
import {useRouter,onBeforeRouteUpdate} from 'vue-router'
import {getCategory,getCategoryGoods} from "network/category"
import {dbounce} from '@/commonjs/utils'

export default {
  name:'Category',
  components:{
     NavBar,
     BackTop,
  },
  data () {
    return {
    };
  },
  setup(){
    const router = useRouter();
    let active = ref(1);
    let isShowBackTop = ref(false);
    let activeName = ref(1);
    let activeKey = ref(0);
    let categories = ref([]);
    //声明滑动
    let bs = reactive({});
    //当前排序条件
    let currentOrder = ref('sales')
    //当前的分类id
    let currentCid = ref(0)
    //数据模型
    const goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]}
    })
    const showGoods = computed(()=>{
      return goods[currentOrder.value].list
    })
    const init = () => {
         getCategoryGoods('sales',currentCid.value).then(res => {
                goods.sales.list = res.goods.data
         })
         getCategoryGoods('price',currentCid.value).then(res => {
                goods.price.list = res.goods.data
         })
         getCategoryGoods('comments_count',currentCid.value).then(res => {
                goods.comments_count.list = res.goods.data
         })
    }
    onMounted(() => {
        getCategory().then(res => {
          categories.value = res.categories
        })
        getCategoryGoods('sales',currentCid.value).then(res => {
                goods.sales.list = res.goods.data
         })
         //创建betterscroll对象
        bs = new BetterScroll('.goodslist', {
            probeType:3,//只要运动就会触发scroll事件
            click:true, //是否应许点击
            pullUpLoad:true, //上拉加载更多
          
        })
        //上拉加载数据，触发pullingUp
      bs.on('pullingUp',(position) => {
        const page = goods[currentOrder.value].page + 1
          getCategoryGoods(currentOrder.value,currentCid.value).then(res => {
                goods[currentOrder.value].list.push(...res.goods.data)
                goods[currentOrder.value].page += 1
         })
          //完成上拉加载将数据显示出来
           bs.finishPullUp()
           bs.refresh()
      })
      bs.on('scroll',(position) => {
           isShowBackTop.value = (-position.y - 45) > 800
      })
      
    })
    onActivated(() => {
        bs.refresh()
    })
    //排序选项卡
    const tabClick = (index) => {
        let orders = ['sales','price','comments_count']
        currentOrder.value = orders[index]
        getCategoryGoods(currentOrder.value,currentCid.value).then(res => {
                goods[currentOrder.value].list = res.goods.data
                nextTick(() => {
                  bs &&  bs.refresh()
                })
         })
    }
    //通过分类得到商品
    const getGoods = (cid) => {
      currentCid.value = cid;
      init();
    }
    // watchEffect(() => {
    //    nextTick(() => {
    //      bs.refresh()
    //    })
    // })
    const btop = () => {
        bs.scrollTo(0,0,500)
    }
    const refresh1 = dbounce(() => {
        bs.refresh()
      },10)
    const imageload = () => {
        refresh1()
    }
    onBeforeRouteUpdate(to => {
      console.log('我是分类')
        bs.refresh()
    });
    return {
      activeKey,
      categories,
      activeName,
      active,
      tabClick,
      currentOrder,
      currentCid,
      getGoods,
      goods,
      showGoods,
      bs,
      isShowBackTop,
      btop,
      imageload,
      itemClick:(id) => {
           router.push({path:'/detail',query:{id}});
      }
    }
  }
}

</script>
<style lang='scss'>
 #mainbox{
   margin-top: 45px;
   display: flex;
    .ordertab{
        top: 45px;
        left: 130px;
        position: fixed;
        flex: 1;
        float: right;
        height: 50px;
        width: 65%;
    }
    .leftmenu{
        left: 0px;
        position: fixed;
        top: 95px;
        width: 35%;
        overflow: auto;
        height: calc(100vh - 145px);
    }
    .goodslist{
        right: 0px;
        left: 130px;
        top: 95px;
        position: fixed;
        flex:1;
        height: calc(100vh - 145px);
        width: 65%;
        padding: 10px;
        text-align: left;
        overflow: hidden;

    }
 }
 .van-card__thumb{
      width: 68px !important;
  }
  .list-cart{
    margin-bottom: 5px;
    width: 100%;
    height: 100px;
    background-color: #f8f8f8;
    .list-cart-img{
        margin-top: 13px;
        margin-left: 5px;
        float: left;
        width: 75px;
        height: 80px;
        overflow: hidden;
        img{
          width: 100%;
        }
    }
    .list-cart-article{
         width: 135px;
         margin-top: 10px;
         height: 80px;
         float: right;
         h6{
           font-weight: normal;
           font-size: 13px;
           color:#2a2a2a;
           margin-bottom: 5px;
         }
         p{
           font-size: 12px;
           line-height: 20px;
         }
         h5{
           font-weight: normal;
           font-size: 17px;
           small{
             font-size: 13px;
           }
         }
    }
  }
</style>