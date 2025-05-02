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

        watch(event, (newEvent) => {
          if (newEvent) {
            useHead({
              title: `${newEvent.event} | Event Details`,
              meta: [
                { name: 'description', content: newEvent.description || `` },
                { name: 'og:title', content: `${newEvent.event} | ` },
                { name: 'og:description', content: newEvent.description || `` },
                { name: 'og:image', content: newEvent.image || 'default_image.jpg' },
                { name: 'og:url', content: `${window.location.href}` },
                { name: 'og:type', content: 'website' },
                { name: 'og:site_name', content: newEvent.event },
                { name: 'og:video', content: newEvent.videoUrl || 'default_video.mp4' }
              ],
              link: [
                { rel: 'canonical', href: window.location.href }
              ]
            })
          }
        }, { immediate: true })

        onBeforeMount(() => {
          if (event.value) {
            useHead({
              title: `${event.value.event} | Event Details`,
            })
          }
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
