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

  data() {
    return {
      isHome: false,
    };
  },

  mounted() {
    // check the url is its home path or not
    if (this.$route.path === "/user/dashboard") {
      this.isHome = false;
    } else {
      this.isHome = true;
    }
  },
};
</script>
<template>
  <router-link :to="'/genre/id=' + genre.id" style="text-decoration: none;">
    <div class="genre-container">
      <div class="image-container" :class="{ 'home-path' : isHome }">
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


@media screen and (max-width: 768px) {
  .home-path img {
    width: 100%;
    max-height: 10rem;
    object-fit: cover;
  }
}
</style>
