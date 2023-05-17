<template>
  <div>
    <nav-bar>
        <template v-slot:default>个人中心</template>
    </nav-bar>
    <div style="margin-top:50px;">
          <div style="text-align:center;padding-top:50px">
              <van-image
                width="50"
                height="50"
                :src="user.avatar_url"
            />
          </div>
    </div>
    <div class="name-tag">
        <span>用户：{{user.name}}</span>
    </div>
    <van-cell title="我的收藏" is-link  @click="goTo('/collect')" />
    <van-cell title="我的订单" is-link  @click="goTo('/order')" />
    <van-cell title="账号管理" is-link  @click="goTo('/setting')" />
    <van-cell title="地址管理" is-link  @click="goTo('/addresslist')" />
    <van-cell title="关于我们" is-link  @click="goTo('/about')" />
    <div class="logout" @click="tologout">
          <van-button style="border:none" round type="info" color="#44ba80" block>退出登录</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {logout,getUser} from "network/user"
import {Toast} from 'vant';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, reactive,toRefs} from 'vue'
export default {
  name:'Profile',
  components:{
     NavBar
  },
  data () {
    return {
    };
  },
  setup() {
    const state = reactive({
      user:{}
    })
    const store= useStore();
    let router = useRouter()
    const tologout = () => {
        logout().then(res => {
           if(res.status == '204'){
                Toast.success('退出成功');
                store.commit('setIsLogin', false)
                //清除token
                window.localStorage.setItem('token','')
                setTimeout(() => {
                    router.push({path:'/login'})
                }, 500);
           }
        })
    }
    onMounted(() => {
      getUser().then(res => {
         state.user = res
         console.log(res)
      })
    })
    //跳转方法
    const goTo = (path,query) => {
      router.push({path,query:query || {}})
    }
    return {
      tologout,
      ...toRefs(state),
      goTo
    }
  }
}

</script>
<style lang='scss' scoped>
.logout{
   margin:15px;
   margin-top:10px;
}
.name-tag{
  margin-top: 10px;
  margin-bottom: 20px;
  text-align:center;
}
</style>