import path from 'path'
import webpack from 'webpack'
import pkgInfo from 'pkginfo'

pkgInfo(module)

const config = {
    entry: {
        'autoloader': `./src/scripts/${module.exports.name}/js/autoloader.js`,
    },
    performance: {
        hints: false
    },
    externals: {
        jquery: 'jquery',
        underscore: 'underscore'
    },
    optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                index: {
                    test: /static\/js/
                },
                vendors: {
                    test: /([\\/]node_modules[\\/])/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [ 
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: { minimize: true }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        "@babel/plugin-transform-modules-amd",
                        "@babel/plugin-transform-regenerator",
                        "@babel/plugin-transform-runtime",
                    ]
                }
            } 
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            createDayLabel: "jquery",
            createWeekdayLabel: "jquery"
        }),
    ],
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.js', '.css'],
    }
    
}

export default config
