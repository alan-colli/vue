<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const items = ref([]);
const newItem = ref({ name: "", price: 0 });
const isEditing = ref(false);
const itemIdUpdating = ref(null);

onMounted(async () => {
  const resp = await axios.get("http://localhost:3000/items");
  console.log("API data:", resp.data);
  items.value = resp.data;
});

const addItem = async () => {};

const handleDeleteItem = async (id) => {
  await axios.delete(`http://localhost:3000/items/${id}`);
  items.value = items.value.filter((item) => item.id !== id);
};

const handleFillInputs = (item) => {
  isEditing.value = true;
  newItem.value = { ...item };
  itemIdUpdating.value = item.id;
  console.log(itemIdUpdating);
};

const handleCancelEdit = () => {
  isEditing.value = false;
  newItem.value = { name: "", price: 0 };
};
</script>

<template>
  <div
    class="bg-black flex justify-center items-center min-h-screen w-[100vw] flex-col"
  >
    <div class="bg-gray-200 h-[70vh] flex flex-col rounded-md">
      <div
        class="bg-black mt-12 h-[15vh] mx-4 flex flex-col w-[80vw] items-center rounded-md"
      >
        <input
          type="text"
          class="bg-gray-200 w-[40vw] m-2 px-1 rounded-md"
          v-model="newItem.name"
          placeholder="Item name"
        />
        <input
          type="number"
          class="bg-gray-200 w-[40vw] m-2 px-1 rounded-md"
          v-model="newItem.price"
          placeholder="Price"
        />
        <div class="space-x-4">
          <button
            class="bg-blue-600 rounded-md text-white p-2"
            @click="addItem"
          >
            {{ isEditing ? "Update" : "Add" }}
          </button>
          <button
            v-if="isEditing"
            @click="handleCancelEdit"
            class="bg-red-600 text-white p-2 rounded-md"
          >
            CANCEL
          </button>
        </div>
      </div>
      <ul class="bg-black h-[40vh] mt-8 mx-4 rounded-md overflow-y-auto">
        <li
          v-for="item in items"
          :key="item.id"
          class="bg-gray-500 text-black mx-2 my-1 rounded-md flex justify-between items-center"
        >
          <div>
            <p class="mx-2 font-bold text-2xl">{{ item.name }}</p>
            <p class="mx-2 text-xl">{{ item.price }}</p>
          </div>
          <div class="flex flex-col mr-4 space-y-1">
            <button
              class="bg-red-600 text-white rounded-md"
              @click="handleDeleteItem(item.id)"
            >
              DEL
            </button>
            <button
              class="bg-blue-600 text-white rounded-md"
              @click="handleFillInputs(item)"
            >
              UPD
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
