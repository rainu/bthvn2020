<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select v-model="page.size" :items="pageSizes" />
      </v-col>
    </v-row>

    <v-row align="center" v-show="programFound">
      <v-col cols="12">
        <v-pagination v-model="page.current" :length="programViewPageCount" :total-visible="5"  circle/>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" v-if="!programFound">
        {{$t('program.search.no-results')}}
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" sm="6" md="3" v-for="p of programView" :key="p.id">
        <ProgramCard :program="p" />
      </v-col>
    </v-row>

    <v-row align="center" v-show="programFound">
      <v-col cols="12">
        <v-pagination v-model="page.current" :length="programViewPageCount" :total-visible="5" circle/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex';
  import ProgramCard from "./ProgramCard";

  export default {
    name: "ProgramList",
    components: {ProgramCard},
    props: {
      searchTerm: {
        required: false,
        type: String,
      },
      pageSize: {
        required: false,
        type: Number,
        default: 10
      },
      pageSizes: {
        requires: false,
        type: Array,
        default: () => [10, 20 , 50]
      },
      pageCurrent: {
        required: false,
        type: Number,
        default: 1
      }
    },
    data(){
      return {
        page: {
          current: this.pageCurrent,
          size: this.pageSize,
        }
      }
    },
    computed: {
      ...mapState({
        program: state => state.program.program,
      }),
      filteredProgram(){
        let view = Object.values(this.program)

        if(this.searchTerm) {
          view = view.filter(p => p.title.includes(this.searchTerm) || p.description.includes(this.searchTerm))
        }

        return view
      },
      programView(){
        let start = (this.page.current - 1) * this.page.size
        let end = start + this.page.size

        return this.filteredProgram.slice(start, end)
      },
      programViewPageCount(){
        return Math.ceil(this.filteredProgram.length / this.page.size)
      },
      programFound(){
        return this.programViewPageCount > 0
      }
    },
    watch: {
      pageCurrent(newOffset){
        this.page.current = newOffset
      },
      pageSize(newSize){
        this.page.size = newSize
      },
      searchTerm(){
        this.page.current = 1
      }
    }
  }
</script>

<style scoped>

</style>
