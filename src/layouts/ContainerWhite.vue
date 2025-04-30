<template>
  <div class="container-white">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContainerWhite',
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.container-white {
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #00000029;
  width: 100%;
  height: calc(95vh - 100px);
  /* Resta el alto del header */
  overflow-y: auto;
  /* Para scroll interno si el contenido lo necesita */
  margin-bottom: 20px;
}

/* .container-white {
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 3px 6px #00000029;
  width: 100%;
} */
</style>