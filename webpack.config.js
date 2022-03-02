const { ProvidePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            function() {
                                                return [
                                                    require("autoprefixer"),
                                                ];
                                            },
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                [
                                    "@babel/preset-react",
                                    { runtime: "automatic" },
                                ],
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new MiniCssExtractPlugin({ filename: "./css/main.css" }),
    ],
};
