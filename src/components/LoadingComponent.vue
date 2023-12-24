<script>
export default {
  name: "LoadingComponent",
  props: {
    size: {
      type: String,
      default: "medium",
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  computed: {
    spinnerSize() {
      switch (this.size) {
        case "small":
          return "20px";
        case "medium":
          return "30px";
        case "large":
          return "40px";
        default:
          return "30px";
      }
    }
  }
};
</script>

<template>

  <div class="loading-container" :style="`--color: ${color}; --size: ${spinnerSize}`">
    <span></span>
  </div>
</template>

<style scoped>
.loading-container span {
    display: block;
    width: var(--size, 30px);
    height: var(--size, 30px);
  border: 3px solid transparent;
  border-radius: 50%;
  border-right-color: var(--color, #fff);
  animation: spinner-anim 0.8s linear infinite;
}

@keyframes spinner-anim {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
