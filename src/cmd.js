const glob = require("glob")
const path = require('path')

const c = []
glob.sync('./src/crud/*/index.js').forEach(dir => {
    const p = path.parse(dir)
    const name = path.basename(p.dir)
    c.push(name)
})

console.log(`export { ${c.join(",\n")} }`)