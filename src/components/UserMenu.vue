<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "UserMenu",
  setup() {
    const username = ref("");
    const user_description = ref("");
    const profile_picture = ref("");
    const profile_color = ref("");

    const store = useStore();

    const signout = () => {
      store.dispatch("logout");
    };

    return {
      username,
      user_description,
      profile_picture, 
      profile_color,
      signout,
    };
  },
  mounted() {
    const user_id = this.$store.getters.getUserId;

    const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;
    let endpoint = baseURL + "users/" + user_id;
    let requestedOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(endpoint, requestedOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.username = data.firstName + " " + data.lastName;
        this.user_description = data.mail;
        this.profile_picture = data.profilePicture;
        this.profile_color = data.profileColor;
      })
      .catch((error) => {
        window.alert("Something went wrong! Please try again later!");
        console.log(error);
      });
  },
};
</script>

<template>
  <div class="user-menu-container">
    <div class="profile-info-con">
      <div class="profile_picture-cotainer">
        <div class="profile_picture-background" :style="{backgroundColor: '#' + profile_color}"></div>
        <p id="profile_picture-text" :style="{color: '#' + profile_color}">{{ profile_picture }}</p>
      </div>
      <h3 id="username">{{ username }}</h3>
      <p id="user_description">{{ user_description }}</p>
    </div>
    <div class="menu-links-con">
      <ul>
        <li>
          <router-link class="menu_link" to="/user/dashboard"
            ><span class="link_text">Dashboard</span
            ><span class="link_icon"><img src="./icons/right.svg" /></span
          ></router-link>
        </li>
        <li>
          <router-link class="menu_link" to="/user/profile"
            ><span class="link_text">Profile Information</span
            ><span class="link_icon"><img src="./icons/right.svg" /></span
          ></router-link>
        </li>
        <li>
          <router-link class="menu_link" to="/user/posts"
            ><span class="link_text">My Posts</span
            ><span class="link_icon"><img src="./icons/right.svg" /></span
          ></router-link>
        </li>
      </ul>
    </div>
    <button id="logout_btn" @click="signout">Logout</button>
  </div>
</template>

<style scoped>
.user-menu-container {
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  min-width: 17rem;
  width: 100vw;
  height: 90vh;
  background-color: #fff;
  margin-top: 5vh;
  margin-left: 1rem;
  border-radius: 15px;
  padding: 0 20px;
}
.profile-info-con {
  width: 100%;
  text-align: center;
  padding-top: 6rem;
}

.profile_picture-cotainer {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 2rem;
  position: relative;
}
.profile_picture-background {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  border-radius: 10px;
}
#profile_picture-text {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}
p {
  font-size: 0.8rem;
  margin-top: 0;
}

button,
.menu_link {
  border: none;
  outline: none;
  background-color: #fafafa;
  width: 100%;
  min-height: 3.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}
.menu-links-con {
  flex: 1;
  padding-top: 2rem;
}
ul {
  list-style: none;
  padding-left: 0;
  gap: 10px;
  display: flex;
  flex-direction: column;
}
.menu_link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #222;
  padding: 1rem;
  border-radius: 10px;
}
.menu_link:hover {
  transition: all 0.5s ease;
  background-color: #222222;
  color: #fff;
}
.link_text {
  flex: 1;
  text-align: start;
}
.link_icon {
  display: flex;
  height: 100%;
  align-items: center;
}
.link_icon img {
  transform: scale(1.3);
}
button:hover {
  transform: scale(1);
  background-color: #222222;
  color: #fff;
}
#logout_btn {
  margin-bottom: 30px;
}


@media (max-width: 768px) {
  .user-menu-container {
    max-width: 100vw;
    width: 100vw;
    margin-left: 0;
    margin-top: 0;
    border-radius: 0;
  }
}

</style>
