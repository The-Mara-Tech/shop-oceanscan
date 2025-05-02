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
                  { name: 'description', content: 'event description' },
                  { property: 'og:title', content: 'event yangu' },
                  { property: 'og:description', content: 'event description' },
                  { property: 'og:image', content: 'https://madfun.imgix.net/Roast_House_Comedy_984.jpeg?w=412&h=412&fit=crop&auto=format' },
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
