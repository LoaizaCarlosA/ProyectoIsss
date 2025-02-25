<template>
    <button class="btn">
      <slot />
    </button>
  </template>
  
  <script>
  export default {
    name: "Button",
    //   props: {
    //     isDiasable: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     sombras: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     descarga: {
    //       type: Boolean,
    //       default: false,
    //     },
    //   },
    //   computed: {
    //     getClass() {
    //       return {
    //         'btn-sombra': this.sombras,
    //       }
    //     },
    //   },
    //   methods: {
    //     action() {
    //       if (this.descarga != false) {
    //         this.$emit('descargar')
    //       }
    //     },
    //   },
  };
  </script>
  
  <style scoped>
  .btn-continuar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #000000;
    border-radius: 18px;
    opacity: 1;
    width: 100px;
    height: 32px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
  }
  .btn-continuar:hover {
    background: black 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-agregar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #ef7b14;
    color: #ef7b14;
    border-radius: 18px;
    opacity: 1;
    width: 100px;
    height: 32px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
  }
  .btn-agregar:hover {
    background: #ef7b14 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-buscar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid black;
    color: black;
    border-radius: 18px;
    opacity: 1;
    width: 100px;
    height: 32px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
    margin: 0px 5px;
  }
  .btn-buscar:hover {
    background: black 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-editar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #000000;
    border-radius: 18px;
    opacity: 1;
    width: 80px;
    height: 28px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
    margin: 0px 5px;
  }
  .btn-editar:hover {
    background: black 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-eliminar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid red;
    color: red;
    border-radius: 18px;
    opacity: 1;
    width: 80px;
    height: 28px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
    margin: 0px 5px;
  }
  .btn-eliminar:hover {
    background: red 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-regresar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #000000;
    border-radius: 18px;
    opacity: 1;
    width: 110px;
    height: 32px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
  }
  .btn-regresar:hover {
    background: black 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-guardar {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #237a1b;
    color: #237a1b;
    border-radius: 18px;
    opacity: 1;
    width: 110px;
    height: 32px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
  }
  .btn-guardar:hover {
    background: #237a1b 0% 0% no-repeat padding-box;
    color: white;
  }
  .btn-guardar-cotizacion {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #237a1b;
    color: #237a1b;
    border-radius: 18px;
    opacity: 1;
    width: 80px;
    height: 28px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
  }
  .btn-cancelar-cotizacion {
    background: white 0% 0% no-repeat padding-box;
    border: 1px solid #b40000;
    color: #b40000;
    border-radius: 18px;
    opacity: 1;
    width: 80px;
    height: 28px;
    cursor: pointer;
    box-shadow: 0px 3px 6px #00000029;
    font-weight: 700;
  }
  .btn-guardar-cotizacion:hover {
    background: #237a1b 0% 0% no-repeat padding-box;
    color: white;
  }
  </style>
  