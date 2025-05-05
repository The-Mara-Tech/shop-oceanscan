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
          title: 'Sample Event | Event Details',
          meta: [
            { name: 'description', content: 'This is a hardcoded event description.' },
            { name: 'og:title', content: 'Sample Event | Event Details' },
            { name: 'og:description', content: 'This is a hardcoded event description.' },
            { name: 'og:image', content: 'https://madfun.imgix.net/Roast_House_Comedy_984.jpeg?w=412&h=412&fit=crop&auto=format' },
            { name: 'og:url', content: `${window.location.href}` },
            { name: 'og:type', content: 'website' },
            { name: 'og:site_name', content: 'Sample Event' },
            { name: 'og:video', content: 'https://example.com/sample-video.mp4' }
          ],
          link: [
            { rel: 'canonical', href: window.location.href }
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
