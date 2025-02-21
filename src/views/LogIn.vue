<template>
    <div class="container">
        <div class="form-container">
            <!-- Formulario (Izquierda) -->
            <div class="left">
                <div class="texto">Bienvenido/a</div>
                <form>
                    <label>Correo Institucional</label>
                    <input type="email" placeholder="Ingresa tu correo institucional" />

                    <label>Contraseña</label>
                    <input type="password" placeholder="********" />

                    <!-- <div class="checkbox-container">
                        <input type="checkbox" id="terms" />
                        <label for="terms">By signing up you agree <a href="#">Terms & Conditions</a></label>
                    </div> -->
                </form>
                <button type="submit">Sign Up</button>
            </div>

            <!-- Imagen y mensaje (Derecha) -->
            <div class="right">
                <img class="logoRight" src="../assets/images/IsssteesinLogoVerticalBlanco.png" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Fondo general */
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
}

/* Contenedor principal */
.form-container {
    display: flex;
    width: 1200px;
    height: 800px;
    border-radius: 15px;
    overflow: hidden;
    background: white;
    box-shadow: 0px 15px 30px rgb(0 0 0 / 39%);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* .form-container:hover {
  transform: translateY(-5px);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
} */

/* Sección izquierda (Formulario) */
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

.texto {
    font-size: 36px;
    margin-top: 30px;
}

.left form {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.left form label {
    font-size: 20px;
    margin-top: 20px;
}

.left form input {
    padding: 10px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    background:white;
    /* background: #2a2a3a; */
    color: black;
    height: 30px;
}

.checkbox-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 12px;
}

.checkbox-container input {
    margin-right: 5px;
}

.checkbox-container a {
    color: #ff6b6b;
    text-decoration: none;
}

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

/* Sección derecha (Imagen y texto) */
.right {
    width: 50%;
    background: #691c32;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    text-align: center;
}

.right .icon {
    font-size: 50px;
    margin-top: 20px;
    animation: float 3s infinite ease-in-out;
}

.logoRight {
    width: 70%;
}
</style>