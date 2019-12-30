<template>
  <v-card>
    <v-card-title>{{$t('meta.about.title')}}</v-card-title>
    <v-card-text>
      <p>{{$t('meta.about.text1')}}</p>
      <v-list>
        <v-list-item>Alex Thurn</v-list-item>
        <v-list-item>Max Marche</v-list-item>
        <v-list-item>Sven Schumann</v-list-item>
      </v-list>
      <p>{{$t('meta.about.text2')}}</p>
      <p>{{$t('meta.about.last-update', {date: formattedDate})}}</p>
      <p>{{$t('meta.about.text3')}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import * as dateFN from 'date-fns'

export default {
  data(){
    return {
      builtDate: new Date(process.env.builtDate),
    }
  },
  computed: {
    ...mapState({
      locale: state => state.i18n.locale,
    }),
    formattedDate(){
      return dateFN.format(this.builtDate, this.$t('meta.date.format'))
    }
  },
}
</script>
