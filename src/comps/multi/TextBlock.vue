<template>
    <section class="textBlock d-flex flex-column justify-content-start align-items-center">
        <div class="blockHeader w-100 d-flex justify-content-start align-items-center">
            <div class="iconHolder d-flex justify-content-center align-items-center bg-br">

            </div>
            <div class="hlHolder ps-2 text-l d-flex justify-content-start align-items-center">
                <p class="m-0 fw-bold">{{ props.headline }}</p>
            </div>
        </div>
        <div class="blockBody w-100 d-flex flex-column justify-content-start align-items-center">
            <div class="bodyContent w-100 p-1 px-2 d-flex justify-content-center align-items-center">
                <p v-if="!range" class="m-0 text-left">{{ props.textContent }}</p>
                <range-input v-else-if="range"></range-input>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";
let props = defineProps([
    "range",
    "headline",
    "textContent",
]);
</script>


<style scoped>
.blockBody {
    min-height: 50px;
    box-shadow: 0 0 4px 1px black inset;
}
.hlHolder {
    flex: 1;
    height: 100%;
    background-image: linear-gradient(to right, var(--brown), var(--prim));
    letter-spacing: 2px;
}
.iconHolder {
    width: 50px;
    height: 50px;
}
.blockHeader {
    height: 50px;
}
.textBlock {
    width: 300px;
}
</style>