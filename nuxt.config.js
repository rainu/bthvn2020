import colors from 'vuetify/es5/util/colors'

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/bthvn2020/'
  }
} : {
  router: {
    base: '/'
  }
}

routerBase.router.middleware = ['i18n']

export default {
  ...routerBase,

  mode: 'spa',

  generate: {
    dir: 'docs'
  },

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${routerBase.router.base}favicon.ico` }
    ]
  },

  env: {
    appName: process.env.npm_package_name,
    routerBase: routerBase.router.base,
    version: process.env.npm_package_version,
    builtDate: new Date(),
    revision: process.env.COMMIT_HASH || 'development',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],

  manifest: {
    "name": "Bonn Bethoven 2020 - Programm Unterwegs",
    "short_name": "bthvn2020",
    "start_url": routerBase.router.base,
    "scope": routerBase.router.base + ".",
    "display": "standalone",
    "orientation": "portrait-primary",
    "background_color": "#FFE7A2",
    "theme_color": "#74B392",
    "dir": "ltr",
    "lang": "de-DE"
  },

  icon: {
    sizes: [16, 32, 120, 144, 152, 192, 384, 512]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/localStore',
    '~/plugins/i18n',
    '~/plugins/init',
    '~/plugins/style',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    browserBaseURL: process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://rainu.github.io/bthvn2020/' : 'http://localhost:3000/',
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
