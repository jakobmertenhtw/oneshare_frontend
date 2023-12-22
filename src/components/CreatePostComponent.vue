<script>
export default {
  name: "CreatePostComponent",
};
</script>

<template>
  <h2>Create a new post</h2>
  <div class="form-container">
    <input
      type="text"
      id="post_title"
      name="post_title"
      placeholder="Whats your posts title?"
    />
    <textarea
      name="post_description"
      id="post_description"
      placeholder="Type your message hear."
    ></textarea>
    <button id="create-post_btn">CREATE POST</button>
  </div>
</template>

<style scoped>
h2 {
    font-size: 2rem;
}
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin-top: 2rem;
    flex: 1;
}
.form-container input {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #fff;
    border-radius: 7px;
    font-weight: 500;
}
.form-container input:focus {
    border: 1px solid;
}
.form-container textarea {
    padding: 15px 20px;
    border: none;
    outline: none;
    background-color: #fff;
    border-radius: 7px;
    resize: none;
    flex: 1;
}
.form-container textarea:focus {
    border: 1px solid;
}
#create-post_btn {
    width: fit-content;
    border: none;
    outline: none;
    background-color: #000;
    color: white;
}


</style>
