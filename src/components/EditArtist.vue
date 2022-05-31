<template>
  <div v-if="currentArtist" class="edit-form">
          <h2>Artists</h2>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentArtist.title"
        />
      </div>
      <!-- <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentArtist.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentArtist.published ? "Published" : "Pending" }}
      </div> -->
    </form>
     <button class="btn btn-sm btn-danger m-1"
      @click="deleteArtist"
    >
      Delete
    </button>
    <button type="submit" class="btn btn-sm btn-success m-1"
      @click="updateArtist"
    >
      Update
    </button>
            <RouterLink to="/artists"> 
              <button class="btn btn-sm btn-secondary m-1">back</button>
        </RouterLink>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Artist...</p>
  </div>
</template>
<script>
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "artist",
  data() {
    return {
      currentArtist: null,
      message: ''
    };
  },
  methods: {
    getArtist(id) {
      ArtistDataService.get(id)
        .then(response => {
          this.currentArtist = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // updatePublished(status) {
    //   var data = {
    //     id: this.currentArtist.id,
    //     title: this.currentArtist.title,
    //     description: this.currentArtist.description,
    //     published: status
    //   };
    //   ArtistDataService.update(this.currentArtist.id, data)
    //     .then(response => {
    //       console.log(response.data);
    //       this.currentArtist.published = status;
    //       this.message = 'The status was updated successfully!';
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    updateArtist() {
      ArtistDataService.update(this.currentArtist.id, this.currentArtist)
        .then(response => {
          console.log(response.data);
          this.message = 'The artist was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteArtist() {
      ArtistDataService.delete(this.currentArtist.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "artists" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getArtist(this.$route.params.id);
  }
};
</script>
<style scoped>
.edit-form {
  max-width: 300px;
  margin: 30px 30px;
}
label{

  font-size: 24px;
}
</style>