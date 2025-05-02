<template>
    <div>
      <EventsList/>
    </div>
</template>
  
<script>
    import EventsList from '~/components/EventsList.vue'
    import { useHead } from '#app'

    useHead({
      title: 'Oceanscan Events',
      meta: [
        { 
          name: 'description', 
          content: 'Browse a list of upcoming events with prices and details.' 
        }
      ]
    })
    
</script>