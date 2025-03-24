<template>
  <div class="paginacion" :class="getGeneral" v-show="showPagination">
    <div class="anterior" :class="getClasesAnterior" @click="cambiarPagina(1)">
      <p>Anterior</p>
    </div>
    <div class="pagina">
      <p class="actual">{{ paginaActual }}</p>
      <p class="ultima">de {{ getUltimaPagina }}</p>
    </div>
    <div class="siguiente" :class="getClasesSiguiente" @click="cambiarPagina(2)">
      <p>Siguiente</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paginacion',
  components: {},
  props: {
    total: {
      type: Number,
      default: 0,
    },
    paginaActualEntrada: {
      type: Number,
      default: 1,
    },
    puntoVenta: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      ultimaPagina: this.total,
      paginaActual: this.paginaActualEntrada,
    }
  },
  emits: ['changePagina'],
  created() { },
  methods: {
    cambiarPagina(tipo) {
      if (tipo == 1 && this.paginaActual > 1) {
        this.paginaActual -= 1
        this.$emit('changePagina', this.paginaActual)
      } else if (tipo == 2 && this.paginaActual < this.ultimaPagina) {
        this.paginaActual += 1
        this.$emit('changePagina', this.paginaActual)
      }
    },
    reiniciar() {
      this.ultimaPagina = this.total
      this.paginaActual = this.paginaActualEntrada
    },
  },
  computed: {
    getUltimaPagina() {
      return this.total
    },
    getClasesAnterior() {
      return {
        disabled: this.paginaActual <= 1,
      }
    },
    getClasesSiguiente() {
      return {
        disabled: this.paginaActual >= this.ultimaPagina,
      }
    },
    showPagination() {
      //this.ultimaPagina>1
      return true
    },
    getGeneral() {
      return {
        'paginador-general': this.puntoVenta,
      }
    },
  },
  watch: {
    paginaActualEntrada() {
      this.paginaActual = this.paginaActualEntrada
    },
    total() {
      this.reiniciar()
    },
  },
}
</script>

<style scoped>
.paginacion {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 40px;
  margin-bottom: 12px;
  user-select: none;
}

.paginacion .anterior,
.paginacion .siguiente {
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  color: #5F5F5F;
  font-weight: bold;
  font-size: 14px;
}

.paginacion .anterior.disabled,
.paginacion .siguiente.disabled {
  cursor: no-drop;
  opacity: 0.25;
  transition: 0.3s;
}

.paginacion .pagina {
  display: flex;
  align-items: center;
  padding: 0px 7px;
  font-weight: 700;
  font-size: 14px;
}

.paginacion .pagina .actual {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;
  margin-right: 4px;
  font-size: 16px;
}

.paginacion .pagina .ultima {
  font-weight: normal;
  opacity: 0.56;
}

@media (max-width: 1279px) {}

@media (max-width: 767px) {
  .paginacion {
    margin-bottom: 15px;
  }

  .paginador-general {
    margin-bottom: unset;
  }
}
</style>