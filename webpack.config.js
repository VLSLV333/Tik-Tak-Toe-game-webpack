const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')


module.exports = {
    mode: 'production',
    entry: {
        bundle:{
            import: ['./src/js/index.js', './src/js/chooseActivePlayer.js'],
            filename: '[name].js',
        },
        indexCss: {
            import: ['./src/scss/style.scss', './src/scss/win.scss'],
          },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer:{
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        open: true,
        compress: true,
        historyApiFallback: true,
        watchFiles: ['src/index.html', 'src/js/chooseActivePlayer.js', 'src/js/index.js', './src/scss/style.scss', './src/scss/win.scss'],
    },
    module:{
        rules:[
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "raw-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
        }),
        new HtmlWebpackPlugin(({
            title: 'JS Modules',
            filename: 'index.html',
            template: './src/index.html'
        })),
        new RemoveEmptyScriptsPlugin()
    ]
}