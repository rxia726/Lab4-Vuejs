<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
        <li><router-link to="/fake-username">Fake Username</router-link></li>

        <!-- Show Conversations link only if the user is logged in -->
        <li v-if="user && user.name">
          <router-link to="/conversations">Conversations</router-link>
        </li>
      </ul>
      <signin-button class="signin-btn" />
    </nav>
  </header>
</template>

<script>
import SigninButton from './SigninButton.vue';
import { inject } from 'vue';

export default {
  name: 'BaseHeader',
  components: {
    SigninButton
  },
  setup() {
    // Inject the user object from the global state provided by App.vue
    const user = inject('user');

    return {
      user
    };
  }
}
</script>

<style scoped>
header {
  background-color: #3eaf7c;
  padding: 1rem;
  color: white;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.signin-btn {
  margin-left: auto;
}
</style>
