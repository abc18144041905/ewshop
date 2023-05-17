<template>
  <div class="nav-bar">
       <div class="left" @click="goback">
           <slot name="left">
               <img src="~assets/images/left.png" alt="" srcset="">
           </slot>
       </div>
       <div class="center">
           <slot>图书兄弟</slot>
       </div>
       <div class="right">
           <slot name="right"></slot>
       </div>
  </div>
</template>
<script>
import {useRouter} from 'vue-router'
export default {
  name:'NavBar',
  data () {
    return {
    };
  },
  setup(){
      const router = useRouter();
      const goback = () => {
          router.go(-1)
      }
      return {
          goback
      }
  }
}

</script>
<style scoped>
.nav-bar{
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-shadow: 0 2px 0px rgba(100,100,100,0.1);
    color: #ffffff;
    background-color: var(--color-tint);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    display: flex;
}
.left,.right{
   width: 60px;
}
.center{
    flex: 1;
}
.left img{
    width: 45px;
    padding: 10px;
}
</style>