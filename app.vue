<template>
  <div>
    <h1 class="text-xl font-bold">tRPC + Prisma + Supabase</h1>
    <form @submit.prevent="createPost">
      <input v-model="title" placeholder="Título" class="border p-2" />
      <textarea
        v-model="content"
        placeholder="Conteúdo"
        class="border p-2"
      ></textarea>
      <button type="submit" class="bg-blue-500 text-white p-2">
        Criar Post
      </button>
    </form>

    <div v-if="posts.length">
      <h2 class="text-lg font-bold mt-4">Posts</h2>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h3 class="font-bold">{{ post.title }}</h3>
          <p>{{ post.content }}</p>
          <p class="text-gray-500 text-sm">{{ formatDate(post.createdAt) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const { $trpcClient } = useNuxtApp();

const posts = ref([]);
const title = ref("");
const content = ref("");

const fetchPosts = async () => {
  posts.value = await $trpcClient.post.getAll.query();
};

const createPost = async () => {
  if (!title.value || !content.value) return;
  await $trpcClient.post.create.mutate({
    title: title.value,
    content: content.value,
  });
  title.value = "";
  content.value = "";
  fetchPosts();
};

const formatDate = (date) => new Date(date).toLocaleString();

onMounted(fetchPosts);
</script>
