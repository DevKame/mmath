<template>
    <section class="textBlock d-flex flex-column justify-content-start align-items-center">
        <div class="blockHeader w-100 d-flex justify-content-start align-items-center">
            <div class="iconHolder d-flex justify-content-center align-items-center bg-br">
                <fa-icon v-if="range" :icon="iconType" size="lg"></fa-icon>
            </div>
            <div class="hlHolder ps-2 text-l d-flex justify-content-start align-items-center">
                <p class="m-0 fw-bold">{{ props.headline }}</p>
            </div>
        </div>
        <div class="blockBody w-100 d-flex flex-column justify-content-start align-items-center">
            <div class="bodyContent w-100 p-1 px-2 d-flex justify-content-center align-items-center">
                <p v-if="!range" class="m-0 text-left">{{ props.textContent }}</p>
                <div v-else-if="range" class="inputContainer w-100 d-flex flex-column jutify-content-start align-items-center">
                    <range-input
                        :range-type="rangeType"
                        @send-value="redirectValueToParent">
                    </range-input>
                    <p class="mt-3" v-html="info"></p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, computed, inject} from "vue";
let props = defineProps([
    "range",
    "headline",
    "textContent",
    "rangeType"
]);
const emits = defineEmits([
    "send-value"
]);
interface GameData {
    total: [number, number];
    time: number;
    spectrum: [number, number];
}
const gameData: GameData = inject("game-data")!;
const info = computed(() => {
    let value: string;
    switch(props.rangeType)
    {
        case "total":
            value = "Digits from <span class='fw-bold'>" + gameData.total[0] + "</span> to <span class='fw-bold'>" + gameData.total[1] + "</span>";
            break;
        case "time":
            value = "Time between digits is <span class='fw-bold'>" + gameData.time + "</span>ms";
            break;
        case "spectrum":
            value = "Digits reach from <span class='fw-bold'>" + gameData.spectrum[0] + "</span> to <span class='fw-bold'>" + gameData.spectrum[1] + "</span>";
            break;
    }
    return value!;
});
const iconType = computed(() => {
    let icon: string;
    switch(props.rangeType) {
        case "total":
            icon = "fa-solid fa-layer-group";
            break;
        case "time":
            icon = "fa-solid fa-clock";
            break;
        case "spectrum":
            icon = "fa-solid fa-up-right-and-down-left-from-center";
            break;
    }
    return icon!;
});

interface InputObject {
    type: string;
    value: string
}
function redirectValueToParent(val: InputObject) {
    emits("send-value", val);
}
</script>


<style scoped>
.iconHolder {
    color: var(--text-light);
}
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