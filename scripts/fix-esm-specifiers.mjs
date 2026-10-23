import fs from "node:fs"
import path from "node:path"

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ["dist"]
const SKIP_DIRS = new Set(["cjs", "node_modules"])
const HAS_EXT = /\.(?:[cm]?js|json|node)$/i
const RE = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}(?:\/[^"']*)?)\2/g

const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile()
const isDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory()

let fixed = 0
const unresolved = []

function fixFile(file) {
  const dir = path.dirname(file)
  const src = fs.readFileSync(file, "utf8")
  const out = src.replace(RE, (all, pre, q, spec) => {
    if (HAS_EXT.test(spec)) return all
    const target = path.resolve(dir, spec)
    let next = null
    if (!spec.endsWith("/") && !/^\.{1,2}$/.test(spec) && isFile(`${target}.js`)) next = `${spec}.js`
    else if (isDir(target) && isFile(path.join(target, "index.js"))) next = `${spec.replace(/\/$/, "")}/index.js`
    if (!next) { unresolved.push(`${path.relative(process.cwd(), file)} -> ${spec}`); return all }
    fixed++
    return `${pre}${q}${next}${q}`
  })
  if (out !== src) fs.writeFileSync(file, out)
}

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(path.join(d, e.name)) }
    else if (/\.(?:js|mjs)$/.test(e.name)) fixFile(path.join(d, e.name))
  }
}

for (const r of roots) {
  if (!isDir(r)) { console.error(`[fix-esm] folder tidak ada: ${r}`); process.exit(1) }
  walk(r)
}
console.log(`[fix-esm] ${fixed} import diperbaiki`)
if (unresolved.length) {
  console.error(`[fix-esm] ${unresolved.length} import relatif tidak ketemu filenya:`)
  unresolved.slice(0, 20).forEach((u) => console.error("  " + u))
  process.exit(1)
}
