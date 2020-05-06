const path = require(`path`);
const BrotliPlugin = require(`brotli-webpack-plugin`);
const CompressionPlugin = require("compression-webpack-plugin");
//angular.json builder default
// @angular-devkit/build-angular:browser
module.exports = {
  plugins: [
    new BrotliPlugin({
      asset: "[fileWithoutExt].[ext].br",
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
    }),
    new CompressionPlugin({
      test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
      filename(info) {
        let opFile = info.path.split("."),
          opFileType = opFile.pop(),
          opFileName = opFile.join(".");
        return `${opFileName}.${opFileType}.gz`;
      },
    }),
  ],
};
