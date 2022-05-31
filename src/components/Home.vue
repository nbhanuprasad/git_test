<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="container-fluid" style="font-size: 24px; font-weight: bold;">
        <div class="row">
            <RouterLink class="col-11 col-md-3 text-decoration-none" to="/artists">
                <div class="border m-3 p-5" style="background-color:#2a9d8f;  color: black;">
                Artists
            </div>
            </RouterLink>
            <RouterLink class="col-11 col-md-3 text-decoration-none" to="/albums">
                <div class="border m-3 p-5" style="background-color: #e9c46a;  color: black;">
                Albums
            </div>
            </RouterLink>
            <RouterLink class="col-11 col-md-3 text-decoration-none" to="/tracks">
                <div class="border m-3 p-5" style="background-color: #f4a261; color: black;">
                Tracks
            </div>
            </RouterLink>
        </div>
    </div>
</template>
<style scoped>
.container-fluid{
    height: 92vh;
    max-width: 98vw;
    background-image: url("../assets/vector-musical_5.svg");
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
    margin-left:20px;
}
</style>