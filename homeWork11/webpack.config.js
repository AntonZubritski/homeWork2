const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);
const CopyPlugin = require(`copy-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`), 
    publicPath: `http://localhost:8080/`,
    hot: true, 
    compress: true 
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./public/index.html`
    }),
    new CopyPlugin([
      {from: `./src/css`, to: `css`},
      {from: `./src/pic`, to: `img`},
      {from: `./src/cloud`, to: `img`}
    ])
  ]
};
