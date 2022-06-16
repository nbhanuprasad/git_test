import { createWebHistory, createRouter } from "vue-router";
import HomeView from './views/HomeView.vue'
// import ArtistsView from "./views/ArtistsView.vue";
import ArtistsView from "./components/Artists.vue";
// import AlbumsView from "./views/AlbumsView.vue";
import AlbumsView from "./components/Albums.vue";
import Tracks from "./components/Tracks.vue";
const routes =  [
  {
    path: "/",
    alias: "/home",
    name: "home",
    component: HomeView
  },
  {
    path: "/artists",
    name: "artists",
    component: ArtistsView
  },
  {
    path: "/albums",
    name: "albums",
    component: AlbumsView
  },
  {
    path: "/tracks",
    name: "tracks",
    component: Tracks
  },
  {
    path: "/artist/add",
    name: "artistadd",
    component: () => import("./components/AddArtist.vue")
  },
  {
    path: "/artists/:id",
    name: "editartist",
    component: () => import("./components/EditArtist.vue")
  },
  {
    path: "/albums/add",
    name: "albumadd",
    component: () => import("./components/AddAlbum.vue")
  },
  {
    path: "/albums/:id",
    name: "editalbum",
    component: () => import("./components/EditAlbum.vue")
  },
  {
    path: "/tracks/add",
    name: "trackadd",
    component: () => import("./components/AddTrack.vue")
  },
  {
    path: "/tracks/:id",
    name: "edittrack",
    component: () => import("./components/EditTrack.vue")
  },

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router
