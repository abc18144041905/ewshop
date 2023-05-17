<template>
  <div class="detail" id="target">
      <nav-bar >
        <template v-slot:default>商品详情</template>
      </nav-bar>
      <div class="detail-content">
            <van-image 
              width="100%"
              lazy-load
              :src="detail.cover_url"
            />
            <van-card style="text-align:left"
              :num="detail.stock"
              :price="detail.price+'.00'"
              :desc="detail.description"
              :title="detail.titlr"
             
            >
              <template #tags>
                <van-tag class="tagn" plain type="danger" >新书</van-tag>
                <van-tag class="tagn" plain type="primary">推荐</van-tag>
              </template>
              <template #footer>
                <van-button type="warning" @click="handleAddCart">加入购物车</van-button>
                <van-button type="danger" @click="goToCart">立即购买</van-button>
              </template>
            </van-card>
            <van-tabs v-model="active">
              <van-tab title="概述">
                  <div class="content" v-html="detail.details"></div>
              </van-tab>
              <van-tab title="热评">
                  <div>
                     <div class="">
                      <div>
                          <img src="" alt="">
                      </div>
                      <h6></h6>
                    </div>
                      {{detail.comments}}
                  </div>
              </van-tab>
              <van-tab title="相关图书">
                  <goods-list :goods="like_goods"></goods-list>
              </van-tab>
             
            </van-tabs>
      </div>
   </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import GoodsList from 'components/content/goods/GoodsList'
import {getDetail} from 'network/detail'
import {addCart} from 'network/cart'
import {useRoute,useRouter,onBeforeRouteUpdate} from 'vue-router'
import {useStore} from 'vuex'
import {ref,onMounted,reactive,toRefs,nextTick,watchEffect,getCurrentInstance} from 'vue'
import {Toast} from 'vant'
export default {
  name:'Detail',
  components:{
     NavBar,
     GoodsList,
  },
  data () {
    return {
    };
  },
  setup() {
    const store = useStore()
    let active = ref(1)
    const route = useRoute()
   const router = useRouter()
    let id = ref(0)
    let book = reactive({
      detail:{},
      like_goods:[]
    })
    onMounted(() => {
        id.value = route.query.id
        getDetail(id.value).then(res => {
            book.detail = res.goods;
            book.like_goods = res.like_goods
            
        })
        
        
        
    })
    //检测路由变化
    let {ctx:that} = getCurrentInstance()
    onBeforeRouteUpdate(to => {
      //location.reload()
      //that.$forceUpdate()
      id.value = to.query.id
      
      getDetail(id.value).then(res => {
            book.detail = res.goods;
            book.like_goods = res.like_goods
            target.scrollIntoView();  
      })
    })
    //添加购物车
    const handleAddCart = () => {
         addCart({goods_id:book.detail.id,num:1}).then(res => {
            if(res.status == '204' || res.status == '201'){
               Toast.success('添加成功')
               //设置store中购物车cartCount数量
               store.dispatch('updateCart')
            }
         })
    }
    //立即购买
    const goToCart = () => {
         addCart({goods_id:book.detail.id,num:1}).then(res => {
            if(res.status == '204' || res.status == '201'){
               Toast.success('添加成功,显示购物车')
               router.push({path:"/shopcart"})
               //设置store中购物车cartCount数量
               store.dispatch('updateCart')
            }
         })
    }
    return {
      id,
      ...toRefs(book),
      active,
      handleAddCart,
      goToCart
    }
  }

}

</script>
<style lang='scss' scoped>

.detail-content{
  margin-top: 45px;
  margin-bottom: 50px;
}
.tagn{
  margin: 3px;
}
.content{
  padding: 10px;
}
</style>