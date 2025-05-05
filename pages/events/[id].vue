<template>
  <div>
    <h2>Event Details</h2>
    <p>{{ JSON.stringify(event) }}</p>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAsyncData, useHead } from '#app'

export default defineComponent({
  name: 'EventDetails',

  setup() {
    const route = useRoute()
    const id = route.params.id

    const { data: event, pending, error } = useAsyncData(`events:${id}`, async () => {
      const res = await fetch('https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd')
      const events = await res.json()
      return events.find((e) => e.id === parseInt(id)) || null
    }, { initialCache: true })

    const title = computed(() => event.value ? `${event.value.event} | Event Details` : 'Loading...')
    const description = computed(() => event.value?.description || '')
    const image = computed(() => event.value?.image || 'default_image.jpg')
    const url = computed(() => `${window.location.href}`)

    useHead(() => ({
      title: title.value,
      meta: [
        { name: 'description', content: description.value },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: url.value },
        { property: 'og:title', content: title.value },
        { property: 'og:description', content: description.value },
        { property: 'og:image', content: image.value },
        { property: 'og:site_name', content: title.value },
        { property: 'og:video', content: event.value?.videoUrl || 'default_video.mp4' },

        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: url.value },
        { property: 'twitter:title', content: title.value },
        { property: 'twitter:description', content: description.value },
        { property: 'twitter:image', content: image.value },
      ],
      link: [
        { rel: 'canonical', href: url.value }
      ]
    }))

    return {
      event,
      isLoading: pending,
      hasError: computed(() => error.value),
      errorMessage: computed(() => error.value?.message)
    }
  }
})
</script>
