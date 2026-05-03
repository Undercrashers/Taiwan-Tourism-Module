const router = require("express").Router();
const Region = require("../models/Region.js");

router.get("/", async (req, res) => {
  try {
    const regions = await Region.find().sort({ id: 1 });
    res.json(regions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:key", async (req, res) => {
  try {
    const region = await Region.findOne({ key: req.params.key });
    if (!region) return res.status(404).json({ error: "Not found" });
    res.json(region);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
