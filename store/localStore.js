//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'
import migrationSteps from './localStoreMigrations'

export function newLocalStore() {
  const store = {
    meta: localforage.createInstance({
      name: process.env.appName,
      version: 1.0,
      storeName: 'meta', // Should be alphanumeric, with underscores.
    }),
    favorites: localforage.createInstance({
      name: process.env.appName,
      version: 1.0,
      storeName: 'favorites', // Should be alphanumeric, with underscores.
    }),
  }

  return {
    ready() {
      return Promise.all([
        store.meta.ready(),
        store.favorites.ready(),
      ])
      .then(this.$migrate())
    },

    $migrate(){
      const KEY_VERSION = 'version.store'

      //get the current schema version
      return store.meta.getItem(KEY_VERSION)
        .then(storeVersion => {
          let currentMigrationVersion = storeVersion ? storeVersion : 0

          let p = Promise.resolve()
          for(let i = currentMigrationVersion; i < migrationSteps.length; i++) {
            p = p.then(() => {
              console.log(`Migration: do Step ${i + 1} of ${migrationSteps.length}`)
              return migrationSteps[i](store)
            }).then(() => {
              return store.meta.setItem(KEY_VERSION, i + 1)
            })
          }

          return p
        })
    },

    getFavorite(key){
      return store.favorites.getItem(key)
    },
    getAllFavorites(){
      return store.favorites.keys()
        .then(keys => keys.map(id => this.getFavorite(id)))
        .then(promises => Promise.all(promises))
    },
    setFavorite(key, value) {
      return store.favorites.setItem(key, value)
    },
    removeFavorite(key) {
      return store.favorites.removeItem(key)
    }
  }
}
