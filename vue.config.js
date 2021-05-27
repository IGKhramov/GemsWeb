module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gems/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}