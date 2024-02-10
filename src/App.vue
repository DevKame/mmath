<template>
  <transition mode="out-in">
    <div v-if="display === 'home'" class="homeWrapper d-flex flex-column justify-content-start align-items-center">
      <the-header></the-header>
      <main class="globalBody d-flex flex-column flex-lg-row justify-content-start justify-content-lg-around align-items-center px-2">
        <text-block class="me-lg-5"
          headline="What is this about?"
          text-content="When you click on start, you will be shown multiple digits one by one. Its your task to sum them and enter the result at the end">
        </text-block>
        <the-play @click="setDisplay('inputs')" class="mt-3 mt-lg-0 ms-lg-5"></the-play>
      </main>
    </div>
    <div v-else-if="display === 'inputs'">
      <the-inputs
        @click-listener="setDisplay"></the-inputs>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TheHeader from "./comps/TheHeader.vue";
import TheInputs from "./comps/TheInputs.vue";

let display = ref<string>("home");

function setDisplay(val: string): void {
  display.value = val;
}
</script>

<style>
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
