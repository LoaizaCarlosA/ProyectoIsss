<template>
    <LayoutPrincipal>
        <ContainerWhite>
            <LoadScreenModal></LoadScreenModal>
        </ContainerWhite>
    </LayoutPrincipal>
</template>

<script>
import ContainerWhite from "@/layouts/ContainerWhite.vue";
import LayoutPrincipal from "../layouts/layoutPrincipal.vue";
import LoadScreenModal from "@/components/Forms/LoadScreenModal.vue";

export default {
    components: {
        LayoutPrincipal,
        ContainerWhite,
        LoadScreenModal
    },
};
</script>

<style scoped>
.proximamente {
    text-align: center;
    /* font-family: "Roboto"; */
    font-size: 30px;
    display: flex;
    color: #707070;
    flex-direction: column;
    height: 85vh;
    justify-content: center;
    align-items: center;
}

.imgServicio {
    padding-bottom: 40px;
    width: 50%;
}
</style>