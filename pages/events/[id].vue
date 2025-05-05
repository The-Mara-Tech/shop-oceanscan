<template>
    <div>
      <h2>event details</h2>
      <p>{{ JSON.stringify(event) }}</p>
    </div>
</template>

<script>
import { defineComponent, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData, useHead } from '#app';
import { ref } from 'vue';

export default defineComponent({
  name: 'EventDetails',
  setup() {
    const route = useRoute();
    const id = route.params.id;
    const baseUrl = 'YOUR_BASE_URL'; // Replace with your actual base URL

    const event = ref(null); // Initialize event ref
    const { pending: isLoading, error, data } = useAsyncData(
      'events:id',
      async () => {
        const res = await fetch(
          'https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd'
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch event data: ${res.status}`);
        }
        const events = await res.json();
        return events.find((e) => e.id === parseInt(id)) || null;
      },
      { initialCache: true }
    );

    // Update the event ref.  This is important to ensure reactivity
    watch(data, (newData) => {
      event.value = newData;
    }, { immediate: true }); // set immediate to true

    useHead({
      title: computed(() => event.value?.event || 'Event Details'),
      meta: [
        {
          name: 'title',
          content: computed(() => event.value?.event || 'Event Details'),
        },
        {
          name: 'description',
          content: computed(() => event.value?.description || ''),
        },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: computed(() => `${baseUrl}${route.fullPath}`),
        },
        {
          property: 'og:title',
          content: computed(() => event.value?.event || 'Event Details'),
        },
        {
          property: 'og:description',
          content: computed(() => event.value?.description || ''),
        },
        { property: 'og:image', content: computed(() => event.value?.image || '') },
        // Twitter
        { property: 'twitter:card', content: 'summary_large_image' },
        {
          property: 'twitter:url',
          content: computed(() => `${baseUrl}${route.fullPath}`),
        },
        {
          property: 'twitter:title',
          content: computed(() => event.value?.event || 'Event Details'),
        },
        {
          property: 'twitter:description',
          content: computed(() => event.value?.description || ''),
        },
        { property: 'twitter:image', content: computed(() => event.value?.image || '') },
      ],
      link: [{ rel: 'canonical', href: computed(() => `${baseUrl}${route.fullPath}`) }],
    });

    // Use a watch effect to react to changes in 'event'
    watch(
      event,
      (newValue) => {
        if (newValue) {
          // Perform actions that depend on the loaded event data here
          console.log('Event data loaded (inside watch):', newValue);
        }
      },
      { immediate: true } // Add immediate: true
    );

    return {
      event,
      isLoading,
      hasError: computed(() => error.value),
      errorMessage: computed(() => error.value?.message),
    };
  },
});

</script>