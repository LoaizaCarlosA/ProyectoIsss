<template>
    <div class="container">
        <div class="form-container">
            <div class="left">
                <div class="texto">Bienvenido/a</div>
                <!-- Login Form -->
                <form v-if="!showForgotPassword" @submit.prevent="login">
                    <label>Correo Institucional</label>
                    <input type="email" placeholder="Ingresa tu correo institucional" v-model="email"
                        :class="{ 'input-error': emailError }" required />
                    <label>Contraseña</label>
                    <input type="password" placeholder=" ● ● ● ● ● ● ● ● " v-model="password"
                        :class="{ 'input-error': passwordError }" required />
                    <div class="link" @click="toggleForgotPassword">Olvidé mi contraseña</div>
                    <button type="submit">Iniciar sesión</button>
                </form>

                <!-- Forgot Password Form -->
                <form v-else @submit.prevent="sendRecoveryEmail">
                    <label>Correo para recuperación</label>
                    <input type="email" placeholder="Ingresa tu correo institucional" v-model="recoveryEmail"
                        :class="{ 'input-error': recoveryEmailError }" />
                    <div class="link" @click="toggleForgotPassword">Volver al login</div>
                    <button type="submit">Enviar nueva contraseña</button>
                </form>

            </div>
            <div class="right">
                <img class="logoRight" src="../assets/images/IsssteesinLogoVerticalBlanco.png" alt="Logo" />
            </div>
        </div>
    </div>
    <CambiarContrasena v-if="mostrarModalCambioContrasena" :usuario="JSON.parse(localStorage.getItem('usuario'))"
        @cerrar="mostrarModalCambioContrasena = false"
        @confirmar="mostrarModalCambioContrasena = false; this.$router.push('/dashboard')" />
</template>

<script>
import axios from 'axios';
import CambiarContrasena from '../components/Login/CambiarContrasena.vue';

export default {
    components: {
        CambiarContrasena,
    },
    data() {
        return {
            email: '',
            password: '',
            recoveryEmail: '',
            showForgotPassword: false,
            emailError: false,  // Error para el campo de email
            passwordError: false, // Error para el campo de password
            recoveryEmailError: false, // Error para el campo de recoveryEmail
            mostrarModalCambioContrasena: false,
        };
    },
    methods: {
        toggleForgotPassword() {
            this.showForgotPassword = !this.showForgotPassword;
        },
        async login() {
            this.emailError = false;
            this.passwordError = false;

            if (!this.email) this.emailError = true;
            if (!this.password) this.passwordError = true;
            if (this.emailError || this.passwordError) return;

            try {
                const response = await axios.post('http://192.168.21.18:5000/api/auth/login', {
                    correo: this.email,
                    contrasena: this.password,
                });

                if (response.data && response.data.token) {
                    const usuario = response.data.usuario;
                    const token = response.data.token;
                    const { nombre, apellido_paterno, apellido_materno, rol } = usuario;
                    const nombreCompleto = `${nombre} ${apellido_paterno} ${apellido_materno}`;

                    localStorage.setItem('token', token);
                    localStorage.setItem('nombreUsuario', nombreCompleto);
                    localStorage.setItem('rolUsuario', rol);
                    localStorage.setItem('usuario', JSON.stringify(usuario)); // ✅ Guarda todo el usuario

                    if (usuario.temporal === 1) {
                        this.mostrarModalCambioContrasena = true; // 👈 Levanta el modal
                    } else {
                        this.$router.push('/dashboard');
                    }
                } else {
                    this.emailError = true;
                    this.passwordError = true;
                }
            } catch (error) {
                console.error('Error de inicio de sesión:', error);
                this.emailError = true;
                this.passwordError = true;
            }
        },
        async sendRecoveryEmail() {
            try {
                const response = await axios.post('http://192.168.21.18:5000/api/auth/forgot-password', {
                    correo: this.recoveryEmail,
                });

                if (response.data && response.data.success) {
                    alert('Se ha enviado una nueva contraseña a tu correo institucional.');
                } else {
                    alert('Hubo un problema al intentar enviar el correo.');
                }
            } catch (error) {
                console.error('Error al enviar el correo de recuperación:', error);
                alert('Ocurrió un error. Intenta nuevamente más tarde.');
            }
        }
    }
};
</script>

<style scoped>
/* Asegúrate de que el html y body ocupen el 100% de la altura y no se desborden */
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    /* Esto evitará el scroll */
}

/* Contenedor principal */
.container {
    padding: 50px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background: white;
}

/* Formulario contenedor */
.form-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    border-radius: 15px;
    background: white;
    box-shadow: 0px 15px 30px rgb(0 0 0 / 39%);
    user-select: none;
    overflow: hidden;
    /* Asegura que no haya scroll dentro del formulario */
}

/* Sección izquierda (formulario) */
.left {
    width: 50%;
    background: #b9b9b969;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 30px;
}

/* Estilo de los textos */
.texto {
    font-size: 36px;
    margin-top: 30px;
}

/* Formulario de entrada */
.left form {
    width: 80%;
    display: flex;
    flex-direction: column;
}

/* Estilo de etiquetas */
.left form label {
    font-size: 20px;
    margin-top: 20px;
}

/* Estilo de los inputs */
.left form input {
    padding: 8px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    background: white;
    color: black;
    height: 30px;
    border-radius: 10px;

}

/* Botón de login */
button {
    width: 100%;
    background: #691c32;
    color: white;
    border: none;
    padding: 12px;
    margin-top: 65px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    transition: 0.3s ease;
}

button:hover {
    background: #e55050;
}

/* Sección derecha (logo) */
.right {
    width: 50%;
    background: #691c32;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.logoRight {
    width: 70%;
}

.link {
    margin-top: 20px;
    font-size: 14px;
    color: #0056b3;
    cursor: pointer;
    text-decoration: underline;
    align-self: flex-start;
}

.input-error {
    border: 2px solid red;
}

@media (max-width: 820px) {
    .container {
        padding: 0px 50px;
        height: 90vh;
    }

    .form-container {
        flex-direction: column;
        width: 100%;
        height: auto;
    }

    .left,
    .right {
        width: 100%;
        height: auto;
        padding: 60px 0px;
    }

    .right {
        order: -1;
    }

    .texto {
        font-size: 30px;
        margin-top: 0px;
    }

    .logoRight {
        width: 40%;
    }

    .left form label {
        margin-top: 40px
    }
}
</style>