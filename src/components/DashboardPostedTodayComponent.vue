<script>
export default {
  name: "MeineKomponente",
  data() {
    return {
      posts: [],
      showPosts: false,
    };
  },
  methods: {
    getPostsFromToday() {
      // get posts from today
      const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
      let endpoint = baseURL + "postsFromToday";

      let requestedOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(endpoint, requestedOptions)
        .then((response) => response.json())
        .then((data) => {
          let postList = data;
          postList.forEach((post) => {
            this.posts.push({
              id: post.postID,
              title: post.titel,
              description: post.text,
              userID: post.userID,
              genreID: post.genreID,
              user: {},
            });
          });
          this.getUserDataPerPost();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUserDataPerPost() {
      this.posts.forEach((post) => {
        const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
        let endpoint = baseURL + "users/" + post.userID;

        let requestedOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        fetch(endpoint, requestedOptions)
          .then((response) => response.json())
          .then((data) => {
            post.user = {
              id: data.userID,
              userColor: "#" + data.profileColor,
              name: data.firstName + " " + data.lastName,
              profileName: data.profilePicture,
              description: data.mail,
            };
          })
          .catch((error) => {
            console.log(error);
          });
      });

      this.showPosts = true;
    },

    linkToPost(genreID, postID) {
      this.$router.push({
        name: "genre",
        params: { id: "id=" + genreID },
        hash: "#" + postID,
      });
    },
  },
  computed: {},
  mounted() {
    // get posts from today
    this.getPostsFromToday();
  },
};
</script>

<template>
  <div class="posted_today-main-container" v-if="showPosts">
    <div class="header-container">
      <h2>Posted today:</h2>
    </div>
    <div class="posts-container">
      <ul
        class="item"
        v-for="item in posts"
        :key="item.id"
        @click="linkToPost(item.genreID, item.id)"
      >
        <li>
          <div class="main-post-container">
            <h4>{{ item.title }}</h4>
            <div class="item_decription-container">
              <p>{{ item.description }}</p>
            </div>
            <div class="user-container">
              <div class="profile-picture-container">
                <div
                  class="background-color-container"
                  :style="{
                    backgroundColor: item.user.userColor,
                    borderColor: item.user.userColor,
                  }"
                ></div>
                <p :style="{ color: item.user.userColor }">
                  {{ item.user.profileName }}
                </p>
              </div>
              <div class="user-information-container">
                <h5>{{ item.user.name }}</h5>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.posted_today-main-container {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.header-container {
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
}
h2 {
  font-weight: 500;
  font-size: 1.4rem;
}
.posts-container {
  flex: 1;
  display: flex;
  gap: 1rem;
  overflow: scroll;
  max-width: 100%;
}
.posts-container ul {
  list-style: none;
  border-radius: 20px;
  background-color: #fafafa;
  padding: 1.5rem 1rem;
  min-width: 12rem;
}
.posts-container ul:hover {
  cursor: pointer;
  background-color: #ededed;
  transition: all 0.2s ease;
}
.main-post-container {
  display: flex;
  flex-direction: column;
}
.main-post-container h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.main-post-container .item_decription-container {
  max-height: 5rem;
  overflow-y: scroll;
}
.item_decription-container p {
  font-size: 0.9rem;
}
.user-container {
  display: flex;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
.profile-picture-container {
  width: 3rem;
  height: 2.75rem;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  position: relative;
  border-radius: 10px;
}
.profile-picture-container .background-color-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.2;
  border-radius: 5px;
}
.user-information-container {
  height: 2.75rem;
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 6rem;
}
.user-information-container h5 {
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
