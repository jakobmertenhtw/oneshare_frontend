<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "UserMenu",
  setup() {
    const username = ref("Lil Uzi");
    const user_description = ref("Rapper and Producer");

    const data = ref(null);

    const store = useStore();

    const signout = () => {
      store.dispatch("logout");
    };

    /*const testAjax = async () => {

            let userID = parseInt(document.getElementById('userid_field').value);
            if (isNaN(userID) && userID >= 1 && userID <= 100) {
                userID = 1;
                console.log('USERID failed and default is 1');
            }

            
            const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

            const endpoint = baseURL + 'users/' + userID;


            const requestedOptions = {
                method: 'GET',
                redirect : 'follow',
            }

            fetch(endpoint, requestedOptions)
                .then(response => response.json())
                .then(result => data.value = result);
        }

        const testAjaxPost = async () => {
            console.log('test ajax post');
            const endpoint = 'http://localhost:8080/users';

            const test_data = {
                username: 'test',
                firstName: 'test', 
                lastName: 'test',
                mail: 'test@mail.com', 
                phoneNumber: 39230492,
            }

            const requestedOptions = {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(test_data)
            }
            fetch(endpoint, requestedOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                })
                .catch(error => {
                    console.log('error: ' + error)
                });
        }
        */

    return {
      username,
      user_description,
      data,
      signout,
    };
  },
};
</script>

<template>
  <div class="user-menu-container">
    <div class="profile-info-con">
      <img src="./images/example_profilepicture.png" alt="Profile Picture" />
      <h3 id="username">{{ username }}</h3>
      <p id="user_description">{{ user_description }}</p>
    </div>
    <div class="menu-links-con">
      <ul>
        <li>
          <router-link class="menu_link" to="/user"
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
  <p>{{ this.data }}</p>
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
</style>
