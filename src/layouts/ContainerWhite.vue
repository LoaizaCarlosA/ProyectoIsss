<template>
    <div 
      class="container-white"
    >
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContainerWhite',
  }
  </script>
  
  <style scoped>
  .container-white {
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 3px 6px #00000029;
    width: 100%;
  }
  </style>