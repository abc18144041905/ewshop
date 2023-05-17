import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { Notify,Toast } from 'vant';
const Home = () =>import('../views/home/Home')
const Category = () =>import('../views/category/Category')
const Detail = () =>import('../views/detail/Detail')
const Profile = () =>import('../views/profile/Profile')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Register = () => import('../views/profile/Register')
const Login = () => import('../views/profile/Login')
const Address = () => import('../views/profile/Address')
const AddressEdit = () => import('../views/profile/AddressEdit')
const AddressList = () => import('../views/profile/AddressList')

const routes = [
  {
    path: '',
    name: 'DefaultHome',
    redirect: '/home',
    meta:{
      title:'图书兄弟-首页'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta:{
      title:'图书兄弟-首页'
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta:{
      title:'图书兄弟-商品分类'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta:{
      title:'图书兄弟-商品详细',
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      title:'图书兄弟-个人中心',
      isAuthRequired:true
    }
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart,
    meta:{
      title:'图书兄弟-购物车',
      isAuthRequired:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta:{
      title:'用户注册'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'用户登录'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta:{
      title:'添加地址'
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta:{
      title:'编辑地址'
    }
  },
  {
    path: '/addresslist',
    name: 'AddressList',
    component: AddressList,
    meta:{
      title:'地址列表'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  //如果没有登录，在这里到login
  if(to.meta.isAuthRequired && store.state.user.isLogin === false){
     Notify('您还没有登录，请先登录')
    return next('/login')
  }else{
    
    next();
  }
  
  document.title = to.meta.title
})
export default router
