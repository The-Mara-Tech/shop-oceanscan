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
                const { data } = await axios.get('https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd');
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
