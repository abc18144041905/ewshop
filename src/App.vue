<template>
  <div id="nav">
      <router-link class="tab-bar-item" to="/home">
        <div class="icon">
            <i class="iconfont icon-shouye-shouye"></i>
        </div>
        <div>首页</div>
    </router-link> 
    <router-link  class="tab-bar-item" to="/category">
        <div class="icon">
            <i class="iconfont icon-fenlei"></i>
        </div>
        <div>分类</div>
    </router-link>
    <router-link  class="tab-bar-item" to="/shopcart">
         <div class="icon">
            <van-badge :content="$store.state.cartCount" max="9">
                <i class="iconfont icon-gouwuche"></i>
            </van-badge>
            
        </div>
        <div> 购物车</div>
   </router-link> 
    <router-link class="tab-bar-item" to="/profile">
         <div class="icon"> 
            <i class="iconfont icon-gerenzhongxin"></i>
        </div>
        <div>我的</div>
    </router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

</template>
<script>
import {onMounted} from 'vue'
import {useStore} from 'vuex'
export default {
  setup(props) {
     const store = useStore()
     onMounted(() => {
         store.dispatch('updateCart')
     })
  }
}
</script>
<style lang="scss">
@import "assets/css/base.css";
@import "assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  
  box-shadow: 0 -2px 1px rgba(100,100,100,0.05);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:#ffffff;
  display: flex;
  z-index: 9999;
  a {
    color: var(--color-text);
    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  .tab-bar-item{
     flex: 1;
     text-align: center;
     height: 50px;
     font-size: var(--font-size);
  }
  .tab-bar-item .icon{
    width: 24px;
    height: 25px;
    margin-top: 5px;
    vertical-align: middle;
    display: inline-block;
  }
 
}

</style>
