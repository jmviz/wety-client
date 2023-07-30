const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "./src/index.ts"),
    devtool: "source-map",
    plugins: [new MiniCssExtractPlugin()],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },
    resolve: {
        extensions: [".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
        ],
    },
};
