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
          <h1>Artists</h1>
        </div>

        <RouterLink class="col mt-1 text-decoration-none" to="/artist/add"> <button class="btn btn-primary">Add</button>
        </RouterLink>
      </div>
      <ul class="list-group displaylist">
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(artist, index) in artists"
          :key="index" @click="setActiveArtist(artist, index)">
          {{ artist.title }}
        </li>
      </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllArtists">
        Remove All
      </button>
    </div>
    <div class="col-md-6 mt-3 ms-5">
      <div v-if="currentArtist" class="details">
        <!-- <h4>Details</h4> -->
        <div>
          <label><strong>Artist:</strong></label> {{ currentArtist.title }}
                  </div>
                  <router-link :to="'/artists/' + currentArtist.id">
          <button class="btn btn-outline-primary">Edit</button>
        </router-link>
        <button class="btn btn-danger m-1" @click="deleteArtist">Delete Artist</button>
        <p class="text-danger" v-if="delwarng ==true">Cannot delete an Artist who has Albums</p>
        
        <div>
          <label><strong>Tracks:</strong></label>
          <table class="table table-bordered border">
            <thead>
              <tr class="table-secondary">
                <th scope="col">Album</th>
                <th scope="col">Songs</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody class="border" v-for="(currentArtistAlbums) in this.currentArtistAlbums">
                    <tr scope="row" v-for="(tracks) in this.tracks.filter(x => x.albumId === currentArtistAlbums.id)">
                      <td>{{ currentArtistAlbums.title }}</td>
                      <td>{{ tracks.title }}</td>
                      <td>{{ tracks.year }}</td>
                    </tr>
            </tbody>
          </table>
        </div>

        <!-- <router-link :to="'/artists/' + currentArtist.id + '/albums'">
        <button class="btn btn-outline-primary">Add Album</button>
        </router-link> -->
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
import AlbumDataService from "../services/AlbumDataService";
import TrackDataService from "../services/TrackDataService";
export default {
  name: "artists-list",
  data() {
    return {
      artists: [],
      albums: [],
      currentArtist: null,
      currentArtistAlbums: null,
      currentIndex: -1,
      hasAlbum:false,
      title: "",
      delwarng:false,
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
      this.retrieveArtists();
      this.currentArtist = null;
      this.currentArtistAlbums= null,
      this.currentIndex = -1;
      this.hasAlbum = false;
      this.delwarng = false;
    },
    setActiveArtist(artist, index) {
      this.currentArtist = artist;
      this.currentIndex = artist ? index : -1;
      if(this.albums.findIndex(x => x.artistId === this.currentArtist.id) !==-1){
        this.hasAlbum = true;
      }
      else{
        this.hasAlbum = false;
      }
      this.currentArtistAlbums = this.albums.filter(x => x.artistId === this.currentArtist.id)
      this.currentArtistAlbums = this.albums.filter(x => x.artistId === this.currentArtist.id)
      this.delwarng=false;
      console.log(this.hasAlbum)
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
    deleteArtist() {
    if(this.hasAlbum==false)
          {
      ArtistDataService.delete(this.currentArtist.id)
        .then(response => {
          console.log(response.data);
           this.$router.push({ name: "artists" });
           this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });}
        else{
          this.delwarng=true;
        }
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
    this.retrieveAlbums();
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