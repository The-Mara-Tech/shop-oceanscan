<template>
    <h2>events list</h2>
  
    <div v-if="isLoading">loading...</div>
    <div v-if="hasError">{{ errorMessage }}</div>
    <div v-if="!isLoading && !hasError" class="cards-wrapper">
      <div v-for="event in events" :key="event.id">
        <NuxtLink 
          :to="{ 
            name: 'events-id', 
            params: { id: event.id },
            query: {
              name: event.event,
              description: event.description,
              image: event.image
            } 
          }" 
          class="event-card"
        >
          <img :src="event.image" alt="pic" class="event-image"/>
          <div class="event-content">
            <span class="event-title">{{ event.event }}</span>
            <span class="event-price">KSH {{ event.price }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
</template>
  
<script>
    import { defineComponent, computed, onMounted } from 'vue';
    import { useEventsStore } from '@/stores/events';
    import { useAsyncData } from '#app';
  
    export default defineComponent({
      name: 'EventsList',
  
      setup() {
        const store = useEventsStore()
    
        const { pending, error } = useAsyncData('events', async ()=> {
          const data = await store.fetchEvents()
          return data || true
        })

        return {
          events: computed(()=> store.events),
          isLoading: pending,
          hasError: computed(()=> error.value),
          errorMessage: computed(()=> error.value?.message)
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