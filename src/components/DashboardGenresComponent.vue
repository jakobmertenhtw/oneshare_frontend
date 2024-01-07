<script>
import GenreComponent from "@/components/GenreComponent.vue";
export default {
  name: "DashboardGenresComponent",
  data() {
    return {
      genres: [
        {
          id: 1,
          name: "Jazz",
          imagepath: "./images/jazz.png",
          imagealt: "Jazz Genre",
        },
        {
          id: 2,
          name: "Klassik",
          imagepath: "./images/klassik.png",
          imagealt: "Klassik Genre",
        },
        {
          id: 3,
          name: "Hip Hop",
          imagepath: "./images/hiphop.png",
          imagealt: "Hip Hop Genre",
        },
        {
          id: 4,
          name: "Pop",
          imagepath: "./images/pop.png",
          imagealt: "Pop Genre",
        },
        {
          id: 5,
          name: "EDM",
          imagepath: "./images/edm.png",
          imagealt: "EDM Genre",
        },
        {
          id: 6,
          name: "Heavy Metal",
          imagepath: "./images/heavymetal.png",
          imagealt: "Heavy Metal Genre",
        },
        {
          id: 7,
          name: "Rock",
          imagepath: "./images/rock.png",
          imagealt: "Rock Genre",
        },
        {
          id: 8,
          name: "Funk",
          imagepath: "./images/funk.png",
          imagealt: "Funk Genre",
        },
      ],
    };
  },
  methods: {
    // Hier kommen die Methoden der Komponente
  },
  computed: {
    // Hier kommen die berechneten Eigenschaften der Komponente
  },
  mounted() {
    // Hier kommt der Code, der beim Laden der Komponente ausgeführt werden soll
  },
  components: {
    GenreComponent,
  },
};
</script>

<template>
  <div class="your-genres-main">
    <h2>Genres for you!</h2>
    <div class="genres-container">
      <ul class="item" v-for="item in genres" :key="item.id">
        <li>
          <GenreComponent :genre="item" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.your-genres-main {
    background-color: #fff;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    padding: 3rem 2rem;
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
}
</style>
