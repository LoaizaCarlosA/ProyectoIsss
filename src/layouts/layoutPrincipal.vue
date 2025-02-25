<template>
    <div class="wrapper-global">
      <Header />
      <MenuLateral />
      <section class="page-container">
        <div class="module-container">
          <slot />
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import Header from "../layouts/Header.vue";
/*   import MenuLateral from "./MenuLateral.vue"; */
  
  export default {
    components: {
      Header,
/*       MenuLateral, */
    },
  };
  </script>
  
  <style>
  .wrapper-global {
    width: 100%;
    min-height: 100%;
    overflow: hidden;
    background-color: #fafafa;
  }
  .page-container {
    position: relative;
    padding-left: 75px;
    padding-top: 70px;
  }
  .module-container {
    padding: 30px 20px 0px 40px;
    /* padding: 30px 20px; */
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fafafa;
    position: relative;
    min-height: calc(90vh - 70px);
  }
  @media (max-width: 767px) {
    .module-container {
      padding: 30px 15px;
    }
    .page-container {
      padding-left: 0;
    }
  }
  </style>
  