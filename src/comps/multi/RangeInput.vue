<template>
    <input @input="sendValue" type="range" class="mt-3" min="1" :max="max" step="1" value="1">
</template>

<script lang="ts" setup>
import {defineProps, defineEmits, computed} from "vue";
const props = defineProps([
    "rangeType",
]);
const emits = defineEmits([
    "send-value"
]);
// COMPUTES THE MAX VALUE OF THE INPUT DEPENDANT ON props.rangeType
const max = computed(() => {
    let max: string;
    switch(props.rangeType) {
        case "total":
            max = "4";
            break;
        case "time":
            max = "7";
            break;
        case "spectrum":
            max = "4";
            break;
    }
    return max;
});
// DEFINES STRUCTURE OF OBJECT DELIVERED TO PARENT COMPONENT
interface InputObject {
    type: string;
    value: string
}
/** SENDS <input>´s VALUE TO PARENT COMP TO GENERATE A VALUE
 *  DEPENDANT OF ITS VALUE
 * @param {Event} e => EVENT FROM <input> */
function sendValue(e: Event) {
    const vObject: InputObject = {
        type: props.rangeType,
        value: e.target!.value,
    };
    emits("send-value", vObject);
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  width: 100%;
}
/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
  background: var(--green-med);
  height: 0.5rem;
  border-radius: 5px;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
  background: var(--green-med);
  height: 0.5rem;
  border-radius: 5px;
}
/***** Thumb Styles *****/
/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-thumb {
   -webkit-appearance: none; /* Override default look */
   appearance: none;
   margin-top: -9px; /* Centers thumb on the track */
   background-color: var(--brown);
   width: 25px;
   aspect-ratio: 1;
   border: 2px solid black;
   border-radius: 50%;
}
/***** Thumb Styles *****/
/***** Firefox *****/
input[type="range"]::-moz-range-thumb {
    border-radius: 0; /*Removes default border-radius that FF applies*/
    background-color: var(--brown);
    width: 25px;
    aspect-ratio: 1;
    border: 2px solid black;
    border-radius: 50%;
}
</style>