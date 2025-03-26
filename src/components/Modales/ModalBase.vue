<template>
    <div class="modal">
      <div class="mask"></div>
      <div class="contenido-modal" :style="[newStyle]">
        <div>{{ tituloHeader }}</div>
        <slot />
      </div>
    </div>
  </template>
  
  <script>
  // import { vueWindowSizeMixin } from 'vue-window-size/option-api'
  
  export default {
    name: "ModalBase",
    props: {
      tituloHeader: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        key_random: 0,
      };
    },
    // mixins: [vueWindowSizeMixin()],
    emits: ["cerrar"],
    methods: {
      closeModal() {
        this.$emit("cerrar");
      },
    },
    computed: {
      getFlagMensaje() {
        return this.flagMensajeHeader;
      },
      getStyle() {
        const style = this.overflow_y ? `overflow-y: auto` : "overflow-y: unset";
  
        return style;
      },
      getFlagCerrar() {
        let status = true;
        if (this.$windowWidth > 767) {
          status = false;
        } else {
          status = true;
        }
  
        return status;
      },
      getClases() {
        return {
          "overflow-hidden": this.flagHidden,
        };
      },
    },

    // mounted() {
    //   // agregar la clase modal_NUMERO al levantar un modal para evitar el
    //   // scroll de la seccion debajo del modal, (cada modal crea su propio
    //   // id para evitar problemas al detonar dos a la vez)
    //   const random = Math.floor(Math.random() * (100000 - 1000)) + 1000;
    //   this.key_random = random;
    //   document.body.classList.add("modal_" + random);
    // },
    // unmounted() {
    //   // remover la clase creada en mounted para volver a activar el scroll
    //   // en el body al quitar el modal
    //   document.body.classList.remove("modal_" + this.key_random);
    // },
  };
  </script>
  
  <style scoped>
  /* MODAL*/
  .modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .mask {
    background-color: transparent;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .contenido-modal {
    position: relative;
    background-color: #ffffff;
    margin: auto;
    min-width: 300px;
    box-shadow: 0px 3px 6px #00000029;
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
    box-sizing: border-box;
    z-index: 100;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  .modal-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 15px;
    flex-wrap: wrap;
    position: relative;
  }
  .cerrar-header {
    width: 100%;
    display: flex;
  }
  .btn-close {
    box-sizing: content-box;
    width: 28px;
    height: 28px;
    color: #000;
  
    background-size: 14px;
    background-color: transparent;
    border: 0;
    border-radius: 50%;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    /* position: absolute; */
    /* right: 20px; */
    /* top: 0px; */
    /* z-index: 100; */
    margin-left: auto;
  }
  .btn-close:hover {
    background-size: 14px;
    background-color: #efefef;
    cursor: pointer;
  }
  .modal-header .logo-ipx {
    width: 48px;
    height: 48px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
  
  .modal-header .separador {
    width: 100%;
    margin: 0px;
    border-bottom: 1px solid rgb(112, 112, 112, 0.1);
  }
  
  @-webkit-keyframes animatetop {
    from {
      top: -500px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
  @keyframes animatetop {
    from {
      top: -500px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
  .contenido-modal .cuerpo-modal {
    overflow-y: auto;
    width: 100%;
  }
  /* MODAL FIN */
  .icon-tachita-negra {
    color: #bababa;
    cursor: pointer;
  }
  .contenedor-titular {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 17px;
  }
  .modal-header .titulo-header {
    width: 300px;
    font-size: 22px;
    color: #707070;
    text-align: left;
    font-weight: bold;
  }
  .modal-header .separadorGrueso {
    width: 212px;
    height: 6px;
    margin-top: 9px;
    background: #000000 0% 0% no-repeat padding-box;
  }
  .text-and-close {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .cuerpo-modal.overflow-hidden {
    overflow-x: hidden;
  }
  .modal-categoria-precio .modal-header .titulo-header {
    width: unset;
  }
  @media (max-width: 767px) {
    .modal {
      padding: 0 !important;
    }
    .contenido-modal {
      width: 100vw;
      height: 100vh;
      border-radius: 0px;
    }
    .cuerpo-modal {
      flex: 1;
      border-radius: 0;
      padding: 0;
    }
    .modal-header {
      padding: 0px;
    }
  
    .modal-header .titulo-header {
      font-size: 16px;
    }
    .cerrar-header {
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      background: #c49e29 0% 0% no-repeat padding-box;
      box-shadow: 0px 3px 6px #00000029;
      -webkit-box-shadow: 0px 3px 6px #00000029;
      -moz-box-shadow: 0px 3px 6px #00000029;
      margin-bottom: 34px;
    }
    .btn-close {
      position: initial;
      right: initial;
      top: initial;
      margin-left: auto;
      margin-right: 10px;
  
      background-size: 14px;
      background-color: transparent;
    }
    .contenedor-titular {
      padding: 0px 29px;
    }
    .modal-header .titulo-header {
      text-align: left;
      font-size: 16px;
      letter-spacing: 0px;
      color: #020101;
      opacity: 1;
    }
    .icon-tachita-negra {
      justify-content: flex-end;
      margin-right: 32px;
      align-items: center;
      display: flex;
      color: #ffffff;
    }
    .modal-header .separadorGrueso {
      width: 89px;
    }
  }
  </style>
  