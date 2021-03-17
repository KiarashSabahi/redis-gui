const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const path = require("path")

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
}, {
  test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
  loader: 'url-loader?limit=100000'
}, {
  test: /\.tsx$/,
  include: path.join(__dirname, 'src'),
  loader: 'react-hot-loader/webpack'
});


module.exports = {
  module: {
    rules,
  },
  target: "electron-renderer",
  plugins: plugins,
  output: {
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
};
