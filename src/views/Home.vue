<template>
    <div class="container">
        <div class="form-container">
            <div class="left">
                <div class="texto">Bienvenido/a</div>
                <form @submit.prevent="login">
                    <label>Correo Institucional</label>
                    <input type="email" placeholder="Ingresa tu correo institucional" v-model="email" required />
                    <label>Contraseña</label>
                    <input type="password" placeholder=" ● ● ● ● ● ● ● ● " v-model="password" required />
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
            <div class="right">
                <img class="logoRight" src="../assets/images/IsssteesinLogoVerticalBlanco.png" alt="Logo" />
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                // Limpiar localStorage antes de realizar el inicio de sesión
                localStorage.clear();  // Elimina todos los elementos del localStorage
                // O si prefieres eliminar solo elementos específicos:
                // localStorage.removeItem('token');
                // localStorage.removeItem('nombreUsuario');
                // localStorage.removeItem('rolUsuario');

                // Realizar el POST para el login
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    correo: this.email,
                    contrasena: this.password,
                });

                if (response.data && response.data.token) {
                    const { nombre, apellido_paterno, apellido_materno, rol } = response.data.usuario;

                    // Crear el nombre completo concatenando nombre y apellidos
                    const nombreCompleto = `${nombre} ${apellido_paterno} ${apellido_materno}`;

                    // Guardar en localStorage
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('nombreUsuario', nombreCompleto); // Guardamos el nombre completo
                    localStorage.setItem('rolUsuario', rol);

                    // Verificar si los valores fueron guardados correctamente
                    console.log(localStorage.getItem('nombreUsuario'));  // Debería mostrar "Carlos Andres Lopez Loaiza"
                    console.log(localStorage.getItem('rolUsuario'));     // Debería mostrar "ROLE_ADMIN"

                    // Redirigir al dashboard
                    this.$router.push('/dashboard');
                } else {
                    this.loginError = 'Credenciales inválidas.';
                }
            } catch (error) {
                console.error('Error de inicio de sesión:', error);
                this.loginError = 'Hubo un problema con la conexión o las credenciales.';
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
    padding: 10px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    background: white;
    color: black;
    height: 30px;
}

/* Botón de login */
button {
    width: 80%;
    background: #691c32;
    color: white;
    border: none;
    padding: 12px;
    margin-top: 30px;
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