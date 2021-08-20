<template>
<!-- Main container -->
<div class="container mx-auto p-4">
  <!-- Main box -->
  <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
    <h1 class="mb-5 text-4xl text-center">IdeaBox</h1>

    <!-- Add idea -->
    <section class="mb-6">
      <form class="sm:flex">
        <input type="text" class="w-full p-3 sm:flex-auto" required placeholder="Add your idea">
        <input type="submit" class="w-full p-2 sm:flex-1 bg-gray-600 text-white" value="Add idea">
      </form>
    </section>

    <!-- Idea item -->
    <AppIdea v-for="(idea, $index) of ideas" :key="$index" :idea="idea" />
  </div>
</div>
</template>

<script>
import AppIdea from "@/components/AppIdea.vue"
import seed from "@/seed.json"
import { ref } from "vue"

export default {
  name: "App",
  components: { AppIdea },
  setup() {
    const ideas = ref(seed.ideas)
    return { ideas }
  }
};
</script>

<style>
</style>
