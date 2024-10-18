<template>
  <div class="button-container">
    <base-button color="primary">BaseButton</base-button>
    <base-button isDisabled="true">BaseButton disabled</base-button>
    <base-button color="warn">BaseButton with warn prop</base-button>
    <base-button color="danger">BaseButton with danger prop</base-button>

    <!-- AsyncButton logic -->
    <async-button color="primary" @click="asyncAction">Async Button (Slowing Down)</async-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue';
import AsyncButton from './AsyncButton.vue';  // Import AsyncButton

export default {
  name: 'HomePage',
  components: {
    BaseButton,
    AsyncButton  // Register AsyncButton
  },
  data() {
    return {
      clickCount: 0  // Initialize click count
    };
  },
  methods: {
    async asyncAction() {
      // Increase the click count
      this.clickCount += 1;

      // Calculate the delay time (each click increases delay by 1 second)
      const delay = this.clickCount * 1000;

      // Simulate a delayed async action
      await new Promise(resolve => setTimeout(resolve, delay));

      alert(`Async Action Completed after ${this.clickCount} seconds!`);
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

.base-button {
  width: 200px;
  text-align: center;
  margin-bottom: 10px;
}
</style>
