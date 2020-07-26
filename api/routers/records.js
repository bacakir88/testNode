"use strict";

const express = require("express");
const router = express.Router();
const records = require("../controllers/records");

router.post("/", records.getAllRecordsByFilters);

module.exports = router;