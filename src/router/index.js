import Vue from 'vue'
import Router from 'vue-router'

const Hello = () => import('@/components/Hello');
const Default = () => import('@/components/Default');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Default',
      component: Default
    }
  ]
})
