const path = require('path');

module.exports = {
    // Set the target environment for the build
    target: 'node',

    // Define the entry point of the application
    entry: './src/client/index.js',

    // Configure output settings
    output: {
        filename: 'client_bundle.js', // Name of the output bundle
        path: path.resolve(__dirname, 'build/public'), // Output directory
        publicPath: '/build/public', // Public URL of the output directory
    },

    // Specify module rules for handling different file types
    module: {
        rules: [
            {
                // Handle image files (SVG, GIF, JPEG, PNG)
                test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'file-loader',
                options: {
                    name: '/media/[name].[ext]', // Output file naming convention
                    publicPath: (url) => url.replace(/build/, ''), // Adjust public path
                },
            },
            {
                // Transpile JavaScript files using Babel
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/', // Exclude node_modules
                options: {
                    presets: [
                        '@babel/preset-react', // Support for React JSX
                        '@babel/env', // Target appropriate JavaScript environments
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties', // Enable class properties
                    ],
                },
            },
            {
                // Process CSS files
                test: /\.css$/i,
                loader: ['style-loader', 'css-loader'], // Inject styles and resolve CSS
            },
            {
                // Process SCSS files
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader', // Handle SCSS with Sass
            },
            {
                // Handle font files (WOFF, TTF, EOT, SVG)
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', // Maintain original file names
                            outputPath: './fonts/', // Output path for font files
                        },
                    },
                ],
            },
        ],
    },
};
