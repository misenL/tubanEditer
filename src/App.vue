<template>
  <Layout />
</template>

<script>
import Layout from '@/layout/index.vue'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f2f2;
  min-height: 100vh;
  color: #2c3e50;
}
</style>
