<template>
  <div class="components-header">
        <router-link to ="/">
          <img src="./../../assets/images/logo.png" alt="" class="logo"/>
        </router-link>
        <h1 class="caption">Vue Music Player</h1>
        <div class="toplist -col-auto">
          <router-link to="/list/26">热歌</router-link>
          <router-link to="/list/27">新歌</router-link>
          <router-link to="/list/28">网络歌曲</router-link>
        </div>

      </div>

</template>
<script>
import './header.scss'
export default{
  name: 'Header'
}
</script>
<style lang="scss" scoped>
.toplist{
  flex:1;
  display: flex;
  justify-content: flex-end;
  a{
    color:#2f9842;
    margin:0 2px;
  }

}
</style>
