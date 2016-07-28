var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        'bootstrap-loader', //Loads Twitter Bootstrap
        './index.jsx' // Appʼs entry point
    ],
    module: {
        preLoaders: [
            {
                test: /\.(es6|jsx|js)$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ],
        loaders: [
            {
                test: /\.es6$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot-loader!babel-loader?presets[]=es2015,presets[]=react',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader?limit=10000' },
            {
                test: /\.(ttf|eot)$/,
                loader: 'file-loader'
            },/*
            {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$!expose?window.jQuery'  //expose-loader, exposes as global variable
            }*/
            {
                test: require.resolve('jszip'),
                loader: 'expose?JSZip'
            },
            {
                test: require.resolve('jszip-utils'),
                loader: 'expose?JSZipUtils'
            },
            {
                test: require.resolve('file-saver'),
                loader: 'expose?FileSaver'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6']
    },
    output: {
        path: './dist',
        publicPath: '/', //This is used to generate URLs to e.g. images
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    jshint: {
        // http://www.jshint.com/docs/options/

        // This option prohibits the use of bitwise operators such as ^ (XOR), | (OR) and others.
        // Bitwise operators are very rare in JavaScript programs and quite often & is simply a mistyped &&
        bitwise: true,

        // This option requires you to always put curly braces around blocks in loops and conditionals
        curly: true,

        // This options prohibits the use of == and != in favor of === and !==
        eqeqeq: true,

        // This option is used to specify the ECMAScript version to which the code must adhere
        esversion: 6,

        // This option requires all for in loops to filter object's items. The for in statement
        // allows for looping through the names of all of the properties of an object including
        // those inherited through the prototype chain.
        //forin: true,

        //This options prohibits overwriting prototypes of native objects such as Array, Date and so on.
        freeze: true,

        // This option can be used to specify a white list of global variables that are not formally defined in the source code.
        globals: {
            "Dali": true
        },

        // This option requires the code to run in ECMAScript 5's strict mode.
        //strict: true,

        // This option prohibits the use of explicitly undeclared variables.
        undef: true,

        // This option warns when you define and never use your variables.
        unused: false,

        // This option suppresses warnings about functions inside of loops.
        loopfunc: true,

        // These options let JSHint know about some pre-defined global variables
        browser: true,
        devel: true,
        jquery: true,
        predef: ["html2json", "jsPlumb", "CKEDITOR", "EJS"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /*
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
        */
        /*new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })*/
        /*new webpack.ProvidePlugin({
            'JSZip': 'jszip',
            'JSZipUtils': 'jszip-utils'
        })*/
    ]
};