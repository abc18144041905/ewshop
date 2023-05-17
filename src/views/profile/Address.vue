<template>
  <div>
      <nav-bar>
        <template v-slot:default>添加地址</template>
      </nav-bar>
      <div class="addresscon">
           <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            />   
      </div>
   </div>
</template>

<script>
//省市区数据
import { areaList } from '@vant/area-data';
import {onMounted,reactive,toRefs,computed} from "vue";
import NavBar from "components/common/navbar/NavBar";
import { Toast } from 'vant';
import {addAddress,EditAddress,DeleteAddress,getAddressList} from "network/address";
import {useRoute,useRouter} from 'vue-router'
export default {
  name:'AddressEdit',
  data () {
    return {
    };
  },
  components:{
     NavBar
  },
  setup() {
     const router = useRouter();
     const area = reactive({
        areaList,
        searchResult: [],
        addressInfo:''
      })
     const onSave = (content) => {
          const data ={
              name:content.name,
              phone:content.tel,
              province:content.province,
              city:content.city,
              county:content.county,
              address:content.addressDetial,
              is_default:content.is_default ? 1 :0,
          }
          addAddress(data).then(res => {
                Toast('保存成功');
                setTimeout(() => {
                    router.back()
                },1000);
          })
          
      } 
      return {
          onSave,
          ...toRefs(area)
      }
  }

}

</script>
<style>
.addresscon{
    margin-top: 60px;
}
.van-button--danger{
    background:var(--color-tint)!important;
    border:var(--color-tint) solid 1px ;
}
</style>
