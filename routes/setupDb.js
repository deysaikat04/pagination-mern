const data = require("../zips.json");
const City = require("../model/City");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await City.deleteMany();
    await City.insertMany(data);
    res.status(201).json({ msg: "Data added" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

module.exports = router;
