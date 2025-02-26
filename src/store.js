// src/store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    collapsedMenu: JSON.parse(localStorage.getItem('collapsedMenu')) || false,
  },
  mutations: {
    toggleMenu(state) {
      state.collapsedMenu = !state.collapsedMenu;
      localStorage.setItem('collapsedMenu', JSON.stringify(state.collapsedMenu));
    },
  },
});
