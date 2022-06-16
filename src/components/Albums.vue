<template>
  <div class="row ms-5 mt-4">

    <div class="col-md-4">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
      <div class="row mt-2">

        <div class="col-5">
          <h1>Albums</h1>
        </div>

        <RouterLink :to="'/albums/add'" class="col mt-1 text-decoration-none"> <button class="btn btn-primary">Add Album</button>
        </RouterLink>
      </div>
      <ul class="list-group displaylist">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(album, index) in albums"
          :key="index" @click="setActiveAlbum(album, index)">
          {{ album.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllAlbums">
        Remove All
      </button>
    </div>
    <div class="col-md-6 mt-3 ms-5">
      <div v-if="currentAlbum" class="details">
        <!-- <h4>Details</h4> -->
        <div>
          <label><strong>Album:</strong></label> {{ currentAlbum.title }}
        </div>
        <div>
          <label><strong>Artist:</strong></label> {{ this.currentArtist }}
        </div>
                <router-link :to="'/albums/' + currentAlbum.id" class=" ">
        <button class="btn btn-outline-primary">Edit</button>
        </router-link>
        <button class="btn btn-danger m-1" @click="deleteAlbum">Delete Album</button>
                <p class="text-danger" v-if="delwarng ==true">Cannot delete an Album which has Tracks</p>
        <div>
          <label><strong>Tracks:</strong></label>
          <table class="table table-bordered border">
            <thead >
            <tr class="table-secondary">
              <th scope="col">Song</th>
              <th scope="col">Year</th>
            </tr>
            </thead>
            <tbody>
            <tr  scope="row" v-for="(currentAlbumTracks) in this.currentAlbumTracks">
              <td>{{currentAlbumTracks.title}}</td>
              <td>{{currentAlbumTracks.year}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Album...</p>
      </div>
    </div>
  </div>
</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
import ArtistDataService from "../services/ArtistDataService";
import TrackDataService from "../services/TrackDataService";
export default {
  name: "albums-list",
  data() {
    return {
      albums: [],
      artists: [],
      tracks: [],
      currentAlbum: null,
      currentIndex: -1,
      currentAlbumTracks: null,
      currentArtist:null,
      currentArtistIndex:null,
      title: "",
      hasTracks:false,
      delwarng:false,
    };
  },
  methods: {
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
      this.retrieveAlbums();
      this.currentAlbum = null;
      this.currentIndex = -1;
      this.currentAlbumTracks= null,
      this.currentArtist=null,
      this.currentArtistIndex=null,
      this.hasTracks = false;
      this.delwarng = false;
    },
    setActiveAlbum(album, index) {
      this.currentAlbum = album;
      if(this.tracks.findIndex(x => x.albumId === this.currentAlbum.id) !==-1){
        this.hasTracks = true;
      }
      else{
        this.hasTracks = false;
      }
      this.currentArtistIndex = this.artists.findIndex(x => x.id === this.currentAlbum.artistId)
      this.currentArtist = this.artists[this.currentArtistIndex].title
      // this.currentAlbumTracksIndex = 
      // this.currentAlbumTracks= this.tracks.filter(x => x.id === this.currentAlbum.id).map(x => x.title);
      this.currentAlbumTracks= this.tracks.filter(x => x.albumId === this.currentAlbum.id)
      console.log(this.currentAlbumTracks);
      this.currentIndex = album ? index : -1;
      this.delwarng=false;
    },
    removeAllAlbums() {
      AlbumDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteAlbum() {
    if(this.hasAlbum==false)
          {
      AlbumDataService.delete(this.currentAlbum.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "albums" });
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
          }
    else{
          this.delwarng=true;
        }
    },

    searchTitle() {
      AlbumDataService.findByTitle(this.title)
        .then(response => {
          this.albums = response.data;
          this.setActiveAlbum(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveAlbums();
    this.retrieveArtists();
    this.retrieveTracks();
  }
};
</script>
<style scoped>
.displaylist{
  font-size: 18px;
  font-weight: 600;
}
.details{
  font-size: 24px;
}
.list-group-item.active {
    background-color: var(--bs-dark);
    border-color: var(--bs-gray)
    }

</style>