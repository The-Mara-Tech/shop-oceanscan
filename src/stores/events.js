import { defineStore } from "pinia";
import axios from "axios";

export const useEventsStore = defineStore('events', {
    state: ()=> ({
        events: [],
        loading: false,
        error: null,
    }),
    
    actions: {
        async fetchEvents(){
            this.loading = true;
            this.error = null;

            try {
                const { data } = await axios.get('https://mocki.io/v1/f180962b-0665-4c71-9bb7-8595b3ae7886');
                this.events = data;
            } catch (err){
                this.error = err.response?.data?.message || 'failed to fetch events';
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
    },

    getters: {
        hasError: (state) => Boolean(state.error),
        isLoading: (state) => state.loading,
    }
})