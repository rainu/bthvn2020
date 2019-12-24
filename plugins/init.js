//init stuff here

export default function ({app, store}) {
    return Promise.all([
      store.dispatch('program/init'),
      store.dispatch('favorites/init'),
    ])
}
