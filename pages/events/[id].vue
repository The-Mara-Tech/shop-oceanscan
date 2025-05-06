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
    name: 'events-id',

    setup() {
      const route = useRoute()
      const id = route.params.id
      const eventName = computed(() => route.query.name)
      const eventDescription = computed(() => route.query.description)
      const image = computed(() => route.query.image)
      const fullUrlWithoutQuery = computed(() => `${baseUrl}${route.path}`)

      const { data: event, pending, error } = useAsyncData('events:id', async () => {
          const res = await fetch(`https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd`)
          const events = await res.json()
          return events.find((e) => e.id === parseInt(id)) || null
      }, { initialCache: true })

      useHead({
        title: `${eventName.value}`,
        meta: [
          { name: 'title', content: `${eventName.value}` },
          { name: 'description', content: `${eventDescription.value}` },

          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: `${fullUrlWithoutQuery}` },
          { property: 'og:title', content: `${eventName.value}` },
          { property: 'og:description', content: `${eventDescription.value}` },
          { property: 'og:image', content: `${image.value}` },

          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:url', content: `${fullUrlWithoutQuery}` },
          { property: 'twitter:title', content: `${eventName.value}` },
          { property: 'twitter:description', content: `${eventDescription.value}` },
          { property: 'twitter:image', content: `${image.value}` }
        ],
        link: [
          { rel: 'canonical', href: `${fullUrlWithoutQuery}` }
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