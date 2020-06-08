// const plugins = ['']
// if (process.env.NODE_ENV === 'production') {
//   plugins.push('transform-remove-console')
// }
// module.exports = {
//   presets: [
//     '@vue/app'
//   ],
//   plugins

// }

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // plugins
  ]
}