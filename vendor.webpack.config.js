const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react'],
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve(__dirname, 'dll'),
    library: 'vendor_lib',
  },
  plugins: [
    // создаёт манифест файла, который затем исопльзует плагином DllReferencePlugin в dev
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: path.resolve(__dirname, 'dll/vendor-manifest.json'),
    }),
  ],
};
