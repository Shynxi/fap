var config = require('../config')
if(!config.tasks.js) return

var path            = require('path')
var pathToUrl       = require('./pathToUrl')
var webpack         = require('webpack')
var webpackManifest = require('./webpackManifest')
var BowerWebpackPlugin = require("bower-webpack-plugin");

module.exports = function(env) {
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src)
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)
  var publicPath = pathToUrl(config.tasks.js.dest, '/')

  var extensions = config.tasks.js.extensions.map(function(extension) {
    return '.' + extension
  })

  var rev = config.tasks.production.rev && env === 'production'
  var filenamePattern = rev ? '[name]-[hash].js' : '[name].js'

  var webpackConfig = {
    context: jsSrc,
    resolve: {
      root: jsSrc,
      extensions: [''].concat(extensions),
      modulesDirectories: ["web_modules", "node_modules", "bower_components"]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: config.tasks.js.babel,
        },
        {
          test:   /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.scss$/,
          loaders: ["style", "css", "resolve-url", "sass"]
        },
        {
          test: /\.sass$/,
          loaders: ["style", "css", "resolve-url", "sass"]
        },
        {
          test: /bootstrap\/dist\/js\/umd\//,
          loader: 'imports?jQuery=jquery'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
          ]
        },
        {
          test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loaders: [
            'file'
          ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loaders: [
            'url-loader?limit=10000&minetype=application/font-woff'
          ]
        },
        {
          test: /\.(webm|mp4|pdf)$/i,
          loaders: [
            'file'
          ]
        }
      ],
      noParse: [
        /[\/\\]node_modules[\/\\]angular[\/\\]angular\.js$/
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        Tether: 'tether',
        "window.Tether": "tether",
        _: 'lodash',
        Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
        alert: "exports?alert!bootstrap/js/dist/alert",
        button: "exports?Button!bootstrap/js/dist/button",
        Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports?Modal!bootstrap/js/dist/modal",
        Popover: "exports?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports?Tab!bootstrap/js/dist/tab",
        Util: "exports?Util!bootstrap/js/dist/util"
      }),
      new BowerWebpackPlugin({
        modulesDirectories: ["bower_components"],
        manifestFiles:      ["bower.json",".bower.json"],
        includes:           /.*/,
        excludes:           [],
        searchResolveModulesDirectories: true
      }),
      new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
      )
    ],
  }

  if(env === 'development') {
    webpackConfig.devtool = 'inline-source-map'

    // Create new entries object with webpack-hot-middleware added
    for (var key in config.tasks.js.entries) {
      var entry = config.tasks.js.entries[key]
      config.tasks.js.entries[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry)
    }

    webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if(env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries

    webpackConfig.output= {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    if(config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      )
    }
  }

  if(env === 'production') {
    if(rev) {
      webpackConfig.plugins.push(new webpackManifest(publicPath, config.root.dest))
    }
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
}
