const path = require('path');

const HTMLWebpackPlagin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const isDevMode = NODE_ENV === 'development';

const env = {
    PUBLIC_PATH: "",
};

const PUBLIC_PATH = env.PUBLIC_PATH || '';

module.exports = {
    resolve: {
        extensions: ['.js', '.json', '.mjs'],
    },
    mode: NODE_ENV || 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: PUBLIC_PATH,
    },
    watch: isDevMode,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: 'babel-loader',
                exclude: isDevMode ? [/node_modules/] : [],
            },
            {
                test: /\.(c|sa|sc)ss?$/,
                use: [
                    'style-loader',
                    // { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 3,
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                                auto: /\.module\.\w+$/i,
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: ['url-loader'],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlagin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
    devServer: {
        port: PORT,
        overlay: true,
        open: true,
        // hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        // disableHostCheck: true,
        allowedHosts: [
            'zartestwebpack.herokuapp.com'
        ]
        //https: true,  
    },
    devtool: 'source-map',
};
