const router = require("express").Router();
const InfoItem = require("../models/InfoItem");

router.get("/:category", async (req, res) => {
  const valid = ["transportation", "accommodation", "shopping"];
  if (!valid.includes(req.params.category))
    return res.status(400).json({ error: "Invalid category" });
  try {
    const items = await InfoItem.find({ category: req.params.category }).sort({
      id: 1,
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
