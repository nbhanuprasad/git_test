import { createWebHistory, createRouter } from "vue-router";
import HomeView from './views/HomeView.vue'
// import ArtistsView from "./views/ArtistsView.vue";
import ArtistsView from "./components/Artists.vue";
import AlbumsView from "./views/AlbumsView.vue";
import TracksView from "./views/TracksView.vue";
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
    component: TracksView
  },
  {
    path: "/artist/add",
    name: "artistadd",
    component: () => import("./components/AddArtist.vue")
  },
  {
    path: "/artists/:id",
    name: "editadd",
    component: () => import("./components/EditArtist.vue")
  },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router
