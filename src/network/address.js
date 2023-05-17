import {request}  from "./request";

//添加地址
export function addAddress(data){
      return request({
          url:"/api/address",
          methods: "post",
          data
      })
}
//编辑地址
export function EditAddress(id,params){
    return request({
        url:`/api/address/${id}`,
        methods: "put",
        params
    })
}
//删除地址
export function DeleteAddress(id){
    return request({
        url:`/api/address/${id}`,
        methods: "delete"
    })
}
//地址列表
export function getAddressList(){
    return request({
        url:"/api/address",
        methods: "get"
    })
}
//地址详情
export function getAddressDetail(id){
    return request({
        url:`/api/address/${id}`,
    })
}
