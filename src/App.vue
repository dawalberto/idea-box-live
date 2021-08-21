<template>
  <!-- Main container -->
  <div class="container mx-auto p-4">
    <!-- Main box -->
    <div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
      <h1 class="mb-5 text-4xl text-center">IdeaBox</h1>

      <!-- Add idea -->
      <AddIdea
        :user="user"
        @do-login="doLogin"
        @do-logout="doLogout"
        @add-idea="addIdea"
      />
      <!-- Idea item -->
      <AppIdea v-for="(idea, $index) of ideas" :key="$index" :idea="idea" />
    </div>
  </div>
</template>

<script>
import AppIdea from '@/components/AppIdea.vue'
import AddIdea from '@/components/AddIdea.vue'
import { firebase, auth, db } from '@/firebase.js'
import { ref } from 'vue'

export default {
  name: 'App',
  components: { AppIdea, AddIdea },
  setup() {
    const ideas = ref([])
    let user = ref(null)

    auth.onAuthStateChanged(async (auth) => (user.value = auth ? auth : null))
    db.collection('ideas').onSnapshot(
      (snapshot) => {
        const newIdeas = []
        snapshot.docs.forEach((doc) => {
          let { name, user, userName, votes } = doc.data()
          let id = doc.id
          newIdeas.push({ id, name, user, userName, votes })
          ideas.value = newIdeas
        })
      },
      (error) => console.log(error)
    )

    const doLogin = async () => {
      const provider = new firebase.auth.GoogleAuthProvider()

      try {
        await auth.signInWithPopup(provider)
      } catch (error) {
        console.log(error)
      }
    }

    const doLogout = async () => {
      try {
        await auth.signOut()
      } catch (error) {
        console.log(error)
      }
    }

    const addIdea = async (data) => {
      try {
        await db.collection('ideas').add({
          name: data.value,
          user: user.value.uid,
          userName: user.value.displayName,
          votes: 0,
        })
      } catch (error) {
        console.log(error)
      }
    }

    return { ideas, user, doLogin, doLogout, addIdea }
  },
}
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
