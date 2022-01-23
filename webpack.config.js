const path = require('path')
const glob = require("glob");

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        ...glob.sync('./src/mixins/*.js').reduce((entries, file) => {
            const p = path.parse(file)
            entries[p.name] = {
                import: file,
                filename: 'mixins/' + p.base
            }
            return entries
        }, {}),
        ...glob.sync('./src/utils/*.js').reduce((entries, file) => {
            const p = path.parse(file)
            entries[p.name] = {
                import: file,
                filename: 'utils/' + p.base
            }
            return entries
        }, {})
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        libraryTarget: "umd",
    },
    externals: [
        /^vue.*/,
        /^vuex.*/,
        /^vue-i18n.*/,
        /^vue-router.*/,
    ],
    resolve: {
        symlinks: false,
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, ]
    },
}