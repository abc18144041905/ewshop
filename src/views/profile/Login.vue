<template>
  <div>
    <nav-bar>
        <template v-slot:default>用户登录</template>
    </nav-bar>
    <div style="margin-top:50px">
          <div style="text-align:center;padding-top:50px">
              <van-image
                width="200"
                height="80"
                :src="require('../../assets/images/logo.png')"
            />
          </div>
    </div>
    <van-form @submit="onSubmit" style="margin-top:30px">
        <van-field
            v-model="email"
            name="email"
            label="用户名"
            placeholder="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <div class="link-login" @click="$router.push({path:'/register'})">
                没有账号，立即注册
            </div>
            <van-button round block type="info" style="border:none" color="#44b883" native-type="submit">登录</van-button>
        </div>
</van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {login} from "network/user"
import { Notify,Toast } from 'vant';
import {ref,reactive,toRefs} from 'vue';
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
export default {
  name:'Login',
  components:{
      NavBar
  },
  data () {
    return {
    };
  },
  setup() {
      const router = useRouter();
      const store= useStore();
      const userinfo = reactive({
          email:'',
          password:'',
      })
      const onSubmit = () => {
         login(userinfo).then(res => {
            // 将token保存到本地window.LocaStorage    
            //setItem(key,value)  getItem(key)
            //可以在vuex中 isLogin
            window.localStorage.setItem('token',res.access_token);
            Toast.success('登录成功');
            store.commit('setIsLogin', true)
            setTimeout(() => {
                  router.go(-1)
            },1000);
            userinfo.email = '';
            userinfo.password = ''
         },err => {

         })
      } 
      return {
          ...toRefs(userinfo),
          onSubmit
      }
  }

}

</script>
<style lang='scss' scoped>
.link-login{
   font-size: 14px;
   margin-bottom: 20px;
   color: #42b983;
   display: block;
   
}
</style>