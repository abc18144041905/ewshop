<template>
  <div>
      <nav-bar>
        <template v-slot:default>编辑地址</template>
      </nav-bar>
      <div class="addresscon">
           <van-address-edit
            address-info="addressInfo"
            :area-list="areaList"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-detail="onChangeDetail"
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
  name:'Address',
  data () {
    return {
    };
  },
  components:{
     NavBar
  },
  setup() {
     const router = useRouter()
     const route = useRoute()
     const area = reactive({
        areaList,
        searchResult: [],
        addressInfo:{},
        type:'add',
        addressId:'',
        title:''
      })
    
      onMounted(() => {
        //接收参数
        const {type,addressId} = route.query;
        area.type = type;
        area.addressId = addressId
        //   AreaAddress().then(res => {
        //       area.areaList = res
        //       console.log(res)
        //   })
      })
      const title = computed(()=>{
        return  area.type = 'add' ? '新增地址':'编辑地址'
      })
      const onSave = (content) => {
          const params ={
              name:content.name,
              phone:content.tel,
              province:content.province,
              city:content.city,
              county:content.county,
              address:content.addressDetial,
              is_default:content.is_default ? 1 :0,
          }
          addAddress(params).then(res => {
                Toast('保存成功');
                setTimeout(() => {
                    router.back()
                },1000);
          })
          
      } 
      const onDelete = () => {
           Toast('删除成功');
           
      }
      const onChangeDetail = () => {
          if (val) {
            this.searchResult = [
                {
                    name: '黄龙万科中心',
                    address: '杭州市西湖区',
                },
                    ];
            } else {
                    this.searchResult = [];
            }
          }
      return {
          onSave,
          onDelete,
          onChangeDetail,
          ...toRefs(area),
          title
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