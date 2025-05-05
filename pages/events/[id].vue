<template>
  <div>
    <h2>event details</h2>
    <p>{{ JSON.stringify(event) }}</p>
  </div>
</template>

<script>
  import { defineComponent, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useAsyncData, useHead } from '#app'

  export default defineComponent({
    name: 'EventDetails',

    setup() {
      const route = useRoute()
      const id = route.params.id

      const { data: event, pending, error } = useAsyncData('events:id', async () => {
          const res = await fetch(`https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd`)
          const events = await res.json()
          return events.find((e) => e.id === parseInt(id)) || null
      }, { initialCache: true })

      watchEffect(()=> {
        if(!event.value) return

        useHead({
          title: `${event.event}`,
          meta: [
            { name: 'title', content: `${event.value.event}` },
            { name: 'description', content: `${event.value.description}`},

            // Open Graph / Facebook
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content:  `${baseUrl}${route.fullPath}` },
            { property: 'og:title', content: `${event.value.event}` },
            { property: 'og:description', content:`${event.value.description}` },
            { property: 'og:image', content: `${event.value.image}` },

            // Twitter
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:url', content:  `${baseUrl}${route.fullPath}` },
            { property: 'twitter:title', content: `${event.value.event}` },
            { property: 'twitter:description', content: `${event.value.description}`},
            { property: 'twitter:image', content: `${event.value.image}` }
          ],
          link: [
            { rel: 'canonical', href:  `${baseUrl}${route.fullPath}` }
          ]
        })
      })

      return {
        event,
        isLoading: pending,
        hasError: computed(() => error.value),
        errorMessage: computed(() => error.value?.message)
      }
    }
  })

</script>