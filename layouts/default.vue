<template>
  <v-app dark>
    <v-app-bar fixed app>

      <v-toolbar-title>{{$t('meta.title')}}</v-toolbar-title>
      <v-spacer />
      <v-btn icon nuxt :to="aboutLink">
        <v-icon>info</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale,
    }),
    aboutLink(){
      return `/${this.locale}/about/`
    }
  },
}
</script>
