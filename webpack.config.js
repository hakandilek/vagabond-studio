var path = require("path");
module.exports = {
    entry: {
      main: "./js/main",
      lib : "./js/lib"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
          { test: /\.expose$/, loader: "expose-loader" }
        ]
    }
};