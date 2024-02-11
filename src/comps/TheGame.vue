<template>
    <section class="p-5 d-flex flex-column justify-content-start align-items-center p-2">
        <div :class="{clickable: gameRunning}" @click="sendDisplayValue('inputs')" class="backButton overflow-hidden position-relative px-3 py-2 d-flex justify-content-center align-items-center rounded-1">
            <p class="m-0 fw-bold">Back to settings</p>
        </div>

        <div class="digitWrapper mt-4 position-relative d-flex justify-content-center align-items-center border border-danger">
            <the-play @click="startGame" v-if="!gameRunning" headline="Game on!"></the-play>
            <p class="digits" ref="digits">{{ currentDigit }}</p>
        </div>
        <transition name="input">
            <div v-if="userInputExpected" class="userInputWrapper mt-4 d-flex flex-column justify-content-start align-items-center border border-danger">
                <h5>Enter your solution</h5>
                <input type="number" ref="userResult" class="text-center">
                <div @click="handleUserResult" class="submitButton mt-3 overflow-hidden position-relative px-3 py-2 d-flex justify-content-center align-items-center rounded-1">
                    Submit
                </div>
            </div>
        </transition>

        <div v-if="feedback" class="feedback mt-4 d-flex justify-content-center align-items-center border border-danger">
            <div v-if="answerRight" class="rightAnswer py-2 px-3 d-flex justify-content-start align-items-center">
                <h6 class="m-0">Correct, {{ sum }} is the right answer!!</h6>
            </div>
            <div v-if="answerWrong" class="wrongAnswer py-2 px-3 d-flex justify-content-start align-items-center">
                <h6 class="m-0">Wrong, {{ sum }} is the right answer!!</h6>
            </div>
        </div>
    </section>

</template>


<script lang="ts" setup>
import { inject, onMounted, ref, defineEmits } from 'vue';
const emits = defineEmits([
    "click-listener",
]);
const gameRunning = ref<boolean>(false);
interface GameData {
    total: [number, number];
    time: number;
    spectrum: [number, number];
}

const answerWrong = ref<boolean>(false);
const answerRight = ref<boolean>(false);
const userResult = ref<HTMLInputElement>();
const digits = ref<HTMLParagraphElement>();

const allNumbers = ref<number[]>([]);
const gameData: GameData = inject("game-data")!;

const currentDigit = ref<number>();

const userInputExpected = ref<boolean>(false);

const feedback = ref<boolean>(false);

let sum = ref<number>(0);

onMounted(() => {
    console.clear();
    console.table(gameData);
    let totalNumbers: number = getTotalDigits();
    console.log("totalNumbers:", totalNumbers);
    fillNumberArray(totalNumbers, allNumbers.value);
    currentDigit.value = allNumbers.value[0];
    console.table(allNumbers.value);
    sum.value = sumUp(allNumbers.value);
    console.warn("SUM:", sum.value);
    console.log(digits);
});

function handleUserResult() {
    console.clear();
    console.log("user Result:", userResult.value!.value);
    userInputExpected.value = false;
    if(+userResult.value!.value === sum.value)
    {
        answerRight.value = true;
    }
    else {
        answerWrong.value = true;
    }
    feedback.value = true;

}
/** SUMS UP ITEMS OF allNumbers
 * @param {number[]} all        => allNumbers ARRAY
 * @return {number} sum         => TOTAL SUM OF ALL NUMBERS */
function sumUp(all: number[]): number {
    let sum = 0;
    for(let i = 0 ; i < all.length ; i++)
    { 
        sum += all[i];
    }
    return sum;
}
async function startGame() {
    gameRunning.value = true;
  for (const number of allNumbers.value) {


    console.log(digits.value);

    await new Promise(resolve => setTimeout(() => {
        digits!.value!.classList.add("d-block");
        currentDigit.value = number;
        resolve(number);
    }, gameData.time / 2));

    await new Promise(resolve => setTimeout(() => {
        digits!.value!.classList.remove("d-block");
        resolve(number);
    }, gameData.time / 2));


  }
  userInputExpected.value = true;
  gameRunning.value = false;
}
/** FILLS allNumbers WITH RANDOM NUMBERS BETWEEN THE PROVIDED gameData.spectrum
 * @param {number} num      => TOTAL NUMBERS THAT HAVE TO BE SUMMED UP
 * @param {number[]} all    => THE allNumbers ARRAY TO BE FILLED */
function fillNumberArray(num: number, all: number[]): void {
    for(let i = 0; i < num ; i++) {
        all.push(Math.floor(Math.random() * (gameData.spectrum[1] - gameData.spectrum[0] + 1) + gameData.spectrum[0]));
    }
}
// GETS THE AMOUNT OF DIGITS OUT OF gameData.total
function getTotalDigits(): number {
    return Math.floor(Math.random() * (gameData.total[1] - gameData.total[0] + 1) + gameData.total[0]);
}
/** IF CLICKED, SENDS STRING "home" TO PARENT TO CHANGE DISPLAYED CONTENT
 *  @param {string} val     => "home" */
function sendDisplayValue(val: string): void {
    
    gameData.total = [8, 10];
    gameData.time = 500;
    gameData.spectrum = [1, 10];
    emits("click-listener", val);
}
</script>


<style scoped>
.clickable {
    pointer-events: none;
    opacity: 0;
}
.rightAnswer {
    border: 3px solid firebrick;
    border-radius: 15px;
    background-color: red;
    color: firebrick;
}
.rightAnswer {
    border: 3px solid var(--green-dark);
    border-radius: 15px;
    background-color: var(--green-med);
    color: var(--green-dark);
}
.input-enter-from,
.input-leave-to {
    opacity: 0;
}
.input-enter-active,
.input-leave-active {
    transition: opacity .3s ease;
}
.input-enter-to,
.input-leave-from {
    opacity: 1;
}
input[type="number"] {
    outline: none;
    color: var(--text-dark);
    border: 2px solid var(--green-dark);
    border-radius: 5px;
    padding: 5px;
    background-color: var(--prim-dark);
}
.digits.is_visible {
    display: block;
}
.digits {
    transform: scale(.5);
    transition: transform .1s linear;
    font-size: 200px;
    display: none;
}
.digitWrapper {
    width: 300px;
    height: 300px;
}
</style>