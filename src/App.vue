<template>
  <!-- Main container -->
  <div class="container mx-auto p-4">
    <!-- Main box -->
    <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
      <h1 class="mb-5 text-4xl text-center">IdeaBox</h1>

      <!-- Add idea -->
      <section class="mb-6">
        <form class="sm:flex">
          <input
            type="text"
            class="w-full p-3 sm:flex-auto"
            required
            placeholder="Add your idea"
          />
          <input
            v-if="user"
            type="submit"
            class="w-full p-2 sm:flex-1 bg-gray-600 text-white"
            value="Add idea"
          />
        </form>
        <p v-if="!user" class="user-actions">
          Please
          <a @click="doLogin" href="#">login</a>
          first
        </p>
        <p v-else class="user-actions">
          Hi 👋 {{ user.displayName }} <a @click="doLogout" href="#">Logout</a>.
        </p>
      </section>

      <!-- Idea item -->
      <AppIdea v-for="(idea, $index) of ideas" :key="$index" :idea="idea" />
    </div>
  </div>
</template>

<script>
import AppIdea from "@/components/AppIdea.vue";
import seed from "@/seed.json";
import { firebase, auth } from "@/firebase.js";
import { ref } from "vue";

export default {
  name: "App",
  components: { AppIdea },
  setup() {
    const ideas = ref(seed.ideas);
    let user = ref(null);

    auth.onAuthStateChanged(async (auth) => (user.value = auth ? auth : null));

    const doLogin = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();

      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.log(error);
      }
    };

    const doLogout = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };

    return { ideas, user, doLogin, doLogout };
  },
};
</script>

<style>
.user-actions {
  @apply mt-2 text-center;
}

.user-actions a {
  text-decoration: underline;
  font-weight: bold;
}
</style>
