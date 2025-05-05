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
            { name: 'title', content: 'Sample Event | Event Details' },
            {
              name: 'description',
              content:
                "Join us for an electrifying night at the Amapiano Groove (Pretty Gals Big Boyz Edition), where the beats are fresh, the vibes are unmatched, and the energy is contagious. It's where BLENDS, CULTURE AND GROOVE"
            },

            // Open Graph / Facebook
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: 'https://shop-oceanscan.onrender.com/events/1' },
            { property: 'og:title', content: 'Sample Event | Event Details' },
            {
              property: 'og:description',
              content:
                "Join us for an electrifying night at the Amapiano Groove (Pretty Gals Big Boyz Edition), where the beats are fresh, the vibes are unmatched, and the energy is contagious. It's where BLENDS, CULTURE AND GROOVE"
            },
            { property: 'og:image', content: 'https://madfun.imgix.net/Roast_House_Comedy_984.jpeg?w=412&h=412&fit=crop&auto=format' },

            // Twitter
            { property: 'twitter:card', content: 'summary_large_image' },
            { property: 'twitter:url', content: 'https://shop-oceanscan.onrender.com/events/1' },
            { property: 'twitter:title', content: 'Sample Event | Event Details' },
            {
              property: 'twitter:description',
              content:
                "Join us for an electrifying night at the Amapiano Groove (Pretty Gals Big Boyz Edition), where the beats are fresh, the vibes are unmatched, and the energy is contagious. It's where BLENDS, CULTURE AND GROOVE"
            },
            { property: 'twitter:image', content: 'https://madfun.imgix.net/Roast_House_Comedy_984.jpeg?w=412&h=412&fit=crop&auto=format' }
          ],
          link: [
            { rel: 'canonical', href: 'https://shop-oceanscan.onrender.com/events/1' }
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
