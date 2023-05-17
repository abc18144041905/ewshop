<template>
  <div class="tab-control">
      <div @click="itemClick(index)" :class="{'active':currentIndex == index}" class="tab-control-item" v-for="(item,index) in titles" :key="index">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name:'TabControl',
  data () {
    return {
    };
  },
  props:{
      titles:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  setup(props,{emit}) {
      let currentIndex = ref(0);
      const itemClick = (index) => {
         currentIndex.value = index
         emit('tabClick',index)
      }
      return {
          currentIndex,
          itemClick
      }
  }
}

</script>
<style lang='scss' scoped>
.tab-control{
    position: sticky;
    top: 44px;
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align:center;
    font-size: 14px;
    background-color: #ffffff;
    width: 100%;
    z-index: 10;
    .tab-control-item{
        flex: 1;
        span {
            padding: 6px;
        }
    }
    .active{
        color:var(--color-tint);
        span {
            border-bottom:3px solid var(--color-tint)
        }
    }
}
</style>