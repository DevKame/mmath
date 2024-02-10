<template>
    <section class="inputWrapper d-flex flex-column justify-content-start align-items-center px-2">
        <h1 class="text-center">Toggle the difficulty</h1>
        <p class="text-center">Default difficulty is already at the easiest, feel free to change settings</p>
        <div @click="sendDisplayValue('home')" class="backButton overflow-hidden position-relative px-3 py-2 d-flex justify-content-center align-items-center rounded-1">
            <p class="m-0 fw-bold">Back to home</p>
        </div>
        <div class="allInputs mt-5 d-flex flex-column justify-content-start align-items-center">
            <text-block class="my-2"
                headline="Total digits"
                :range="true"></text-block>
            <text-block class="my-2"
                headline="Time between digis"
                :range="true"></text-block>
            <text-block class="my-2"
                headline="Spectrum of digit sizes"
                :range="true"></text-block>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {defineEmits} from "vue";
let emits = defineEmits([
    "click-listener",
]);

function sendDisplayValue(val: string): void {
    emits("click-listener", val);
}
</script>


<style scoped>
.backButton:hover::before {
    height: 100%;
}
.backButton::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-image: linear-gradient(to top, rgb(56, 106, 115) -20%, rgba(56, 106, 115, 0)90%);
    transition: all .3s ease;
}
.backButton {
    cursor: pointer;
    border-bottom: 2px solid var(--green-med);
    transition: color .2s ease;
}
.inputWrapper {
    padding-top: 20%;
}
@media screen and (min-width: 576px) {
    .inputWrapper {
        padding-top: 10%;
    }
}
@media screen and (min-width: 768px) {
    .inputWrapper {
        padding-top: 25px;
    }
}
@media screen and (min-width: 992px) {
}
@media screen and (min-width: 1200px) {
}
</style>