const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		// publicPath: '/'
	},
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    proxy: {
			'/api/**': {
				target: 'http://localhost:3000/',
				secure: false,
			},
			'/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    }
  },
  plugins: [new MiniCssExtractPlugin()],
	module: {
		rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/, // |bower_components
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },
    {
			test: /\.s[ac]ss$/i,
			// exclude: /node_modules/, // |bower_components
			use: [
				MiniCssExtractPlugin.loader,
				// Creates `style` nodes from JS strings
				// 'style-loader',
				// Translates CSS into CommonJS
				'css-loader',
				// Compiles Sass to CSS
				'sass-loader',
			],
    }]
	}
	
}