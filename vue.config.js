module.exports = {
  pwa: {
    name: process.env.VUE_APP_NAME,
    themeColor: '#D0021B',
    assetsVersion: '1.0.0',
    manifestOptions: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      short_name: process.env.VUE_APP_SHORT_NAME
    }
  }
}