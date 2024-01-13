<script>
import GenreComponent from "@/components/GenreComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  name: "DashboardGenresComponent",
  data() {
    return {
      showGenres: false,
      genres: [],
    };
  },
  mounted() {
    // get genres from backend
    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
    const endpoint = baseURL + "genres";
    const requestedOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(endpoint, requestedOptions)
      .then((response) => response.json())
      .then((data) => {
        this.genres = data;
        this.showGenres = true;
      })
      .catch((error) => console.log("error", error));
  },
  components: {
    GenreComponent,
    LoadingComponent
  },
};
</script>

<template>
  <div class="your-genres-main">
    <h2>Genres for you!</h2>
    <div class="genres-container" v-if="showGenres">
      <ul class="item" v-for="item in genres" :key="item.id">
        <li>
          <GenreComponent :genre="item" />
        </li>
      </ul>
    </div>
    <div class="loading-component-container" v-if="!showGenres">
      <LoadingComponent size="large" color="black" />
    </div>
  </div>
</template>

<style scoped>
.loading-component-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
}
.your-genres-main {
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  padding-bottom: 1rem;
}
h2 {
  margin-bottom: 2rem;
}
.item {
  display: flex;
  list-style: none;
}
.genres-container {
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  gap: 1rem;
  padding-bottom: 2rem;
}
</style>
