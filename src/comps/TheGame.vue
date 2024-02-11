<template>
    <section class="p-5 d-flex flex-column justify-content-start align-items-center p-2">
        <div :class="{clickable: gameRunning}" @click="sendDisplayValue('inputs')" class="backButton overflow-hidden position-relative px-3 py-2 d-flex justify-content-center align-items-center rounded-1">
            <p class="m-0 fw-bold">Back to settings</p>
        </div>

        <div class="digitWrapper mt-4 position-relative d-flex justify-content-center align-items-center">
            <the-play @click="startGame" v-if="!gameRunning" headline="Game on!"></the-play>
            <p class="digits" ref="digits">{{ currentDigit }}</p>
        </div>
        <transition name="input">
            <div v-if="userInputExpected" class="userInputWrapper mt-4 d-flex flex-column justify-content-start align-items-center">
                <h5>Enter your solution</h5>
                <input type="number" ref="userResult" class="text-center">
                <div @click="handleUserResult" class="submitButton mt-3 overflow-hidden position-relative px-3 py-2 d-flex justify-content-center align-items-center rounded-1">
                    Submit
                </div>
            </div>
        </transition>

        <div v-if="feedback" class="feedback mt-4 d-flex justify-content-center align-items-center">
            <div v-if="answerRight" class="rightAnswer py-2 px-3 d-flex justify-content-start align-items-center">
                <p class="m-0">Correct, {{ sum }} is the right answer!!</p>
            </div>
            <div v-if="answerWrong" class="wrongAnswer py-2 px-3 d-flex justify-content-start align-items-center">
                <p class="m-0">Wrong, {{ sum }} is the right answer!!</p>
            </div>
        </div>
    </section>

</template>


<script lang="ts" setup>
import { inject, ref, defineEmits } from 'vue';
const emits = defineEmits([
    "click-listener",
]);
// INDICATOR IF THE GAME IS RUNNING OR NOT
const gameRunning = ref<boolean>(false);
interface GameData {
    total: [number, number];
    time: number;
    spectrum: [number, number];
}
// INJECTED GAMEDATA
const gameData: GameData = inject("game-data")!;

// DETERMINES IF YOUR GET THE RIGHT OR WRONG ALERT
const answerWrong = ref<boolean>(false);
const answerRight = ref<boolean>(false);
// THE <input> WHERE USER ENTERS HIS RESULT
const userResult = ref<HTMLInputElement>();
// THE <p> THAT DISPLAYS THE DIGITS
const digits = ref<HTMLParagraphElement>();

// CONTAINING ALL DIGITS THAT ARE ABOUT TO BE DISPLAYED
const allNumbers = ref<number[]>([]);
// VALUE OF THE CURRENTLY DISPLAYED DIGIT
const currentDigit = ref<number>();
//INDICATOR IF USER IS ALLOWED TO ENTER HIS RESULT NOW
const userInputExpected = ref<boolean>(false);
// INDICATOR IF THE FEEDBACK OF USERS RESULT CAN BE SHOWN NOW
const feedback = ref<boolean>(false);
// THE CORRECT RESULT OF ALL DIGITS
let sum = ref<number>(0);

// CHECKS IF THE USER RESULT IS CORRECT, HANDLES CORRESPONDIGN FEEDBACK
function handleUserResult() {
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
// CLEARS ALL VALUES TO CREATE A STATE WHERE USER IS ABLE TO START A GAME
function clearAll() {
    sum.value = 0;
    allNumbers.value.length = 0;
    userInputExpected.value = false;
    feedback.value = false;
    answerWrong.value = false;
    answerRight.value = false;
}
// DISPLAYS THE DIGITS ONE BY ONE
async function startGame() {
    clearAll();
    let totalNumbers: number = getTotalDigits();
    fillNumberArray(totalNumbers, allNumbers.value);
    currentDigit.value = allNumbers.value[0];
    sum.value = sumUp(allNumbers.value);
    gameRunning.value = true;
  for (const number of allNumbers.value) {

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
    gameData.time = 900;
    gameData.spectrum = [1, 10];
    emits("click-listener", val);
}
</script>


<style scoped>
.clickable {
    pointer-events: none;
    opacity: 0;
}
.wrongAnswer {
    border: 3px solid firebrick;
    border-radius: 15px;
    background-color: rgb(197, 114, 114);
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