<template>
  <article class="mb-3 p-3 sm:flex sm:items-center rounded-lg bg-gray-300">
    <!-- Info -->
    <section class="text-center sm:flex-1 sm:text-left">
      <h2 class="text-xl sm:leading-6 sm:text-2xl">
        {{ idea.name }}
      </h2>
      <small>{{ idea.userName }}</small>
    </section>
    <!-- Vote -->
    <section
      class="
        pt-3
        border-t-2
        mt-6
        border-black
        sm:pt-0 sm:pl-3 sm:border-t-0 sm:border-l-2 sm:mt-0 sm:flex sm:items-center
      "
    >
      <h3 class="text-3xl font-bold text-center">{{ idea.votes }}</h3>
      <nav class="flex justify-center sm:block">
        <img
          class="w-10 cursor-pointer"
          @click="voteIdea(true)"
          src="@/assets/img/arrow.svg"
          alt="Vote up"
        />
        <img
          class="w-10 cursor-pointer transform rotate-180"
          @click="voteIdea(false)"
          src="@/assets/img/arrow.svg"
          alt="Vote down"
        />
      </nav>
    </section>
  </article>
</template>

<script>
export default {
  name: 'AppIdea',
  emits: ['vote-idea'],
  props: {
    idea: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const voteIdea = (type) => emit('vote-idea', { id: props.idea.id, type })

    return { voteIdea }
  },
}
</script>
