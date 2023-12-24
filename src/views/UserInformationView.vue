<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  data() {
    return {
      user: {
        id: 1,
        firstname: "Test",
        lastname: "User",
        email: "test@mail.com",
        phoneNumber: "1234567890",
        password: "password",
      },
      isLoading: false,
    };
  },
  methods: {
    save() {
      this.isLoading = true;
    }
  }, 
  components: {
    LoadingComponent
  }
};
</script>
<template>
  <div class="main-container-user-info">
    <h1>Profile Information</h1>
    <form action="">
      <div class="name-info">
        <input type="text" placeholder="Firstname" />
        <input type="text" placeholder="Lastname" />
      </div>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Telephone Number" />
      <input type="password" placeholder="Passwort" />
    </form>
    <div class="buttons-container">
      <button class="save-button" @click="save">
        <p v-if="!isLoading">SAVE</p>
        <LoadingComponent size="small" v-if="isLoading" />
      </button>
      <button class="dismiss-button">DISMISS</button>
    </div>
  </div>
</template>
<style scoped>
.main-container-user-info {
  padding: 7rem 4rem;
}
h1 {
  font-size: 2.1rem;
}
form {
  margin-top: 2rem;
  margin-bottom: 1rem ;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
form input {
  padding: 1.2rem 2rem;
  border: none;
  outline: none;
  background-color: #fff;
  color: #222;
  font-family: 'Montserrat', sans-serif;
  border-radius: 15px;
}
.name-info {
  display: flex;
  gap: 1rem;
}
.name-info input {
  flex: 1;
}
input:focus {
  background-color: rgba(0, 0, 0, .025);
}
.buttons-container {
  margin-top: 2rem;
  display: flex;
  gap: .75rem;
}
.save-button {
  background-color: #222;
  color: white;
  border: none;
  outline: none;
  min-width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dismiss-button {
  border: 2px solid #222;
  color: #222;
}



</style>
