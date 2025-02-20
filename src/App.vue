<template>
  <div id="app">
    <Header></Header>
    <!--     <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view /> <!-- Aquí se mostrará la vista correspondiente -->
  </div>

</template>

<script>

import Header from './components/Header.vue'


export default {
  name: 'App',
  components: {
    Header
  }
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

body {
  font-family: Arial, sans-serif;
  margin: 0px;
}
</style>
