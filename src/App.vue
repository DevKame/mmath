<template>
  <transition mode="out-in">
    <div v-if="display === 'home'" class="homeWrapper d-flex flex-column justify-content-start align-items-center">
      <the-header></the-header>
      <main class="globalBody d-flex flex-column flex-lg-row justify-content-start justify-content-lg-around align-items-center px-2">
        <text-block class="me-lg-5"
          headline="What is this about?"
          text-content="When you click on start, you will be shown multiple digits one by one. Its your task to sum them and enter the result at the end">
        </text-block>
        <the-play @click="setDisplay('inputs')" headline="Lets get started!" class="mt-3 mt-lg-0 ms-lg-5"></the-play>
      </main>
    </div>
    <div v-else-if="display === 'inputs'">
      <the-inputs
        @click-listener="setDisplay"></the-inputs>
    </div>
    <div v-else-if="display === 'game'">
      <the-game
        @click-listener="setDisplay"></the-game>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, reactive, provide } from "vue";
import TheHeader from "./comps/TheHeader.vue";
import TheInputs from "./comps/TheInputs.vue";
import TheGame from "./comps/TheGame.vue";
// STRING DETERMINING WHAT DOM TO SHOW
let display = ref<string>("home");
/** CALLBACK FOR CLICKEVENTS: PROVIDED STRING DETERMINES WHAT TO SHOW NEXT
 * @param {string} val  =>  'home' | 'inputs' | 'inputs' */
function setDisplay(val: string): void {
  display.value = val;
}

// DEFINES STRUCTURE OF THE gameData, VALUES ARE USED FOR THE GAME LATER
interface GameData {
    total: [number, number];
    time: number;
    spectrum: [number, number];
}
// INSTANTIATION OF THE gameData OBJECT
const gameData: GameData = reactive({
    total: [8, 10],
    time: 500,
    spectrum: [1, 10],
});
// PROVIDES REFERENCE OF gameData TO CHILDREN FOR MANIPULATION
provide("game-data", gameData);
</script>

<style>
.submitButton:hover::before,
.backButton:hover::before {
    height: 100%;
}
.submitButton::before,
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
.submitButton,
.backButton {
    cursor: pointer;
    border-bottom: 2px solid var(--green-med);
    transition: color .2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(.6);
}
.v-enter-active,
.v-leave-active {
  transition: all .4s ease;
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
