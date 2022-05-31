<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
<div id="app">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="text-decoration-none" to="/">
      <a class="navbar-brand"> Music Library<img alt="Home" class="logo ms-2 mb-1" src="@/assets/icons8-home.svg" width="25" height="25" /></a>
      </RouterLink>
    </div>
  </nav>
 <RouterView />
</div>
</template>
<script>
export default {
  name: "app"
};
</script>