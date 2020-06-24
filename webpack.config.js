const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const devMode = process.env.NODE_ENV || 'production';
const plugins = [];

plugins.push(new htmlWebpackPlugin({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true
    },
    filename: 'index.html',
    template:  path.resolve(__dirname, 'src', 'index.html'),
}));

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'bundle.[hash:4].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        },
                    },
                    "sass-loader"
                ],
            },  
        ]
    },
    mode: devMode,
    devServer: { 
        port: '4444',
        open: true,
    },
    plugins
}
