<template>
  <the-kamedin @show-stack="showTechstack"></the-kamedin>
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
  <teleport to="body">
    <transition name="stack">
      <div v-if="showStack" @click="closeTechstack" class="stackBackdrop position-fixed d-flex justify-content-center align-items-center">
        <div @click="closeTechstack" class="stackWindow d-flex flex-column justify-content-start align-items-center rounded-3">

          <div class="stackHeader w-100 px-2 d-flex justify-content-start align-items-center">
            <h2>Information</h2>
          </div>

          <div class="stackBody w-100 px-2 mt-5">
            <h5>Tech Stack</h5>
            <p>This application was made using</p>
            <ul>
              <li>Vue.js</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>Bootstrap</li>
              <li>Font Awesome</li>
            </ul>

            <p>Checkout source code on <a href="https://github.com/DevKame/mmath" target="_blank">GitHub</a></p>
            <p class="mt-4">This simple application helps you train your brain on mental math</p>
            <p>You will be confronted with a sequence of different digits that are displayed one by one.</p>
            <p>After the last digit was displayed, you are able to enter the sum of all digits</p>
            <p>Beforehand you are able to set the total number of digits, the time as long each digit is displayed and the max value of each digit</p>
          </div>
        </div>

      </div>
    </transition>
  </teleport>
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

function showTechstack() {
  showStack.value = true;
}
function closeTechstack() {
  showStack.value = false;
}
const showStack = ref<boolean>(false);
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
.stackWindow {
  width: clamp(300px, 90%, 500px);
  background-color: var(--prim);
  border: 3px solid black;
  outline: 2px solid var(--green-dark);
}
.stack-enter-from,
.stack-leave-to {
  opacity: 0;
  transform: scaleX(.8);
}
.stack-enter-active,
.stack-leave-active {
  transition: all .3s ease;
}
.stack-enter-to,
.stack-leave-from {
  opacity: 1;
  transform: scaleX(1);
}
.stackBackdrop {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.6);
}
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
