const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    publicPath:'./',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wills的博客',
      inject: true,
      showErrors: false,
      template: './public/index.html',
      favicon: path.join(__dirname, 'public/favicon.ico')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: './dist',
    port: 80
  },
  module: {
    rules: [
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' } // 处理字体文件配置
    ]
  }
}
module.exports = config
