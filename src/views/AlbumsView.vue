<!-- This is temporary page -->
<template>
  <div class="container">
    <h1>Albums</h1>
   
    <div  v-for="n in 10" class="d-flex w-50 justify-content-between border rounded p-2 m-2">
        <div class="albumname">
            Album name
        </div>
        <div>
            <button class="btn btn-sm btn-outline-secondary m-1">Edit</button>
            <button class="btn btn-sm btn-outline-danger m-1">Delete</button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.albumname{
    font-size: 24px;
}
</style>
