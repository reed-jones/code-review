require('dotenv').config()

module.exports = {
  client: {
    service: {
      name: 'code-review',
      // URL to the GraphQL API
      url: `${process.env.APP_URL}/graphql`,
    },

    // Files processed by the extension
    includes: [
      'resources/**/*.vue',
      'resources/**/*.js',
    ],
  },
}
