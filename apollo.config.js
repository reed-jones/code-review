module.exports = {
  client: {
    service: {
      name: 'code-review',
      // URL to the GraphQL API
      url: 'http://cr.test/graphql',
    },
    // Files processed by the extension
    includes: [
      'resources/**/*.vue',
      'resources/**/*.js',
    ],
  },
}