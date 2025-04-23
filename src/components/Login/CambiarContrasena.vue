<template>
    <ModalBaseConfirmacion>
      <section class="contenedorPrincipal">
        <section>
          <div class="contenedorLogo">
            <img class="imgLogo" src="@/assets/images/ISSSTEESIN_HORIZONTAL.png" alt="" />
          </div>
          <div class="separador"></div>
        </section>
        <div class="titulo">
          <div class="mensajeEliminar">{{ mensajeExito }}</div>
          <div class="NombreUsuario">
            <input 
              v-model="nuevaContrasena" 
              type="password" 
              placeholder="Nueva contraseña" 
              class="inputEditar"
            />
          </div>
          <div class="NombreUsuario">
            <input 
              v-model="confirmarContrasena" 
              type="password" 
              placeholder="Confirmar nueva contraseña" 
              class="inputEditar"
            />
          </div>
          <div v-if="error" class="error">{{ error }}</div>
        </div>
        <section class="contenedorBotones">
          <Button class="btn-confirmar-eliminar" @click="cambiarContrasena">Confirmar</Button>
        </section>
      </section>
      <LoadScreen v-if="cargando" />
    </ModalBaseConfirmacion>
  </template>
  
  <script>
  import ModalBaseConfirmacion from "../Modales/ModalBaseConfirmacion.vue";
  import LoadScreen from "../Forms/LoadScreen.vue";
  import Button from "../Forms/Button.vue";
  
  export default {
    components: {
      ModalBaseConfirmacion,
      LoadScreen,
      Button,
    },
    props: {
      mensajeExito: {
        type: String,
        default: "Ingresar nueva contraseña:",
      },
    },
    data() {
      return {
        nuevaContrasena: "",
        confirmarContrasena: "",
        cargando: false,
        error: "",
      };
    },
    methods: {
      async cambiarContrasena() {
        this.error = "";
  
        // Validar contraseñas
        if (!this.nuevaContrasena || !this.confirmarContrasena) {
          this.error = "Por favor, llena todos los campos.";
          return;
        }
        if (this.nuevaContrasena !== this.confirmarContrasena) {
          this.error = "Las contraseñas no coinciden.";
          return;
        }
        if (this.nuevaContrasena.length < 8) {
          this.error = "La contraseña debe tener al menos 8 caracteres.";
          return;
        }
  
        // Enviar nueva contraseña al backend
        this.cargando = true;
        try {
          const token = localStorage.getItem("token");
          const response = await this.$axios.post(
            "http://192.168.21.18:5000/api/auth/change-password",
            { nuevaContrasena: this.nuevaContrasena },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert(response.data.message || "Contraseña actualizada exitosamente.");
          this.$emit("cerrarModal"); // Cerrar el modal tras el éxito
        } catch (error) {
          console.error("Error al cambiar contraseña:", error);
          this.error = "Hubo un problema al cambiar la contraseña. Intenta de nuevo.";
        } finally {
          this.cargando = false;
        }
      },
    },
  };
  </script>

<style scoped>
.contenido-modal {
    min-width: 500px !important;
}

.titulo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 23px;
    align-items: center;
}

.contenedorLogo {
    justify-content: center;
    display: flex;
    padding: 30px 0px 10px;
}

.imgLogo {
    height: 40px;
}

.separador {
    border-top: 3px solid #691c32;
    height: 2px;
    max-width: 100%;
    padding: 0;
    /* margin: 20px auto 0 auto; */
    margin-top: 5px;
    margin-bottom: 30px;
}

.contenedorImg {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0px 5px;
}

.contenedorPrincipal {
    margin: 0px 30px;
}

.imgE {
    height: 200px;
}

.label {
    /* font-weight: 500; */
    margin: 17px 0px 5px;
}

.inputEditar {
    width: 300px;
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    color: #000000;
    padding: 0px 7px;
    border-radius: 10px;
}

.buscadorSelect {
    width: 100%;
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    padding: 0px 7px;
    border-radius: 10px;
}

.contenedorBotones {
    display: flex;
    justify-content: space-evenly;
    max-width: 80%;
    margin: auto;
    padding: 30px 0px 30px;
}

.NombreUsuario {
    font-style: italic;
    color: #691c32;
}

.signoInt {
    color: #000000;
    font-style: normal;
    font-weight: 100;
}
</style>