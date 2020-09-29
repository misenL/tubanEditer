<template>
  <div id="app">
    <nav-bar v-if="$route.meta.navbar" />
    <div id="layout__view">
      <router-view />
      <thorough v-if="$route.meta.thorough" />
      <concise v-if="$route.meta.concise" />
    </div>
  </div>
</template>

<script>
import NavBar from './navbar/index.vue'
import thorough from './navbar/footer/thorough'
import concise from './navbar/footer/concise'
export default {
  name: 'Layout',
  components: {
    NavBar,
    thorough,
    concise
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
#layout__view {
  position: absolute;
  /*min-height: 100vh;*/
  top: 1.4rem;
  width: 100%;
  background-color: #f2f2f2;
}
</style>
