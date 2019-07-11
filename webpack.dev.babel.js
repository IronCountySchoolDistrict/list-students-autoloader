import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import common from './webpack.common.babel'

export default merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './src/public/dist/'),
        filename: `[name].bundle.js`,
        publicPath: '/' 
    },
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      includePaths: [
                        path.resolve(__dirname, 'node_modules/')
                      ]
                    }
                  },
                  'css-loader',
                  'sass-loader'
                ]
              }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({ multiStep: true }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),
        new HtmlWebpackPlugin({
            template: './src/html/template.html',
            inject: 'body'
        }),
        new BrowserSyncPlugin({
            host: '0.0.0.0',
            port: 3001,
            proxy: 'http://localhost:3000/',
            reload: false,
            open: false
        }) 
    ],
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: './src/public',
        compress: true,
        host: '0.0.0.0',
        port: '3000',
        bonjour: true,
        hot: true,
        historyApiFallback: true,
        inline: true,
        clientLogLevel: 'error',
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000
        }
    }
})
