import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import list from '@/components/list'
import about from '@/components/about'
import address from '@/components/address'
import linkman from '@/components/linkman'
import item from '@/components/item'
import home from '@/components/home'
import navi from '@/components/navi'
import page2 from '@/components/page2'
import subject from '@/components/subject'
import message from '@/components/message'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {path: '/page2', name: 'page2', component: page2},
        {path: '/subject', name: 'message', component: subject},
        {
          path: '/message/:id',
          name: 'Message',
          component: message
        }
      ]
    },
    {
      path: '/list',
      name: 'List',
      component: list
    },
    {
      path: '/item/:id',
      name: 'Item',
      component: item
    },
    {
      path: '/about',
      name: 'About',
      component: about,
      children: [
        {path: 'linkman', component: linkman},
        {path: 'address', component: address}
      ]
    }
  ]
})
