<template>
    <div class="playTitleWrapper d-flex flex-column justify-content-start align-items-center">
        <h2 class="text-center">{{ props.headline }}</h2>
    <div class="playWrapper mt-3 d-flex justify-content-center align-items-center">
        <div class="playButton position-relative h-100 w-100 rounded-circle d-flex justify-content-center align-items-center">
            <fa-icon icon="fa-solid fa-play"></fa-icon>
            <div class="glass rounded-circle position-absolute"></div>
        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
const props = defineProps([
    "headline",
]);
</script>


<style scoped>
.glass {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0,0,0,0) 50%, rgba(255, 255, 255, .5) 80%);
}
.playWrapper:hover svg {
    font-size: 90px;
}
.playButton svg {
    font-size: 70px;
    transform: translateX(12.5%);
    transition: all .3s ease;
}
.playButton {
    border: 10px solid grey;
    box-shadow: 0 0 10px 7px black inset;
    background-color: var(--green-med);
}
.playWrapper {
    width: 200px;
    height: 200px;
    cursor: pointer;
}
</style>