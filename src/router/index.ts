import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      index: 0,
      keepAlive: true,
      title: 'golo汽修大师'
    }
  },
  {
    path: '*',
    name: 'notfound',
    component: () => import('../views/notfound.vue'),
    meta: {
      index: 1,
      keepAlive: false,
      title: '页面不存在'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/user/login.vue'),
    meta: {
      index: 0,
      keepAlive: false,
      title: '登录'
    }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/equipment.vue'),
    meta: {
      index: 1,
      keepAlive: true,
      title: '设备有问题'
    }
  },
  {
    path: '/reqair',
    name: 'reqair',
    component: () => import('../views/repair.vue'),
    meta: {
      index: 2,
      keepAlive: false,
      title: '修车有问题'
    }
  },
  {
    path: '/scan',
    name: 'scan',
    component: () => import('../views/QrScanner.vue'),
    meta: {
      index: 3,
      keepAlive: false,
      title: '扫码'
    }
  },
  {
    path: '/eq_install',
    name: 'eq_install',
    component: () => import('../views/equipment_install.vue'),
    meta: {
      index: 4,
      keepAlive: false,
      title: '设备安装'
    }
  },
  {
    path: '/order_list',
    name: 'order_list',
    component: () => import('../views/order/order-list.vue'),
    meta: {
      index: 5,
      keepAlive: false,
      title: '历史记录'
    }
  },
  {
    path: '/order_detail',
    name: 'order_detail',
    component: () => import('../views/order/order-detail.vue'),
    meta: {
      index: 6,
      keepAlive: false,
      title: '订单详情'
    }
  }
]

// 需要与服务器路由匹配
const BASE_URL = process.env.NODE_ENV !== 'production' ? '/' : '/index/indexpro'

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: BASE_URL,
  routes
})

export default router
