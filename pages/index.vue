<template>
  <v-card>
    <v-card-text>
      <p>Willkommen,</p>
      <p> "Programm Unterwegs" wurde speziell für den Abruf des bthvn2020 Programms auf mobilen
        Geräte konzipiert. So können Sie unterwegs wichtige Informationen schnell und mit wenig
        Datenvolumen einsehen.
      </p>

      <p>
        Um die Webseite so performant wie möglich zu gestalten werden hier nur die wichtigsten Eckdaten angezeigt. Tickets & Detailinformationen finden Sie auf:
      </p>
      <a href="https://bthvn2020.de">https://bthvn2020.de</a>
      <p>Viel Spaß.</p>
    </v-card-text>

    <v-card-actions>
      <v-btn v-for="locale in availableLocales" :key="locale.code" @click="onClick(locale)">
        {{locale.label}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import i18n from '../i18n'
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      locales: state => state.i18n.locales,
    }),
    availableLocales(){
      return this.locales.map(l => {
        return {
          code: l,
          label: i18n.localeMappings[l].meta.language.code
        }
      })
    }
  },
  methods: {
    onClick(locale){
      this.$router.push(`/${locale.code}/`)
    }
  }
}
</script>
