<template>
    <header class="w-100 ps-3 mb-5 d-flex flex-column justify-content-end align-items-start">
        <div class="hl-wrapper rounded-2 py-1 px-3 py-lg-2 px-lg-4 d-inline-flex justify-content-center align-items-center">
            <h1 class="m-0">MENTAL MATH</h1>
        </div>
        <div class="hl-wrapper rounded-2 mt-2 py-1 px-3 py-lg-2 px-lg-4 d-inline-flex justify-content-center align-items-center">
            <h4 class="m-0 fst-italic">TRAIN YOUR BRAIN!</h4>
        </div>
    </header>
</template>



<style scoped>
.hl-wrapper:last-child {
    margin-bottom: 5%;
}
.hl-wrapper {
    box-shadow: 0 0 5px 3px #ccc inset,
                0 0 5px 2px #333;
    background-color: rgba(204, 204, 204, .2);
}
header h4 {
    font-size: 18px;
}
header h1 {
    font-size: 40px;
}
header {
    height: 200px;
    background-image: url("@/assets/img/header_backgrounds/header_800.png");
    background-size: 100% 100%;
}

@media screen and (min-width: 768px) {
    header {
        background-image: url("@/assets/img/header_backgrounds/header_1200.png");
    }
}
@media screen and (min-width: 992px) {
    header {
        height: 300px;
    }
    header h4 {
        font-size: 26px;
    }
    header h1 {
        font-size: 60px;
    }
}
@media screen and (min-width: 1200px) {
    header {
        background-image: url("@/assets/img/header_backgrounds/header_1920.png");
        height: 400px;
    }
    header h4 {
        font-size: 30px;
    }
    header h1 {
        font-size: 80px;
    }
}
</style>