module.exports = {
	entry: __dirname + "/index.js",
	output: {
		filename: "bundle.js",
		publicPath: "/recipebox/",
		path: __dirname + "/build/"
	},

	devServer: {
		contentBase: __dirname + "/build/",
		port: 8080
	},

	module: {
		loaders : [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			},

			{
				test: /\.(scss|sass)$/,
				exclude: /node_modules/,
				loader: "style-loader!css-loader!sass-loader"
			},

			{
				test: /\.(png|svg)$/, 
				exclude: /node_modules/,
				loader: "url-loader"
			},
			
			{
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: "file-loader?name=public/fonts/[name].[ext]"
            },

            {
            	test: /\.json$/,
            	loader: "json-loader"
            }
		]
	}
}