<template>
  <v-card>
    <v-card-text>
      <h2>{{program.title}}</h2>
      <div v-html="program.description"></div>
    </v-card-text>

    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn icon v-if="favorites[program.id]" @click="clickRemoveFavorite">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon v-else @click="clickAddFavorite">
        <v-icon>favorite_border</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    name: "ProgramCard",
    props: {
      program: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapState({
        locale: state => state.i18n.locale,
        favorites: state => state.favorites.favorites,
      })
    },
    methods: {
      ...mapMutations({
        addFavorite: 'favorites/addFavorite',
        removeFavorite: 'favorites/removeFavorite',
      }),
      clickAddFavorite(){
        this.addFavorite({
          id: this.program.id
        })
      },
      clickRemoveFavorite() {
        this.removeFavorite(this.program.id)
      }
    }
  }
</script>

<style scoped>

</style>
