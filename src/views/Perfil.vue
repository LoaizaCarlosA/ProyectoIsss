<template>
    <Header></Header>

    <body>

        <main>
            <div class="profile-info">
                <section class="perfil">
                    <h1>Perfil</h1>
                    <img src="../assets/svg/icono-usuario.svg" alt="Foto de perfil" />
                </section>
            </div>
            <div class="edit-form">
                <section class="informacion">
                    <h2>Informacion actual del perfil</h2>
                    <div>
                        <div class="contenedorInputs">
                            <label>Nombre:</label>
                            <input type="text" maxlength="20" name="" id="nombre" :value="usuario.nombre" readonly />
                        </div>

                        <div class="contenedorInputs">
                            <label for="apellidos">Apellido paterno:</label>
                            <input type="text" maxlength="20" name="" id="apellid_paterno"
                                :value="usuario.apellido_paterno" placeholder="Ingrese el apellido paterno" readonly />
                        </div>

                        <div class="contenedorInputs">
                            <label for="apellidos">Apellido materno:</label>
                            <input type="text" maxlength="20" name="" id="apellido_materno"
                                :value="usuario.apellido_materno" placeholder="Ingrese el apellido materno" readonly />
                        </div>

                        <!-- <div class="contenedorInputs">
                <label for="direccion">Dirección:</label>
                <input
                  type="text"
                  maxlength="50"
                  id="direccion"
                  name="direccion"
                  value="Calle 123, Ciudad"
                />
              </div> -->

                        <div class="contenedorInputs">
                            <label for="Rol">Rol:</label>
                            <input type="tel" maxlength="10" name="" id="rol" :value="FormatoRol(usuario.rol)"
                                readonly />
                        </div>

                        <div class="contenedorInputs">
                            <label for="telefono">Correo:</label>
                            <input type="text" maxlength="40" name="" id="correo" :value="usuario.correo" readonly />
                        </div>

                        <div class="contendorBotones">
                            <router-link to="/Dashboard">
                                <Button class="btn-regresar" id="return-to-top">Regresar</Button>
                            </router-link>

                            <!--   <div class="buttons">
                                <Button class="btn-guardar" @click="actualizarUsuario">Guardar</Button>
                            </div> -->
                        </div>
                    </div>
                </section>
            </div>
            <div class="edit-form">
                <section class="informacion2">
                    <h2 class="notititulo">Notificaciones</h2>
                        <section class="sombraInputNoti">
                            <div class="contenedorNotificaciones" v-if="mostrarNotificacion1">
                                <div class="contenedorImgNoti">
                                    <img class="imgNoti" src="../assets/images/notificacion.png" alt="Notificación" />
                                </div>
                                <div class="infoNotificacion">
                                    <div class="tituloNoti">Notificación</div>
                                    <div>Esta es una prueba de notificación</div>
                                </div>
                                <div class="tachitaNoti">
                                    <div @click="mostrarNotificacion1=false"><span>X</span></div>
                                </div>
                            </div>
                        </section>
                        <br />
                        <section class="sombraInputNoti">
                            <div class="contenedorNotificaciones" v-if="mostrarNotificacion2">
                                <div class="contenedorImgNoti">
                                    <img class="imgNoti" src="../assets/images/notificacion.png" alt="" />
                                </div>
                                <div class="infoNotificacion">
                                    <div class="tituloNoti">Notificación</div>
                                    <div>Esta es una prueba de notificación</div>
                                </div>
                                <div class="tachitaNoti" @click="mostrarNotificacion2=false">
                                    <span>X</span>
                                </div>
                            </div>
                        </section>
                    <br />
                    <section class="sombraInputNoti">
                        <div class="contenedorNotificaciones" v-if="mostrarNotificacion3">
                            <div class="contenedorImgNoti">
                                <img class="imgNoti" src="../assets/images/notificacion.png" alt="" />
                            </div>
                            <div class="infoNotificacion">
                                <div class="tituloNoti">Notificación</div>
                                <div>Esta es una prueba de notificación</div>
                            </div>
                            <div class="tachitaNoti" @click="mostrarNotificacion3=false">
                                <div>X</div>
                            </div>
                        </div>
                    </section>
                    <br />
                    <section class="sombraInputNoti">
                        <div class="contenedorNotificaciones" v-if="mostrarNotificacion4">
                            <div class="contenedorImgNoti">
                                <img class="imgNoti" src="../assets/images/notificacion.png" alt="" />
                            </div>
                            <div class="infoNotificacion">
                                <div class="tituloNoti">Notificación</div>
                                <div>Esta es una prueba de notificación</div>
                            </div>
                            <div class="tachitaNoti" @click="mostrarNotificacion4=false">
                                <div>X</div>
                            </div>
                        </div>
                    </section>
                    <br />
                    <section class="sombraInputNoti">
                        <div class="contenedorNotificaciones" v-if="mostrarNotificacion5">
                            <div class="contenedorImgNoti">
                                <img class="imgNoti" src="../assets/images/notificacion.png" alt="" />
                            </div>
                            <div class="infoNotificacion">
                                <div class="tituloNoti">Notificación</div>
                                <div>Esta es una prueba de notificación</div>
                            </div>
                            <div class="tachitaNoti" @click="mostrarNotificacion5=false">
                                <div>X</div>
                            </div>
                        </div>
                    </section>
                    <br />
                    <section class="sombraInputNoti">
                        <div class="contenedorNotificaciones" v-if="mostrarNotificacion6">
                            <div class="contenedorImgNoti">
                                <img class="imgNoti" src="../assets/images/notificacion.png" alt="" />
                            </div>
                            <div class="infoNotificacion">
                                <div class="tituloNoti">Notificación</div>
                                <div>Esta es una prueba de notificación</div>
                            </div>
                            <div class="tachitaNoti" @click="mostrarNotificacion6=false">
                                <div>X</div>
                            </div>
                        </div>
                    </section>
                    <br />
<!--                     <section class="sombraInputNoti">
                        <div class="contenedorNotificaciones" v-if="mostrarNotificacion7">
                            <div class="contenedorImgNoti">
                                <img class="imgNoti" src="../assets/images/notificacion.png" alt="" />
                            </div>
                            <div class="infoNotificacion">
                                <div class="tituloNoti">Notificación</div>
                                <div>Esta es una prueba de notificación</div>
                            </div>
                            <div class="tachitaNoti" @click="mostrarNotificacion7=false">
                                <div>X</div>
                            </div>
                        </div>
                    </section> -->

                      <!--   <div class="contenedorNotificaciones">
                            <button @click="agregarNotificacion"> Agregar notificacion</button>
                            <div v-for="(notificacion, index) in notificacion" :key="index" class="notificacion">
                                <div>
                                    <img src="../assets/images/notificacion.png" alt="Icono">
                                    <div class="texto">
                                        <h3>Notificación {{ index  +1 }}</h3>

                                    </div>
                                </div>
                            </div>
                        </div> -->

                </section>

            </div>
        </main>
    </body>
</template>

<script>

import Header from '../layouts/Header.vue';
import Button from '../components/Forms/Button.vue'

export default {
    components: {
        Header,
        Button,
        
    },
    data() {
        return {
            mostrarNotificacion1: true,
            mostrarNotificacion2: true,
            mostrarNotificacion3: true,
            mostrarNotificacion4: true,
            mostrarNotificacion5: true,
            mostrarNotificacion6: true,
            mostrarNotificacion7: true,
            usuario: {
                id: null,
                nombre: '',
                apellido_paterno: '',
                apellido_materno: '',
                correo: '',
                rol: '',
                temportal: null,
                
            },
            rolOpciones: {
                "ROLE_ADMIN": "Administrador",
                "ROLE_KIOSKO": "Kisko",
                "ROLE_USER": "Usuario",
                "ROLE_JEFE": "Jefe",
                "ROLE_DESARROLLADOR": "Desarrollador",
                "ROLE_TESTER": "Tester",
                "ROLE_RESIDENTE": "Residente"
            }
        }
    },
    methods: {
        FormatoRol(rol) {
            return this.rolOpciones[rol] || rol;
        }
    },
    mounted() {
        const savedUser = localStorage.getItem('usuario');
        if (savedUser) {
            this.usuario = JSON.parse(savedUser);
        }
    }
}

</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    margin: 85px 0px 0px;
    padding: 0;
    background: #fafafa;
}

main {
    padding: 42px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: calc(89.5vh - 70px);
}

.perfil {
    box-shadow: 0px 3px 6px #00000029;
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
}

.profile-info {
    flex-basis: 15%;
    justify-content: center;
    display: flex;
    align-items: center;
}

.profile-info h1 {
    margin-top: 0;
}

.profile-info img {
    width: 100%;
}

.edit-form {
    flex-basis: 45%;
}

.contenedorInputs {
    display: flex;
    flex-direction: column;
}

.contendorBotones {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 18px;
}

.informacion {
    box-shadow: 0px 3px 6px #00000029;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    height: 525px;
}

.informacion2 {
    box-shadow: 0px 3px 6px #00000029;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    height: 525px;
    margin-left: 30px;
}

.notititulo {
    margin: 0px 0px 30px 0px;
}

.sombraInputNoti {
    box-shadow: 0px 3px 6px #00000029;
    background-color: #ffffff;
    border-radius: 10px;
}

.contenedorNotificaciones {
    width: 100%;
    height: 50px;
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
}

.contenedorImgNoti {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
}

.imgNoti {
    height: 40px;
}

.infoNotificacion {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 20px;
}

.tituloNoti {
    font-weight: bold;
    font-size: 17px;
}

.tachitaNoti {
    padding: 7px 10px 0px 0px;
    cursor: pointer;
}

.informacion h2 {
    margin-top: 0;
}

.informacion label {
    margin-bottom: 7px;
    font-weight: bold;
}

.informacion input {
    height: 32px;
    border: 0px solid #000000;
    box-shadow: 0px 3px 6px #00000029;
    outline: none;
    color: #000000;
    padding: 0px 7px;
    border-radius: 10px;
    margin-bottom: 27px;
}
</style>