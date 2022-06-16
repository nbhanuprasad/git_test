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
      <div class="row mt-2">

        <div class="col-2">
          <h1>Tracks</h1>
        </div>

        <RouterLink :to="'/tracks/add'" class="col-2 mt-1 text-decoration-none"> <button class="btn btn-primary">
            Add Track</button>
        </RouterLink>

        <div class="col-5">
        <div v-if="currentTrack" class="details">
          <router-link :to="'/tracks/' + currentTrack.id" class=" ">
            <button class="btn btn-outline-primary">Edit</button>
          </router-link>
          <button class="btn btn-danger m-1" @click="deleteTrack">
            Delete Track
          </button>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Track...</p>
        </div>
        </div>

      </div>
      <ul class="list-group displaylist">
        <li class="list-group-item">
          <div class="row">
            <div class="col-4">Song</div>
            <div class="col-4">Artist</div>
            <div class="col-4">Album</div>
          </div>
          </li>
      </ul>
      <ul class="list-group  displaylist list-group-primary">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(track, index) in tracks"
          :key="index" @click="setActiveTrack(track, index)">
          <div class="row">
            <div class="col-4">{{ track.title }}</div>
            <div class="col-4">{{
                // this.currentArtist
                this.artists[this.artists.findIndex(x => x.id === this.albums[index].artistId)].title
            }}</div>
            <div class="col-4">{{
                // this.currentAlbum
                this.albums[this.albums.findIndex(x => x.id === track.albumId)].title
            }}</div>
          </div>

        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTracks">
        Remove All
      </button>
    </div>
  </div>
</template>
<script>
import TrackDataService from "../services/TrackDataService";
import AlbumDataService from "../services/AlbumDataService";
import ArtistDataService from "../services/ArtistDataService";
export default {
  name: "tracks-list",
  data() {
    return {
      tracks: [],
      albums: [],
      artists: [],
      currentTrack: null,
      currentIndex: -1,
      currentAlbum: null,
      currentAlbumIndex: null,
      currentArtist: null,
      currentArtistIndex: null,
      currentArtistId: null,
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
      this.retrieveTracks();
      this.currentTrack = null;
      this.currentIndex = -1;
    },
    deleteTrack() {
      TrackDataService.delete(this.currentTrack.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tracks" });
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    setActiveTrack(track, index) {
      this.currentTrack = track;
      this.currentIndex = track ? index : -1;
      this.currentAlbumIndex = this.albums.findIndex(x => x.id === this.currentTrack.albumId)
      // this.albums[this.albums.findIndex(x => x.id === this.currentTrack.albumId)].title
      this.currentAlbum = this.albums[this.currentAlbumIndex].title
      this.currentArtistId = this.albums[this.currentAlbumIndex].artistId
      this.currentArtistIndex = this.artists.findIndex(x => x.id === this.currentArtistId)
      this.currentArtist = this.artists[this.currentArtistIndex].title
      // this.artists[this.artists.findIndex(x => x.id === this.albums[this.currentAlbumIndex].artistId)].title
      console.log(this.currentArtistIndex);
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
    this.retrieveAlbums();
    this.retrieveArtists();
  }
};
</script>
<style scoped>
.displaylist {
  font-size: 18px;
  font-weight: 600;
}

.details {
  font-size: 24px;
}

.list-group-item.active {
  background-color: var(--bs-dark);
  border-color: var(--bs-gray)
}
</style>