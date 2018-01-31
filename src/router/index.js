import Vue from 'vue'
// import Vue from 'vue/dist/vue.js'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import HelloWorld from '@/components/aplayer.jsx'
import Video from '@/components/Video'
import MusicPlayer from '@/components/MusicPlayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    }, {
      path: '/mp3',
      name: 'Music',
      component: MusicPlayer
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
