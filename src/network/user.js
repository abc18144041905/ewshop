import {request}  from "./request";

export function register(data){
     return request({
              method:'post',
              url:'/api/auth/register',
              data
    })
}
export function login(data){
    return request({
             method:'post',
             url:'/api/auth/login',
             data
   })
}
export function logout(data){
    return request({
             method:'post',
             url:'/api/auth/logout',
             data
   })
}
export function getUser(){
    return request({
             method:'get',
             url:'/api/user',
   })
}