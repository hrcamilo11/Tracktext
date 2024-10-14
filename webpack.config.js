const path = require('path');

module.exports = {
  entry: './src/page.tsx', // Ajusta esto según tu punto de entrada
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: 'node', // Si es un proyecto Node.js, ayuda a manejar los módulos correctamente.
};