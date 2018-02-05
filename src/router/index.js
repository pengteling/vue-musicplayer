import Vue from 'vue'
// import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Root from '@/js/root.vue'
import Player from '@/js/pages/Player.vue'
// import HelloWorld from '@/components/aplayer.jsx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '',
          name: 'Player',
          component: Player
        }
      ]
    }
  ]
})

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       component: require('@/components/aplayer.jsx').default
//     }
//   ]
// })
