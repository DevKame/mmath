<template>
    <input type="range" class="mt-3">
</template>



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
  background: var(--green-dark);
  height: 0.5rem;
  border-radius: 5px;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
  background: var(--green-dark);
  height: 0.5rem;
  border-radius: 5px;
}
/***** Thumb Styles *****/
/***** Chrome, Safari, Opera, and Edge Chromium *****/
input[type="range"]::-webkit-slider-thumb {
   -webkit-appearance: none; /* Override default look */
   appearance: none;
   margin-top: -9px; /* Centers thumb on the track */
   background-color: var(--green-med);
   width: 25px;
   aspect-ratio: 1;
   border: 2px solid var(--text-dark);
   border-radius: 50%;
}
/***** Thumb Styles *****/
/***** Firefox *****/
input[type="range"]::-moz-range-thumb {
    border-radius: 0; /*Removes default border-radius that FF applies*/
    background-color: var(--green-med);
    width: 25px;
    aspect-ratio: 1;
    border: 2px solid var(--text-dark);
    border-radius: 50%;
}
</style>