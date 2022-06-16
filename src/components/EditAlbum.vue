<template>
  <div v-if="currentAlbum" class="edit-form">
          <h2>Albums</h2>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentAlbum.title"
        />
      </div>
      <!-- <div class="form-group">
        <label for="description">Description</label>
        <input type="text" class="form-control" id="description"
          v-model="currentAlbum.description"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentAlbum.published ? "Published" : "Pending" }}
      </div> -->
    </form>
     <button class="btn btn-sm btn-danger m-1"
      @click="deleteAlbum"
    >
      Delete
    </button>
    <button type="submit" class="btn btn-sm btn-success m-1"
      @click="updateAlbum"
    >
      Update
    </button>
            <RouterLink to="/albums"> 
              <button class="btn btn-sm btn-secondary m-1">back</button>
        </RouterLink>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Album...</p>
  </div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "album",
  data() {
    return {
      currentAlbum: null,
      message: ''
    };
  },
  methods: {
    getAlbum(id) {
      AlbumDataService.get(id)
        .then(response => {
          this.currentAlbum = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // updatePublished(status) {
    //   var data = {
    //     id: this.currentAlbum.id,
    //     title: this.currentAlbum.title,
    //     description: this.currentAlbum.description,
    //     published: status
    //   };
    //   AlbumDataService.update(this.currentAlbum.id, data)
    //     .then(response => {
    //       console.log(response.data);
    //       this.currentAlbum.published = status;
    //       this.message = 'The status was updated successfully!';
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },
    updateAlbum() {
      AlbumDataService.update(this.currentAlbum.id, this.currentAlbum)
        .then(response => {
          console.log(response.data);
          this.message = 'The album was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteAlbum() {
      AlbumDataService.delete(this.currentAlbum.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "albums" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getAlbum(this.$route.params.id);
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