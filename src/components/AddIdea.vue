<template>
  <section class="mb-6">
    <form @submit.prevent="addIdea" class="sm:flex">
      <input
        type="text"
        v-model="idea"
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
      Hi 👋 {{ user.displayName }}
      <a @click="doLogout" href="#">Logout</a>.
    </p>
  </section>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'AddIdea',
  emits: ['do-login', 'do-logout', 'add-idea'],
  props: {
    user: {
      type: [Object, null],
    },
  },
  setup(props, { emit }) {
    const doLogin = () => emit('do-login')
    const doLogout = () => emit('do-logout')

    const idea = ref('')
    const addIdea = () => {
      emit('add-idea', idea)
      idea.value = ''
    }

    return { idea, doLogin, doLogout, addIdea }
  },
}
</script>

<style></style>
