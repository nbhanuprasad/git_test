<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="artist.title"
          name="title"
        />
      </div>
      <button @click="saveArtist" class="btn btn-primary m-1">Submit</button>
      <RouterLink class="text-decoration-none" to="/artists"> <button class="btn btn-secondary">Show Artists</button></RouterLink>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-primary m-1" @click="newArtist">Add</button>
      <RouterLink to="/artists"> <button class="btn btn-secondary">Show Artists</button></RouterLink>
    </div>
  </div>
</template>
<script>
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "add-artist",
  data() {
    return {
      artist: {
        id: null,
        title: "",
      },
      submitted: false
    };
  },
  methods: {
    saveArtist() {
      var data = {
        title: this.artist.title
      };
      ArtistDataService.create(data)
        .then(response => {
          this.artist.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newArtist() {
      this.submitted = false;
      this.artist = {};
    }
  }
};
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: 30px 30px;
  /* margin: auto; */
}
label{
  font-weight: bold;
  font-size: 24px;
}
</style>