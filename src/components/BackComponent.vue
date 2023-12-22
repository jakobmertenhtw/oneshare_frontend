<script>
export default {
    name: 'BackComponent',
    setup() {

    }
}
</script>

<template>
    <div class="back_arrow">
        <router-link to="/">
            <img src="./icons/back_arrow.svg" alt="back_arrow">
        </router-link>
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
}
img {
    width: 1rem;
    height: 1rem;
}
</style>
