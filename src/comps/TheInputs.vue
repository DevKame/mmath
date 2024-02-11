<template>
    <section class="inputWrapper d-flex flex-column justify-content-start align-items-center px-2">
        <h1 class="text-center">Toggle the difficulty</h1>
        <p class="text-center">Default difficulty is already at the easiest, feel free to change settings</p>
        <div @click="sendDisplayValue('home')" class="backButton overflow-hidden position-relative px-3 py-2 d-flex justify-content-center align-items-center rounded-1">
            <p class="m-0 fw-bold">Back to home</p>
        </div>
        <div class="allInputs mt-5 d-flex flex-column flex-lg-row justify-content-start align-items-center">
            <div class="d-flex me-lg-5 flex-column justify-content-start align-items-center">
                <text-block class="my-2"
                    headline="Total digits"
                    :range="true"
                    range-type="total"
                    @send-value="handleReceivedValues"></text-block>
                <text-block class="my-2"
                    headline="Time between digits"
                    :range="true"
                    range-type="time"
                    @send-value="handleReceivedValues"></text-block>
                <text-block class="my-2"
                    headline="Spectrum of digit sizes"
                    :range="true"
                    range-type="spectrum"
                    @send-value="handleReceivedValues"></text-block>
            </div>
            <the-play @click="sendDisplayValue('game')" headline="Prepare for maths!" class="mt-5 ms-lg-5"></the-play>
        </div>
    </section>
</template>

<script lang="ts" setup>
import {defineEmits, inject, onMounted} from "vue";
let emits = defineEmits([
    "click-listener",
]);
/** IF CLICKED, SENDS STRING "home" TO PARENT TO CHANGE DISPLAYED CONTENT
 *  @param {string} val     => "home" */
function sendDisplayValue(val: string): void {
    emits("click-listener", val);
}
interface InputObject {
    type: string;
    value: string
}
onMounted(() => {
    console.log(gameData);
})
// DEFINES STRUCTURE OF THE gameData, VALUES ARE USED FOR THE GAME LATER
interface GameData {
    total: [number, number];
    time: number;
    spectrum: [number, number];
}
const gameData: GameData = inject("game-data")!;
/** WHENEVER AN INPUT IS CHANGED, DEPENDANT ON ITS TYPE, Fn´s ARE INVOKED TO
 *  MANIPULATE gameData
 *  @param {InputObject} val    => {type: string, value: string} */
function handleReceivedValues(val: InputObject) {
    console.clear();
    switch(val.type) {
        case "total":
            setTotalData(val.value);
            break;
        case "time":
            setTimeData(val.value);
            break;
        case "spectrum":
            setSpectrumData(val.value);
            break;
    }
    console.log("GAMEDATA:");
    console.table(gameData);
}
/** CALLBACK FOR CHANGING THE RANGE INPUT FOR TOTALS - gameData.total
 * @param {string} val  => INPUT VALUE */
function setTotalData(val: string) {
    let value: [number, number];
    let min: number, max: number;
    switch(val) {
        case "1":
            min = 8;
            max = 10;
            break;
        case "2":
            min = 11;
            max = 13;
            break;
        case "3":
            min = 14;
            max = 16;
            break;
        case "4":
            min = 17;
            max = 20;
            break;
    }
    value = [min!, max!];
    console.log(gameData);
    gameData.total = value;
}
/** CALLBACK FOR CHANGING THE RANGE INPUT FOR TIME - gameData.time
 * @param {string} val  => INPUT VALUE */
function setTimeData(val: string) {
    let value: number;
    switch(val) {
        case "1":
            value = 500;
            break;
        case "2":
            value = 300;
            break;
        case "3":
            value = 150;
            break;
    }
    gameData.time = value!;
}
/** CALLBACK FOR CHANGING THE RANGE INPUT FOR SPECTRUM - gameData.spectrum
 * @param {string} val  => INPUT VALUE */
function setSpectrumData(val: string) {
    let value: [number, number];
    let max: number;
    switch(val) {
        case "1":
            max = 10;
            break;
        case "2":
            max = 20;
            break;
        case "3":
            max = 30;
            break;
        case "4":
            max = 40;
            break;
    }
    value = [1, max!];
    gameData.spectrum = value;
}
</script>


<style scoped>
.inputWrapper {
    padding-top: 15%;
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