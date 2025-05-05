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

      useHead({
        title: `${event.event}`,
        meta: [
          { name: 'title', content: `${event.event}` },
          { name: 'description', content: `${event.description}`},

          // Open Graph / Facebook
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: `${window.location.href}` },
          { property: 'og:title', content: `${event.event}` },
          { property: 'og:description', content:`${event.description}` },
          { property: 'og:image', content: `${event.image}` },

          // Twitter
          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:url', content: `${window.location.href}` },
          { property: 'twitter:title', content: `${event.event}` },
          { property: 'twitter:description', content: `${event.description}`},
          { property: 'twitter:image', content: `${event.image}` }
        ],
        link: [
          { rel: 'canonical', href: `${window.location.href}` }
        ]
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