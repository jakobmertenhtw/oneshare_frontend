
<script>
export default {
    props: {
        message_prop: Object,
    },
    name: 'MessageComponent',
    data() {
        return {
            showMessages: false,
            message: [], 
            userProfilePicture: '', 
        }
    },

    mounted() {
        this.message = this.message_prop;
        this.userProfilePicture = this.getInitials(this.message.userFullName);
        this.showMessages = true;
    },
    methods: {
        getInitials(fullName) {
        let initials = fullName.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
        return initials;
    }
    }

}
</script>


<template>
    <div class="main-message-container" v-if="showMessages">
        <div class="user-container">
            <div class="user-icon">
                <div class="user-background-icon" :style="{ backgroundColor: '#' + message.userColor }"></div>
                <p id="user-profile-name" :style="{ color: '#' + message.userColor }">{{ this.userProfilePicture }}</p>
            </div>
            <h5>{{ this.message.userFullName }}</h5>
        </div>
        <div class="content-container">
            <p>{{ message.text }}</p>
        </div>
    </div>
</template>

<style scoped>
.main-message-container {
    margin-top: 1rem;
    width: 100%;
    min-height: 5rem;
    background-color: transparent;
    border-bottom: 1px solid #444;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
}
#user-profile-name {
    font-size: .8rem;
}
.user-container {
    display: flex;
    align-items: center;
    margin-right: 2rem;
}
.user-container h5 {
    max-width: 6rem;
    margin-left: 10px;
    overflow: scroll;
}
.user-icon {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.user-icon .user-background-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .4;
}
</style>
