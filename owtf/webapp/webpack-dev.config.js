let path = require('path');
let webpack = require('webpack');
let merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

let slash = require('slash');
let dirname = __dirname;
if (process.platform === 'win32') dirname = slash(dirname);

let common = {
    plugins: [
        new webpack.DefinePlugin({
            'TARGET': '"' + TARGET + '"'
        }),
        new webpack.DefinePlugin({
            '__base': '"' + dirname + '/"'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    output: {
        path: path.join(dirname, 'public/build/'),
        filename: 'bundle.js',
        publicPath: path.join(__dirname, 'public/build/')
    }
};

let config = merge(common, {
    devtool: '#eval-source-map',
    devServer: {inline: true},
    entry: [
        path.join(dirname, 'src/main')
    ],
    resolveLoader: {
        modules: [
            path.join(dirname, 'node_modules'),
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'],
            include: path.join(__dirname, 'src')
            },
            {
                test: /\.docx?$/,
                loaders: ['binary-loader'],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/' // where the fonts will go
                    }
                }]
            },
        ]
    }

});

module.exports = config;
