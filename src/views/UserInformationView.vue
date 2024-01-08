<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  data() {
    return {
      user: {},
      userID: this.$store.getters.getUserId,
      isLoading: false,
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userTelephoneNumber: "",
      userPassword: "",
    };
  },
  methods: {
    save() {
      if (!this.$store.getters.isLoggedIn) {
        window.alert("You need to be logged in to save your profile!");
        return;
      }
      if (
        this.userFirstName === "" ||
        this.userLastName === "" ||
        this.userEmail === "" ||
        this.userTelephoneNumber === "" ||
        this.userPassword === ""
      ) {
        window.alert("Please fill out all required fields!");
        return;
      }

      this.isLoading = true;

      const baseURL = "http://localhost:8080/";
      const endpoint = baseURL + "users/" + this.userID;

      let user = {
        firstName: this.userFirstName, 
        lastName: this.userLastName,
        mail: this.userEmail, 
        phoneNumber: this.userTelephoneNumber,
        profilePicture: this.userFirstName[0] + this.userLastName[0],
        profileColor: this.user.profileColor,
        password: this.userPassword,
      };

      const requestedOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      fetch(endpoint, requestedOptions)
        .then((response) => response.json())
        .then((data) => {

          this.user = data;
          this.userFirstName = data.firstName;
          this.userLastName = data.lastName;
          this.userEmail = data.mail;
          this.userTelephoneNumber = data.phoneNumber;
          this.userPassword = data.password;

          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });


    },
  },
  components: {
    LoadingComponent,
  },
  mounted() {
    if (this.userID === null) {
      this.$router.push("/home");
      return;
    }
    // get user profile information from logged in user
    const baseURL = "http://localhost:8080/";
    const endpoint = baseURL + "users/" + this.userID;

    const requestedOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(endpoint, requestedOptions)
      .then((response) => response.json())
      .then((data) => {
        this.user = data;
        this.userFirstName = data.firstName;
        this.userLastName = data.lastName;
        this.userEmail = data.mail;
        this.userTelephoneNumber = data.phoneNumber;
        this.userPassword = data.password;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<template>
  <div class="main-container-user-info">
    <h1>Profile Information</h1>
    <form action="">
      <div class="name-info">
        <input type="text" placeholder="Firstname" v-model="userFirstName" />
        <input type="text" placeholder="Lastname" v-model="userLastName" />
      </div>
      <input type="email" placeholder="Email" v-model="userEmail" />
      <input
        type="text"
        placeholder="Telephone Number"
        v-model="userTelephoneNumber"
      />
      <input type="password" placeholder="Passwort" v-model="userPassword" />
    </form>
    <div class="buttons-container">
      <button class="save-button" @click="save">
        <p v-if="!isLoading">SAVE</p>
        <LoadingComponent size="small" v-if="isLoading" />
      </button>
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
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
form input {
  padding: 1.2rem 1.5rem;
  border: none;
  outline: none;
  background-color: #fff;
  color: #222;
  font-family: "Montserrat", sans-serif;
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
  border: 1px solid black;
}
.buttons-container {
  margin-top: 2rem;
  display: flex;
  gap: 0.75rem;
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
</style>
