<template>
    <div class="spinner-overlay">
        <svg class="spinner" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="#691c32" stroke-width="5" />
        </svg>
        <p class="info">Cargando, espere un momento...</p>
    </div>
</template>

<script>
export default {
    name: 'SvgLoader',
    props: {
        info: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.spinner-overlay {
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3000;
    user-select: none;
}

.spinner {
    animation: rotate 1s linear infinite;
    width: 90px;
    height: 90px;
}

.path {
    stroke-linecap: round;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}

.info {
    color: #691c32;
    padding: 14px;
    max-width: 400px;
    text-align: center;
    font-size: 20px;
    /* Tamaño de fuente aumentado */
    font-style: italic;
    font-weight: bold;

}
</style>


<!-- 
LOADER ANTIGUO

<template>
    <div class="bounce-loader">
        <div class="circulo-load"></div>
        <p class="info" v-if="info != ''">{{ info }}</p>
    </div>
</template>

<script>
export default {
    name: 'LoadScreen',
    props: {
        info: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            key_random: 0,
        };
    },
    mounted() {
        const random = Math.floor(Math.random() * (100000 - 1000)) + 1000;
        this.key_random = random;
        document.body.classList.add('loader_' + random);
    },
    unmounted() {
        document.body.classList.remove('loader_' + this.key_random);
    },
};
</script>

<style scoped>
.info {
    max-width: 400px;
    padding: 14px;
    color: white;
}

.bounce-loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    z-index: 3000;
}

.circulo-load {
    height: 80px;
    width: 80px;
    border: 5px solid #691c32;
    border-radius: 50%;
    border-top: #fff;
    animation: circular-loader 1s linear infinite;
}

@keyframes circular-loader {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style> -->
