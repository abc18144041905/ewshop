import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入vant
import 'vant/lib/index.css'
import {AddressList,AddressEdit,Cell,CellGroup,SubmitBar,Stepper,SwipeCell,Checkbox, CheckboxGroup,Form,Field,Button,Tag,Image as VanImage,Card,Tab, Tabs, Swipe, SwipeItem,Lazyload,Badge,Sidebar, SidebarItem,Collapse, CollapseItem} from 'vant';

//事件总线
import eventHub from './commonjs/eventHub.js'


const app = createApp(App)
           .use(store)
           .use(router)
           .use(Swipe)
           .use(SwipeItem)
           .use(Lazyload,{
               preLoad:5,
               loading:require('./assets/images/tsxd.png')
            })
           .use(Badge)
           .use(Sidebar)
           .use(SidebarItem)
           .use(Collapse)
           .use(CollapseItem)
           .use(Tab)
           .use(Tabs)
           .use(Card)
           .use(VanImage)
           .use(Tag)
           .use(Button)
           .use(Form)
           .use(Field)
           .use(Checkbox)
           .use(CheckboxGroup)
           .use(SwipeCell)
           .use(Stepper)
           .use(SubmitBar)
           .use(Cell)
           .use(CellGroup)
           .use(AddressEdit)
           .use(AddressList)
// 配置全局事件总线
app.config.globalProperties.eventHub = eventHub;
app.mount('#app')