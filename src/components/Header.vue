<template>
    <section class="contenedorPrincipal">
        <div class="contenedorLogo">
            <img class="imagenLogo" src="@/assets/images/IsssteesinLogo.png" alt="LogoIsssteesin">
        </div>
        <div class="contenedorPrincipalRedes">
            <section class="contenedorRedes">
                <div class="facebookIcon">
                    <i class="fab fa-facebook fa-3x " style="color: #671f32; cursor: pointer;"></i>
                </div>
                <div class="twitterIcon">
                    <i class="fab fa-twitter fa-3x" style="color: #671f32; cursor: pointer;"></i>
                </div>
                <div class="instagramIcon">
                    <i class="fab fa-instagram fa-3x" style="color: #671f32; cursor: pointer;"></i>
                </div>
            </section>
            <section class="contenedorContacto">
                <div>
                    <div>
                        <i class="fa-solid fa-phone-flip fa-1x " style="color: #671f32; cursor: pointer;"></i>
                    </div>
                    <div>
                        667 690 6030
                    </div>
                </div>
                <div>
                    <div>
                        <i class="fa-solid fa-envelope fa-1x " style="color: #671f32; cursor: pointer;"></i>
                    </div>
                    <div>
                        contacto@isssteesin.gob.mx
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MiComponente',
    mounted() {
        console.log('Componente montado!');
    }
}
</script>

<style scoped>
.contenedorPrincipal {
    width: 100%;
    height: 20%;
    background-color: white;
    display: flex;
    align-items: center;
    text-align: center;
}

.imagenLogo {
    width: 20%;
}

.contenedorLogo {
    padding: 20px;
    width: 50%;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
}

.contenedorPrincipalRedes {
    width: 50%;
    padding: 20px;
}

.contenedorRedes {
    display: flex;
    align-items: center;
    justify-content: center;
}

.facebookIcon {
    padding: 0px 25px;
}

.twitterIcon {
    padding: 0px 25px;
}

.instagramIcon {
    padding: 0px 25px;
}

.contenedorContacto {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
