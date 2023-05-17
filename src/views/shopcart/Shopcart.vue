<template>
  <div>
      <nav-bar>
        <template v-slot:default>
          购物车<span>({{$store.state.cartCount}})</span>
        </template>
      </nav-bar>
        <div class="cart-body">
          <van-checkbox-group class="vcg" @change="groupChange" v-model="result" ref="checkboxGroup">
              <van-swipe-cell v-for="(item,index) in list" :key="index">
                  <van-checkbox :name="item.id" checked-color="#42b983" class="vck"></van-checkbox>
                  <div class="body-content">
                      <div class="vc-img">
                           <img :src="item.goods.cover_url" alt="">
                      </div>
                      <div class="vc-content">
                        <h6>{{item.goods.title}}</h6>
                        <span><small>¥</small>{{item.goods.price+'.00'}}</span>
                      </div>
                      <div class="vc-right">
                        <span>x{{item.goods.stock}}</span>
                        <van-stepper integer :min="1" :max="item.goods.stock" 
                        :name="item.id" :model-value="item.num" async-change @change="onChange"/>
                      </div>
                  </div>
                  <template #right>
                    <van-button @click="deleteGood(item.id)" style="height:100px;" square text="删除" type="danger" class="delete-button" />
                  </template>
              </van-swipe-cell>
        </van-checkbox-group>
        <van-submit-bar class="vsb-posi" :price="total * 100" button-text="结算" @submit="onSubmit">
            <van-checkbox checked-color="#42b983" @click="allCheck" v-model:checked="checkAll">全选</van-checkbox>
        </van-submit-bar>  
        
        </div>
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import {ref,reactive,toRefs,onMounted,computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {Toast} from 'vant'
import {getCart,deleteCartItem,checkedCart,modifyCart} from 'network/cart'
export default {
  name:'Shopcart',
  components:{
     NavBar
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    //数据模型，状态
    const state = reactive({
       list:[],
       result:[], //购物车id数组
       checkAll:false
    }) 
    //初始化购物车数据
    const init = () => {
          Toast.loading({message:'加载中...',forbidClick:true})
  
          getCart('include=goods').then(res=>{
           state.list = res.data
           state.result = res.data.filter(n => n.is_checked == 1).map(item => item.id)
            Toast.clear()
          })
    }
    onMounted(() => {
      init();
    })
    //通过计算属性计算总价
    const total = computed(() => {
        let sum = 0
        state.list.filter(item => state.result.includes(item.id)).forEach(item => {
          sum += parseInt(item.num) * parseFloat(item.goods.price) 
        })
        return sum
    })
    //异步改变购物车数量
    const onChange = (value,detail) => {
         Toast.loading({message:'修改中...',forbidClick:true})
         modifyCart(detail.name,{num:value}).then(res => {
             //将onMounted中的list中的num也改变
             state.list.forEach(item => {
               if(item.id == detail.name){
                     item.num = value
                     Toast.clear()
               }
             })
         })
    }
    //复选框改变处理
    const groupChange = (result) => {
        state.result = result
        //改变数据表中的选中状态
        checkedCart({cart_ids:result})
        if(result.length == state.list.length){
             state.checkAll = true
        }else{
             state.checkAll = false
        }
    }
    const allCheck = () => {
        state.checkAll = !state.checkAll
        if(state.checkAll){
           state.result = state.list.map(item => item.id)
           state.checkAll = true
        }else{
          state.result = []
          state.checkAll = false
        }
    }
    //删除商品
    const deleteGood = (id) => {
         deleteCartItem(id).then(res => {
              init();//重新初始化
              store.dispatch('updateCart')//改变vuex状态数量
         })
    }
    //创建订单
    const onSubmit = () => {
      if(state.result.length == 0){
        Toast.fail("请选择商品进行结算")
        return
      }else{
        //router.push({path:'/createorder'})
      }
    }
    return{
       ...toRefs(state),
       onChange,
       groupChange,
       allCheck,
       deleteGood,
       total,
       onSubmit
    }
  }

}

</script>
<style lang='scss' scoped>
.cart-body{
  margin-top: 45px;
  padding-top: 5px;
}
.can-card__content{
    text-align: left!important;
  }
.body-content{
    float: right;
    height: 100px;
    width: 90%;
}
.vcg{
   background-color:#fcfcfc;
   margin-bottom:5px;
   .vck{
      float:left;
      margin-top:42px;
      margin-left:15px
   }
   .vc-img{
     float: left;
     margin-left: 5px;
     margin-top: 5px;
     width: 90px;
     height: 90px;
     overflow: hidden;
     img{
       width: 100%;
     }
   }
   .vc-content{
     margin-top: 10px;
     margin-left: 5px;
     
     float: left;
     h6{
       display: block;
       text-align: left;
       font-size:15px;
       font-weight: normal;
       margin-top: 5px;
     }
     span{
       display: block;
       width: 100px;
       text-align: left;
       color: red;
       margin-top: 30px;
       small{
         font-size: 13px;
       }
     }
   }
   .vc-right{
     position:absolute;
     right: 10px;
     margin-right: 10px;
     height: 100px;
     float: right;
     width: 100px;
     span{
       color:#7b7b7b;
       text-align: right;
       display: block;
       font-size: 14px;
       line-height:45px;
       margin-right: 10px;
       margin-bottom: 10px;
     }
   }
}
.vsb-posi{
  position: fixed;
  bottom: 50px;
  z-index: 999;
}
</style>