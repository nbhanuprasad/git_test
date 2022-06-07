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
          v-model="album.title"
          name="title"
        />
      </div>
      <button @click="saveAlbum" class="btn btn-primary m-1">Submit</button>
      <RouterLink class="text-decoration-none" to="/albums"> <button class="btn btn-secondary">Show Albums</button></RouterLink>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-primary m-1" @click="newAlbum">Add</button>
      <RouterLink to="/albums"> <button class="btn btn-secondary">Show Albums</button></RouterLink>
    </div>
  </div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "add-album",
  props: ['artistId'],
  data() {
    return {
      album: {
        id: null,
        title: "",
      },
      submitted: false
    };
  },
  methods: {
    saveAlbum() {
      var data = {
        title: this.album.title,
        artistId:this.artistId
      };
      AlbumDataService.create(this.artistId,data)
        .then(response => {
          this.album.id = response.data.id;
          this.$router.push({ name: 'view' , params: { id: this.artistId }} );
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newAlbum() {
      this.submitted = false;
      this.album = {};
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