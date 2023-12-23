<script>
export default {
  name: "MeineKomponente",
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Post 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc",
          user: {
            id: 1,
            userColor: "#4287f5",
            name: "Max Mustermann",
            profileName: 'MM',
            description: "Rapper and Producer",
          },
        },
        {
          id: 2,
          title: "Post 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc",
          user: {
            id: 2,
            userColor: "#f54242",
            name: "Drake Goat",
            profileName: 'DG',
            description: "Rapper and Producer",
          },
        },
        {
            id: 3, 
            title: "Post 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl quis aliquam ultricies, nunc nisl ultricies nunc",
            user: {
                id: 3,
                userColor: "#f5a842",
                name: "Kanye West",
                profileName: 'KW',
                description: "Rapper and Producer"
            }
        }
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
};
</script>

<template>
  <div class="posted_today-main-container">
    <div class="header-container">
      <h2>Posted today: </h2>
    </div>
    <div class="posts-container">
      <ul class="item" v-for="item in posts" :key="item.id">
        <li>
            <div class="main-post-container">
                <h4>{{ item.title }}</h4>
                <div class="item_decription-container">
                    <p>{{ item.description }}</p>
                </div>
                <div class="user-container">
                    <div class="profile-picture-container">
                        <div class="background-color-container" :style="{backgroundColor: item.user.userColor, borderColor: item.user.userColor}"></div>
                        <p :style="{color: item.user.userColor}">{{ item.user.profileName }}</p>
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
    background-color: #FAFAFA;
    padding: 1.5rem 1rem;
    min-width: 12rem;   
}
.posts-container ul:hover {
    cursor: pointer;
    background-color: #EDEDED;
    transition: all .2s ease;
}
.main-post-container {
    display: flex;
    flex-direction: column;
}
.main-post-container h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: .5rem;
}
.main-post-container .item_decription-container {
    max-height: 5rem;
    overflow-y: scroll;
}
.item_decription-container p {
    font-size: .9rem;
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
    opacity: .2;
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
    font-size: .8rem;
    font-weight: 500;
}
</style>
