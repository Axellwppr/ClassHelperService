module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "win": {
          "icon": "public/ico.png"
        }
      },
      mainProcessWatch: ['src/back/**'],
      preload: 'src/preload.js'
    }
  }
}