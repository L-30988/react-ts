const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'

const getCssLoader = (importLoader) => {
  return [
    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDevelopment,
        importLoaders: importLoader
      }
    },

    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            isProduction && [
              'postcss-preset-env',
              {
                autoprefixer: {
                  grid: true,
                  flexbox: 'no-2009'
                },
                stage: 3
              }
            ]
          ]
        }
      }
    }
  ]
}

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `js/[name]${isDevelopment ? '' : '.[hash:8]'}.js`,
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: path.resolve(__dirname, '../src'),
      Components: path.resolve(__dirname, '../src/components'),
      Utils: path.resolve(__dirname, '../src/utils')
    }
  },

  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/
      },

      {
        test: /\.css$/,
        use: getCssLoader(1)
      },

      {
        test: /\.scss$/,
        use: [
          ...getCssLoader(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      cache: false,
      minify: isDevelopment
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            useShortDoctype: true
          }
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, '../public'),
          from: '*',
          to: path.resolve(__dirname, '../dist'),
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html']
          }
        }
      ]
    }),
    new WebpackBar({
      name: isDevelopment ? '正在启动' : '正在打包',
      color: '#fa8c16'
    }),

    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(__dirname, '../tsconfig.json')
      }
    })
  ]
}
