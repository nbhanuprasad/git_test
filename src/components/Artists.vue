<template>
  <div class="list row ms-5 mt-4">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="row mt-2">

        <div class="col-5">
          <h1>Artists</h1>
        </div>

        <RouterLink class="col mt-1 text-decoration-none" to="/artist/add"> <button class="btn btn-primary">Add</button>
        </RouterLink>
      </div>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(artist, index) in artists"
          :key="index" @click="setActiveArtist(artist, index)">
          {{ artist.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllArtists">
        Remove All
      </button>
    </div>
    <div class="col-md-6 mt-3">
      <div v-if="currentArtist" class="details">
        <h4>Details</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentArtist.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentArtist.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentArtist.published ? "Published" : "Pending" }}
        </div>
        <router-link :to="'/artists/' + currentArtist.id" class=" ">
        <button class="btn btn-outline-primary">Edit</button>
        
        </router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Artist...</p>
      </div>
    </div>
  </div>
</template>
<script>
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "artists-list",
  data() {
    return {
      artists: [],
      currentArtist: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveArtists() {
      ArtistDataService.getAll()
        .then(response => {
          this.artists = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveArtists();
      this.currentArtist = null;
      this.currentIndex = -1;
    },
    setActiveArtist(artist, index) {
      this.currentArtist = artist;
      this.currentIndex = artist ? index : -1;
    },
    removeAllArtists() {
      ArtistDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      ArtistDataService.findByTitle(this.title)
        .then(response => {
          this.artists = response.data;
          this.setActiveArtist(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveArtists();
  }
};
</script>
<style scoped>

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.details{
  font-size: 14px;
}
</style>