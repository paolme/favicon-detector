const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  target: 'web'
, node: {
    fs: 'empty'
  , net: 'empty'
  }
, entry: {
    'bootstrap': './src/bootstrap.js'
  }
, output: {
    path: path.join(__dirname, 'dist')
  , filename: '[name].js'
  }
, module: {
    rules: [
      {
        test: /\.js$/
      , exclude: /node_module/
      , use: 'babel-loader'
      }
    , {
        test: /\.css$/
      , use: [
          { loader: 'style-loader' }
        , { loader: 'css-loader' }
        ]
      }
    ]
  }
, plugins: [
    new CopyWebpackPlugin([
      { from: './src', ignore: '*.js' }
    , { from: './node_modules/webextension-polyfill/dist/browser-polyfill.min.js', to: 'polyfill.js' }
    ])
  ]
}
