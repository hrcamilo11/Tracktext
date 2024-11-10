const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  entry: './server.ts', // La ruta a tu archivo principal
  target: 'node', // Para aplicaciones Node.js
  externals: [nodeExternals()], // Excluir módulos de Node.js
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Permite importar archivos .ts y .js sin especificar extensión
  },
  output: {
    filename: 'bundle.cjs',
    path: path.resolve(__dirname, 'dist'), // Directorio de salida
  },

};
