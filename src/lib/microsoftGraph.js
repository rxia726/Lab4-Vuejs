import * as msal from '@azure/msal-browser';

// Define the requested scopes for Microsoft Graph API
const requestedScopes = {
    scopes: ['User.Read', 'Mail.Read']  // Request permission to read user information and emails
};

// Initialize the MSAL instance with authentication details
const msalInstance = new msal.PublicClientApplication({
    auth: {
        clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,  // Client ID from environment variables
    },
    cache: {
        cacheLocation: 'sessionStorage',  // Using sessionStorage to store tokens
    }
});

// Function to initialize MSAL instance before calling any MSAL API
async function initializeMsalInstance() {
    try {
        // Call MSAL initialization here
        await msalInstance.initialize();  // Ensure MSAL instance is initialized
    } catch (error) {
        console.error('MSAL initialization failed', error);
        throw error;
    }
}

export async function signInAndGetUser() {
    // Ensure the MSAL instance is initialized before login
    await initializeMsalInstance();

    try {
        const authResult = await msalInstance.loginPopup(requestedScopes);
        msalInstance.setActiveAccount(authResult.account);
        return {
            name: authResult.account.name || authResult.account.username || "Anonymous", // Ensure name is set
            email: authResult.account.username  // Use username or email field
        };
    } catch (error) {
        console.error('Login failed', error);  // Handle login errors
        throw error;
    }
}

export async function fetchEmailsForConversation(conversationId) {
    // Ensure MSAL instance is initialized before fetching emails
    await initializeMsalInstance();

    const account = msalInstance.getActiveAccount();  // Get active user account
    if (!account) {
        throw new Error('No active account! Please sign in first.');
    }

    try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: ['Mail.Read'],  // Ensure the 'Mail.Read' scope is used to fetch emails
            account
        });

        const headers = new Headers();
        headers.append('Authorization', `Bearer ${tokenResponse.accessToken}`);

        const response = await fetch(`https://graph.microsoft.com/v1.0/me/messages?$filter=conversationId eq '${conversationId}'`, {
            headers
        });

        if (!response.ok) {
            throw new Error('Failed to fetch emails');
        }

        const data = await response.json();
        return data.value;  // Return the emails
    } catch (error) {
        console.error('Failed to fetch emails:', error);
        throw error;
    }
}
