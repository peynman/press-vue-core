const path = require('path')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const AllUtils = glob.sync('./src/utils/*.js').map(file => 'utils_' + path.parse(file).name)

module.exports = {
    mode: 'production',
    entry: {
        ...glob.sync('./src/utils/*.js').reduce((entries, file) => {
            const p = path.parse(file)
            entries['utils_' + p.name] = {
                import: file,
                filename: 'utils/' + p.base,
            }
            return entries
        }, {}),
        index: './src/index.js',
        mixins: {
            import: './src/mixins.js',
            filename: 'mixins/index.js',
            dependOn: AllUtils,
        },
        crud: {
            import: './src/crud/index.js',
            filename: 'crud/index.js',
            dependOn: ['mixins', ...AllUtils],
        },
        ...glob.sync('./src/lang/*.js').reduce((entries, file) => {
            const p = path.parse(file)
            entries['locale_' + p.name] = {
                import: file,
                filename: 'locales/' + p.base,
            }
            return entries
        }, {}),
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        library: 'press-vue-core',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            minSize: 100,
            cacheGroups: {
                ...glob.sync('./src/crud/*/index.js').reduce((entries, file) => {
                    const p = path.parse(file)
                    const name = path.basename(p.dir)
                    entries['crudGroup' + name] = {
                        test(module) {
                            if (!module.resource) {
                                return false
                            }
                            const mm = module.resource.substr(__dirname.length)
                            return mm.includes(name) && mm.includes('crud')
                        },
                        name(module, chunks, cacheGroupKey) {
                            return `crud/${name}.js`
                        },
                    }
                    return entries
                }, {}),
                ...glob.sync('./src/mixins/*.js').reduce((entries, file) => {
                    const p = path.parse(file)
                    entries['mixinsGroup' + p.name] = {
                        filename: '[name].js',
                        test(module) {
                            if (!module.rawRequest) {
                                return false
                            }
                            return module.rawRequest.includes(p.name)
                        },
                        name(module, chunks, cacheGroupKey) {
                            const moduleFileName = module
                                .identifier()
                                .split('/')
                                .reduceRight((item) => item);
                            const allChunksNames = chunks.map((item) => item.name).join('~');
                            if (allChunksNames.startsWith('mixins')) {
                                return `mixins/${moduleFileName}`
                            } else if (allChunksNames.startsWith('utils')) {
                                return `utils/${moduleFileName}`
                            }
                            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                        },
                    }
                    return entries
                }, {}),
            }
        }
    },
    externals: [
        /^vue.*/,
        /^vuex.*/,
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
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            reportFilename: 'analyzer.html',
            analyzerMode: 'static',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: './package.json',
                to: './package.json'
            }]
        }),
    ]
}