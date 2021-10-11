const express = require("express");
const router = express.Router();
const City = require("../model/City");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;
    const skipIndex = (page - 1) * limit;

    let sortOrder =
      req.query.sortOrder && req.query.sortOrder === "desc" ? -1 : 1;
    let sortField = req.query.sortField || "";
    let cityName = req.query.city || "";
    let state = req.query.state || "";

    let matchOption = {};
    let sortOption = {};
    let total = 0;

    let results;

    if (cityName)
      matchOption.city = { $regex: cityName.toUpperCase(), $options: "i" };
    if (state)
      matchOption.state = { $regex: state.toUpperCase(), $options: "i" };
    if (sortOrder && sortField) {
      sortOption[sortField] = sortOrder;
    } else {
      sortOption["_id"] = 1;
    }

    const hasMatched = Object.keys(matchOption).length > 0;
    if (hasMatched) {
      total = await City.countDocuments(matchOption);
      results = await City.find(matchOption)
        .sort(sortOption)
        .limit(limit)
        .skip(skipIndex);
    } else {
      results = await City.find({})
        .sort(sortOption)
        .limit(limit)
        .skip(skipIndex);
      total = await City.countDocuments({});
    }

    const response = {
      totalPages: total,
      results,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

router.get("/max", auth, async (req, res) => {
  const state = req.query.state.toUpperCase() || "";
  let response;
  try {
    if (state) {
      response = await City.find({ state }).sort({ pop: -1 }).limit(1);
    } else {
      response = await City.find().sort({ pop: -1 }).limit(1);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error!!");
  }
});

module.exports = router;
