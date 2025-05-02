<template>
    <h1>events details</h1>
    <div>{{ JSON.stringify(event) }}</div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import axios from 'axios'

  export default {
    setup() {
      const route = useRoute()
      const id = parseInt(route.params.id);
      const event = ref(null)

      onMounted(async ()=> {
        try {
          const { data } = await axios.get('https://run.mocky.io/v3/474a379b-8894-47c9-a99c-39939a947bfd');
          event.value = data.find(e => e.id === id)
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
