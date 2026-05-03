require('dotenv').config()
const fs        = require('fs')
const path      = require('path')
const { parse } = require('csv-parse/sync')
const connectDB = require('./db')
const Region    = require('./models/Region')
const InfoItem  = require('./models/InfoItem')

// ── helper ────────────────────────────────────────────────────
const readCSV = (filename) => parse(
  fs.readFileSync(path.join(__dirname, 'data', filename)),
  { columns: true, skip_empty_lines: true, trim: true }
)

// ── icon map: csv value → actual file path ────────────────────
const iconMap = {
  '#i-train':    '/icons/icon-train.svg',
  '#i-landmark': '/icons/icon-landmark.svg',
  '#i-pin':      '/icons/icon-pin.svg',
  '#i-hotel':    '/icons/icon-hotel.svg',
  '#i-bag':      '/icons/icon-bag.svg',
  '#i-utensils': '/icons/icon-utensils.svg',
  '#i-globe':    '/icons/icon-globe.svg'
}

;(async () => {
  await connectDB()

  // ── read csvs ─────────────────────────────────────────────
  const regions     = readCSV('regions.csv')
  const attractions = readCSV('attractions.csv')
  const infoItems   = readCSV('info_items.csv')

  // ── build region docs with embedded attractions ───────────
  const regionDocs = regions.map(r => ({
    id:      Number(r.id),
    key:     r.key,
    name:    r.name,
    color:   r.color,
    summary: r.summary,
    attractions: attractions
      .filter(a => Number(a.region_id) === Number(r.id))
      .map(a => ({
        region_id:   Number(a.region_id),
        name:        a.name,
        description: a.description
      }))
  }))

  // ── build info item docs ──────────────────────────────────
  const infoDocs = infoItems.map(i => ({
    id:       Number(i.id),
    category: i.category,
    icon:     iconMap[i.icon] || i.icon,
    title:    i.title,
    body:     i.body
  }))

  // ── wipe old data ─────────────────────────────────────────
  await Region.deleteMany({})
  await InfoItem.deleteMany({})

  // ── insert fresh ──────────────────────────────────────────
  await Region.insertMany(regionDocs)
  await InfoItem.insertMany(infoDocs)

  // ── log results ───────────────────────────────────────────
  console.log(`✅ Seeded ${regionDocs.length} regions:`)
  regionDocs.forEach(r =>
    console.log(`   [${r.key}] ${r.name} — ${r.attractions.length} attractions`)
  )
  console.log(`✅ Seeded ${infoDocs.length} info items:`)
  infoDocs.forEach(i =>
    console.log(`   [${i.category}] ${i.title} — ${i.icon}`)
  )

  process.exit(0)
})()