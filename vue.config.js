// vue.config.js
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const setMiniCssExtractPlugin = () => {
  const rezult = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/[id].css',
  });
  return rezult;
};

const setCopyPlugin = () => {
  const rezult = new CopyPlugin([
    {
      from: path.resolve(__dirname, 'src/assets/img'),
      to: path.resolve(__dirname, 'dist/img'),
    },
    {
      from: path.resolve(__dirname, 'src/assets/fonts'),
      to: path.resolve(__dirname, 'dist/fonts'),
    },
  ]);
  if (!devMode) {
    rezult.patterns.push({
      from: path.resolve(__dirname, 'dll/vendor.bundle.js'),
      to: path.resolve(__dirname, 'dist/js'),
    });
  }
  return rezult;
};

const setProvidePlugin = () => {
  const rezult = new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.min.js',
    jQuery: 'jquery/dist/jquery.min.js',
  });
  return rezult;
};

const plugins = [setCopyPlugin(), setProvidePlugin()];
if (!devMode) {
  plugins.push(setMiniCssExtractPlugin());
}

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '' : './', // Если используется многостраничный режим (pages), то не писать
  assetsDir: '',
  indexPath: 'index.html', // по умолчанию index.html
  pages: {
    index: {
      entry: 'src/index.jsx',
      template: 'public/index.pug',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },

  configureWebpack: {
    plugins,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            devMode
              ? { loader: 'vue-style-loader' }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 2,
                url: true,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
                plugins: [],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                prependData: '@import "scss/utils";',
                sassOptions: {
                  includePaths: [__dirname, 'src'],
                },
              },
            },
          ],
        },
      ],
    },
  },

  chainWebpack: (config) => {
    config.module.rules.delete('sass');
    config.module.rules.delete('postcss');
    config.module.rules.delete('less');
    config.module.rules.delete('stylus');
    config.module.rules.delete('scss');

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    /* add config.module.rule('svg') */
    svgRule
      .test(/\.svg$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
      });

    /* clear config.module.rule('fonts') */
    const font = config.module.rule('fonts');
    font.uses.clear();
    font
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('file-loader')
      .loader('file-loader')
      .options({
        publicPath: '../', // url(../fonts/...)
        name: 'fonts/[name]/[name].[ext]',
      });

    /* reference to DLL manifest */
    if (!devMode) {
      config.plugin('vendorDll').use(webpack.DllReferencePlugin, [
        {
          context: __dirname,
          manifest: require('./dll/vendor-manifest.json'),
        },
      ]);
    }
  },

  devServer: {
    // publicPath не использовать в многостраничном режиме
    port: 8081,
    overlay: {
      // вывод ошибок на экране браузера
      warnings: false,
      // errors: true,
    },
  },

  productionSourceMap: false,
  integrity: false,
};

// 1. Если есть изображения в html они не обрабатываются url-loader и file-loader -и.
/* 2. minCssExtractPlugin - создаёт файлы стилей для каждой точки входа.
Также он поддерживает модульное подключение стилей через import */
/*
  style-loader - создаёт узлы стилей из строк JS
  css-loader - переводит css в commonJS
  sass-loader - компилирует scss в css
  url-loader - преобразует в base64.
*/
