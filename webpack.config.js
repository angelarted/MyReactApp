const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }/*,
  devServer: {
    contentBase: './',
    inline: true,
    watchContentBase: true,
    port: 3000
  }*/,
  devServer:{
    contentBase: './dist',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js','.jsx','.css','.scss']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'] 
        }
      },
      {
        test: /\.(?:png|jpg|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  },
  plugins:[
    //new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin("styles.css"),
    new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: 'http://localhost:8080/'
        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: false
        }
      )
  ]
};
