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
          <h1>Tracks</h1>
        </div>

        <RouterLink  :to="'/tracks/add'" class="col mt-1 text-decoration-none"> <button class="btn btn-primary">Add Track</button>
        </RouterLink>
      </div>
      <ul class="list-group">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(track, index) in tracks"
          :key="index" @click="setActiveTrack(track, index)">
          {{ track.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTracks">
        Remove All
      </button>
    </div>
    <div class="col-md-6 mt-3">
      <div v-if="currentTrack" class="details">
        <h4>Details</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTrack.title }}
        </div>
        <div>
          <label><strong>Artist:</strong></label> {{ currentTrack.artistId }}
        </div>

        <router-link :to="'/tracks/' + currentTrack.id" class=" ">
        <button class="btn btn-outline-primary">Edit</button>
        
        </router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Track...</p>
      </div>
    </div>
  </div>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
export default {
  name: "tracks-list",
  data() {
    return {
      tracks: [],
      currentTrack: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveTracks() {
      TrackDataService.getAll()
        .then(response => {
          this.tracks = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveTracks();
      this.currentTrack = null;
      this.currentIndex = -1;
    },
    setActiveTrack(track, index) {
      this.currentTrack = track;
      this.currentIndex = track ? index : -1;
    },
    removeAllTracks() {
      TrackDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchTitle() {
      TrackDataService.findByTitle(this.title)
        .then(response => {
          this.tracks = response.data;
          this.setActiveTrack(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTracks();
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