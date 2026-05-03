require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const connectDB = require("./db");
const Region = require("./models/Region");
const InfoItem = require("./models/InfoItem");

const readCSV = (filename) =>
  parse(fs.readFileSync(path.join(__dirname, "data", filename)), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

const regions = readCSV("regions.csv");
const attractions = readCSV("attractions.csv");
const infoItems = readCSV("info_items.csv");

const regionDocs = regions.map((r) => ({
  id: Number(r.id),
  key: r.key,
  name: r.name,
  color: r.color,
  summary: r.summary,
  attractions: attractions
    .filter((a) => Number(a.region_id) === Number(r.id))
    .map((a) => ({
      region_id: Number(a.region_id),
      name: a.name,
      description: a.description,
    })),
}));

const infoDocs = infoItems.map((i) => ({
  id: Number(i.id),
  category: i.category,
  icon: i.icon,
  title: i.title,
  body: i.body,
}));

const seed = async () => {
  await connectDB();
  await Region.deleteMany({});
  await InfoItem.deleteMany({});

  await Region.insertMany(regionDocs);
  await InfoItem.insertMany(infoDocs);

  console.log(`✅ Seeded ${regionDocs.length} regions`);
  regionDocs.forEach((r) =>
    console.log(`   ${r.name}: ${r.attractions.length} attractions`),
  );
  console.log(`✅ Seeded ${infoDocs.length} info items`);
  process.exit(0);
};

seed();
