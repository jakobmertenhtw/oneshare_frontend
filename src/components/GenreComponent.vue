<script>
import { ref, watchEffect } from 'vue';

export default {
  name: "PostComponent",
  props: {
    genre: Object,
  },
  setup(props) {
   const logo = ref(null);
   watchEffect(async () => {
      logo.value = (await import(/* @vite-ignore */ `${props.genre.imagepath}`)).default
   })
   return { logo };
  }, 

  mounted() {
    console.log(this.genre.id);
    console.log(this.genre.imagepath);
  },
};
</script>
<template>
  <router-link :to="'/genre/id=' + genre.id" style="text-decoration: none;">
    <div class="genre-container">
      <div class="image-container">
        <img :src="logo" :alt="genre.imagealt" />
      </div>
      <h4>{{ genre.name }}</h4>
    </div>
  </router-link>
</template>

<style scoped>
.genre-container:hover {
   cursor: pointer;
   transition: all .4s ease;
   opacity: .7;
}
img {
   border-radius: 20px;
}
h4 {
   text-decoration: none;
   margin-top: 1rem;
   color: black;
   font-weight: 500;
   font-size: 1.2rem;
}
</style>
