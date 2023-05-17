<template>
  <div class="backTop" @click="backtop">

  </div>
</template>

<script>
export default {
  name:'BackTop',
  data () {
    return {
    };
  },
  setup(props,{emit}) {
      return{
          backtop:() => {
             emit('btop')
          }
      }
  }

}

</script>
<style lang='scss' scoped>
.backTop{
    background-image:url('~assets/images/up.png');
    background-size:cover;
    -moz-background-size:cover; /* 老版本的 Firefox */
    background-repeat:no-repeat;
    width: 40px;
    height: 40px;
    position: fixed;
    bottom:80px;
    right: 25px;
    z-index: 20;
}
</style>