<template>
  <div v-if="currentTrack" class="edit-form">
    <h2>Tracks</h2>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentTrack.title" />
      </div>
      <div class="form-group">
        <label for="year">Year</label>
        <input type="text" class="form-control" id="year"
          v-model="currentTrack.year"
        />
        <label>Album Name</label>
        <input type="text" class="form-control" id="albumid"/>
      </div>
    </form>
    <button class="btn btn-sm btn-danger m-1" @click="deleteTrack">
      Delete
    </button>
    <button type="submit" class="btn btn-sm btn-success m-1" @click="updateTrack">
      Update
    </button>
    <RouterLink to="/tracks">
      <button class="btn btn-sm btn-secondary m-1">back</button>
    </RouterLink>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Track...</p>
  </div>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
export default {
  name: "edittrack",
  data() {
    return {
      currentTrack: null,
      message: ''
    };
  },
  methods: {
    getTrack(id) {
      TrackDataService.get(id)
        .then(response => {
          this.currentTrack = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateTrack() {
      TrackDataService.update(this.currentTrack.id, this.currentTrack)
        .then(response => {
          console.log(response.data);
          this.message = 'The track was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteTrack() {
      TrackDataService.delete(this.currentTrack.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tracks" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTrack(this.$route.params.id);
  }
};
</script>
<style scoped>
.edit-form {
  max-width: 300px;
  margin: 30px 30px;
}

label {

  font-size: 24px;
}
</style>