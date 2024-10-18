<template> 
    <div class="signin-button-container">
      <button v-if="!user.name && !user.email" class="signin-button" @click="signIn">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft logo" class="microsoft-logo" />
        Sign in with Microsoft
      </button>
      <button v-else class="signin-button" @click="signOut">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft logo" class="microsoft-logo" />
        Sign out
      </button>
      <div v-if="user && (user.name || user.email)">
        <p>Welcome, {{ user.name || user.email }}!</p> <!-- Display name or email as fallback -->
      </div>
    </div>
  </template>
  
  <script>
  import { signInAndGetUser } from '../lib/microsoftGraph.js';
  import { inject } from 'vue';
  
  export default {
    setup(props, { emit }) {
      // Inject the user object and updateUser function from App.vue
      const user = inject('user');
      const updateUser = inject('updateUser');
  
      const signIn = async () => {
        try {
          const userInfo = await signInAndGetUser();  // Get user info from Microsoft Graph
          updateUser(userInfo);  // Update the user globally via inject
          localStorage.setItem('user', JSON.stringify(userInfo));  // Store user in localStorage
          emit('userChanged', userInfo);  // Emit event to notify parent about user change
        } catch (error) {
          console.error('Sign-in failed', error);  // Handle any sign-in errors
        }
      };
  
      const signOut = () => {
        localStorage.removeItem('user');  // Remove user from localStorage
        updateUser({ name: null, email: null });  // Reset the user globally
        emit('userChanged', { name: null, email: null });  // Notify the parent about the change
      };
  
      return { signIn, signOut, user };
    }
  }
  </script>
  
  <style scoped>
  .signin-button-container {
    display: flex;
    align-items: center;
  }
  
  .signin-button {
    background-color: #f2f2f2;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .signin-button:hover {
    background-color: #e6e6e6;
  }
  
  .microsoft-logo {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  </style>
  