<template>
  <div class="goods-item" @click="itemClick">
       <img v-lazy="product.cover_url" @load="loadImage">
       <div class="goods-info">
           <p>{{product.title}}</p>
           <span class="price"><small>¥</small>{{product.price}}</span>
           <span class="collect">{{product.collects_count}}</span>
       </div>
  </div>
</template>

<script>
import {getCurrentInstance} from 'vue';
import {useRouter} from 'vue-router'
export default {
  name:'GoodsListItem',
  props:{
     product:Object,
     default(){
         return{}
     }
  },
  setup(props) {
      const router = useRouter();
      const { eventHub } = getCurrentInstance().proxy;
      const loadImage = () => {
          eventHub.$emit('imagesOver');
      }
      return {
          loadImage,
          itemClick:() => {
              router.replace({path:'/detail',query:{id:props.product.id}});
          }
      }
  },
  data () {
    return {
    };
  },

}

</script>
<style lang='scss'>
.goods-item{
    width: 46%;
    padding-bottom: 40px;
    position: relative;

    img{
      width: 100%;
      border-radius: 5px;
    }
    .goods-info{
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
        p{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 3px;        }
        .price{
            color: red;
            margin-right: 20px;
        }
        .collect{
            position: relative;
        }
        .collect::before{
            content: '';
            position: absolute;
            left: -15px;
            height: 14px;
            width: 14px;
            top:-1px;
            background:url('~assets/images/collection.png') 0 0/14px 14px;
        }
    }
}
</style>