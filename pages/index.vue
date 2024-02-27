<template>
  <div class="outline">
    <h1>POST CONTENT</h1>
    <!-- create postform with ../server/api/item -->
    <form>
      <input type="text" name="content" placeholder="content" v-model="contentinput" />
      <button @click="submitContent">Create</button>
    </form>
    <hr>
    <p v-if="items" v-for="item in items" :key="item.id">
      {{ item }}
      <button class="delete" @click="deleteItem(item.id)">Delete</button>
    </p>

  </div>
</template>

<script setup>

const items = useFetch('/api/item').data
const contentinput = ref('')
const submitContent = async (e) => {
  e.preventDefault()
  await useFetch('/api/item', {
    method: 'POST',
    body: { content: contentinput.value },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  contentinput.value = ''
  refreshItems()
}
const refreshItems = async () => {
  const { data } = await useFetch('/api/item')
  items.value = data.value
}
const deleteItem = async (id) => {
  await useFetch(`/api/item/`, {
    method: 'DELETE',
    body: { id }
  })
  refreshItems()
}
</script>

<style scoped>
button.delete {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>