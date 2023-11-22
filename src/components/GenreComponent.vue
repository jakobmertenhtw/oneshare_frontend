<script setup>
defineProps({
    genreTitle: String,
    imageUrl: String,
    imageAlt: String
})

</script>
<template>
    <div class="genre-container">
        <div class="image-container"><div class="image-overlay"></div></div>
        <div class="label-container">
            <p class="genre-label">{{ genreTitle }}</p>
        </div>
    </div>
</template>
    

 <style scoped>
 .genre-container {
    width: 18rem;
    height: 15rem;
    border-radius: 7%;
    overflow: hidden;
    background-color: #fff;
 }
 .image-container {
    width: 100%;
    height: 12rem;
    background-image: url('./images/jazz.png');
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
 }
 .image-overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background-image: linear-gradient(to top, white , transparent);
 }
 .label-container {
    width: 100%;
    padding: 0 20px;
 }
 .label-container p {
    color: #000;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
 }
</style>