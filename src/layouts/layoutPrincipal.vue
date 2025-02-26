<template>
  <div class="wrapper-global">
    <Header />
    <MenuLateral />
    <section :class="['page-container', { 'collapsed': collapsedMenu }]">
      <div class="module-container">
        <slot />
      </div>
    </section>
  </div>
</template>

<script>
import Header from "../layouts/Header.vue";
import MenuLateral from "./MenuLateral.vue";

export default {
  components: {
    Header,
    MenuLateral,
  },
  computed: {
    collapsedMenu() {
      return this.$store.state.collapsedMenu;
    },
  },
};
</script>

<style scoped>
.wrapper-global {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #fafafa;
}

.page-container {
  position: relative;
  padding-left: 90px; /* Menú desplegado */
  padding-top: 70px;
  transition: padding-left 0.3s ease;
  /* Transición suave cuando el menú se abre/cierra */
}

.page-container.collapsed {
  padding-left: 215px; /* Menú colapsado, reducimos el espacio */
}

.module-container {
  padding: 30px 20px 0px 40px;
  flex: 1;
  overflow-y: auto;
  background-color: #fafafa;
  min-height: calc(90vh - 70px);
}
</style>
