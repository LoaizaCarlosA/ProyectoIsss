<template>
    <div class="container">
        <div class="form-container">
            <div class="left">
                <div class="texto">Bienvenido/a</div>
                <form>
                    <label>Correo Institucional</label>
                    <input type="email" placeholder="Ingresa tu correo institucional" />
                    <label>Contraseña</label>
                    <input type="password" placeholder="********" />
                </form>
                <button type="submit">Iniciar sesión</button>
            </div>
            <div class="right">
                <img class="logoRight" src="../assets/images/IsssteesinLogoVerticalBlanco.png" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 50px;
    box-sizing: border-box;
}

.form-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    max-height: 800px;
    border-radius: 15px;
    overflow: hidden;
    background: white;
    box-shadow: 0px 15px 30px rgb(0 0 0 / 39%);
    user-select: none;
}

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
    background: white;
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

@media (max-width: 768px) {
    .form-container {
        flex-direction: column;
        width: 100%;
        height: auto;
    }

    .left,
    .right {
        width: 100%;
        height: auto;
    }

    .right {
        order: -1;
    }
}
</style>