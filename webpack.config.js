const webpack = require('webpack')

module.exports = {
  output: {
    filename: 'bundle.min.js'
  },
  plugins:[
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules|bower_components/,
          query: {
              presets: ['es2015']
          }
      }
    ]
  }
}
