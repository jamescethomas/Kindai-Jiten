var webpack = require('webpack'),
    path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    port: 3000
  },
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080/',
    'webpack/hot/only-dev-server',
    './src'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['*','.js']
  },
  module: {
    rules: [
      {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: [
            'react-hot-loader',
            'babel-loader?presets[]=react,presets[]=es2015'
          ]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
