<template>
  <v-container fluid>

    <h2>{{$t('favorite.my-favorite.title', {favoriteCount})}}</h2>

    <v-row align="center">
      <v-col cols="12" sm="6" md="3" v-if="!favoriteCount">
        {{$t('favorite.hint.no-favorite')}}
      </v-col>

      <v-col cols="12" sm="6" md="3" v-for="f of favorites" :key="f.id">
        <ProgramCard :program="program[f.id]" />
      </v-col>
    </v-row>

    <h2>{{$t('program.overview.title', {programCount})}}</h2>

    <v-text-field v-model="searchTerm" />
    <program-list :search-term="searchTerm" />
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import ProgramCard from "../../components/ProgramCard";
  import ProgramList from "../../components/ProgramList";

  export default {
    components: {ProgramList, ProgramCard},
    data(){
      return {
        searchTerm: null,
      }
    },
    computed: {
      ...mapState({
        locale: state => state.i18n.locale,
        favorites: state => state.favorites.favorites,
        program: state => state.program.program,
      }),
      programCount(){
        return Object.keys(this.program).length
      },
      favoriteCount(){
        return Object.keys(this.favorites).length
      }
    },
  }
</script>
