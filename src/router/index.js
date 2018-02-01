import Vue from 'vue'
// import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import Root from '@/components/Root'
// import HelloWorld from '@/components/aplayer.jsx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Root
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
