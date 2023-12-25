<script>
export default {
    data() {
        return {
            numberOfPostsToday: 233, 
            numberOfPostsThisWeek: 2333, 
            currentModeDay: true, 
        }
    }, 
    methods: {
        changeToToday() {
            this.currentModeDay = true;
        }, 
        changeToWeek() {
            this.currentModeDay = false;
        }
    }
}
</script>

<template>
    <div class="number_posts-main-container">
        <div class="day-week-changer">
            <button id="today-btn" @click="changeToToday" :class="currentModeDay ? 'checkbox' : ''">TODAY</button>
            <button id="week-btn" @click="changeToWeek" :class="!currentModeDay ? 'checkbox' : ''">THIS WEEK</button>
        </div>
        <div class="content-main-container">
            <p id="week-or-day-text">{{ currentModeDay ? 'Today, ' : 'This Week,' }}</p>
            <p id="numerOfPosts">{{ currentModeDay ? numberOfPostsToday : numberOfPostsThisWeek }}</p>
            <p id="checkout-text">Posts were published on 1Share. <br /> Feel free to check them out!</p>
        </div>
    </div>
  </template>
<style scoped>
.number_posts-main-container {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 20px;
    padding: 2rem;
}
.day-week-changer {
    width: 100%;
    height: 2.5rem;
    display: flex;
    gap: .75rem
}
.day-week-changer button {
    flex: 1;
    height: 100%;
    padding: 0;
    border: none;
    outline: none;
    background-color: #FAFAFA;
}
.day-week-changer button.checkbox {
    border: double 2px transparent;
    background-image: linear-gradient(white, white), 
                      linear-gradient(to right, #5200FF, #9E00FF);
    background-origin: border-box;
    background-clip: content-box, border-box; 
    box-decoration-break: clone;
}
.content-main-container {
    margin-top: 1rem;
}
#week-or-day-text {
    font-weight: 500;
    font-size: 1.1rem;
}
#numerOfPosts {
    margin-top: 1rem;
    font-size: 4rem;
    font-weight: 700;
    background: linear-gradient(to right, #5200FF, #9E00FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
}
#checkout-text {
    font-size: 1rem;
    line-height: 170%;
}
</style>
