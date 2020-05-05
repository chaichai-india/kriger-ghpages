const path = require(`path`);
const BrotliPlugin = require(`brotli-webpack-plugin`);
//angular.json builder default
// @angular-devkit/build-angular:browser
module.exports = {
  plugins: [
    new BrotliPlugin({
      asset: "[fileWithoutExt].[ext].br",
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
    }),
  ],
};
