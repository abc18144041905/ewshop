<template>
  <div>
      <nav-bar>
        <template v-slot:default>地址列表</template>
      </nav-bar>
      <div class="list-address">
          <van-address-list
              v-model="chosenAddressId"
              :list="list"
              default-tag-text="默认"
              @add="onAdd"
              @edit="onEdit"
             
            />
      </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {onMounted,reactive,toRefs,computed,ref} from "vue";
import {useRoute,useRouter} from 'vue-router'
import { Toast } from 'vant';
import {addAddress,EditAddress,DeleteAddress,getAddressList,getAddressDetail} from "network/address";
export default {
  name:'AddressList',
  components:{
     NavBar
  },
  data () {
    return {
    };
  },
  setup() {
     const router = useRouter();
     let chosenAddressId = ref('1');
     const addresslist = reactive({
          list:[],
     })
     onMounted(()=>{
       getAddressList().then(res => {
         console.log(res)
            if(res.data.length == 0){
                addresslist.list = [];
                return
            }
            addresslist.list = res.data.map(item => {
              return {
                id:item.id,
                name:item.name,
                tel:item.phone,
                address:`${item.province}${item.city}${item.county}${item.address}`,
                isDefault: !!item.is_default
              }
            })
       })
       
     })
     //新增地址
     const onAdd = () => {
         Toast('新增地址');
         router.push({path:'/address',query:{type:'add'}})
     }
     //编辑地址
     const onEdit= () => {
         Toast('编辑地址:' + index);
         router.push({path:'/addressedit',query:{type:'edit',addressId:item.id}})
     }
     return {
       chosenAddressId,
       onAdd,
       onEdit,
       ...toRefs(addresslist),
      
     }
  }

}

</script>
<style>
.list-address{
    margin-top: 50px;
    padding-bottom: 80px;
}
.van-address-list__bottom{
    bottom: 70px!important;
}
.van-button--danger{
  background:#42b983!important;
  border: #42b983 solid 1px!important;
}
.van-address-item .van-radio__icon--checked .van-icon{
  background-color: #42b983;
  border-color:#42b983 ;
}
.van-tag--danger{
  background:#42b983;
}
</style>