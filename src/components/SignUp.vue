<script>
import { ref } from "vue";
import { useStore } from "vuex";
import LoadingComponent from "./LoadingComponent.vue";

export default {
  name: "SignUp",
  setup(props, { emit }) {
    const store = useStore();

    const firstname = ref("");
    const lastname = ref("");
    const email = ref("");
    const telephone = ref("");
    const password = ref("");

    const isLoading = ref(false);

    const signin = () => {
      emit("update:isSignUp", false);
    };

    const signup = () => {
        if (firstname.value === "" || lastname.value === "" || email.value === "" || password.value === "") {
            alert("Please fill out all required fields!");
            return;
        }

        isLoading.value = true;

        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        let profilePictureName = firstname.value.charAt(0).toUpperCase() + lastname.value.charAt(0).toUpperCase();

        let user = {
            firstName: firstname.value,
            lastName: lastname.value,
            mail: email.value,
            phoneNumber: telephone.value,
            profilePicture: profilePictureName,
            profileColor: randomColor,
            password: password.value,
        };

        const endpoint = 'http://localhost:8080/users';

        const requestedOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(user)
        }
        fetch(endpoint, requestedOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === 500) {
                    window.alert(result.message)
                    return;
                }
                isLoading.value = false;

                if (result.userID == undefined) {
                    console.log("Es ist etwas schief gelaufen, checke deine Inputs!");
                    return;
                }

                store.dispatch('login', result.userID);
            })
            .catch(error => {
                window.alert("There was an error connecting to the database, please try again later. This is the error: " + error);
            });
        
    };

    return {
      signin,
      signup,
      firstname,
      lastname,
      email,
      telephone,
      password,
      isLoading
    };
  },
  emits: ["update:isSignUp"],
  components: {
    LoadingComponent,
  },
};
</script>

<template>
  <h1>Sign Up</h1>
  <form>
    <div class="name_fields">
      <input type="text" id="firstname_field" v-model="firstname" placeholder="Firstname (*)" />
      <input type="text" id="lastname_field" v-model="lastname" placeholder="Lastname (*)" />
    </div>
    <input type="email" id="email_field" v-model="email" placeholder="Email adress (*)" />
    <input type="text" id="telephone_field" v-model="telephone" placeholder="Telephone number" />
    <input type="password" id="password_field" v-model="password" placeholder="Password (*)" />
  </form>
  <div class="send-container">
    <button id="signup-btn" @click="signup">
        <span v-if="!isLoading">SIGN UP</span>
        <LoadingComponent size="small" color="white" v-if="isLoading"></LoadingComponent>
    </button>
    <p>Already have an account? <span @click="signin">Sign in</span></p>
  </div>
</template>

<style scoped>
h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  font-weight: 600;
}
form {
  margin-top: 20px;
  display: grid;
  grid-template: 1fr;
}
form input {
  padding: 12px 20px;
  outline: none;
  border-radius: 5px;
  background-color: #fff;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  margin-top: 10px;
  border: none;
  padding-right: 10px;
  padding-left: 10px;
}
form div {
  display: flex;
  gap: 1rem;
}
form div input {
  margin-top: 0px;
  flex: 1;
}
.send-container {
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.send-container p {
  font-family: "Montserrat", sans-serif;
  font-size: 0.8rem;
  margin-top: 0px;
}
.send-container p span {
  color: #8201ff;
  margin-left: 10px;
}
.send-container p span:hover {
  cursor: pointer;
}
#signup-btn {
  width: fit-content;
  background-color: #000;
  color: white;
  border: none;
}
</style>
