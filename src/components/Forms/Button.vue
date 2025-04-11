<template>
  <button class="btn" style="  user-select: none;">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
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
  border: 1px solid #691c32;
  color: #691c32;
  border-radius: 18px;
  opacity: 1;
  width: 100px;
  height: 32px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
}

.btn-agregar:hover {
  background: #691c32 0% 0% no-repeat padding-box;
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
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.btn-editar:hover {
  background: black 0% 0% no-repeat padding-box;
  color: white;
}

.btn-agregar-cobaes {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid black;
  color: black;
  border-radius: 18px;
  opacity: 1;
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
}

.btn-agregar-cobaes:hover {
  background: black 0% 0% no-repeat padding-box;
  color: white;
}

.btn-eliminar {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #CB0809;
  color: #CB0809;
  border-radius: 18px;
  opacity: 1;
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
}

.btn-eliminar:hover {
  background: #CB0809 0% 0% no-repeat padding-box;
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

.btn-atras {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #CB0809;
  color: #CB0809;
  border-radius: 18px;
  opacity: 1;
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
}

.btn-atras:hover {
  background: #CB0809 0% 0% no-repeat padding-box;
  color: white;
}

.btn-descargar-excel {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #0f7d21;
  color: #0f7d21;
  border-radius: 18px;
  opacity: 1;
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
}

.btn-descargar-excel:hover {
  background: #0f7d21 0% 0% no-repeat padding-box;
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


.btn-confirmar-eliminar {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #CB0809;
  color: #CB0809;
  border-radius: 18px;
  opacity: 1;
  width: 110px;
  height: 32px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
}

.btn-confirmar-eliminar:hover {
  background: #CB0809 0% 0% no-repeat padding-box;
  color: white;
}

.btn-reset {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #000000;
  border-radius: 18px;
  opacity: 1;
  width: 28px;
  height: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 5px;
}

.btn-reset:hover {
  background: black 0% 0% no-repeat padding-box;
  color: white;
}

.btn-GenNewPass {
  background: white 0% 0% no-repeat padding-box;
  border: 1px solid #000000;
  border-radius: 10px;
  opacity: 1;
  width: 100%;
  height: 32px;
  cursor: pointer;
  box-shadow: 0px 3px 6px #00000029;
  font-weight: 700;
  margin: 0px 0px 0px 5px;
}

.btn-GenNewPass:hover {
  background: black 0% 0% no-repeat padding-box;
  color: white;
}
</style>