const webpack = require('webpack');
const path = require('path');

// const miniCssExtractPlugin = require('mini-css-extract-plugin');
// const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // esse plugin é para ser usando em ambiente de produção. Na hora de buildar, não para dev.

const htmlWebpackPlugin = require('html-webpack-plugin');
// const copyWebpackPlugin = require('copy-webpack-plugin');

const devMode = process.env.NODE_ENV || 'production';

const plugins = [];

// plugin para tratar o html. Importar os arquivos automaticamente, minificar e versionar arquivos importados.
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

// plugins.push(new copyWebpackPlugin(

// ));


if(!devMode) {
    plugins.push(new webpack.optimize.ModuleConcatenationPlugin()); //tratamento para evitar que o webpack coloque cada modulo em uma closure durante a criação desses modulos. Isso acelera o tipo de processamento e carregamento no navegador para a build produção. Todos os modulos são concatenados em um unico wrapper.
    plugins.push(new babiliPlugin());

    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
    }));
}

module.exports = {
    entry: {
        app: './src/index.js',
        // vendor: ['jquery','bootstrap','reflect-metadata'] // esse atributo deve ter o MESMO nome do name do CommonsChunkPlugin
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
