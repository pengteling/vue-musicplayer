<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <music-player :autoplay=false ref="player" :status="status" >

    </music-player>
    <!-- <span class="play" @click="play">play</span> -->
  </div>
</template>

<script>
import MusicPlayer from "./MusicPlayer/index";
export default {
  name: 'HelloWorld',
  components: {
    MusicPlayer
  },
  data() {
    return {
      status:pause
    }
  },
  methods: {
    play() {
      this.$refs.player.play()
      console.log('play')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
