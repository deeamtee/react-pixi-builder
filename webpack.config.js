'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        shimmer: './src/shimmer.ts',
        app: './src/index.tsx',
        frame: './src/Frame/index.tsx',
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
        'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
        'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker'
    },
    context: path.resolve(__dirname),
    output: {
        globalObject: 'self',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
                    }
                }

            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
        modules: ['node_modules'],
    },
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            excludeChunks: ['frame']
        }),
        new HtmlWebpackPlugin({
            template: './src/Frame/index.ejs',
            filename: 'frame.html',
            chunks: ['shimmer', 'frame']
        }),
    ],
    devServer: {
        static: {
            directory: './dist'
        },
        https: true
    }
};
