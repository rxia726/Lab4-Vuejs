<template>
    <div>
      <h2>Conversation {{ conversationId }}</h2>
      <!-- Display email details -->
      <ul v-if="emails.length > 0">
        <li v-for="email in emails" :key="email.id">
          <strong>Subject:</strong> {{ email.subject }} <br>
          <strong>From:</strong> {{ email.sender.emailAddress.name }} <br>
          <strong>Date:</strong> {{ new Date(email.receivedDateTime).toLocaleString() }} <!-- Format the date nicely -->
        </li>
      </ul>
      <p v-else>No emails found for this conversation.</p>
    </div>
  </template>
  
  <script>
  import { fetchEmailsForConversation } from '../lib/microsoftGraph.js'; // Adjust to match your Graph API logic
  
  export default {
    data() {
      return {
        conversationId: this.$route.params.id,  // Get the conversation ID from the route params
        emails: []  // To store fetched emails
      };
    },
    async mounted() {
    try {
        this.emails = await fetchEmailsForConversation(this.conversationId);
    } catch (error) {
        console.error('Failed to fetch emails:', error);
    }
}

  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  