import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            user: null,  // Store the user data globally
        };
    },
    mutations: {
        setUser(state, userData) {
            state.user = userData;  // Mutation to update the user in the store
        },
    },
});

export default store;
