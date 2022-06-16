<template>

    <h1>Music Library Homepage</h1>
    <h4>{{ message }}</h4>
  
      <v-row >
        <v-col  cols="12"
        sm="2">
          <v-btn color = "success"
            @click="searchTitle"
          >
            Search
          </v-btn>
        </v-col>
        <v-col col="12" sm="10">
            <v-text-field density="compact" clearable
              v-model="title"/>
        </v-col> 
      </v-row>
      <v-row>
        <v-col  cols="9"
              sm="2">
            <span class="text-h6"></span>
        </v-col>
        <v-col  cols="9"
              sm="4">
            <span class="text-h6"></span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6"></span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6"></span>
        </v-col>
        <v-col  cols="9"
              sm="1">
            <span class="text-h6"></span>
        </v-col>
      </v-row>
      <TutorialDisplay
        v-for="tutorial in tutorials"
        :key="tutorial.id"
        :tutorial="tutorial"
        @deleteTutorial="goDelete(tutorial)"
        @updateTutorial="goEdit(tutorial)"
        @viewTutorial="goView(tutorial)"
    />

  <v-row
    justify="space-around"
  >
    <v-btn
      depressed
      rounded
      color="red"
      height="200px"
      width="300px"
    >
      Aritists
    </v-btn>
    <v-btn
      depressed
      rounded
      color="green"
      height="200px"
      width="300px"
    >
    Albums
    </v-btn>
    <v-btn
      depressed
      rounded
      color="blue"
      height="200px"
      width="300px"
    >
      Tracks
    </v-btn>
    
  </v-row>
 
</template>
<script>
import TutorialDataService from "../services/TutorialDataService";
import TutorialDisplay from '@/components/TutorialDisplay.vue';
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
      message : ""
    };
  },
  components: {
        TutorialDisplay
    },
  methods: {
    goEdit(tutorial) {
      this.$router.push({ name: 'edit', params: { id: tutorial.id } });
    },
    goView(tutorial) {
      this.$router.push({ name: 'view', params: { id: tutorial.id } });
    },
    goDelete(tutorial) {
      TutorialDataService.delete(tutorial.id)
        .then( () => {
    
          this.retrieveTutorials()
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },
    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },
    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          this.setActiveTutorial(null);
          
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>
<style>

</style>