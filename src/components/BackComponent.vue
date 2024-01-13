<script>
import { useRouter } from 'vue-router';

export default {
    name: 'BackComponent',
    setup() {
        const router = useRouter();
        const goBack = () => {
            router.back();
        }
        return {
            goBack
        }
    }
}
</script>

<template>
    <div class="back_arrow" @click="goBack">
        <img src="/icons/back_arrow.svg" alt="back_arrow">
    </div>
</template>

<style scoped>
.back_arrow {
    position: absolute;
    width: fit-content;
    left: 4rem;
    padding: 7px 10px;
    border-radius: 5px;
    transition: all .25s ease-in;
}
.back_arrow:hover {
    background-color: rgba(0, 0, 0, .2);
    cursor: pointer;
}
img {
    width: 1rem;
    height: 1rem;
}
</style>
