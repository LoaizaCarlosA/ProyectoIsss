<template>
    <LayoutPrincipal>
      <div class="proximamente">
        <div>
          <img class="imgServicio" src="../assets/images/servicio.png" alt="" />
        </div>
        <div>Sitio en mantenimiento</div>
        <div>¡Vuelve pronto!</div>
      </div>
    </LayoutPrincipal>
  </template>
  
  <script>
  import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
  
  export default {
    components: {
      LayoutPrincipal,
    },
  };
  </script>
  
  <style scoped>
  .proximamente {
    text-align: center;
    /* font-family: "Roboto"; */
    font-size: 30px;
    display: flex;
    color: #707070;
    flex-direction: column;
    height: 85vh;
    justify-content: center;
    align-items: center;
  }
  .imgServicio {
    padding-bottom: 40px;
    width: 50%;
  }
  
  </style>
  