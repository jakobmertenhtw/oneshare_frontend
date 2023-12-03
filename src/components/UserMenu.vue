<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'UserMenu',
    setup() {
        const username = ref('Lil Uzi'); 
        const user_description = ref('Rapper and Producer');

        const data = ref(null);

        const store = useStore();

        const signout = () => {
            store.dispatch('logout');
        }

        const testAjax = async () => {
            const response = await fetch('http://localhost:8080/users/1');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            data.value = await response.json();
            console.log(data.value);
        }

        return {
            username, 
            user_description, 
            data, 
            signout, 
            testAjax

        }
    }
}
</script>

<template>
    <div class="user-menu-container">
        <div class="profile-info-con">
            <img src="./images/example_profilepicture.png" alt="Profile Picture">
            <h3 id="username">{{ username }}</h3>
            <p id="user_description">{{ user_description }}</p>
        </div>
        <div class="menu-links-con">
            <ul>
                <li><button href="#"><span class="link_text">Dashboard</span><span class="link_icon"><img src="./icons/right.svg"/></span></button></li>
                <li><button href="#"><span class="link_text">Profile Information</span><span class="link_icon"><img src="./icons/right.svg"/></span></button></li>
                <li><button href="#"><span class="link_text">My Posts</span><span class="link_icon"><img src="./icons/right.svg"/></span></button></li>
                <li><button href="#"><span class="link_text">My Chats</span><span class="link_icon"><img src="./icons/right.svg"/></span></button></li>
            </ul>
        </div>
        <button id="logout_btn" @click="signout">Logout</button>
        <button @click="testAjax">test ajax request</button>
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
    font-size: .8rem;
    margin-top: 0;
}

button {
    border: none;
    outline: none;
    background-color: #FAFAFA;
    width: 100%;
    min-height: 3.5rem;
    font-size: .9rem;
    font-weight: 500;
}
.menu-links-con {
    flex: 1; 
}
ul {
    list-style: none;
    padding-left: 0;
    gap: 10px;
    display: flex;
    flex-direction: column;
}
ul li button {
    display: flex;
    align-items: center;
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
