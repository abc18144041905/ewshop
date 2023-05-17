<template>
  <div class="recommend">
      <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
          <a href="" @click.prevent="goD(item.id)">
              <img v-lazy="item.cover_url" alt="" srcset="">
              <div>{{item.title}}</div>
          </a>
      </div>
      
  </div>
</template>

<script>
import {useRouter}  from 'vue-router'
export default {
  name:'App',
  data () {
    return {
    };
  },
  props:{
      recommends:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  setup(){
     const router = useRouter()
     const goD = (id) => {
          router.push({path:'/detail',query:{id}})
     }
     return {
         goD
     }
  }

}

</script>
<style lang='stylus' scoped>
</style>