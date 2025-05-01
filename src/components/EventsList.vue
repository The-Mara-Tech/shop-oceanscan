<template>
  <h2>events list</h2>

  <div v-if="isLoading">loading...</div>
  <div v-if="hasError">{{ errorMessage }}</div>
  <div v-if="!isLoading && !hasError" class="cards-wrapper">
    <router-link
      v-for="event in events"
      :key="events.indexOf(event)"
      :to="{
        name:'event-details',
        params: { id: events.indexOf(event) },
        state: event
      }"
      class="event-card"
    >
      <img :src="event.image" alt="pic" class="event-image"/>
      <div class="event-content">
        <span class="event-title">{{ event.event }}</span>
        <span class="event-price">KSH {{ event.price }}</span>
      </div>
    </router-link>
  </div>


</template>

<script>
  import { defineComponent, computed, onMounted } from 'vue';
  import { useEventsStore } from '@/stores/events';

  export default defineComponent({
    name: 'EventsList',

    setup() {
      const store = useEventsStore()
      onMounted(()=> store.fetchEvents())
      return {
        events: computed(()=> store.events),
        isLoading: computed(()=> store.isLoading),
        hasError: computed(()=> store.hasError),
        errorMessage: computed(()=> store.error)
      }
    }


  })

</script>

<style scoped>
  .cards-wrapper {
    display: flex;
    gap: 20px;
    padding: 10px;
  }

  .event-card {
    cursor: pointer;
  }

  .event-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 1.2rem;
  }
  .event-title {
    font-weight: bold;
  }
</style>
