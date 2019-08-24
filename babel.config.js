module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    [
      "transform-assets",
      {
        extensions: ["jpg", "png"],
        name: "[name].[ext]?[sha512:hash:base64:7]"
      }
    ]
  ]
};
