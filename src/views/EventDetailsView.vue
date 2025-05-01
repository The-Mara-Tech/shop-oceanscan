<template>
    <h1>events details</h1>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { useEventsStore } from '@/stores/events';
  import { computed, onMounted } from 'vue';

  export default {
    setup() {
      const route = useRoute()
      const store = useEventsStore()

      onMounted(()=> {
        if(!store.events.length) {
          store.fetchEvents()
        }
      })

      const event = computed(() => {
        return route.state || store.events[Number(route.params.id)]
      })

      console.log(route.state)
      return {
        event
      }
    }
  }


</script>

<style lang="css" scoped>

</style>
