<template>
  <div class="outline">
    <p>blob</p>
    <!-- form for send image file to "/api/blob/image" -->
    <form action="/api/blob/image" method="post" enctype="multipart/form-data">
      <input type="file" name="image" accept="">
      <input type="submit" value="send">
    </form>
    <img width="200px" src="https://apppractice18d1f.blob.core.windows.net/images/IMG_4875.jpeg" alt="">

    <NuxtLink to="/">index</NuxtLink>
  </div>
</template>
<script setup>

</script>
<style scoped></style>