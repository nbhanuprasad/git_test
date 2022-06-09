<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="track.title" name="title" />
      </div>
      <div class="form-group">
        <label for="year">Year</label>
        <input type="number" class="form-control" id="year" required v-model="track.year" name="year" />
      </div>
      <div class="form-group">

        <label for="albumIdno">Album Id</label>
        <!-- <div>Album Id is {{ track.albumId }}</div> -->
        <select class="form-select" v-model="track.albumId">
          <option disabled value="">Please select one</option>
          <option v-for="(album, index) in albums" :key="index" :value="album.id">{{ album.title }}</option>
        </select>
      </div>
      <button @click="saveTrack" class="btn btn-primary m-1">Submit</button>
      <RouterLink class="text-decoration-none" to="/tracks"> <button class="btn btn-secondary">Show Tracks</button>
      </RouterLink>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-primary m-1" @click="newTrack">Add</button>
      <RouterLink to="/tracks"> <button class="btn btn-secondary">Show Tracks</button></RouterLink>
    </div>
  </div>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
import AlbumDataService from "../services/AlbumDataService";

export default {
  name: "add-track",
  props: [],
  data() {
    return {
      track: {
        id: null,
        title: "",
        year:null,
        albumId: null,
      },
      albums: [],
      submitted: false
    };
  },
  methods: {
    saveTrack() {
      var data = {
        title: this.track.title,
        year: this.track.year,
        albumId: this.track.albumId,
      };
      TrackDataService.create(data)
        .then(response => {
          this.track.id = response.data.id;
          // this.$router.push({ name: 'view' , params: { id: this.track.albumId }} );
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
 retrieveAlbums() {
      AlbumDataService.getAll()
        .then(response => {
          this.albums = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    newTrack() {
      this.submitted = false;
      this.track = {};
    }
  },
    mounted() {
    this.retrieveAlbums();
  }
};
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: 30px 30px;
  /* margin: auto; */
}

label {
  font-weight: bold;
  font-size: 24px;
}
</style>