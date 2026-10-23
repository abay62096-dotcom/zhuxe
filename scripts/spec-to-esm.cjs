const fs = require('fs')
const path = require('path')

for (const name of ['abprops', 'appstate', 'mex', 'proto', 'version']) {
  const f = path.join('spec', name, 'index.js')
  if (!fs.existsSync(f)) continue

  let src = fs.readFileSync(f, 'utf8')
  const before = src

  // hapus 'use strict'
  src = src.replace(/^['"]use strict['"];?\s*\n/m, '')

  // sudah ESM? skip (kecuali ada ",export" invalid)
  if (/,export const/.test(src)) {
    src = src.replace(/,export const/g, ';\nexport const')
  }

  // module.exports = { ... } → export { ... }
  src = src.replace(
    /module\.exports\s*=\s*\{([^}]+)\}\s*;?\s*$/m,
    (_, inner) => `export {${inner}}\n`
  )

  // minified: ",module.exports=j" → ";\nexport const waproto = j.waproto"
  src = src.replace(
    /,\s*module\.exports\s*=\s*([\w.]+)\s*;?\s*$/m,
    (_, v) => `;\nexport const waproto = ${v}.waproto\n`
  )

  // module.exports = expr → export default expr
  src = src.replace(
    /module\.exports\s*=\s*([^\n;{}]+?)\s*;?\s*$/m,
    (_, v) => `export default ${v}\n`
  )

  if (src !== before) {
    fs.writeFileSync(f, src)
    console.log('✓', f)
  }
}
console.log('done')
