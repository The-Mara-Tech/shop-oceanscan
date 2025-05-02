<template>
    <h1>events details</h1>
    <div>{{ JSON.stringify(event) }}</div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import axios from 'axios'
  import { useHead } from '@vueuse/head';

  export default {
    setup() {
      const route = useRoute()
      const id = parseInt(route.params.id);
      const event = ref(null)

      onMounted(async ()=> {
        try {
          const { data } = await axios.get('https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd');
          event.value = data.find(e => e.id === id)

          if(event.value){
            useHead({
              title: event.value.event,
                meta: [
                  { name: 'description', content: event.value.description },
                  { property: 'og:title', content: event.value.event },
                  { property: 'og:description', content: event.value.description },
                  { property: 'og:image', content: event.value.image },
                  { property: 'og:type', content: 'website' },
                  { property: 'og:url', content: window.location.href }
                ]
            })
          }

        } catch(err){
          console.error(err)
        }
      })

      return {
        event
      }
    }
  }


</script>

<style lang="css" scoped>

</style>
