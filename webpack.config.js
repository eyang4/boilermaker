module.exports = {
  entry: './app/index.js',
  mode: 'development',
  output: {
    path: __dirname,
    filename: 'public/wpbundle.js'
  },
  devtool: 'source-maps',
  // a source map maps the optimized compressed code to the original,
  // making debugging simpler
  module: {
    rules: [
      {
        test: /\.js$/,
        // best practice is to only use RegExp in test for file matching
        // '\' escapes '.', turning it into a literal
        // '$' denotes end of string
        // matches all files with '.js' at the end
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // use these specific loaders for files matching this
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
