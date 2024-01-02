<script>
import LoadingComponent from "./LoadingComponent.vue";
export default {
  name: "PostComponent",
  props: {
    post: Object,
  },
  mounted() {
    console.log(this.post);
  },
  data() {
    return {
      userInput: "",
      messageLoading: false,
    };
  },
  methods: {
    sendMessage() {
      this.messageLoading = true;
    },
  },
  computed: {
    buttonOpacity() {
      return this.userInput ? 1 : 0.2;
    },
    hoverClass() {
      return this.userInput ? "hover-effect" : "";
    },
  },
  components: {
    LoadingComponent,
  },
};
</script>

<template>
  <div class="main-container_post">
    <div class="post-container">
      <div class="user-info_container">
        <div class="user_information">
          <div class="profile_picture">
            <img
              src="./images/example_profilepicture.png"
              alt="Profile Picture"
            />
          </div>
          <div class="profile-info-text">
            <h4>Lil Uzi Vert</h4>
            <p>Rapper</p>
          </div>
        </div>
        <div class="likes-container">
          <div class="like_button-container">
            <button id="like-btn">
              <img src="./icons/heart_icon.svg" alt="Like Post" />
            </button>
          </div>
          <p>{{ post.likes }} likes</p>
        </div>
      </div>
      <div class="post-main-container">
        <h2 id="post-heading">{{ post.title }}</h2>
        <p id="post-text">{{ post.text }}</p>
        <div class="see_more-container">
          <button>
            <img src="./icons/see_more_icon.svg" alt="See More" />
          </button>
        </div>
      </div>
    </div>
    <div class="message-container">
      <div class="overlay-message-loading" v-if="messageLoading">
        <LoadingComponent size="small" color="#fff" />
      </div>
      <textarea
        v-model="userInput"
        name="message_{{ this.post.postID }}"
        id="message_{{ this.post.postID }}"
        placeholder="Write a message"
      ></textarea>
      <button
        id="send_message-btn"
        :class="{
          'opacity-full': userInput,
          'opacity-half': !userInput,
          'hover-effect': userInput,
        }"
        @click="sendMessage"
        :disabled="!userInput"
      >
        SEND MESSAGE
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-container_post {
  width: 100%;
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1.5rem;
}
.post-container {
  background-color: #fff;
  flex: 1;
  border-radius: 15px;
  padding: 1rem 2rem;
  display: flex;
  gap: 1rem;
}
.user-info_container {
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  border-right: 0.75px solid #444;
  padding-top: 10px;
  padding-bottom: 10px;
}
.user_information {
  display: flex;
  gap: 10px;
}
.user_information img {
  width: 3rem;
  height: 3rem;
  border-radius: 7px;
}
.profile-info-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.user_information h4 {
  font-size: 1rem;
  font-weight: 700;
}
.user_information p {
  font-size: 0.8rem;
  font-weight: 400;
}
.likes-container {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.likes-container button {
  border: none;
  outline: none;
  padding: 7px 10px;
  border-radius: 8px;
  background-color: #000;
}
.likes-container p {
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 0.8rem;
}

.post-main-container {
  flex: 1;
  position: relative;
}
#post-heading {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: .5rem;
}
#post-text {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    margin-top: 1rem;
    padding-bottom: 1.5rem;
}

.see_more-container {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: -10px -20px;
  border-radius: 8px;
}
.see_more-container button {
    border: none;
    outline: none;
    background-color: transparent;
    width: 100%;
    height: 100%;
}
.see_more-container button:hover img {
    opacity: 0.5 ;
}

.message-container {
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.overlay-message-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
}
.message-container textarea {
  width: 100%;
  min-width: 20rem;
  height: 100%;
  min-height: 10rem;
  border: none;
  outline: none;
  resize: none;
  padding: 1rem;
  border-radius: 10px;
  line-height: 1.3rem;
}
.message-container button {
  margin: auto;
  width: 90%;
  margin-top: 7px;
  margin-bottom: 15px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
}

.opacity-full {
  opacity: 1;
}
.opacity-half {
  opacity: 0.2;
}
.hover-effect:hover {
  opacity: 0.8;
}
</style>
