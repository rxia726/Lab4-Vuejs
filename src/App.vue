<template>  
  <base-layout>
    <router-view />  <!-- Render the matched component based on the current route -->
  </base-layout>
</template>

<script>
import { reactive, provide } from 'vue';
import BaseLayout from './components/BaseLayout.vue';

export default {
  name: 'App',
  components: {
    BaseLayout
  },
  setup() {
    // Create a globally shared user object
    const user = reactive({ name: null, email: null });

    // Provide the user object to all child components
    provide('user', user);

    // Provide a function to update the user object
    const updateUser = (userInfo) => {
      user.name = userInfo.name || userInfo.email;  // Update name or fallback to email
      user.email = userInfo.email;
    };
    
    provide('updateUser', updateUser);  // Provide the updateUser function globally
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
