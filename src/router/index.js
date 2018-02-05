import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/js/root.vue'
import Player from '@/js/pages/Player.jsx'
import LoadPlayer from '@/js/components/LoadAudioPlayer.jsx'
import Lrc from '@/js/pages/Lrc.vue'
import List from '@/js/pages/List.vue'
import Header from '@/js/components/Header.vue'
// import HelloWorld from '@/components/aplayer.jsx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      components: { // 多路由
        default: Root,
        header: Header,
        Loadplayer: LoadPlayer
      },
      children: [
        {
          path: '',
          name: 'Player',
          component: Player
          // props: (router) => ({
          //   text: '123'
          // })
        },
        {
          path: 'lrc',
          name: 'Lrc',
          component: Lrc
        },

        {
          path: 'list',
          name: 'List',
          component: List
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
